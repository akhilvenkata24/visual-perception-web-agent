import json
import urllib.request
import time

import base64

with open("scratch/test_img.jpg", "rb") as f:
    SAMPLE_JPEG_DATA_URL = f"data:image/jpeg;base64,{base64.b64encode(f.read()).decode('utf-8')}"

def run_query(test_name, task, intent, images, elements):
    url = "http://127.0.0.1:8000/agent/plan"
    payload = {
        "task": task,
        "context": {
            "page": {
                "url": "https://unknown-arbitrary-domain.org/profile",
                "title": "Arbitrary Unknown Page",
                "viewport": {"width": 1280, "height": 800}
            },
            "task": task,
            "intent": intent,
            "elements": elements,
            "images": images,
            "decisionsSummary": {
                "totalEntities": 2,
                "allowCount": 1,
                "maskCount": 1,
                "tokenizeCount": 0,
                "localOnlyCount": 0,
                "blockCount": 0
            }
        },
        "previous_steps": []
    }

    print(f"\n==========================================")
    print(f"Running Test: {test_name}")
    print(f"Task: \"{task}\" (Intent: {intent})")
    print(f"Attached Images: {[img['id'] for img in images]}")
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    try:
        t0 = time.time()
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            elapsed = time.time() - t0
            print(f"Status: {resp.status} (took {elapsed:.2f}s)")
            print(f"Action: {data.get('action', {}).get('action')}")
            print(f"Answer: {data.get('action', {}).get('answer') or data.get('action', {}).get('reasoning')}")
            return True, data
    except Exception as e:
        print(f"Error: {e}")
        return False, str(e)

if __name__ == "__main__":
    # Test 1: Full Viewport Screenshot for Form Fields Query
    success1, res1 = run_query(
        test_name="Unknown Webpage - Form Fields Query with Viewport Screenshot",
        task="What are all the fields present in the form?",
        intent="LIST_FORM_FIELDS",
        images=[{
            "id": "viewport_screenshot",
            "dataUrl": SAMPLE_JPEG_DATA_URL,
            "mimeType": "image/jpeg",
            "description": "Live viewport screenshot with selective in-browser privacy redactions (sensitive values blurred)"
        }],
        elements=[
            {"id": "f_name", "type": "input", "tagName": "input", "label": "Full Name", "role": "textbox"},
            {"id": "f_dob", "type": "input", "tagName": "input", "label": "Date of Birth", "role": "textbox"},
            {"id": "f_ssn", "type": "input", "tagName": "input", "label": "Social Security No", "role": "textbox"},
            {"id": "f_email", "type": "input", "tagName": "input", "label": "Email Address", "role": "textbox"},
        ]
    )

    time.sleep(2)

    # Test 2: Full Viewport Screenshot for General Attire / Clothing Query
    success2, res2 = run_query(
        test_name="Unknown Webpage - Person Identity Task with Viewport Screenshot",
        task="Who is the person in this image?",
        intent="IDENTIFY_PERSON",
        images=[{
            "id": "viewport_screenshot",
            "dataUrl": SAMPLE_JPEG_DATA_URL,
            "mimeType": "image/jpeg",
            "description": "Live viewport screenshot with unblurred face for identity task"
        }],
        elements=[
            {"id": "lbl_portrait", "type": "heading", "tagName": "h2", "label": "Visual Celebrity Portrait", "role": "heading"}
        ]
    )

    print("\n==========================================")
    print("All live viewport screenshot tests completed!")
