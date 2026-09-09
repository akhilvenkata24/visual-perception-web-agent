"""
Automated unit and integration tests for FastAPI backend foundation.
Run with: pytest server/tests/
"""

import pytest
from fastapi.testclient import TestClient
from server.main import app
from server.ai.provider import StubAIProvider
from server.models.request import SanitizedContext, SanitizedElement, SanitizedPage

client = TestClient(app)


def test_health_endpoint():
    """Verify GET /health returns 200 OK and status ok."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_plan_endpoint_valid_payload():
    """Verify POST /agent/plan accepts valid sanitized context and returns structured action."""
    payload = {
        "task": "open rahul's profile",
        "context": {
            "page": {
                "url": "http://localhost:8080/index.html",
                "title": "Employee Directory"
            },
            "task": "open rahul's profile",
            "intent": "OPEN_ELEMENT",
            "elements": [
                {
                    "id": "name_rahul",
                    "type": "heading",
                    "tagName": "H3",
                    "label": "Rahul Sharma",
                    "role": "heading"
                },
                {
                    "id": "email_rahul",
                    "type": "link",
                    "tagName": "A",
                    "label": "[REDACTED]",
                    "role": "link"
                },
                {
                    "id": "btn_profile_rahul",
                    "type": "button",
                    "tagName": "BUTTON",
                    "label": "View Profile",
                    "role": "button",
                    "accessibleName": "View profile of Rahul Sharma"
                }
            ],
            "decisionsSummary": {
                "totalEntities": 2,
                "allowCount": 1,
                "maskCount": 1,
                "tokenizeCount": 0,
                "localOnlyCount": 1,
                "blockCount": 0
            }
        }
    }

    response = client.post("/agent/plan", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "success"
    assert "action" in data
    assert data["action"]["action"] in ["click", "none"]
    if data["action"]["action"] == "click":
        assert data["action"]["element_id"] in ["btn_profile_rahul", "name_rahul"]
    assert "metadata" in data
    assert data["metadata"]["provider"] in ["StubAIProvider", "GroqAIProvider", "GeminiAIProvider"]


def test_plan_endpoint_invalid_payload():
    """Verify POST /agent/plan rejects invalid payloads missing required fields with 422."""
    invalid_payload = {
        "task": "open rahul's profile"
        # Missing required 'context'
    }

    response = client.post("/agent/plan", json=invalid_payload)
    assert response.status_code == 422


import asyncio


def test_stub_ai_provider_unit():
    """Verify StubAIProvider produces structured action without external network calls."""
    provider = StubAIProvider()
    context = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080", title="Test Page"),
        task="Click View Profile",
        intent="OPEN_ELEMENT",
        elements=[
            SanitizedElement(
                id="target_btn",
                type="button",
                tagName="BUTTON",
                label="View Profile",
                role="button"
            )
        ]
    )

    action = asyncio.run(provider.generate_action("Click View Profile", context))
    assert action.action == "click"
    assert action.element_id == "target_btn"
    assert "StubAIProvider" in action.reasoning
