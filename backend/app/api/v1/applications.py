from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ApplicationCreate, DeficiencyCreate
from typing import List, Dict, Any
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/applications", tags=["Applications & Scrutiny"])

# In-memory store for rapid prototype demo
APPLICATIONS_DB: List[Dict[str, Any]] = [
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
                "filename": "income_cert_2025_26.pdf",
                "origin": "Scanned_Upload",
                "trust_level": 0.92,
                "verified_status": "AI_Verified",
                "tamper_score": 0.08,
                "confidence_score": 0.94,
                "extracted_fields": {
                    "Gross Annual Income": "₹ 2,40,000",
                    "Financial Year": "2025-2026",
                    "Issuing Circle": "Circle Officer, Torpa",
                    "Validity": "Valid up to 31/03/2027",
                },
            },
            {
                "id": "DOC-ADM-003",
                "doc_type": "PHD_ADMISSION_LETTER",
                "filename": "jnu_phd_admission_letter.pdf",
                "origin": "Scanned_Upload",
                "trust_level": 0.82,
                "verified_status": "Needs_Manual_Scrutiny",
                "tamper_score": 0.12,
                "confidence_score": 0.78,
                "extracted_fields": {
                    "Institution": "JNU New Delhi",
                    "Enrollment No": "22/54/SES/019",
                    "Category": "Full-Time Research Scholar",
                    "Date of Confirmation": "15/08/2024",
                },
            },
        ],
        "deficiencies": [],
    }
]


@router.get("/")
def list_applications():
    return {"applications": APPLICATIONS_DB}


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
    new_app_id = f"APP-2026-{payload.scheme_id}-{uuid.uuid4().hex[:4].upper()}"
    app_entry = {
        "id": new_app_id,
        "scheme_id": payload.scheme_id,
        "user_id": payload.user_id,
        "current_stage": "SUBMITTED",
        "details": payload.details,
        "created_at": datetime.utcnow().isoformat() + "Z",
        "documents": [],
        "deficiencies": [],
    }
    APPLICATIONS_DB.append(app_entry)
    return {"message": "Application created successfully", "application_id": new_app_id}


@router.post("/{application_id}/deficiency")
def create_deficiency(application_id: str, payload: DeficiencyCreate):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            deadline = datetime.utcnow() + timedelta(days=payload.deadline_days)
            deficiency = {
                "id": f"DEF-{uuid.uuid4().hex[:6].upper()}",
                "doc_id": payload.doc_id,
                "issue_description": payload.issue_description,
                "deadline": deadline.strftime("%Y-%m-%d"),
                "status": "OPEN",
            }
            app["deficiencies"].append(deficiency)
            app["current_stage"] = "DEFICIENCY_FLAGGED"
            return {"message": "Deficiency notice dispatched to applicant", "deficiency": deficiency}
    raise HTTPException(status_code=404, detail="Application not found")


@router.post("/{application_id}/approve")
def approve_application(application_id: str):
    for app in APPLICATIONS_DB:
        if app["id"] == application_id:
            app["current_stage"] = "PROVISIONALLY_APPROVED"
            return {"message": f"Application {application_id} approved for selection list"}
    raise HTTPException(status_code=404, detail="Application not found")
