import httpx
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv("server/.env")
api_key = os.getenv("GROQ_API_KEY")

async def test_qwen_vision():
    tiny_png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    
    body = {
        "model": "qwen/qwen3.6-27b",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What is in this image?"},
                    {"type": "image_url", "image_url": {"url": tiny_png}}
                ]
            }
        ],
        "max_tokens": 100
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            res = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
            print("Status:", res.status_code)
            print("Response:", res.text[:200])
        except Exception as e:
            print("Exception:", e)

asyncio.run(test_qwen_vision())
