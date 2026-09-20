# Implementation Phases & Milestones

**Target Delivery:** Smart India Hackathon Prototype & Final Working Build

---

## Phase 1: Foundation & Core Identity (Day 1 - Hours 00 to 08)
- [x] Repository initialization, project directory scaffolding, and Docker setup.
- [x] Database schema initialization (SQLAlchemy entities: `users`, `applications`, `app_documents`, `deficiencies`, `audit_logs`).
- [x] Implement Cohere Design System tokens in Tailwind CSS v4 (Palette: Cohere Black, Interaction Blue, 22px cards, button pills).
- [x] Mock DigiLocker OAuth2 workflow and Aadhaar verification simulation with 100% trust level.
- [x] Applicant registration and multi-step form wizard (NFST & NOS initial intake).

## Phase 2: Document AI & Verification Pipeline (Day 1 - Hours 09 to 20)
- [ ] Build file upload handler with MinIO storage adapter.
- [ ] Integrate OCR engine (PaddleOCR / EasyOCR) for English and Hindi text extraction.
- [ ] Develop Key-Value extraction module for:
  - ST Caste Certificate (Issuing Authority, Category, Candidate Name).
  - Income Certificate (Financial Year, Total Gross Income).
  - Academic Transcripts (Marks percentage, Degree Title).
- [ ] Implement OpenCV Error Level Analysis (ELA) for image forgery and tamper detection.
- [ ] Develop fuzzy matching service (Jaro-Winkler) comparing document identities.

## Phase 3: Rule Engine & Human-in-the-Loop Scrutiny (Day 2 - Hours 21 to 28)
- [ ] Implement declarative JSON-Rules-Engine for NFST and NOS criteria.
- [ ] Build Scrutiny Officer Split-Screen Workspace:
  - Left pane: Interactive PDF/Image viewer with zoom & pan.
  - Right pane: Structured data fields with Confidence Badges (Green/Amber/Red).
- [ ] Single-click deficiency logging mechanism with auto-generated contextual remarks.
- [ ] Real-time notification dispatch (mock SMS and WhatsApp message logs).

## Phase 4: Post-Selection Governance & Analytics (Day 2 - Hours 29 to 34)
- [ ] Build Applicant Deficiency Remediation screen (targeted re-upload without refilling forms).
- [ ] Implement Post-Selection Fellowship Hub:
  - Bi-annual research progress submission for NFST.
  - University admission & visa verification for NOS.
  - Mock PFMS Direct Benefit Transfer (DBT) disbursement batch generator.
- [ ] Executive MoTA Analytics Dashboard:
  - Heatmap of applications across Scheduled Areas / States.
  - Verification bottleneck turnaround analytics.
  - Fund disbursement summary meters.

## Phase 5: Hardening, E2E Testing & Presentation Prep (Day 2 - Hours 35 to 36)
- [ ] End-to-end integration test of the "Golden Path" (DigiLocker auto-verification).
- [ ] Prepare test edge cases (Tampered certificate test, non-eligible income test).
- [ ] Populate database with realistic demo datasets for both NFST and NOS schemes.
- [ ] Deploy live instance and test low-bandwidth mobile responsive view.