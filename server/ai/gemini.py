"""
Gemini Remote Action Planner Implementation.
Connects the FastAPI backend to Gemini via the official Google GenAI SDK (google-genai).
Supports multi-key rotation, automatic model fallback, and multimodal image inspection.
Receives ONLY sanitized page context past the privacy boundary.
Enforces strict structured JSON output (AgentAction) and element ID safety.
"""

import os
import re
import json
import base64
import logging
from typing import Optional, List, Union
from server.models.request import SanitizedContext, StepRecord
from server.models.action import AgentAction, ActionType
from server.ai.provider import BaseAIProvider

logger = logging.getLogger("server.ai.gemini")

GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
]

GEMINI_SYSTEM_INSTRUCTION = """You are an autonomous browser agent. Your job is to achieve the user's goal by deciding the next browser action or providing the final answer.

DECISION PROTOCOL (EXECUTE IN ORDER):
1. EMAIL COMPOSITION & FORM FILLING TASKS:
   - When requested to send an email or fill a form:
     * Target the Recipient / To field: type ONLY the target recipient email (e.g. "neerushbuchi07@gmail.com").
     * Target the Subject field: type an appropriate subject line (e.g. "Good Morning"). DO NOT type the email address into the subject field!
     * Target the Body / Message field: type the actual message content (e.g. "Good morning! Hope you have a great day."). DO NOT type the email address into the body field!
     * Target the Send button: click Send after recipient, subject, and body fields have been populated.

2. MULTI-STEP / HIDDEN INFORMATION TASKS:
   - If the task asks for information that is currently hidden (e.g. bios, details, expanded sections) or asks to open/view profiles (e.g. "Open Rahul's profile and Priya's profile and give me what's in their bios"):
     * Check if there are buttons like "View Profile", "Open", "Show Details", "Read More" for any of the requested people/items whose information is NOT yet visible in the page elements.
     * If such a button exists, you MUST click it! Select that button's exact element_id.
     * Output: {"action": "click", "element_id": "<button_id>", "reasoning": "Clicking View Profile for <Person> to reveal their bio."}

3. COMPLETION / INFORMATION EXTRACTION / VISUAL IDENTIFICATION:
   - If ALL requested information for the task is already visible on the current page (or was revealed after opening profiles or provided in the visual images):
     * Output action "none" with the comprehensive answer.
     * Output: {"action": "none", "answer": "<Comprehensive direct answer containing the extracted information>", "reasoning": "<Summary of findings>"}

RULES:
1. ONLY select target element IDs from the supplied page elements list.
2. Never invent element IDs.
3. Do NOT output any <think>, <reasoning>, or chain-of-thought blocks. Output ONLY the final JSON.
4. Output valid JSON matching this schema:
{
  "action": "click" | "type" | "scroll" | "navigate" | "select" | "none",
  "element_id": string | null,
  "value": string | null,
  "reasoning": string,
  "answer": string | null
}
"""


def _clean_text_value(val: Optional[str]) -> Optional[str]:
    """Cleans text fields by stripping <think> tags and un-nesting stringified JSON objects."""
    if not val or not isinstance(val, str):
        return None
    s = val.strip()
    import re as _re
    s = _re.sub(r'<think>.*?</think>', '', s, flags=_re.DOTALL).strip()
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
            match = _re.search(r'"(?:reasoning|answer)"\s*:\s*"([^"]+)"', s)
            if match:
                return match.group(1)
            return None
    return s


