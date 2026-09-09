"""
Request models for receiving client-sanitized webpage context and user tasks.
Strictly expects SANITIZED content; raw DOM/PII is never accepted.
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field


class SanitizedElement(BaseModel):
    """Represents a single minimum-disclosure DOM element sent from the client redactor."""
    id: str = Field(..., description="Element unique or stable perception identifier")
    type: str = Field(..., description="Semantic type e.g. button, heading, link, text, input")
    tagName: str = Field(..., description="HTML tag name e.g. BUTTON, A, H2")
    label: str = Field(..., description="Sanitized/redacted text label or token")
    role: str = Field(..., description="ARIA role or implicit element role")
    accessibleName: Optional[str] = Field(None, description="Sanitized accessible ARIA name")
    attributes: Optional[Dict[str, str]] = Field(None, description="Safe attributes e.g. href, type")


class SanitizedPage(BaseModel):
    """Page metadata extracted locally by the browser extension."""
    url: str = Field(..., description="Current web page URL")
    title: str = Field(..., description="Current web page title")
    viewport: Optional[Dict[str, Any]] = Field(None, description="Viewport dimensions")


class SanitizedImage(BaseModel):
    """Represents a permitted or selectively redacted visual image/canvas sent across privacy boundary."""
    id: str = Field(..., description="Element unique or perception ID")
    data_url: str = Field(alias="dataUrl", description="Base64 Data URL of permitted/redacted image")
    mime_type: Optional[str] = Field(default="image/png", alias="mimeType", description="Image MIME type")
    description: Optional[str] = Field(None, description="Contextual description of visual image")

    model_config = {"populate_by_name": True}


class DecisionsSummary(BaseModel):
    """Summary metrics of client-side privacy decisions applied before sending payload."""
    totalEntities: int = 0
    allowCount: int = 0
    maskCount: int = 0
    tokenizeCount: int = 0
    localOnlyCount: int = 0
    blockCount: int = 0


class StepRecord(BaseModel):
    """Record of a previous action executed in this task session."""
    step: int = Field(..., description="Step index (1-based)")
    action: str = Field(..., description="Action taken, e.g. click, type, none")
    element_id: Optional[str] = Field(None, description="Target element ID")
    value: Optional[str] = Field(None, description="Value typed or used if applicable")
    result_summary: Optional[str] = Field(None, description="Execution outcome")


class SanitizedContext(BaseModel):
    """Complete sanitized context payload emitted past the client privacy boundary."""
    page: Optional[SanitizedPage] = Field(None, description="Sanitized page metadata")
    task: Optional[str] = Field(None, description="Original user task")
    intent: Optional[str] = Field(None, description="Classified task intent e.g. OPEN_ELEMENT")
    elements: List[SanitizedElement] = Field(default_factory=list, description="List of sanitized elements")
    images: Optional[List[SanitizedImage]] = Field(default_factory=list, description="Permitted or selectively redacted images")
    decisionsSummary: Optional[DecisionsSummary] = Field(None, description="Metrics on privacy decisions")


class AgentRequest(BaseModel):
    """Top-level agent endpoint request containing task, sanitized context, and step history."""
    task: str = Field(..., description="User's goal/instruction for the browser agent")
    context: SanitizedContext = Field(..., description="Minimum-disclosure sanitized webpage context")
    previous_steps: Optional[List[StepRecord]] = Field(default_factory=list, description="Previous steps taken in this session")
