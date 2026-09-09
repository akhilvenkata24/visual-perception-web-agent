import requests
import base64

with open('img2.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')
data_url = f'data:image/jpeg;base64,{b64}'

# 1. Test Celebrity Query
res1 = requests.post('http://127.0.0.1:8000/agent/plan', json={
    'task': "Who's the person in this image?",
    'context': {
        'page': {'url': 'http://localhost:8080/cv_test.html', 'title': 'CV Test Lab'},
        'task': "Who's the person in this image?",
        'intent': 'IDENTIFY_PERSON',
        'elements': [
            {'id': 'img2', 'type': 'image', 'tagName': 'IMG', 'label': '[Visual Image]', 'role': 'img'}
        ],
        'images': [
            {'id': 'img2', 'dataUrl': data_url, 'mimeType': 'image/jpeg', 'description': 'Visual portrait'}
        ]
    },
    'previous_steps': []
}, timeout=20.0)

print('TEST 1 (Celebrity):', res1.json()['action'])

# 2. Test Form Fields Query
res2 = requests.post('http://127.0.0.1:8000/agent/plan', json={
    'task': 'What are all the fields present in the form?',
    'context': {
        'page': {'url': 'http://localhost:8080/cv_test.html', 'title': 'CV Test Lab'},
        'task': 'What are all the fields present in the form?',
        'intent': 'LIST_FORM_FIELDS',
        'elements': [
            {'id': 'ocr_1', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'MEMBERSHIP ENROLLMENT APPLICATION', 'role': 'text'},
            {'id': 'ocr_2', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Full Name:', 'role': 'text'},
            {'id': 'ocr_3', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Date of Birth:', 'role': 'text'},
            {'id': 'ocr_4', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Social Security No:', 'role': 'text'},
            {'id': 'ocr_5', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Email Address:', 'role': 'text'},
            {'id': 'ocr_6', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Phone Number:', 'role': 'text'},
            {'id': 'ocr_7', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Home Address:', 'role': 'text'},
            {'id': 'ocr_8', 'type': 'ocr_text', 'tagName': 'ocr_text', 'label': 'Annual Income:', 'role': 'text'}
        ],
        'images': []
    },
    'previous_steps': []
}, timeout=20.0)

print('TEST 2 (Form Fields):', res2.json()['action'])
