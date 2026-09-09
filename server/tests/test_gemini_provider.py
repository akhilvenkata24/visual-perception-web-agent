"""
Automated unit tests for GeminiAIProvider and AI Provider Abstraction (Phase 7).
Run with: pytest server/tests/
"""

import asyncio
from unittest.mock import MagicMock, patch
from server.ai.gemini import GeminiAIProvider
from server.models.request import SanitizedContext, SanitizedElement, SanitizedPage
from server.models.action import AgentAction, ActionType


def test_gemini_unconfigured_fallback():
    """Verify GeminiAIProvider gracefully returns ActionType.NONE if API key is missing."""
    provider = GeminiAIProvider(api_key="")
    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Test Directory"),
        task="Open Rahul's profile",
        intent="OPEN_ELEMENT",
        elements=[
            SanitizedElement(
                id="btn_profile_rahul",
                type="button",
                tagName="BUTTON",
                label="View Profile",
                role="button"
            )
        ]
    )

    action = asyncio.run(provider.generate_action("Open Rahul's profile", context))
    assert action.action == ActionType.NONE
    assert "not configured" in action.reasoning.lower()


def test_gemini_element_safety_override():
    """Verify that if Gemini returns an invented element_id not in context, element safety safeguard overrides to NONE."""
    provider = GeminiAIProvider(api_key="fake_test_key")
    
    # Mock client and response returning invented element_id "profile_9999"
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = '{"action": "click", "element_id": "profile_9999", "reasoning": "Fake invented ID"}'
    mock_client.models.generate_content.return_value = mock_response
    provider._client = mock_client

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Employee Directory"),
        task="Open Rahul's profile",
        intent="OPEN_ELEMENT",
        elements=[
            SanitizedElement(
                id="btn_profile_rahul",
                type="button",
                tagName="BUTTON",
                label="View Profile",
                role="button"
            )
        ]
    )

    action = asyncio.run(provider.generate_action("Open Rahul's profile", context))
    assert action.action == ActionType.NONE
    assert "Safeguard triggered" in action.reasoning
    assert "profile_9999" in action.reasoning


def test_gemini_valid_element_action():
    """Verify valid Gemini response selecting a supplied element ID."""
    provider = GeminiAIProvider(api_key="fake_test_key")
    
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = '{"action": "click", "element_id": "btn_profile_rahul", "reasoning": "Selected profile button for Rahul"}'
    mock_client.models.generate_content.return_value = mock_response
    provider._client = mock_client

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Employee Directory"),
        task="Open Rahul's profile",
        intent="OPEN_ELEMENT",
        elements=[
            SanitizedElement(
                id="btn_profile_rahul",
                type="button",
                tagName="BUTTON",
                label="View Profile",
                role="button"
            )
        ]
    )

    action = asyncio.run(provider.generate_action("Open Rahul's profile", context))
    assert action.action == ActionType.CLICK
    assert action.element_id == "btn_profile_rahul"


def test_gemini_sanitized_redaction_safety():
    """Verify Gemini receives redacted tokens without attempting or requiring raw PII."""
    provider = GeminiAIProvider(api_key="fake_test_key")
    
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = '{"action": "none", "reasoning": "Email label is redacted, cannot provide raw value"}'
    mock_client.models.generate_content.return_value = mock_response
    provider._client = mock_client

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Employee Directory"),
        task="Find Rahul's email",
        intent="FIND_INFORMATION",
        elements=[
            SanitizedElement(
                id="email_rahul",
                type="link",
                tagName="A",
                label="[REDACTED]",
                role="link"
            )
        ]
    )

    action = asyncio.run(provider.generate_action("Find Rahul's email", context))
    assert action.action == ActionType.NONE
    assert "redacted" in action.reasoning.lower() or "none" in action.action.value


def test_gemini_api_error_handling():
    """Verify Gemini API errors are caught and return safe failure ActionType.NONE."""
    provider = GeminiAIProvider(api_key="fake_test_key")
    
    mock_client = MagicMock()
    mock_client.models.generate_content.side_effect = Exception("API rate limit exceeded")
    provider._client = mock_client

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Employee Directory"),
        task="Open Rahul's profile",
        intent="OPEN_ELEMENT",
        elements=[]
    )

    action = asyncio.run(provider.generate_action("Open Rahul's profile", context))
    assert action.action == ActionType.NONE
    assert "API failure" in action.reasoning
