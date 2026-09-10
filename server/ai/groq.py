"""
Groq Remote Action Planner Implementation.
Connects the FastAPI backend to Groq API (using OpenAI-compatible Chat Completions endpoint).
Receives ONLY sanitized page context past the privacy boundary.
Enforces strict structured JSON output (AgentAction) and element ID safety.
"""

import os
import re
import json
import logging
from typing import Optional, List, Union
import httpx

from server.models.request import SanitizedContext, StepRecord
from server.models.action import AgentAction, ActionType
from server.ai.provider import BaseAIProvider

logger = logging.getLogger("server.ai.groq")

# Models for text-only tasks
GROQ_TEXT_MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
]

# Models for multimodal vision tasks (image reasoning)
GROQ_VISION_MODELS = [
    "llama-3.2-11b-vision-preview",
    "llama-3.2-90b-vision-preview",
    "llama-3.3-70b-versatile",
]

GROQ_SYSTEM_INSTRUCTION = """You are an autonomous browser AI agent. Your job is to analyze webpage content, visual image inputs, and OCR text to directly answer the user's task or perform browser actions.

CRITICAL INSTRUCTION FOR QUESTION, CHAT & IDENTIFICATION TASKS:
- If the user's prompt is a question, greeting, general chat ("hi", "hello"), or identification request (e.g. "who is this person", "what is this", "identify the person", "summarize the page", "who is wearing..."):
  1. Inspect the sanitized page elements, heading text, OCR readings, and attached visual images.
  2. ALWAYS output action "none".
  3. Provide a clear, detailed, and direct answer in BOTH the "answer" and "reasoning" fields!

CRITICAL INSTRUCTION FOR EMAIL COMPOSITION & FORM FILLING TASKS:
- When requested to send an email or fill out a multi-field form:
  1. Target the Recipient / To field: type ONLY the target recipient email address (e.g. "neerushbuchi07@gmail.com").
  2. Target the Subject field: type an appropriate subject line (e.g. "Good Morning"). DO NOT type the email address into the subject field!
  3. Target the Body / Message field: type the actual message content (e.g. "Good morning! Hope you have a great day."). DO NOT type the email address into the body field!
  4. Target the Send button: click Send once recipient, subject, and body fields have been populated.

REQUIRED JSON OUTPUT FORMAT:
{
  "action": "click" | "type" | "scroll" | "navigate" | "select" | "none",
  "element_id": string | null,
  "value": string | null,
  "reasoning": "Detailed explanation and answer",
  "answer": "Detailed direct answer to the user's question"
}
"""


def _clean_text_value(val: Optional[str]) -> Optional[str]:
    """Cleans text fields by stripping <think> tags and un-nesting stringified JSON objects."""
    if not val or not isinstance(val, str):
        return None
    s = val.strip()
    s = re.sub(r'<think>.*?</think>', '', s, flags=re.DOTALL).strip()
    if not s:
        return None
    if s.startswith('{') and ('"action"' in s or '"reasoning"' in s or '"answer"' in s):
        try:
            d = json.loads(s)
            if isinstance(d, dict):
                inner = d.get("answer") or d.get("reasoning") or d.get("value")
                if inner and isinstance(inner, str):
                    return _clean_text_value(inner)
        except Exception:
            match = re.search(r'"(?:reasoning|answer)"\s*:\s*"([^"]+)"', s)
            if match:
                return match.group(1)
            return None
    return s


