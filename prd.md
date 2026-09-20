# Product Requirements Document (PRD)

**Project Name:** AI-Enabled Scholarship and Fellowship Management System  
**Problem Statement ID:** 26239  
**Ministry / Department:** Ministry of Tribal Affairs (MoTA), Government of India  
**Target Schemes:** National Fellowship for Scheduled Tribe (NFST) & National Overseas Scholarship (NOS)  
**Theme:** Smart Education  
**Design Reference:** Cohere Design System (Editorial typography, 22px border radius, calm neutral slate palettes, subtle micro-borders, accessible interaction blue)

---

## 1. Executive Summary & Problem Context
The Ministry of Tribal Affairs (MoTA) disburses vital financial assistance to Scheduled Tribe (ST) scholars for domestic research (M.Phil/Ph.D. under NFST) and premier international universities (Masters/Ph.D. under NOS). 

Currently, administration is slowed down by:
- **Manual document scrutiny** across diverse state certificate issuing formats.
- **Repeated deficiency loops** with non-transparent rejection cycles.
- **Disconnected post-selection tracking** (stalled thesis milestones, manual invoice claims, and lack of automated Direct Benefit Transfer reconciliation).

**Solution:** An end-to-end, multi-tenant digital platform orchestrating applicant self-service, AI-assisted document verification, dynamic scheme rule execution, interactive deficiency resolution, and post-selection fellowship lifecycle governance.

---

## 2. Target Personas & User Journeys

| Persona | Role | Key Jobs to be Done |
| :--- | :--- | :--- |
| **ST Applicant** | Candidate (Rural/Urban ST Scholar) | Authenticate with DigiLocker/Aadhaar, receive instant document validation, auto-fill data, track application progression, and clear micro-deficiencies. |
| **Scrutiny Officer** | Desk Scrutineer (MoTA/NIC) | Inspect side-by-side extracted OCR fields vs. scans, verify tamper alerts, trigger single-click deficiency notices, and validate academic scorecards. |
| **Selection Board / Admin** | Senior MoTA Director / Reviewer | Dynamically adjust scheme eligibility matrices, generate merit rankings, allocate budget caps, and sign off on provisional award lists. |
| **University Guide / Nodal Officer** | Research Supervisor / Overseas Liaison | Verify bi-annual progress reports, confirm university registration continuation, and endorse contingency expense claims. |

---

## 3. Core Product Capabilities & Functional Requirements

### 3.1 Applicant Portal & Digital Onboarding
- **FR-101 (Multi-Auth & KYC):** Direct sign-in via Aadhaar OTP and DigiLocker SSO. If DigiLocker documents (Caste/Aadhaar) are imported, mark as "Pre-Verified" ($100\%$ confidence).
- **FR-102 (Voice & Multi-Lingual Guidance):** Multilingual form hints (English, Hindi, and regional tribal dialects where accessible) with audio tooltips for field requirements.
- **FR-103 (Micro-Deficiency Remediation):** Targeted re-upload wizard. Applicants do not re-submit the whole application; they are served deep-links only to the flagged document with specific remediation remarks.

### 3.2 AI Document Verification & Tamper Detection Engine
- **FR-201 (Trilingual OCR & Parsing):** Extract name, father's name, caste sub-group, issuing authority, certificate serial number, validity dates, and financial figures from ST Certificates, Income Certificates, and Transcripts (English, Hindi, Devanagari script variants).
- **FR-202 (Forgery & Splice Detection):** Error Level Analysis (ELA) and metadata heuristic validation to detect digitally modified marks, modified income numbers, or spoofed stamps.
- **FR-203 (Fuzzy Identity Matching):** Implement Levenshtein-distance and phonetic token matching across Aadhaar names and academic transcripts to accommodate surname inversions and tribal honorifics.

### 3.3 Dynamic Scheme Rule Engine
- **FR-301 (NFST Rule Configuration):** Configurable parameters for UGC/CSIR-NET qualification status, regular admission verification in recognized Indian Universities, age caps ($\le 36$ for men, $\le 41$ for women/transgender candidates), and annual family income caps ($\le \text{INR } 6.0\text{ LPA}$).
- **FR-302 (NOS Rule Configuration):** Parameters for QS World Ranking cut-off (universities ranked $\le 500$), minimum $60\%$ marks in qualifying degree, candidate age ($\le 35$ years), and strict income ceiling ($\le \text{INR } 8.0\text{ LPA}$).
- **FR-303 (Automated Scoring Matrix):** Compute ranking points dynamically based on degree marks, institute tier, and hardship indicators, yielding an auditable score card for each applicant.

### 3.4 Scrutiny Officer Ergonomics (Human-in-the-Loop)
- **FR-401 (Split-Screen Scrutiny Workspace):** Left pane renders original PDF/image with zoom, rotation, and bounding-box overlays; right pane displays structured OCR fields with confidence meters ($\ge 95\%$ Green, $70-94\%$ Amber, $<70\%$ Red).
- **FR-402 (One-Click Deficiency Dispatch):** Standardized deficiency templates sent via SMS, WhatsApp, and email with strict countdown timers (default 7 days).

### 3.5 Post-Selection & Fellowship Lifecycle
- **FR-501 (Milestone & Progress Tracking):** NFST bi-annual progress reporting signed off digitally by research guides; NOS visa status, airfare claims, university joining reports.
- **FR-502 (Mock PFMS / DBT Reconciliation):** Direct Benefit Transfer batch creation, payment milestone tracking (Monthly HRA, Stipend, Contingency), and failure-retry logging.

---

## 4. Non-Functional Requirements (NFRs)

* **Performance:** Document parsing response time $\le 3.5\text{ seconds}$ per uploaded document; dashboard data tables load within $800\text{ ms}$.
* **Security & Privacy:** Data encryption at rest (AES-256) and in transit (TLS 1.3); complete PII masking of Aadhaar numbers compliant with Indian Aadhaar Act regulations.
* **Auditability:** Append-only database audit log for every officer decision, state shift, and manual score modification.
* **Accessibility:** WCAG 2.1 AA compliance; color contrast ratios $\ge 4.5:1$; full keyboard navigation support.