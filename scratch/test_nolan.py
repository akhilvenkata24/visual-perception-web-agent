import httpx
import os
import json
import base64
import asyncio
from dotenv import load_dotenv

load_dotenv("server/.env")
api_key = os.getenv("GROQ_API_KEY")

with open("img2.png", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode("utf-8")
    data_url = f"data:image/png;base64,{img_b64}"

async def test_nolan():
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    body = {
        "model": "qwen/qwen3.6-27b",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Who is the person in this image? Respond with the person's full name and occupation in JSON format: {\"name\": string, \"occupation\": string}"},
                    {"type": "image_url", "image_url": {"url": data_url}}
                ]
            }
        ],
        "response_format": {"type": "json_object"},
        "max_tokens": 200
    }
    async with httpx.AsyncClient(timeout=25.0) as client:
        res = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
        print("Status:", res.status_code)
        if res.status_code == 200:
            print("Output:", res.json()["choices"][0]["message"]["content"])
        else:
            print("Error:", res.text)

asyncio.run(test_nolan())
