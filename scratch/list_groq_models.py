import httpx
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv("server/.env")
api_key = os.getenv("GROQ_API_KEY")

async def get_models():
    headers = {"Authorization": f"Bearer {api_key}"}
    async with httpx.AsyncClient() as client:
        res = await client.get("https://api.groq.com/openai/v1/models", headers=headers)
        if res.status_code == 200:
            models = [m["id"] for m in res.json()["data"]]
            print("Available Groq Models:\n", json.dumps(models, indent=2))
        else:
            print("Error:", res.text)

asyncio.run(get_models())
