from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ApplicationCreate, DeficiencyCreate
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/applications", tags=["Applications & Scrutiny"])


def get_initial_seed() -> List[Dict[str, Any]]:
    return [
        {
            "id": "APP-2026-NFST-0842",
            "scheme_id": "NFST",
            "applicant_name": "Ramesh Chandra Munda",
            "gender": "Male",
            "age": 27,
            "caste": "Scheduled Tribe (Munda)",
            "university": "Jawaharlal Nehru University, New Delhi",
            "department": "School of Environmental Sciences",
            "research_topic": "Ethno-botanical Resilience in Chota Nagpur Plateau",
            "income_inr": 240000,
            "current_stage": "UNDER_SCRUTINY",
            "merit_score": 88.5,
            "created_at": "2026-09-18T10:30:00Z",
            "documents": [
                {
                    "id": "DOC-ST-001",
                    "doc_type": "CASTE_CERTIFICATE",
                    "title": "ST Community Certificate",
                    "filename": "munda_caste_cert_jharkhand.pdf",
                    "origin": "DigiLocker_Verified",
                    "trust_level": 1.0,
                    "verified_status": "Auto_Approved",
                    "tamper_score": 0.02,
                    "confidence_score": 1.0,
                    "extracted_fields": {
                        "Name": "Ramesh Chandra Munda",
                        "Father's Name": "Sukhram Munda",
                        "Caste/Tribe": "Munda (ST)",
                        "Issuing Authority": "Sub-Divisional Officer, Khunti",
                        "Issue Date": "12/04/2021",
                        "Serial Number": "JH/ST/2021/98421",
                    },
                },
                {
                    "id": "DOC-INC-002",
                    "doc_type": "INCOME_CERTIFICATE",
                    "title": "Income & Asset Certificate",
                    "filename": "income_cert_torpa_2025.pdf",
                    "origin": "Scanned_Upload",
                    "trust_level": 0.92,
                    "verified_status": "AI_Verified",
                    "tamper_score": 0.04,
                    "confidence_score": 0.94,
                    "extracted_fields": {
                        "Gross Annual Income": "₹ 2,40,000",
                        "Financial Year": "2025-2026",
                        "Issuing Circle": "Circle Officer, Torpa, Khunti",
                        "Validity": "Valid up to 31/03/2027",
                    },
                },
                {
                    "id": "DOC-ADM-003",
                    "doc_type": "PHD_ADMISSION_LETTER",
                    "title": "Ph.D. Confirmation & Bona Fide",
                    "filename": "jnu_phd_admission_letter.pdf",
                    "origin": "Scanned_Upload",
                    "trust_level": 0.82,
                    "verified_status": "Needs_Manual_Scrutiny",
                    "tamper_score": 0.12,
                    "confidence_score": 0.78,
                    "extracted_fields": {
                        "Institution": "Jawaharlal Nehru University",
                        "Enrollment No": "22/54/SES/019",
                        "Category": "Full-Time Research Scholar",
                        "Date of Confirmation": "15/08/2024",
                    },
                },
            ],
            "deficiencies": [],
        },
        {
            "id": "APP-2026-NOS-1109",
            "scheme_id": "NOS",
            "applicant_name": "Sunita Soren",
            "gender": "Female",
            "age": 25,
            "caste": "Scheduled Tribe (Santhal)",
            "university": "University of Oxford, United Kingdom",
            "department": "Department of Computer Science",
            "research_topic": "M.Sc. in Advanced Computer Science (QS Rank: 3)",
            "income_inr": 380000,
            "current_stage": "UNDER_SCRUTINY",
            "merit_score": 92.0,
            "created_at": "2026-09-19T14:15:00Z",
            "documents": [
                {
                    "id": "DOC-ST-004",
                    "doc_type": "CASTE_CERTIFICATE",
                    "title": "Santhal Community Certificate",
                    "filename": "soren_caste_odisha.pdf",
                    "origin": "DigiLocker_Verified",
                    "trust_level": 1.0,
                    "verified_status": "Auto_Approved",
                    "tamper_score": 0.01,
                    "confidence_score": 1.0,
                    "extracted_fields": {
                        "Name": "Sunita Soren",
                        "Caste/Tribe": "Santhal (Scheduled Tribe)",
                        "Issuing District": "Mayurbhanj, Odisha",
                        "Issue Date": "18/02/2022",
                    },
                },
                {
                    "id": "DOC-INC-005",
                    "doc_type": "INCOME_CERTIFICATE",
                    "title": "Tehsildar Annual Income Certificate",
                    "filename": "soren_income_mayurbhanj.pdf",
                    "origin": "Scanned_Upload",
                    "trust_level": 0.95,
                    "verified_status": "AI_Verified",
                    "tamper_score": 0.03,
                    "confidence_score": 0.96,
                    "extracted_fields": {
                        "Gross Annual Income": "₹ 3,80,000",
                        "Financial Year": "2025-2026",
                        "Issuing Authority": "Tehsildar, Baripada",
                    },
                },
                {
                    "id": "DOC-OFR-006",
                    "doc_type": "OVERSEAS_OFFER_LETTER",
                    "title": "Unconditional Admission Offer",
                    "filename": "oxford_offer_unconditional.pdf",
                    "origin": "Digital_PDF",
                    "trust_level": 0.98,
                    "verified_status": "AI_Verified",
                    "tamper_score": 0.01,
                    "confidence_score": 0.97,
                    "extracted_fields": {
                        "University": "University of Oxford",
                        "QS World Rank": "3",
                        "Course": "M.Sc. Advanced Computer Science",
                        "Session": "Michaelmas Term 2026",
                    },
                },
            ],
            "deficiencies": [],
        },
        {
            "id": "APP-2026-NFST-0412",
            "scheme_id": "NFST",
            "applicant_name": "Birsa Oraon",
            "gender": "Male",
            "age": 29,
            "caste": "Scheduled Tribe (Oraon)",
            "university": "Ranchi University, Jharkhand",
            "department": "Department of Tribal & Regional Languages",
            "research_topic": "Kurukh Oral Literature Preservation",
            "income_inr": 180000,
            "current_stage": "DEFICIENCY_FLAGGED",
            "merit_score": 79.0,
            "created_at": "2026-09-17T09:00:00Z",
            "documents": [
                {
                    "id": "DOC-ST-007",
                    "doc_type": "CASTE_CERTIFICATE",
                    "title": "Oraon ST Certificate",
                    "filename": "oraon_caste_cert.pdf",
                    "origin": "DigiLocker_Verified",
                    "trust_level": 1.0,
                    "verified_status": "Auto_Approved",
                    "tamper_score": 0.02,
                    "confidence_score": 1.0,
                    "extracted_fields": {
                        "Name": "Birsa Oraon",
                        "Tribe": "Oraon (ST)",
                        "District": "Ranchi",
                    },
                },
                {
                    "id": "DOC-INC-008",
                    "doc_type": "INCOME_CERTIFICATE",
                    "title": "Income Certificate",
                    "filename": "blurry_income_cert_2025.jpg",
                    "origin": "Scanned_Upload",
                    "trust_level": 0.58,
                    "verified_status": "Needs_Manual_Scrutiny",
                    "tamper_score": 0.35,
                    "confidence_score": 0.62,
                    "extracted_fields": {
                        "Gross Annual Income": "Ambiguous (OCR <70%)",
                        "Issuing Authority": "Anchal Adhikari, Bero",
                    },
                },
            ],
            "deficiencies": [
                {
                    "id": "DEF-9021A",
                    "doc_id": "DOC-INC-008",
                    "doc_name": "Income Certificate",
                    "issue_description": "Income certificate scan has low resolution. Annual gross amount is ambiguous in section 4. Please re-upload a clean, high-contrast 300 DPI scan.",
                    "deadline": (datetime.utcnow() + timedelta(days=6)).strftime("%Y-%m-%d"),
                    "status": "OPEN",
                    "dispatched_at": (datetime.utcnow() - timedelta(days=1)).isoformat() + "Z",
                }
            ],
        },
        {
            "id": "APP-2026-NFST-0198",
            "scheme_id": "NFST",
            "applicant_name": "Pooja Kispotta",
            "gender": "Female",
            "age": 26,
            "caste": "Scheduled Tribe (Kharia)",
            "university": "IIT Kharagpur",
            "department": "Rural Development Centre",
            "research_topic": "Solar Irrigation Architectures in Tribal Belts",
            "income_inr": 210000,
            "current_stage": "PROVISIONALLY_APPROVED",
            "merit_score": 94.0,
            "created_at": "2026-09-15T11:20:00Z",
            "documents": [
                {
                    "id": "DOC-ST-009",
                    "doc_type": "CASTE_CERTIFICATE",
                    "title": "Kharia ST Certificate",
                    "filename": "kispotta_caste.pdf",
                    "origin": "DigiLocker_Verified",
                    "trust_level": 1.0,
                    "verified_status": "Auto_Approved",
                    "tamper_score": 0.01,
                    "confidence_score": 1.0,
                    "extracted_fields": {
                        "Name": "Pooja Kispotta",
                        "Caste": "Kharia",
                    },
                },
                {
                    "id": "DOC-INC-010",
                    "doc_type": "INCOME_CERTIFICATE",
                    "title": "Income Certificate",
                    "filename": "kispotta_income.pdf",
                    "origin": "Scanned_Upload",
                    "trust_level": 0.98,
                    "verified_status": "Auto_Approved",
                    "tamper_score": 0.02,
                    "confidence_score": 0.98,
                    "extracted_fields": {
                        "Gross Annual Income": "₹ 2,10,000",
                    },
                },
            ],
            "deficiencies": [],
        },
    ]


