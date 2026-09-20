# Business & Validation Rules Engine Specification

This specification governs automated validation, scoring, and eligibility determination for MoTA schemes.

---

## 1. NFST (National Fellowship for Scheduled Tribe) Scheme Rules

| Rule Code | Parameter | Criteria / Threshold | Validation Mechanism | Action on Failure |
| :--- | :--- | :--- | :--- | :--- |
| **NFST-R01** | Category | Must belong to Scheduled Tribe (ST) | Caste certificate verified via OCR / DigiLocker | Hard Reject |
| **NFST-R02** | Academic Stage | Registered for regular Full-Time M.Phil or Ph.D. | Admission letter / Supervisor bona fide certificate | Flag for Review |
| **NFST-R03** | Income Ceiling | Total family income $\le \text{INR } 6,00,000\text{ / annum}$ | Income Certificate OCR numerical parsing | Hard Reject |
| **NFST-R04** | Age Cap | Men: $\le 36\text{ yrs}$; Women/Third Gender: $\le 41\text{ yrs}$ | Calculated from DOB on verified ID | Hard Reject |
| **NFST-R05** | Double Benefit | Must not receive any other UGC/CSIR/ICAR fellowship | Applicant self-declaration + Institution check | Flag for Manual Scrutiny |

---

## 2. NOS (National Overseas Scholarship) Scheme Rules

| Rule Code | Parameter | Criteria / Threshold | Validation Mechanism | Action on Failure |
| :--- | :--- | :--- | :--- | :--- |
| **NOS-R01** | Category | Must belong to Scheduled Tribe (ST) | Caste certificate verified via OCR / DigiLocker | Hard Reject |
| **NOS-R02** | Target Course | Master's Degree or Ph.D. abroad | University offer letter parser | Hard Reject |
| **NOS-R03** | University Rank | Institution QS World Ranking $\le 500$ | QS Ranking lookup service | Hard Reject |
| **NOS-R04** | Minimum Marks | $\ge 60\%$ in qualifying Bachelor's/Master's | Transcript OCR parsing & grade conversion | Hard Reject |
| **NOS-R05** | Income Ceiling | Total family income $\le \text{INR } 8,00,000\text{ / annum}$ | Income Certificate validation | Hard Reject |
| **NOS-R06** | Age Cap | Age $\le 35\text{ years}$ as of first day of application year | DOB validation | Hard Reject |

---

## 3. Document AI & Scrutiny Decision Rules

```
IF Document.Origin == "DigiLocker_Verified" THEN
    Set Document.TrustLevel = 1.0 (Bypass manual scrutiny)
    Set Document.Status = "Auto_Approved"

ELSE IF Document.TamperScore > 0.40 THEN
    Set Document.Status = "Flagged_Tampered"
    Emit Deficiency("Potential alteration detected in document image. Re-upload authentic scanned copy.")

ELSE IF OCR.FieldConfidence >= 0.95 AND FuzzyMatch(Doc.Name, User.Name) >= 0.90 THEN
    Set Document.Status = "AI_Verified"
    Populate VerifiedFields

ELSE IF OCR.FieldConfidence < 0.70 OR FuzzyMatch(Doc.Name, User.Name) < 0.80 THEN
    Set Document.Status = "Needs_Manual_Scrutiny"
    RouteTo OfficerQueue(Priority = High)
```

---

## 4. Deficiency Resolution Workflows

1. **Window Duration:** Applicants are granted **7 calendar days** from the timestamp of the deficiency notice to submit rectified documents.
2. **Deficiency Ceiling:** A maximum of **2 deficiency iterations** are permitted per document type before an application moves to "Scrutiny Board Review" for final determination.
3. **Non-Blocking Resubmission:** The applicant's portal only renders the specific inputs requested for correction. All other verified fields remain locked to prevent data corruption.