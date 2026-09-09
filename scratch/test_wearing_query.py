import io
import base64
import requests
from PIL import Image, ImageFilter

im = Image.open('img2.png').convert('RGB')
w, h = im.size

# Apply local blur to face region only (top ~32% head region)
face_box = (int(w * 0.25), int(h * 0.08), int(w * 0.75), int(h * 0.40))
cropped_face = im.crop(face_box)
blurred_face = cropped_face.filter(ImageFilter.GaussianBlur(radius=12))
im.paste(blurred_face, face_box)

buf = io.BytesIO()
im.save(buf, format='JPEG', quality=85)
b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
data_url = f'data:image/jpeg;base64,{b64}'

payload = {
    'task': 'what is the person wearing in this image?',
    'context': {
        'page': {'url': 'http://localhost:8080/cv_test.html', 'title': 'CV Test Lab'},
        'task': 'what is the person wearing in this image?',
        'intent': 'READ_INFORMATION',
        'elements': [
            {'id': 'img2', 'type': 'image', 'tagName': 'IMG', 'label': '[Selectively Redacted Image with Blurred Face]', 'role': 'img'}
        ],
        'images': [
            {'id': 'img2', 'dataUrl': data_url, 'mimeType': 'image/jpeg', 'description': 'Selectively redacted image with blurred face'}
        ]
    },
    'previous_steps': []
}

res = requests.post('http://127.0.0.1:8000/agent/plan', json=payload, timeout=25.0)
print('STATUS:', res.status_code)
print('ACTION:', res.json()['action'])
