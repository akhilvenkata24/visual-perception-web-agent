import httpx
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv("server/.env")
api_key = os.getenv("GROQ_API_KEY")

async def test_groq_vision():
    # 1x1 white pixel png base64
    tiny_png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    
    models = [
        "llama-3.2-11b-vision-preview",
        "llama-3.2-90b-vision-preview",
        "groq/compound-mini",
        "openai/gpt-oss-20b"
    ]
    
    async with httpx.AsyncClient(timeout=15.0) as client:
        for m in models:
            print(f"\n--- Testing vision on model: {m} ---")
            body = {
                "model": m,
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
            try:
                res = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
                print("Status:", res.status_code)
                if res.status_code == 200:
                    print("Output:", res.json()["choices"][0]["message"]["content"][:100])
                else:
                    print("Error:", res.text[:200])
            except Exception as e:
                print("Exception:", e)

asyncio.run(test_groq_vision())