APPLICATIONS_DB: List[Dict[str, Any]] = get_initial_seed()


@router.get("/")
def list_applications():
    return {"applications": APPLICATIONS_DB}


@router.post("/reset")
def reset_applications():
    global APPLICATIONS_DB
    APPLICATIONS_DB = get_initial_seed()
    return {"message": "Applications database reset to initial seed state", "count": len(APPLICATIONS_DB)}


@router.get("/dbt/batch")
def get_dbt_disbursement_batch():
    """
    Generates PFMS Direct Benefit Transfer (DBT) batch for all provisionally approved scholars.
    """
    approved = [a for a in APPLICATIONS_DB if a.get("current_stage") == "PROVISIONALLY_APPROVED"]
    batch_id = f"PFMS-MOTA-{datetime.utcnow().strftime('%Y%m%d')}-B01"
    
    total_amount = 0
    records = []
    for item in approved:
        stipend = 31000 if item.get("scheme_id") == "NFST" else 125000
        total_amount += stipend
        records.append({
            "application_id": item["id"],
            "beneficiary_name": item["applicant_name"],
            "scheme": item["scheme_id"],
            "account_status": "Aadhaar_NPCI_Seeded",
            "monthly_disbursement_inr": stipend,
            "status": "READY_FOR_PFMS_GATEWAY",
        })

    return {
        "batch_id": batch_id,
        "scheme": "MoTA DBT Unified Fellowship Gateway",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "total_beneficiaries": len(records),
        "total_disbursement_inr": total_amount,
        "records": records,
        "xml_payload_preview": f"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<PFMSBatch id=\"{batch_id}\">\n  <Department>MoTA</Department>\n  <TotalAmount>{total_amount}</TotalAmount>\n  <BeneficiariesCount>{len(records)}</BeneficiariesCount>\n</PFMSBatch>",
    }


