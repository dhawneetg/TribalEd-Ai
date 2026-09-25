# System Architecture

This document defines the high-level system topology, data flow, document intelligence pipeline, and security boundaries.

---

## 1. High-Level System Topology

```
+-------------------------------------------------------------------------------------------------+
|                                    PRESENTATION TIER                                            |
|                                                                                                 |
|   +---------------------------------------+         +---------------------------------------+   |
|   |         Applicant Web PWA             |         |     MoTA Officer Scrutiny Console     |   |
|   |  - DigiLocker SSO / Multi-Lingual     |         |  - Split-screen OCR Verification      |   |
|   |  - Micro-Deficiency Resolution        |         |  - Dynamic Rule Engine Configuration  |   |
|   |  - Post-Selection Milestone Tracker   |         |  - DBT / PFMS Batch Execution         |   |
|   +---------------------------------------+         +---------------------------------------+   |
+-----------------------------------------------|-------------------------------------------------+
                                                | HTTPS / TLS 1.3
+-----------------------------------------------v-------------------------------------------------+
|                                   APPLICATION / GATEWAY TIER                                    |
|                                                                                                 |
|   +-----------------------------------------------------------------------------------------+   |
|   |                          FastAPI API Gateway & Auth Guard (JWT/RBAC)                    |   |
|   +-----------------------------------------------------------------------------------------+   |
|                 |                                             |                                 |
|                 v                                             v                                 |
|   +---------------------------+                 +---------------------------+                   |
|   |   Application Service     |                 |  Post-Selection Service   |                   |
|   |   - Form intake & states  |                 |  - Milestone progress     |                   |
|   |   - Audit logger          |                 |  - Supervisor approval    |                   |
|   +---------------------------+                 +---------------------------+                   |
|                 |                                             |                                 |
|                 +----------------------+----------------------+                                 |
|                                        | Dispatch Tasks                                         |
|                                        v                                                        |
|   +-----------------------------------------------------------------------------------------+   |
|   |                         Async Message Broker (Redis + Celery)                           |   |
|   +-----------------------------------------------------------------------------------------+   |
+----------------------------------------|--------------------------------------------------------+
                                         |
+----------------------------------------v--------------------------------------------------------+
|                                INTELLIGENCE & PROCESSING TIER                                   |
|                                                                                                 |
|   +------------------------+  +------------------------+  +---------------------------------+   |
|   |  OCR Extraction Unit   |  |   Tamper & ELA Unit    |  |       Rule Engine Executor      |   |
|   |  - PaddleOCR Engine    |  |  - OpenCV Compression  |  |  - JSON Schema Validator        |   |
|   |  - LayoutLMv3 Key-Val  |  |  - Edge Splice Check   |  |  - NFST / NOS Qualification     |   |
|   +------------------------+  +------------------------+  +---------------------------------+   |
+----------------------------------------|--------------------------------------------------------+
                                         |
+----------------------------------------v--------------------------------------------------------+
|                                    PERSISTENCE & STORAGE                                        |
|                                                                                                 |
|   +------------------------------------------+  +-------------------------------------------+   |
|   |       PostgreSQL 16 (Relational DB)      |  |         MinIO Object Storage (S3 API)     |   |
|   |  - Schemas, JSONB Rules, Audit Logs      |  |  - Encrypted PDFs, Scans, Forensic Maps   |   |
|   +------------------------------------------+  +-------------------------------------------+   |
+-------------------------------------------------------------------------------------------------+
```

---

## 2. End-to-End Document Intelligence Pipeline

```
[Uploaded Document (PDF/JPG)]
             |
             v
[Stage 1: Pre-Processing] ------> Deskew, Denoise, Binarize, Resolution Standardize (300 DPI)
             |
             v
[Stage 2: Tamper & Forgery Check]
             |--> Error Level Analysis (ELA) Matrix Generation
             |--> Metadata Check (detect editing software footprints, e.g., Photoshop, Canva)
             |
             v
[Stage 3: OCR & Layout Parsing]
             |--> PaddleOCR / Trilingual Text Extraction (Hindi / English / State Scripts)
             |--> LayoutLMv3 assigns key-value pairs (Name, Caste, Authority, Income)
             |
             v
[Stage 4: Cross-Validation & Fuzzy Match]
             |--> Match Certificate Name vs. Aadhaar Record via Jaro-Winkler metric
             |--> Check Income Amount against configured scheme ceiling
             |
             v
[Stage 5: Confidence Calculation]
             |--> Confidence Score >= 95%: Auto-Approved / Green Tag
             |--> Confidence Score 70-94%: Highlighted for Quick Officer Review
             |--> Confidence Score < 70% or Tampered: Flagged with Specific Deficiency
```

