"""
Automated unit tests for FallbackAIProvider and Multi-API key rotation / failover.
Run with: python -m pytest server/tests/
"""

import asyncio
from unittest.mock import AsyncMock, MagicMock
from server.ai.provider import FallbackAIProvider, StubAIProvider, get_ai_provider
from server.ai.gemini import GeminiAIProvider
from server.models.request import SanitizedContext, SanitizedElement, SanitizedPage
from server.models.action import AgentAction, ActionType


def test_fallback_provider_primary_success():
    """Verify FallbackAIProvider returns primary provider result when primary succeeds."""
    primary_mock = MagicMock()
    primary_mock.generate_action = AsyncMock(return_value=AgentAction(
        action=ActionType.CLICK,
        element_id="btn_1",
        reasoning="Primary provider success"
    ))

    secondary_mock = MagicMock()

    fallback = FallbackAIProvider(providers=[primary_mock, secondary_mock])

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Test"),
        task="Click button",
        intent="OPEN_ELEMENT",
        elements=[SanitizedElement(id="btn_1", type="button", tagName="BUTTON", label="Click", role="button")]
    )

    action = asyncio.run(fallback.generate_action("Click button", context))
    assert action.action == ActionType.CLICK
    assert action.element_id == "btn_1"
    secondary_mock.generate_action.assert_not_called()


def test_fallback_provider_primary_error_failover():
    """Verify FallbackAIProvider falls back to secondary when primary raises an exception."""
    primary_mock = MagicMock()
    primary_mock.__class__.__name__ = "FailingProvider"
    primary_mock.generate_action = AsyncMock(side_effect=RuntimeError("Groq 429 Rate Limit"))

    secondary_mock = MagicMock()
    secondary_mock.__class__.__name__ = "BackupProvider"
    secondary_mock.generate_action = AsyncMock(return_value=AgentAction(
        action=ActionType.CLICK,
        element_id="btn_backup",
        reasoning="Secondary backup success"
    ))

    fallback = FallbackAIProvider(providers=[primary_mock, secondary_mock])

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Test"),
        task="Click button",
        intent="OPEN_ELEMENT",
        elements=[SanitizedElement(id="btn_backup", type="button", tagName="BUTTON", label="Click", role="button")]
    )

    action = asyncio.run(fallback.generate_action("Click button", context))
    assert action.action == ActionType.CLICK
    assert action.element_id == "btn_backup"
    assert "Secondary backup success" in action.reasoning


def test_fallback_provider_api_unavailability_status_failover():
    """Verify FallbackAIProvider falls back when primary returns NONE with API failure reasoning."""
    primary_mock = MagicMock()
    primary_mock.__class__.__name__ = "UnconfiguredProvider"
    primary_mock.generate_action = AsyncMock(return_value=AgentAction(
        action=ActionType.NONE,
        reasoning="Groq API key is not configured on backend."
    ))

    stub_provider = StubAIProvider()

    fallback = FallbackAIProvider(providers=[primary_mock, stub_provider])

    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Test"),
        task="Click button",
        intent="OPEN_ELEMENT",
        elements=[SanitizedElement(id="btn_stub", type="button", tagName="BUTTON", label="Click", role="button")]
    )

    action = asyncio.run(fallback.generate_action("Click button", context))
    assert action.action == ActionType.CLICK
    assert action.element_id == "btn_stub"


def test_get_ai_provider_factory_chain(monkeypatch):
    """Verify get_ai_provider constructs FallbackAIProvider with all configured keys."""
    monkeypatch.setenv("GROQ_API_KEY", "gsk_test_key")
    monkeypatch.setenv("GEMINI_API_KEY_1", "gemini_key_1")
    monkeypatch.setenv("GEMINI_API_KEY_2", "gemini_key_2")
    monkeypatch.setenv("AI_PROVIDER", "auto")

    provider = get_ai_provider()
    assert isinstance(provider, FallbackAIProvider)
    assert len(provider.providers) >= 3  # Groq + Gemini + Stub