@router.get("/{application_id}")
def get_application(application_id: str):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            return app
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Application {application_id} not found",
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
def submit_application(payload: ApplicationCreate):
    new_app_id = f"APP-2026-{payload.scheme_id.upper()}-{uuid.uuid4().hex[:4].upper()}"
    details = payload.details or {}
    
    applicant_name = details.get("applicant_name") or details.get("name") or "Ramesh Chandra Munda"
    income = details.get("annual_income") or details.get("income") or 240000
    age = details.get("age") or 27
    gender = details.get("gender") or "Male"
    caste = details.get("caste") or "Scheduled Tribe (Munda Community)"
    univ = details.get("university") or ("Jawaharlal Nehru University" if payload.scheme_id == "NFST" else "University of Oxford")

    app_entry = {
        "id": new_app_id,
        "scheme_id": payload.scheme_id.upper(),
        "user_id": payload.user_id,
        "applicant_name": applicant_name,
        "gender": gender,
        "age": age,
        "caste": caste,
        "university": univ,
        "income_inr": income,
        "current_stage": "UNDER_SCRUTINY",
        "merit_score": details.get("merit_score") or 86.5,
        "created_at": datetime.utcnow().isoformat() + "Z",
        "documents": [
            {
                "id": f"DOC-ST-{uuid.uuid4().hex[:4].upper()}",
                "doc_type": "CASTE_CERTIFICATE",
                "title": "ST Category Certificate",
                "filename": f"{applicant_name.lower().replace(' ', '_')}_caste.pdf",
                "origin": "DigiLocker_Verified",
                "trust_level": 1.0,
                "verified_status": "Auto_Approved",
                "tamper_score": 0.01,
                "confidence_score": 1.0,
                "extracted_fields": {
                    "Name": applicant_name,
                    "Community": caste,
                    "Verification Method": "DigiLocker Real-time e-KYC",
                },
            },
            {
                "id": f"DOC-INC-{uuid.uuid4().hex[:4].upper()}",
                "doc_type": "INCOME_CERTIFICATE",
                "title": "Income Certificate",
                "filename": f"{applicant_name.lower().replace(' ', '_')}_income.pdf",
                "origin": "Scanned_Upload",
                "trust_level": 0.94,
                "verified_status": "AI_Verified",
                "tamper_score": 0.04,
                "confidence_score": 0.95,
                "extracted_fields": {
                    "Gross Annual Income": f"₹ {income:,.0f}",
                    "Financial Year": "2025-2026",
                },
            },
        ],
        "deficiencies": [],
    }
    APPLICATIONS_DB.insert(0, app_entry)
    return {
        "message": "Application created successfully and queued for MoTA scrutiny",
        "application_id": new_app_id,
        "application": app_entry,
    }


