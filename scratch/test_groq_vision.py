import os
import httpx
import json
import base64
from dotenv import load_dotenv

load_dotenv('server/.env')
api_key = os.getenv('GROQ_API_KEY')

with open('img2.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')
data_url = f'data:image/png;base64,{b64}'

headers = {'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}
body = {
    'model': 'qwen/qwen3.6-27b',
    'messages': [
        {
            'role': 'system',
            'content': 'You are an autonomous browser agent. Respond with ONLY valid JSON wrapped in ```json ... ``` with schema:\n{"action": "none"|"click", "element_id": null|string, "answer": string|null, "reasoning": string}'
        },
        {
            'role': 'user',
            'content': [
                {'type': 'text', 'text': 'USER TASK: Who is the person in this image? Provide direct name and answer.'},
                {'type': 'image_url', 'image_url': {'url': data_url}}
            ]
        }
    ],
    'temperature': 0.1,
    'max_tokens': 450
}

res = httpx.post('https://api.groq.com/openai/v1/chat/completions', headers=headers, json=body, timeout=25.0)
print('Status:', res.status_code)
print('Response:', res.text)
