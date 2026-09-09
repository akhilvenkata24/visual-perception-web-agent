import asyncio
import os
import base64
from dotenv import load_dotenv
load_dotenv('server/.env')

from server.models.request import SanitizedContext, SanitizedPage, SanitizedElement, SanitizedImage
from server.ai.groq import GroqAIProvider

async def test():
    with open('img2.png', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    data_url = f'data:image/png;base64,{b64}'

    ctx = SanitizedContext(
        page=SanitizedPage(url="http://localhost:8080/cv_test.html", title="CV Test Lab"),
        task="Who is the person in this image?",
        intent="IDENTIFY_PERSON",
        elements=[
            SanitizedElement(id="img2", type="image", tagName="IMG", label="[Visual Image]", role="img")
        ],
        images=[
            SanitizedImage(id="img2", dataUrl=data_url, mimeType="image/png", description="Visual portrait")
        ]
    )

    provider = GroqAIProvider()
    action = await provider.generate_action("Who is the person in this image?", ctx)
    print("ACTION:", action.action)
    print("ANSWER:", action.answer)
    print("REASONING:", action.reasoning)

if __name__ == "__main__":
    asyncio.run(test())
