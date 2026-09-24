from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class DigiLockerAuthRequest(BaseModel):
    aadhaar_number: str = Field(..., min_length=12, max_length=12, description="12-digit Aadhaar number")
    consent: bool = Field(True, description="Consent for KYC verification")


class DigiLockerAuthResponse(BaseModel):
    success: bool
    digilocker_id: str
    name: str
    gender: str
    dob: str
    caste: str
    aadhaar_masked: str
    caste_certificate_verified: bool
    trust_level: float = 1.0
    token: str


class RuleEvaluationRequest(BaseModel):
    scheme_id: str  # NFST or NOS
    applicant_name: str
    caste: str
    annual_family_income: float
    age: int
    gender: str = "male"
    has_other_fellowship: bool = False
    degree_marks_percentage: Optional[float] = None
    course_type: Optional[str] = None  # e.g., "Full-Time Ph.D.", "Masters"
    qs_world_ranking: Optional[int] = None


class RuleCheckResult(BaseModel):
    rule_code: str
    rule_name: str
    passed: bool
    message: str
    action_on_failure: str


class RuleEvaluationResponse(BaseModel):
    scheme_id: str
    eligible: bool
    merit_score: float
    rule_results: List[RuleCheckResult]
    recommendation: str


class ApplicationCreate(BaseModel):
    scheme_id: str
    user_id: str
    details: Dict[str, Any]


class DeficiencyCreate(BaseModel):
    application_id: Optional[str] = None
    doc_id: Optional[str] = None
    issue_description: str
    deadline_days: int = 7


class StudentProfile(BaseModel):
    name: str = "Ramesh Chandra Munda"
    course: str = "B.Tech"
    year: str = "3rd Year"
    branch: str = "Computer Science & Engineering"
    state: str = "Jharkhand"
    district: Optional[str] = "Khunti"
    category: str = "Scheduled Tribe (ST)"
    tribe: Optional[str] = "Munda"
    income_inr: float = 240000
    age: int = 20
    gender: str = "Male"
    marks_percentage: float = 72.5
    interests: List[str] = ["Scholarships", "Internships", "Govt Exams", "Certifications"]
    documents_present: List[str] = ["Aadhaar", "Caste Certificate"]


class OpportunityAlertRequest(BaseModel):
    opportunity_id: str
    opportunity_title: str
    phone: str = "+91 9876543210"
    channel: str = "SMS & WhatsApp"
