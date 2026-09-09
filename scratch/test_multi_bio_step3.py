import httpx
import json
import asyncio

async def test():
    url = "http://127.0.0.1:8000/agent/plan"
    payload = {
        "task": "Open Rahul's profile and Priya's profile and give me what's in their bio's",
        "context": {
            "page": {"title": "Employee Directory", "url": "http://localhost:8080/index.html"},
            "intent": "OPEN_ELEMENT",
            "elements": [
                {
                    "id": "name_rahul",
                    "tagName": "H2",
                    "type": "heading",
                    "label": "Rahul Sharma",
                    "role": "heading",
                    "accessibleName": "Rahul Sharma"
                },
                {
                    "id": "bio_rahul",
                    "tagName": "P",
                    "type": "paragraph",
                    "label": "Rahul is a senior software engineer specializing in frontend architecture and privacy-preserving systems.",
                    "role": "paragraph",
                    "accessibleName": "Bio of Rahul Sharma"
                },
                {
                    "id": "name_priya",
                    "tagName": "H2",
                    "type": "heading",
                    "label": "Priya Nair",
                    "role": "heading",
                    "accessibleName": "Priya Nair"
                },
                {
                    "id": "bio_priya",
                    "tagName": "P",
                    "type": "paragraph",
                    "label": "Priya is a product designer passionate about user-centric accessibility and visual privacy patterns.",
                    "role": "paragraph",
                    "accessibleName": "Bio of Priya Nair"
                }
            ]
        },
        "previous_steps": [
            {
                "step": 1,
                "action": "click",
                "element_id": "btn_profile_rahul",
                "result_summary": "Clicked element 'btn_profile_rahul' successfully."
            },
            {
                "step": 2,
                "action": "click",
                "element_id": "btn_profile_priya",
                "result_summary": "Clicked element 'btn_profile_priya' successfully."
            }
        ]
    }
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.post(url, json=payload)
        print("Status:", r.status_code)
        data = r.json()
        print("Step 3 Action:", json.dumps(data, indent=2))

asyncio.run(test())
