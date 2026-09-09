# Privacy-Preserving Browser Vision Agent

A multimodal, privacy-preserving AI browser agent that executes complex web tasks with zero unauthorized PII leakage. The agent orchestrates local in-browser perception (DOM/ARIA, Tesseract OCR, ONNX Computer Vision), evaluates context-aware privacy policies, applies selective Gaussian blurring to sensitive viewport regions in-browser, and communicates with a FastAPI + Gemini multimodal backend.

---

## 🌟 Key Architecture & Capabilities

1. **Local-First Multimodal Perception**:
   - **DOM & ARIA Perception**: Semantic element extraction, ARIA role mapping, and deep Shadow DOM traversal for modern Web Components.
   - **Local Tesseract OCR**: In-browser client-side optical character recognition with worker pooling.
   - **Computer Vision (ONNX Runtime Web)**: Local WebGPU/WASM visual entity detection (faces, signatures, ID badges).
   - **Live Viewport Perception**: Captures visible browser viewport, fuses coordinate bounding boxes across all modalities, and applies targeted in-browser Gaussian blurring before transmitting to the AI.

2. **Context-Aware Privacy Engine**:
   - Deterministic task intent classification (`IDENTIFY_PERSON`, `LIST_FORM_FIELDS`, `READ_INFORMATION`, `OPEN_ELEMENT`, etc.).
   - Multi-tier privacy actions: `ALLOW`, `MASK`, `TOKENIZE`, `LOCAL_ONLY`, `BLOCK`.
   - Identity face preservation: Facial identity is kept intact for identity tasks while redacting unrelated personal data.
   - Selective feature redaction: Blurs faces for attire/clothing/scene inspection tasks while keeping targets 100% visible.
   - Pre-transmission string scanning to guarantee zero raw prohibited PII leaves the client.

3. **Autonomous Multi-Step Agent Loop**:
   - Closed-loop perceive-plan-act loop with step budgets.
   - Local Action Firewall validating remote action safety and unobserved element hallucination protection.
   - Realistic synthetic event dispatching (`pointerdown` -> `mousedown` -> `pointerup` -> `mouseup` -> `click`) across modern SPAs (React, Vue, Angular).

4. **Interactive Privacy Debug Panel**:
   - Real-time decision counters, intent breakdown, policy decision audit logs, and live preview of the exact redacted/unredacted viewport screenshot transmitted to the AI.

---

## 📁 Repository Structure

```
├── extension/                  # Chrome Manifest V3 Extension (React + TypeScript + Vite)
│   ├── src/
│   │   ├── agent/             # Agent loop, Action Firewall, Action Executor
│   │   ├── content/           # Content script, DOM & Shadow DOM extractor
│   │   ├── perception/        # OCR, Vision (ONNX), Image Redaction, Perception Manager
│   │   ├── popup/             # React Popup UI & Privacy Debug Panel
│   │   └── privacy/           # PII Detector, Context-Aware Policy Engine, Redactor
│   ├── manifest.config.ts     # Extension Manifest V3 configuration
│   └── package.json
├── server/                     # FastAPI Backend
│   ├── ai/                    # Gemini & Groq Multimodal AI Providers
│   ├── models/                # Pydantic request/response schemas
│   ├── routes/                # Agent planning endpoints (/agent/plan)
│   ├── tests/                 # Pytest test suite
│   ├── main.py                # FastAPI entry point
│   └── requirements.txt
├── cv_test.html               # Multi-scenario visual test page
├── index.html                 # Employee directory test page
├── styles.css / app.js        # Test page styling and interactive logic
└── log.txt                    # Detailed phase-by-phase implementation log
```

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)

```bash
cd server
pip install -r requirements.txt
cp .env.example .env
```

Add your Gemini API key in `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```

Start the FastAPI server:
```bash
python -m uvicorn server.main:app --port 8000 --reload
```

### 2. Extension Setup (Chrome MV3)

```bash
cd extension
npm install
npm run build
```

**Load the Extension into Chrome**:
1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (top right toggle).
3. Click **Load unpacked** and select the `extension/dist` directory.

### 3. Running the Test Demo Pages

Serve the root directory locally:
```bash
python -m http.server 8080
```
Open `http://localhost:8080/cv_test.html` or `http://localhost:8080/index.html` in Chrome, click the extension icon, and run tasks!

---

## 🧪 Testing

- **Extension Unit Tests (Vitest)**:
  ```bash
  cd extension
  npx vitest run src/
  ```
  *(62/62 tests passing across 13 test suites)*

- **Backend API Tests (Pytest)**:
  ```bash
  pytest server/tests/
  ```
  *(9/9 tests passing)*
