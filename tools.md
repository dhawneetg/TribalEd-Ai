# Tools & Technology Architecture

**Project:** AI-Enabled MoTA Scholarship Platform  
**System Classification:** Enterprise GovTech / AI Scrutiny Engine

---

## 1. Frontend & Client Workspace

| Technology | Purpose | Specification / Justification |
| :--- | :--- | :--- |
| **Next.js (React 19)** | Unified Portal Framework | Server Components for rapid officer dashboards, Client components for reactive forms. |
| **Tailwind CSS** | Styling Engine | Configured with Cohere design tokens (22px card radiuses, custom slate palettes, minimal hairlines). |
| **Lucide Icons** | Iconography | Clean, stroke-based iconography (1.5px stroke weight). |
| **Framer Motion** | Micro-Interactions | Subtle transitions for modals, split-screen panels, and progress meters. |
| **PDF.js / React-PDF** | Document Viewer | High-resolution canvas rendering for side-by-side officer scrutiny. |
| **Zustand / TanStack Query** | State & Server Sync | Optimistic UI updates during scrutiny reviews and applicant tracking. |

---

## 2. Backend & Microservices

| Technology | Purpose | Specification / Justification |
| :--- | :--- | :--- |
| **FastAPI (Python 3.11)** | Core REST & AI API | High-throughput async processing for file uploads and machine learning pipelines. |
| **Celery + Redis** | Background Queue | Asynchronous job runner for document OCR, tamper analysis, and email/SMS triggers. |
| **Node.js / Express** *(Alt Microservice)* | Gateway & Notifications | Webhook ingestion and WebSocket notification dispatch for live status changes. |
| **JSON-Rules-Engine** | Rule Processing | Declarative, schema-driven evaluation of NFST and NOS qualification parameters. |

---

## 3. Artificial Intelligence & Document Intelligence

| Component | Library / Model | Role in Solution |
| :--- | :--- | :--- |
| **OCR Extraction** | **PaddleOCR / EasyOCR** | High-precision trilingual text recognition (English, Hindi, regional scripts) on Indian government docs. |
| **Entity Extraction** | **LayoutLMv3 (Fine-tuned)** | Key-value pair extraction from unstructured certificates (Issuing Date, Tehsildar Name, Caste Category). |
| **Image Forensics** | **OpenCV + ELA Engine** | Error Level Analysis to detect pixel compression disparities indicating cloned text or altered figures. |
| **Fuzzy Matching** | **RapidFuzz / Jellyfish** | Jaro-Winkler and Levenshtein algorithms to normalize minor name misalignments across documents. |
| **LLM Summarizer / Helper** | **Cohere / Gemini API** | Natural language synthesis of application deficiencies into clear, respectful, regional-language instructions. |

---

## 4. Data Layer & Infrastructure

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Primary Database** | **PostgreSQL 16** | Relational integrity with JSONB fields for dynamic scheme forms and eligibility criteria. |
| **Object Storage** | **MinIO (S3 Compatible)** | Secure, encrypted storage of applicant certificates, marksheets, and supervisor reports. |
| **Cache & Session** | **Redis 7.2** | Rate limiting, session persistence, and Celery job broker. |
| **Containerization** | **Docker & Docker Compose** | Multi-container setup for one-command hackathon judging replication. |

---

## 5. Mock Integrations & External Gateways

* **DigiLocker Mock API:** Simulates OAuth2 token exchange and pull of verified Aadhaar & Caste Certificate XMLs.
* **PFMS (Public Financial Management System) Mock:** Generates structured XML payment advice files for DBT stipend releases.
* **Twilio / Mock SMS & WhatsApp Gateway:** Instant alert delivery for micro-deficiency notifications with deep-links.