---

## 3. Data Schema & Core Entity Relationships

```
  +------------------+         1:N         +------------------+
  |      Users       | ------------------> |   Applications   |
  |------------------|                     |------------------|
  | id (UUID, PK)    |                     | id (UUID, PK)    |
  | aadhaar_hash     |                     | user_id (FK)     |
  | name             |                     | scheme_id (FK)   |
  | role             |                     | current_stage    |
  | digilocker_id    |                     | merit_score      |
  +------------------+                     | submission_date  |
                                           +------------------+
                                                    | 1:N
                                                    |
                      +-----------------------------+-----------------------------+
                      | 1:N                                                       | 1:N
                      v                                                           v
           +--------------------+                                      +--------------------+
           |  App_Documents     |                                      |   Deficiencies     |
           |--------------------|                                      |--------------------|
           | id (UUID, PK)      |                                      | id (UUID, PK)      |
           | application_id(FK) |                                      | application_id(FK) |
           | doc_type           |                                      | doc_id (FK)        |
           | storage_uri        |                                      | issue_description  |
           | ocr_payload(JSONB) |                                      | deadline_date      |
           | tamper_score       |                                      | status (Open/Done) |
           | verified_status    |                                      +--------------------+
           +--------------------+
```

---

## 4. Security & Compliance Architecture
1. **Zero Raw Aadhaar Storage:** Only salted SHA-256 hashes of Aadhaar numbers are persisted per Section 29 of the Aadhaar Act 2016.
2. **Role-Based Access Control (RBAC):**
   - `Applicant`: Access restricted exclusively to own submissions.
   - `Scrutiny_Officer`: Access limited to assignation queues; cannot alter scheme parameters; dynamic canvas watermarking (Officer ID, IP, Timestamp) prevents data leaks.
   - `Super_Admin`: Can configure rule engine parameters, adjust merit lists, and access audit tables.
3. **Immutable Scrutiny Audit Logs:** Every rejection, manual override, and deficiency alert records timestamp, officer ID, client IP, and rationale in an append-only audit trail (ISO 27001 compliant).

---

## 5. Resilience, Notification & Treasury Subsystems

### A. Gov / CDAC Mobile Seva SMS Gateway (2G Reach)
- **Sender ID:** `VM-MOTAGOI` (TRAI DLT Registered).
- **Function:** Automated 48-Hour Deadline Reminders, 7-Day Micro-Deficiency SMS Alerts, and PFMS DBT Payout confirmations dispatched directly to 2G feature phones without internet dependency.
- **Languages:** Trilingual (English, Hindi, and regional scripts).

### B. Circuit Breaker & Fault Isolation (Hystrix Pattern)
- **Protection Scope:** Third-party integrations (DigiLocker OAuth2, CDAC SMS Gateway, PFMS Treasury Bridge).
- **Behavior:** Automatically trips open when upstream failure rate exceeds 30%, queuing student submissions for asynchronous retry without frontend timeouts.

### C. PFMS & NPCI APB Treasury Bridge
- Direct Benefit Transfer (DBT) highway connecting state and central treasuries to student Aadhaar-seeded bank accounts.
- Direct ISO 20022 XML batch payouts, eliminating intermediary commission leaks and ghost beneficiaries.

### D. Observability, Telemetry & Audit Stream
- **Metrics:** Prometheus collecting P95 latency (<= 180ms SLA), request throughput, error budgets.
- **Distributed Tracing:** OpenTelemetry tracing requests end-to-end across Ingress, Gateway, Celery Workers, and S3.
- **Dashboards:** Real-time Grafana monitoring for CERT-In 6-hour incident readiness.