class GroqAIProvider(BaseAIProvider):
    """
    Remote AI Provider calling Groq API via httpx OpenAI-compatible Chat Completions endpoint.
    Generates structured AgentAction plans from client-sanitized context and multimodal image inputs.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        self.configured_model = model_name or os.getenv("GROQ_MODEL")
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"

    async def _try_model(self, model_name: str, messages: list, client: httpx.AsyncClient, is_vision: bool = False) -> dict:
        """Attempt a call to one model. Returns parsed JSON dict or raises RuntimeError."""
        headers = {
            "Authorization": f"Bearer {self.api_key.strip()}",
            "Content-Type": "application/json"
        }
        body = {
            "model": model_name,
            "messages": messages,
            "temperature": 0.1,
            "max_tokens": 450
        }
        # Compound models support json_object mode; pure vision models like Qwen work best with prompt schemas
        if not is_vision and "compound" in model_name:
            body["response_format"] = {"type": "json_object"}

        try:
            res = await client.post(self.api_url, headers=headers, json=body, timeout=25.0)
        except Exception as net_err:
            logger.warning(f"[Groq] Network connection error on '{model_name}': {net_err}")
            raise RuntimeError(f"network error: {net_err}")

        if res.status_code in (429, 503):
            logger.warning(
                f"[Groq] Model '{model_name}' overloaded (HTTP {res.status_code}). Trying next fallback."
            )
            raise RuntimeError(f"overloaded: HTTP {res.status_code} — {res.text[:200]}")
        if res.status_code != 200:
            raise RuntimeError(f"HTTP error {res.status_code}: {res.text[:200]}")
        data = res.json()
        choices = data.get("choices", [])
        if not choices:
            raise RuntimeError("Empty response choices.")
        msg = choices[0].get("message", {})
        content = msg.get("content", "") or msg.get("reasoning", "")
        if not content or not content.strip():
            raise RuntimeError("Empty message content.")

        # Strip think tags if model outputs reasoning tags
        stripped = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL).strip()

        # Strip markdown code fences if model wraps JSON in ```json...```
        if stripped.startswith("```"):
            stripped = stripped.split("```", 2)[1]
            if stripped.startswith("json"):
                stripped = stripped[4:]
            stripped = stripped.rsplit("```", 1)[0].strip()

        try:
            return json.loads(stripped)
        except Exception:
            # If model returned direct conversational answer, structure it into AgentAction format
            return {
                "action": "none",
                "answer": stripped,
                "reasoning": stripped
            }

    async def generate_action(
        self,
        task: str,
        context: SanitizedContext,
        previous_steps: Optional[List[StepRecord]] = None
    ) -> AgentAction:
        if not self.api_key or not self.api_key.strip():
            logger.warning("⚠️ GROQ_API_KEY missing or empty. Returning safe failure ActionType.NONE.")
            return AgentAction(
                action=ActionType.NONE,
                reasoning="Groq API key is not configured on backend."
            )

        try:
            # Format compact payload for prompt
            # Separate OCR text elements from regular elements for clearer prompt structure
            ocr_readings = []
            regular_elements = []
            for el in context.elements:
                if el.type == "ocr_text":
                    ocr_readings.append({
                        "id": el.id,
                        "visual_text": el.label,
                        "source_element": el.attributes.get("elementId", "") if el.attributes else "",
                        "description": el.accessibleName
                    })
                else:
                    regular_elements.append({
                        "id": el.id,
                        "type": el.type,
                        "label": el.label,
                        "role": el.role,
                        "accessibleName": el.accessibleName
                    })

            # Build prompt text with OCR readings and previous steps history
            prompt_parts = [
                f"USER TASK: {task}",
                f"CLASSIFIED INTENT: {context.intent}",
                "",
                "IMPORTANT: You are executing a step in an autonomous agent loop. If the task asks to open profiles or fetch information hidden behind buttons (e.g. 'View Profile'), your task for this step is to CLICK that button to reveal the content. Do NOT terminate with action 'none' until the required information has actually been revealed and displayed in the page elements.",
            ]

            if previous_steps:
                steps_history = [
                    f"Step {s.step}: Action='{s.action}' on element='{s.element_id}' -> Outcome: {s.result_summary}"
                    for s in previous_steps
                ]
                prompt_parts += [
                    "",
                    "PREVIOUS ACTIONS TAKEN IN THIS SESSION:",
                    "\n".join(steps_history),
                ]

            prompt_parts += [
                "",
                "SANITIZED PAGE ELEMENTS (CURRENT STATE):",
                json.dumps(regular_elements, indent=2),
            ]

            if ocr_readings:
                prompt_parts += [
                    "",
                    "OCR VISUAL READINGS (text extracted from images/canvas on the page):",
                    json.dumps(ocr_readings, indent=2),
                    "",
                    "NOTE: The above OCR readings contain the actual visible text from visual elements.",
                    "If the user's task asks what text is written on an image/badge/canvas, use this data to answer.",
                ]

            has_images = bool(context.images and len(context.images) > 0)

            if has_images:
                prompt_parts += [
                    "",
                    "VISUAL IMAGE INPUT:",
                    "One or more permitted or selectively redacted visual images are attached to this message.",
                    "Inspect the visual image content carefully to answer the user's question or perform visual identification.",
                ]
                user_content: List[Union[dict, str]] = [{"type": "text", "text": "\n".join(prompt_parts)}]
                for img in context.images:
                    if img.data_url:
                        user_content.append({
                            "type": "image_url",
                            "image_url": {"url": img.data_url}
                        })
                messages = [
                    {"role": "system", "content": GROQ_SYSTEM_INSTRUCTION},
                    {"role": "user", "content": user_content}
                ]
                model_list = (
                    [self.configured_model] + [m for m in GROQ_VISION_MODELS if m != self.configured_model]
                    if (self.configured_model and ("qwen" in self.configured_model or "scout" in self.configured_model or "vision" in self.configured_model))
                    else GROQ_VISION_MODELS
                )
            else:
                prompt_text = "\n".join(prompt_parts)
                messages = [
                    {"role": "system", "content": GROQ_SYSTEM_INSTRUCTION},
                    {"role": "user", "content": prompt_text}
                ]
                model_list = (
                    [self.configured_model] + [m for m in GROQ_TEXT_MODELS if m != self.configured_model]
                    if self.configured_model
                    else GROQ_TEXT_MODELS
                )

            last_error = None
            async with httpx.AsyncClient(timeout=25.0) as client:
                for model_name in model_list:
                    try:
                        logger.info(f"🧠 [Groq Provider] Trying model: '{model_name}' (vision={has_images})...")
                        parsed = await self._try_model(model_name, messages, client, is_vision=has_images)

                        # Map action string to ActionType enum
                        action_type_str = str(parsed.get("action", "none")).lower()
                        action_enum = ActionType.NONE
                        for at in ActionType:
                            if at.value == action_type_str:
                                action_enum = at
                                break

                        answer_text = _clean_text_value(parsed.get("answer"))
                        reasoning_text = _clean_text_value(parsed.get("reasoning"))

                        if not answer_text and reasoning_text:
                            answer_text = reasoning_text
                        if not reasoning_text and answer_text:
                            reasoning_text = answer_text
                        if not reasoning_text:
                            reasoning_text = f"Groq AI plan via '{model_name}'."

                        action = AgentAction(
                            action=action_enum,
                            element_id=parsed.get("element_id"),
                            value=parsed.get("value"),
                            reasoning=reasoning_text,
                            answer=answer_text
                        )

                        # Element Safety Check
                        valid_ids = {el.id for el in context.elements}
                        if (
                            action.action != ActionType.NONE
                            and action.element_id
                            and action.element_id not in valid_ids
                        ):
                            logger.warning(
                                f"🚨 [Groq Safety Safeguard] '{model_name}' returned "
                                f"unobserved element ID '{action.element_id}'. Overriding to NONE."
                            )
                            return AgentAction(
                                action=ActionType.NONE,
                                reasoning=(
                                    f"Safeguard: element '{action.element_id}' "
                                    f"not in sanitized context."
                                )
                            )

                        logger.info(f"✅ [Groq Provider] Success with '{model_name}'.")
                        return action

                    except Exception as model_err:
                        last_error = str(model_err)
                        logger.warning(f"⚠️ [Groq] Skipping '{model_name}': {last_error}")
                        continue

            # All models exhausted
            logger.error(f"🚨 [Groq Provider] All fallback models failed. Last: {last_error}")
            return AgentAction(
                action=ActionType.NONE,
                reasoning=f"All Groq models overloaded/unavailable. Last error: {last_error}"
            )

        except Exception as e:
            logger.error(f"🚨 [Groq Provider Error] Exception: {str(e)}")
            return AgentAction(
                action=ActionType.NONE,
                reasoning=f"Groq API failure: {str(e)}"
            )
