import os
import json
import base64
from dotenv import load_dotenv

load_dotenv('server/.env')
api_key = os.getenv('GEMINI_API_KEY')

if not api_key:
    print("No GEMINI_API_KEY")
    exit(0)

try:
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)
    with open('img2.png', 'rb') as f:
        img_bytes = f.read()

    image_part = types.Part.from_bytes(data=img_bytes, mime_type='image/png')
    prompt = 'Who is the person in this image?'
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[prompt, image_part],
        config=types.GenerateContentConfig(temperature=0.1)
    )
    print("Gemini Response:", response.text)
except Exception as e:
    print("Gemini Error:", e)