@router.post("/{application_id}/deficiency")
def create_deficiency(application_id: str, payload: DeficiencyCreate):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            deadline = datetime.utcnow() + timedelta(days=payload.deadline_days)
            deficiency = {
                "id": f"DEF-{uuid.uuid4().hex[:6].upper()}",
                "doc_id": payload.doc_id,
                "doc_name": "Scanned Document",
                "issue_description": payload.issue_description,
                "deadline": deadline.strftime("%Y-%m-%d"),
                "status": "OPEN",
                "dispatched_at": datetime.utcnow().isoformat() + "Z",
            }
            app["deficiencies"].append(deficiency)
            app["current_stage"] = "DEFICIENCY_FLAGGED"
            return {"message": "Deficiency notice dispatched to applicant via SMS & WhatsApp", "deficiency": deficiency}
    raise HTTPException(status_code=404, detail="Application not found")


@router.post("/{application_id}/deficiency/{deficiency_id}/resolve")
def resolve_deficiency(application_id: str, deficiency_id: str):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            for def_item in app["deficiencies"]:
                if def_item["id"] == deficiency_id:
                    def_item["status"] = "RESOLVED"
                    def_item["resolved_at"] = datetime.utcnow().isoformat() + "Z"
                    
                    # If all deficiencies resolved, advance stage
                    has_open = any(d["status"] == "OPEN" for d in app["deficiencies"])
                    if not has_open:
                        app["current_stage"] = "UNDER_SCRUTINY"

                    return {
                        "message": "Deficiency resolved successfully. Document re-queued for desk scrutiny.",
                        "application_id": application_id,
                        "current_stage": app["current_stage"],
                    }
            raise HTTPException(status_code=404, detail="Deficiency not found")
    raise HTTPException(status_code=404, detail="Application not found")


@router.post("/{application_id}/approve")
def approve_application(application_id: str):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            app["current_stage"] = "PROVISIONALLY_APPROVED"
            return {
                "message": f"Application {application_id} approved for MoTA Selection List",
                "current_stage": "PROVISIONALLY_APPROVED",
            }
    raise HTTPException(status_code=404, detail="Application not found")
