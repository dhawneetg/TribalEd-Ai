from fastapi import APIRouter, HTTPException, status
from app.models.schemas import RuleEvaluationRequest, RuleEvaluationResponse
from app.services.rule_engine import SchemeRuleEngine

router = APIRouter(prefix="/schemes", tags=["Schemes & Rule Engine"])


@router.get("/")
def get_schemes():
    return {
        "schemes": [
            {
                "id": "NFST",
                "name": "National Fellowship for Higher Education of ST Students (NFST)",
                "target_courses": ["M.Phil", "Ph.D."],
                "income_ceiling_inr": 600000,
                "age_limits": {"male": 36, "female": 41, "third_gender": 41},
                "fellowship_amount": "₹31,000/mo (JRF) + ₹35,000/mo (SRF) + HRA + Contingency",
            },
            {
                "id": "NOS",
                "name": "National Overseas Scholarship for ST Candidates (NOS)",
                "target_courses": ["Master's Degree", "Ph.D. Abroad"],
                "income_ceiling_inr": 800000,
                "age_limits": {"all": 35},
                "min_marks_percent": 60.0,
                "max_qs_rank": 500,
                "coverage": "Full tuition fees + Annual Maintenance Allowance ($15,400 / £9,900) + Airfare",
            },
        ]
    }


@router.post("/evaluate", response_model=RuleEvaluationResponse)
def evaluate_eligibility(req: RuleEvaluationRequest):
    scheme = req.scheme_id.upper()
    if scheme == "NFST":
        return SchemeRuleEngine.evaluate_nfst(req)
    elif scheme == "NOS":
        return SchemeRuleEngine.evaluate_nos(req)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown scheme '{req.scheme_id}'. Must be 'NFST' or 'NOS'.",
        )
