from abc import ABC, abstractmethod
from typing import Optional, List
from server.models.request import SanitizedContext, StepRecord
from server.models.action import AgentAction, ActionType


class BaseAIProvider(ABC):
    """Abstract interface for AI Action Planners."""

    @abstractmethod
    async def generate_action(
        self,
        task: str,
        context: SanitizedContext,
        previous_steps: Optional[List[StepRecord]] = None
    ) -> AgentAction:
        """
        Generates a structured browser action based on user task, sanitized context, and step history.
        Must NOT require or receive raw DOM, HTML, or unredacted PII.
        """
        pass


class StubAIProvider(BaseAIProvider):
    """
    Phase 6 Development Stub Provider.
    Does NOT call Gemini or external AI APIs.
    Performs deterministic element matching on sanitized context for testing purposes.
    """

    async def generate_action(
        self,
        task: str,
        context: SanitizedContext,
        previous_steps: Optional[List[StepRecord]] = None
    ) -> AgentAction:
        task_lower = task.lower()
        
        # 1. Search sanitized elements for button matching task
        best_match_id = None

        # First pass: look specifically for buttons matching target keywords (e.g. rahul, profile, view)
        for el in context.elements:
            el_label = el.label.lower()
            el_name = (el.accessibleName or "").lower()
            el_id = el.id.lower()

            if el.type == "button":
                if any(kw in task_lower for kw in ["open", "profile", "view", "click"]):
                    if "rahul" in task_lower and ("rahul" in el_label or "rahul" in el_id or "rahul" in el_name):
                        best_match_id = el.id
                        break
                    elif "view profile" in el_label or "profile" in el_label:
                        best_match_id = el.id

        # Second pass: look for headings or any element with matching ID/name
        if not best_match_id:
            for el in context.elements:
                el_label = el.label.lower()
                el_name = (el.accessibleName or "").lower()
                el_id = el.id.lower()

                if "rahul" in task_lower and ("rahul" in el_label or "rahul" in el_id or "rahul" in el_name):
                    best_match_id = el.id
                    break

        # Fallback to first button, link, or element
        if not best_match_id:
            for el in context.elements:
                if el.type in ["button", "link"]:
                    best_match_id = el.id
                    break

        if not best_match_id and context.elements:
            best_match_id = context.elements[0].id

        target_id = best_match_id or "elem_target_stub"

        return AgentAction(
            action=ActionType.CLICK,
            element_id=target_id,
            reasoning=f"StubAIProvider (Phase 6 dev stub): Selected target element '{target_id}' based on task '{task}' matching sanitized elements."
        )

import os
import logging

logger = logging.getLogger("server.ai.provider")


def get_ai_provider() -> BaseAIProvider:
    """
    Factory function returning the configured AI provider.
    Checks GROQ_API_KEY or AI_PROVIDER="groq" first, then GEMINI_API_KEY, falling back to StubAIProvider.
    """
    provider_type = os.getenv("AI_PROVIDER", "groq").lower()
    groq_key = os.getenv("GROQ_API_KEY")

    if (provider_type == "groq" or groq_key) and groq_key and groq_key.strip():
        try:
            from server.ai.groq import GroqAIProvider
            logger.info("⚡ Using GroqAIProvider (Ultra-Fast Remote Action Planner)")
            return GroqAIProvider(api_key=groq_key)
        except Exception as e:
            logger.warning(f"⚠️ Could not load GroqAIProvider: {str(e)}. Checking fallbacks.")

    gemini_key = os.getenv("GEMINI_API_KEY")
    if (provider_type == "gemini" or gemini_key) and gemini_key and gemini_key.strip():
        try:
            from server.ai.gemini import GeminiAIProvider
            logger.info("🤖 Using GeminiAIProvider (Remote Action Planner)")
            return GeminiAIProvider(api_key=gemini_key)
        except Exception as e:
            logger.warning(f"⚠️ Could not load GeminiAIProvider: {str(e)}. Falling back to StubAIProvider.")

    logger.info("ℹ️ Using StubAIProvider (Local Development Planner)")
    return StubAIProvider()

