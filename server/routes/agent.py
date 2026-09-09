"""
Agent Action Planning API routes.
"""

import logging
from fastapi import APIRouter, HTTPException, status
from server.models.request import AgentRequest
from server.models.action import AgentPlanResponse
from server.ai.provider import get_ai_provider

logger = logging.getLogger("server.routes.agent")

router = APIRouter(prefix="/agent", tags=["Agent"])


@router.post(
    "/plan",
    response_model=AgentPlanResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate action plan from sanitized context",
    description="Accepts user task and client-sanitized webpage context to plan structured browser actions."
)
async def plan_action(request: AgentRequest) -> AgentPlanResponse:
    """
    POST /agent/plan
    Contract: Expects client to have already completed PII detection and sanitization.
    """
    try:
        element_count = len(request.context.elements)
        page_title = request.context.page.title if request.context.page else "Unknown Page"
        
        # Privacy-safe log: print only high-level stats, NEVER raw element labels or sensitive content
        logger.info(
            f"📥 [Agent API] Received task: '{request.task}' | Page: '{page_title}' | Sanitized Elements: {element_count}"
        )

        ai_provider = get_ai_provider()
        action = await ai_provider.generate_action(
            request.task,
            request.context,
            request.previous_steps
        )

        logger.info(f"📤 [Agent API] Planned action: {action.action.value} -> target: {action.element_id}")

        provider_name = ai_provider.__class__.__name__

        return AgentPlanResponse(
            status="success",
            action=action,
            metadata={
                "provider": provider_name,
                "phase": "Phase 7 Remote Action Planner",
                "elementCount": element_count
            }
        )

    except Exception as e:
        logger.error(f"🚨 [Agent API Error] Error during action planning: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate agent action plan."
        )
