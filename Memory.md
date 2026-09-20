# Project Memory & Architectural Context

**Problem Statement:** SIH ID 26239 - AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes (MoTA)

---

## 1. Architectural Decision Records (ADRs)

### ADR-001: Hybrid Document Verification (Deterministic First, AI Second)
- **Context:** OCR engines can make errors on low-quality rural certificate scans.
- **Decision:** Use DigiLocker API tokens as primary source of truth. When DigiLocker is available, document verification is instant and $100\%$ trusted. PaddleOCR + LayoutLMv3 are reserved for un-digitized regional legacy certificates with a mandatory Human-in-the-Loop split screen for confidence scores below $95\%$.

### ADR-002: Dynamic JSON Schema for Multi-Scheme Administration
- **Context:** MoTA administers multiple schemes (NFST, NOS) with diverging criteria, income thresholds, and age cutoffs that change annually via government gazette notifications.
- **Decision:** Instead of hardcoding conditions in database tables, define scheme qualification rules in declarative JSON Schema configurations loaded into a centralized rule execution service.

### ADR-003: Micro-Deficiency Lifecycle
- **Context:** Traditional portals reject entire forms for a single blurry document, forcing applicants to restart.
- **Decision:** Treat deficiencies at the individual document level (`App_Documents`), preserving overall application state. Applicants receive targeted SMS/WhatsApp deep-links directly opening the correction uploader for that single file.

---

## 2. Cohere Design System Guidelines (for UI Implementation)

- **Border Radius:** Primary containers, cards, and dialogue modals must use `rounded-[22px]`.
- **Color Palette:**
  - Background: `#fbfbfb` / `#ffffff` (Clean editorial canvas)
  - Surface Borders: `#ececeb` / `#f2f2f2` (Subtle hairlines)
  - Text Primary: `#18181b` (High legibility charcoal)
  - Text Secondary: `#71717a` (Muted zinc)
  - Brand Accent: `#1863dc` (Interaction Blue)
  - Success Badge: `#10b981` (Subtle emerald fill with green border)
  - Warning Badge: `#f59e0b` (Warm amber)
- **Ergonomics:** Officer Scrutiny UI must feature a high-density, 50/50 dual pane layout: Left side canvas-based PDF inspector (with zoom, rotate, and contrast filters), Right side editable metadata form with colored confidence chips.

---

## 3. Glossary & Acronyms

- **MoTA:** Ministry of Tribal Affairs
- **NFST:** National Fellowship for Scheduled Tribe Students (M.Phil / Ph.D. in India)
- **NOS:** National Overseas Scholarship (Master's / Ph.D. abroad)
- **DBT:** Direct Benefit Transfer
- **PFMS:** Public Financial Management System
- **ELA:** Error Level Analysis (Digital image tampering detection)
- **LPA:** Lakhs Per Annum (INR currency denomination)