class GeminiAIProvider(BaseAIProvider):
    """
    Remote AI Provider calling Gemini API via google-genai SDK.
    Supports multi-key rotation and multi-model fallback.
    """

    def __init__(
        self,
        api_key: Optional[Union[str, List[str]]] = None,
        api_keys: Optional[List[str]] = None,
        model_name: Optional[str] = None
    ):
        keys = []
        if api_key:
            if isinstance(api_key, str):
                if api_key.strip():
                    keys.append(api_key.strip())
            elif isinstance(api_key, list):
                keys.extend([k.strip() for k in api_key if k and k.strip()])
        if api_keys:
            for k in api_keys:
                if k and k.strip() and k.strip() not in keys:
                    keys.append(k.strip())
        if api_key is None and api_keys is None:
            for env_name in ["GEMINI_API_KEY", "GEMINI_API_KEY_1", "GEMINI_API_KEY_2", "GEMINI_API_KEY_3"]:
                val = os.getenv(env_name)
                if val and val.strip() and val.strip() not in keys:
                    keys.append(val.strip())

        self.api_keys = keys
        self.configured_model = model_name or os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    async def generate_action(
        self,
        task: str,
        context: SanitizedContext,
        previous_steps: Optional[List[StepRecord]] = None
    ) -> AgentAction:
        if not self.api_keys and not getattr(self, "_client", None):
            logger.warning("⚠️ No Gemini API keys configured. Returning safe failure ActionType.NONE.")
            return AgentAction(
                action=ActionType.NONE,
                reasoning="Gemini API key is not configured on backend."
            )

        from google import genai
        from google.genai import types

        # ... (rest of code)
        # 1. Format text prompt components
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

        # 2. Build contents payload (Text + Images)
        contents: List[Union[str, types.Part]] = ["\n".join(prompt_parts)]

        if context.images and len(context.images) > 0:
            for img in context.images:
                if img.data_url:
                    try:
                        # Extract base64 data
                        if "," in img.data_url:
                            header, b64_str = img.data_url.split(",", 1)
                            mime_type = header.split(";")[0].replace("data:", "") or "image/png"
                        else:
                            b64_str = img.data_url
                            mime_type = "image/png"

                        raw_bytes = base64.b64decode(b64_str)
                        part = types.Part.from_bytes(data=raw_bytes, mime_type=mime_type)
                        contents.append(part)
                    except Exception as img_err:
                        logger.warning(f"⚠️ Failed to parse image data_url: {img_err}")

        # Models to try
        models_to_try = [self.configured_model] + [m for m in GEMINI_MODELS if m != self.configured_model]

        last_error = None

        # Iterate through keys and models with automatic key rotation
        key_list = self.api_keys if self.api_keys else ["MOCK_KEY"]
        for key_idx, api_key in enumerate(key_list, 1):
            client = getattr(self, "_client", None) or genai.Client(api_key=api_key)
            for model_name in models_to_try:
                try:
                    logger.info(f"🧠 [Gemini Provider] Trying Key #{key_idx} with model '{model_name}'...")
                    response = client.models.generate_content(
                        model=model_name,
                        contents=contents,
                        config=types.GenerateContentConfig(
                            system_instruction=GEMINI_SYSTEM_INSTRUCTION,
                            response_mime_type="application/json",
                            temperature=0.1,
                        )
                    )

                    if not response or not response.text:
                        raise RuntimeError("Empty response received from Gemini API.")

                    cleaned_text = response.text.strip()

                    # Strip <think>...</think> reasoning blocks that some models output
                    # before the JSON (e.g. Gemini 2.5 Flash thinking mode)
                    import re as _re
                    cleaned_text = _re.sub(r'<think>.*?</think>', '', cleaned_text, flags=_re.DOTALL).strip()

                    # Strip markdown code fences if wrapped
                    if cleaned_text.startswith("```"):
                        cleaned_text = cleaned_text.split("```", 2)[1]
                        if cleaned_text.startswith("json"):
                            cleaned_text = cleaned_text[4:]
                        cleaned_text = cleaned_text.rsplit("```", 1)[0].strip()

                    parsed = json.loads(cleaned_text)

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
                        reasoning_text = f"Gemini AI plan via '{model_name}' (Key #{key_idx})."

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
                            f"🚨 [Gemini Safety Safeguard] '{model_name}' returned unobserved element ID '{action.element_id}'. Overriding to NONE."
                        )
                        return AgentAction(
                            action=ActionType.NONE,
                            reasoning=f"Safeguard triggered: Target element '{action.element_id}' does not exist in sanitized context."
                        )

                    logger.info(f"✅ [Gemini Provider] Success with Key #{key_idx} on '{model_name}'.")
                    return action

                except Exception as call_err:
                    last_error = str(call_err)
                    logger.warning(f"⚠️ [Gemini Provider] Key #{key_idx} on '{model_name}' failed: {last_error[:150]}")
                    # If it's a quota/rate limit error (429/403/ResourceExhausted), switch to next key immediately
                    err_str = str(call_err).lower()
                    if any(code in err_str for code in ["429", "quota", "resource_exhausted", "limit", "403"]):
                        logger.info(f"🔄 Rate limit / quota hit on Key #{key_idx}. Rotating to next Gemini key...")
                        break  # Break inner loop to try next key

        logger.error(f"🚨 [Gemini Provider] All Gemini keys/models exhausted. Last: {last_error}")
        return AgentAction(
            action=ActionType.NONE,
            reasoning=f"Gemini API failure: All Gemini keys/models failed. Last error: {last_error}"
        )
