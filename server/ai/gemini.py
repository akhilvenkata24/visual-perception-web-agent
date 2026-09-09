"""
Gemini Remote Action Planner Implementation.
Connects the FastAPI backend to Gemini via the official Google GenAI SDK (google-genai).
Receives ONLY sanitized page context past the privacy boundary.
Enforces strict structured JSON output (AgentAction) and element ID safety.
"""

import os
import json
import logging
from typing import Optional, List
from server.models.request import SanitizedContext, StepRecord
from server.models.action import AgentAction, ActionType
from server.ai.provider import BaseAIProvider

logger = logging.getLogger("server.ai.gemini")

GEMINI_SYSTEM_INSTRUCTION = """You are an autonomous browser agent. Your job is to achieve the user's goal by deciding the next browser action or providing the final answer.

DECISION PROTOCOL (EXECUTE IN ORDER):
1. MULTI-STEP / HIDDEN INFORMATION TASKS:
   - If the task asks for information that is currently hidden (e.g. bios, details, expanded sections) or asks to open/view profiles (e.g. "Open Rahul's profile and Priya's profile and give me what's in their bios"):
     * Check if there are buttons like "View Profile", "Open", "Show Details", "Read More" for any of the requested people/items whose information is NOT yet visible in the page elements.
     * If such a button exists, you MUST click it! Select that button's exact element_id.
     * Do NOT output "none" or say "the bio is not present" if you haven't clicked the profile button yet. Clicks are how you reveal hidden bios!
     * Output: {"action": "click", "element_id": "<button_id>", "reasoning": "Clicking View Profile for <Person> to reveal their bio."}

2. COMPLETION / INFORMATION EXTRACTION:
   - If ALL requested information for the task is already visible on the current page (or was revealed after opening the necessary profiles):
     * Output action "none" with the comprehensive answer.
     * Output: {"action": "none", "answer": "<Comprehensive direct answer containing the extracted information>", "reasoning": "<Summary of findings>"}

RULES:
1. ONLY select target element IDs from the supplied page elements list.
2. Never invent element IDs.
3. Output ONLY valid JSON matching the AgentAction schema.
"""


class GeminiAIProvider(BaseAIProvider):
    """
    Remote AI Provider calling Gemini API via google-genai SDK.
    Generates structured AgentAction plans from client-sanitized context.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model_name = model_name or os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
        self._client = None

        if self.api_key:
            try:
                from google import genai
                self._client = genai.Client(api_key=self.api_key)
            except Exception as e:
                logger.warning(f"⚠️ Failed to initialize google-genai Client: {str(e)}")

    async def generate_action(
        self,
        task: str,
        context: SanitizedContext,
        previous_steps: Optional[List[StepRecord]] = None
    ) -> AgentAction:
        if not self._client or not self.api_key:
            logger.warning("⚠️ GEMINI_API_KEY missing or client uninitialized. Returning safe failure ActionType.NONE.")
            return AgentAction(
                action=ActionType.NONE,
                reasoning="Gemini API key is not configured on backend."
            )

        try:
            from google.genai import types

            # Format compact payload for prompt (Task + Page Metadata + Sanitized Elements)
            compact_elements = [
                {
                    "id": el.id,
                    "type": el.type,
                    "label": el.label,
                    "role": el.role,
                    "accessibleName": el.accessibleName
                }
                for el in context.elements
            ]

            prompt_parts = [
            f"USER TASK: {task}",
            f"CLASSIFIED INTENT: {context.intent}",
            "",
            "IMPORTANT: You are executing a step in an autonomous agent loop. If the task asks to open profiles or fetch information hidden behind buttons (e.g. 'View Profile'), your task for this step is to CLICK that button to reveal the content. Do NOT terminate with action 'none' until the required information has actually been revealed and displayed in the page elements.",
            ]
            
            prompt_payload = {
                "page_title": context.page.title if context.page else "Unknown",
                "previous_steps_taken": [
                    {
                        "step": s.step,
                        "action": s.action,
                        "target_element": s.element_id,
                        "outcome": s.result_summary
                    }
                    for s in (previous_steps or [])
                ],
                "sanitized_elements": compact_elements
            }

            prompt_text = f"USER TASK: {task}\n\nPAGE CONTEXT & SESSION HISTORY:\n{json.dumps(prompt_payload, indent=2)}"

            logger.info(f"🧠 [Gemini Provider] Requesting action plan from model '{self.model_name}'...")

            response = self._client.models.generate_content(
                model=self.model_name,
                contents=prompt_text,
                config=types.GenerateContentConfig(
                    system_instruction=GEMINI_SYSTEM_INSTRUCTION,
                    response_mime_type="application/json",
                    response_schema=AgentAction,
                    temperature=0.1,
                )
            )

            if not response.text:
                logger.error("🚨 [Gemini Provider] Empty response received from Gemini API.")
                return AgentAction(
                    action=ActionType.NONE,
                    reasoning="Received empty response from Gemini API."
                )

            # Parse response into AgentAction model
            action = AgentAction.model_validate_json(response.text)

            # If answer is present but reasoning is empty, align reasoning with answer
            if action.answer and not action.reasoning:
                action.reasoning = action.answer

            # Element Safety Check: Verify target element exists in supplied context
            valid_ids = {el.id for el in context.elements}
            if action.action != ActionType.NONE and action.element_id and action.element_id not in valid_ids:
                logger.warning(f"🚨 [Gemini Safety Safeguard] Gemini returned invented element ID '{action.element_id}' not in context. Overriding to NONE.")
                return AgentAction(
                    action=ActionType.NONE,
                    reasoning=f"Safeguard triggered: Target element '{action.element_id}' does not exist in sanitized context."
                )

            return action

        except Exception as e:
            logger.error(f"🚨 [Gemini Provider Error] API failure: {str(e)}")
            return AgentAction(
                action=ActionType.NONE,
                reasoning=f"Gemini API failure: {str(e)}"
            )
