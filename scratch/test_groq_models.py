import httpx
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv("server/.env")
api_key = os.getenv("GROQ_API_KEY")

prompt = """You are an autonomous browser agent. Your job is to achieve the user's goal by deciding the next browser action or providing the final answer.

DECISION PROTOCOL:
1. If the user wants information that is hidden behind buttons (like "View Profile"), your immediate step is to output {"action": "click", "element_id": "<button_id>", "reasoning": "..."}.
2. ONLY when all requested info is visible, output {"action": "none", "answer": "...", "reasoning": "..."}.

OUTPUT SCHEMA (JSON ONLY):
{
  "action": "click" | "none",
  "element_id": string | null,
  "value": string | null,
  "reasoning": string,
  "answer": string | null
}
"""

user_content = """USER TASK: Open Rahul's profile and Priya's profile and give me what's in their bio's
CLASSIFIED INTENT: OPEN_ELEMENT

SANITIZED PAGE ELEMENTS (CURRENT STATE):
[
  {
    "id": "name_rahul",
    "type": "heading",
    "label": "Rahul Sharma",
    "role": "heading",
    "accessibleName": "Rahul Sharma"
  },
  {
    "id": "btn_profile_rahul",
    "type": "button",
    "label": "View Profile",
    "role": "button",
    "accessibleName": "View profile of Rahul Sharma"
  },
  {
    "id": "name_priya",
    "type": "heading",
    "label": "Priya Nair",
    "role": "heading",
    "accessibleName": "Priya Nair"
  },
  {
    "id": "btn_profile_priya",
    "type": "button",
    "label": "View Profile",
    "role": "button",
    "accessibleName": "View profile of Priya Nair"
  }
]
"""

models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "groq/compound-mini",
    "openai/gpt-oss-20b"
]

async def main():
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=15.0) as client:
        for m in models:
            print(f"\n--- Testing model: {m} ---")
            body = {
                "model": m,
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": user_content}
                ],
                "response_format": {"type": "json_object"},
                "temperature": 0.1
            }
            try:
                res = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
                print("Status:", res.status_code)
                if res.status_code == 200:
                    print("Output:", res.json()["choices"][0]["message"]["content"])
                else:
                    print("Error:", res.text[:200])
            except Exception as e:
                print("Exception:", e)

asyncio.run(main())
