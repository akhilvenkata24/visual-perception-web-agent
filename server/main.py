"""
Privacy-Preserving Browser Agent — FastAPI Backend Foundation (Phase 6)
Main application entry point.
"""

import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from server.routes.agent import router as agent_router

# Load environment variables
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("server.main")

app = FastAPI(
    title="Privacy Browser Agent API",
    description="FastAPI backend foundation for privacy-preserving browser vision agent. Receives client-sanitized context and produces structured actions.",
    version="0.6.0"
)

# Configure restrictive development CORS middleware
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits local Chrome extension origins during development
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Include routes
app.include_router(agent_router)


@app.get(
    "/health",
    status_code=status.HTTP_200_OK,
    tags=["System Health"],
    summary="Basic backend health check"
)
async def health_check():
    """Returns basic status for verifying that the backend service is running."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    logger.info(f"🚀 Starting Privacy Browser Agent FastAPI backend at http://{host}:{port}")
    uvicorn.run("server.main:app", host=host, port=port, reload=True)
