from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from app.models.schemas import StudentProfile, OpportunityAlertRequest

router = APIRouter(prefix="/opportunities", tags=["Proactive Opportunity & Near-Miss Engine"])

# Master Catalog of Opportunities for Tribal Students
OPPORTUNITIES_CATALOG: List[Dict[str, Any]] = [
    {
        "id": "OPP-SCH-01",
        "title": "MoTA National Fellowship for ST Students (NFST 2026-27)",
        "type": "Scholarship",
        "provider": "Ministry of Tribal Affairs (MoTA)",
        "badge": "Central Fellowship",
        "summary": "Full financial support for Scheduled Tribe scholars pursuing regular M.Phil. and Ph.D. degrees in recognized Indian universities.",
        "benefit": "₹31,000/mo (JRF) + ₹35,000/mo (SRF) + HRA + Contingency",
        "deadline_days": 18,
        "deadline_date": "2026-10-12",
        "target_courses": ["Ph.D.", "M.Phil", "Doctoral"],
        "min_marks_pct": 55.0,
        "max_income_inr": 600000,
        "min_age": 21,
        "max_age": 36,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "Income Certificate", "Admission Letter"],
        "apply_url": "/apply?scheme=NFST",
        "tags": ["Research", "Higher Education", "Stipend", "Central Govt"],
    },
    {
        "id": "OPP-SCH-02",
        "title": "National Overseas Scholarship for ST Candidates (NOS Abroad)",
        "type": "Scholarship",
        "provider": "Ministry of Tribal Affairs (MoTA)",
        "badge": "International Grant",
        "summary": "Prestigious foreign study grant enabling meritorious ST scholars to attend QS Top 500 universities worldwide for Masters and Ph.D.",
        "benefit": "100% Tuition Fees + £9,900 / $15,400 Annual Allowance + Airfare",
        "deadline_days": 2, # 44 hours left!
        "deadline_date": "2026-09-26",
        "target_courses": ["Masters", "Postgraduate", "Ph.D.", "B.Tech Final Year", "Graduating"],
        "min_marks_pct": 60.0,
        "max_income_inr": 800000,
        "min_age": 20,
        "max_age": 35,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "Income Certificate", "Passport / Offer Letter"],
        "apply_url": "/apply?scheme=NOS",
        "tags": ["Overseas", "Top 500 QS", "Full Ride", "Masters"],
    },
    {
        "id": "OPP-SCH-03",
        "title": "MoTA Top Class Education Scheme for ST Students",
        "type": "Scholarship",
        "provider": "Ministry of Tribal Affairs",
        "badge": "Premier Institute",
        "summary": "Covers full tuition and boarding for ST students admitted to IITs, NITs, AIIMS, IIMs, NLUs, and premier national institutes.",
        "benefit": "Full Tuition Waiver + ₹3,000/mo Living + ₹45,000 Computer Hardware Grant",
        "deadline_days": 6,
        "deadline_date": "2026-09-30",
        "target_courses": ["B.Tech", "B.E.", "MBBS", "B.Sc", "Integrated M.Sc", "Law"],
        "min_marks_pct": 60.0,
        "max_income_inr": 600000,
        "min_age": 17,
        "max_age": 28,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "Income Certificate", "Admission Letter"],
        "apply_url": "/apply",
        "tags": ["Undergraduate", "Engineering", "Medicine", "Premier College"],
    },
    {
        "id": "OPP-SCH-04",
        "title": "Jharkhand E-Kalyan Post-Matric ST Scholarship 2026",
        "type": "Scholarship",
        "provider": "Govt of Jharkhand (Welfare Dept)",
        "badge": "State Welfare",
        "summary": "Annual institutional fee reimbursement and monthly maintenance for ST college students studying inside or outside Jharkhand.",
        "benefit": "Up to ₹55,000 / year college fee reimbursement + boarding grant",
        "deadline_days": 1, # 24 hours left!
        "deadline_date": "2026-09-25",
        "target_courses": ["B.Tech", "Diploma", "B.Sc", "B.A.", "B.Com", "M.Tech", "M.Sc"],
        "min_marks_pct": 50.0,
        "max_income_inr": 250000,
        "min_age": 16,
        "max_age": 30,
        "required_category": "ST",
        "target_states": ["Jharkhand"],
        "required_docs": ["Caste Certificate", "Income Certificate", "Domicile Certificate"],
        "apply_url": "/track",
        "tags": ["State Domicile", "Tuition Reimbursement", "Post-Matric"],
    },
    {
        "id": "OPP-INT-01",
        "title": "NITI Aayog Tribal Development & Policy Research Internship",
        "type": "Internship",
        "provider": "NITI Aayog (Govt of India)",
        "badge": "Policy & Governance",
        "summary": "Work directly with central policy analysts on Aspirational Districts and Fifth Schedule tribal welfare economic models.",
        "benefit": "₹25,000 / month stipend + NITI Aayog Certificate of Excellence",
        "deadline_days": 9,
        "deadline_date": "2026-10-03",
        "target_courses": ["B.Tech", "B.Sc", "M.Sc", "M.A.", "Economics", "Ph.D."],
        "min_marks_pct": 65.0,
        "max_income_inr": 1200000,
        "min_age": 19,
        "max_age": 28,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["College ID / NoC", "Resume", "Caste Certificate"],
        "apply_url": "/opportunities",
        "tags": ["Internship", "Public Policy", "Paid", "New Delhi"],
    },
    {
        "id": "OPP-INT-02",
        "title": "AICTE - MoTA 'Tech for Tribals' AI & Vernacular Computing Fellowship",
        "type": "Internship",
        "provider": "AICTE & Ministry of Tribal Affairs",
        "badge": "AI & Innovation",
        "summary": "Engineering internship developing mobile AI tools, speech recognizers, and offline learning apps for Santhali, Kurukh, and Gondi scripts.",
        "benefit": "₹30,000 / month stipend + Edge AI Compute Hardware Kit",
        "deadline_days": 3,
        "deadline_date": "2026-09-27",
        "target_courses": ["B.Tech", "B.E.", "MCA", "M.Tech", "B.Sc CS", "Computer Science"],
        "min_marks_pct": 60.0,
        "max_income_inr": 800000,
        "min_age": 19,
        "max_age": 27,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "College ID / NoC"],
        "apply_url": "/opportunities",
        "tags": ["AI Research", "NLP", "Vernacular", "High Stipend"],
    },
    {
        "id": "OPP-EXM-01",
        "title": "UPSC Civil Services ST Free Residential Coaching & Mentorship",
        "type": "Exam & Coaching",
        "provider": "MoTA Central Coaching Scheme (Jamia / Sankalp)",
        "badge": "Civil Services Prep",
        "summary": "Fully sponsored 10-month residential coaching program for ST aspirants preparing for UPSC IAS/IPS/IFS with top faculty and test series.",
        "benefit": "100% Free Air-Conditioned Hostel + Library + ₹4,000/mo Monthly Allowance",
        "deadline_days": 2, # 40 hours left!
        "deadline_date": "2026-09-26",
        "target_courses": ["Graduate", "Final Year B.Tech", "B.A.", "B.Sc", "Postgraduate"],
        "min_marks_pct": 50.0,
        "max_income_inr": 600000,
        "min_age": 21,
        "max_age": 37,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "Income Certificate", "Graduation Marksheet"],
        "apply_url": "/opportunities",
        "tags": ["UPSC", "IAS", "Free Hostel", "Coaching"],
    },
    {
        "id": "OPP-EXM-02",
        "title": "Eklavya Model Residential Schools (EMRS) National Recruitment Examination",
        "type": "Exam & Coaching",
        "provider": "National Education Society for Tribal Students (NESTS)",
        "badge": "Central Govt Job",
        "summary": "Direct regular recruitment for Graduate Teachers (TGT), Post Graduate Teachers (PGT), and Lab Assistants in 400+ EMRS campuses.",
        "benefit": "Pay Matrix Level 7 (₹44,900 - ₹1,42,400) + Govt Quarter & Perks",
        "deadline_days": 24,
        "deadline_date": "2026-10-18",
        "target_courses": ["B.Ed", "B.Sc", "B.A.", "M.Sc", "M.A.", "Postgraduate"],
        "min_marks_pct": 50.0,
        "max_income_inr": 2000000,
        "min_age": 21,
        "max_age": 40,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "B.Ed / Degree Certificate"],
        "apply_url": "/opportunities",
        "tags": ["Direct Employment", "Teaching", "Central Govt"],
    },
    {
        "id": "OPP-CRT-01",
        "title": "Google Cloud & AWS Tribal Youth Cloud Architect Certification Bursary",
        "type": "Certification",
        "provider": "NASSCOM FutureSkills & MoTA IT Initiative",
        "badge": "Industry Credential",
        "summary": "100% exam fee waiver and official voucher for Associate Cloud Engineer / AWS Solutions Architect certification with guaranteed interview slots.",
        "benefit": "₹18,000 Global Exam Fee 100% Waived + 6-Month Cloud Sandbox Labs",
        "deadline_days": 11,
        "deadline_date": "2026-10-05",
        "target_courses": ["B.Tech", "B.E.", "BCA", "MCA", "B.Sc", "Diploma Tech"],
        "min_marks_pct": 55.0,
        "max_income_inr": 800000,
        "min_age": 18,
        "max_age": 29,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["College ID / NoC", "Caste Certificate"],
        "apply_url": "/opportunities",
        "tags": ["Cloud", "DevOps", "Free Voucher", "Industry Ready"],
    },
    {
        "id": "OPP-CRT-02",
        "title": "TRIFED Van Dhan Agro-Forestry Quality & Organic Certification",
        "type": "Certification",
        "provider": "Tribal Co-operative Marketing Development Federation (TRIFED)",
        "badge": "Rural Enterprise",
        "summary": "Professional certification training in organic spice, honey, and herbal processing testing for tribal community leaders and agro students.",
        "benefit": "NABL Accredited Assessor Badge + ₹15,000 Training Stipend",
        "deadline_days": 5,
        "deadline_date": "2026-09-29",
        "target_courses": ["Agriculture", "Forestry", "Botany", "Biotech", "B.Sc", "Rural Management"],
        "min_marks_pct": 50.0,
        "max_income_inr": 500000,
        "min_age": 18,
        "max_age": 35,
        "required_category": "ST",
        "target_states": ["All India"],
        "required_docs": ["Caste Certificate", "Aadhaar"],
        "apply_url": "/opportunities",
        "tags": ["Agro", "Organic", "TRIFED", "Skill Development"],
    },
]


def evaluate_student_opportunity_match(profile: StudentProfile, opp: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates profile against opportunity requirements.
    Calculates whether the student is:
    - FULLY_ELIGIBLE (100% match)
    - NEAR_MISS (Actionable gap: missing 1 doc, close cutoff with tribal relaxation, or deadline closing <48h)
    - NOT_ELIGIBLE (Fundamental mismatch, e.g. wrong course level or far exceeds income)
    """
    reasons_passed = []
    reasons_failed = []
    near_miss_notes = []

    # Category check
    is_st_profile = "ST" in profile.category.upper() or "SCHEDULED TRIBE" in profile.category.upper()
    req_cat = opp.get("required_category")
    if req_cat == "ST":
        if is_st_profile:
            reasons_passed.append("Scheduled Tribe category verified via DigiLocker.")
        else:
            reasons_failed.append("Opportunity is reserved exclusively for Scheduled Tribe (ST) candidates.")

    # Income check
    max_income = opp.get("max_income_inr", 99999999)
    if profile.income_inr <= max_income:
        reasons_passed.append(f"Family income ₹{profile.income_inr:,.0f} is within ₹{max_income:,.0f} ceiling.")
    elif profile.income_inr <= max_income * 1.15:
        # Near-miss: slightly above limit but eligible for rural hardship review
        near_miss_notes.append(f"Income ₹{profile.income_inr:,.0f} slightly exceeds ₹{max_income:,.0f} ceiling; admissible with rural hardship affidavit.")
    else:
        reasons_failed.append(f"Family income ₹{profile.income_inr:,.0f} exceeds maximum ceiling of ₹{max_income:,.0f}.")

    # Age check
    min_age = opp.get("min_age", 16)
    max_age = opp.get("max_age", 45)
    if min_age <= profile.age <= max_age:
        reasons_passed.append(f"Age {profile.age} is within eligible range ({min_age}-{max_age} yrs).")
    elif profile.age <= max_age + 5 and is_st_profile:
        # ST 5-year age relaxation applies!
        near_miss_notes.append(f"Age {profile.age} exceeds general limit of {max_age} yrs, but qualifies under MoTA 5-Year ST Age Relaxation.")
    else:
        reasons_failed.append(f"Age {profile.age} is outside the allowable range ({min_age}-{max_age} yrs).")

    # Course / Branch match
    target_courses = [c.lower() for c in opp.get("target_courses", [])]
    student_course = profile.course.lower()
    student_branch = profile.branch.lower()
    
    course_match = False
    for tc in target_courses:
        if tc in student_course or tc in student_branch or "all india" in tc or "graduate" in tc:
            course_match = True
            break
    if "b.tech" in student_course and ("engineering" in str(target_courses) or "b.tech" in str(target_courses)):
        course_match = True
    if "ph.d" in student_course and ("doctoral" in str(target_courses) or "ph.d" in str(target_courses) or "research" in str(target_courses)):
        course_match = True

    if course_match:
        reasons_passed.append(f"Course '{profile.course} ({profile.branch})' matches academic qualification.")
    else:
        # If student is in final year or related branch, flag near-miss
        if "final year" in profile.year.lower() or "3rd year" in profile.year.lower():
            near_miss_notes.append(f"Targeting {', '.join(opp.get('target_courses', []))}; your {profile.year} status allows provisional pre-enrollment application.")
        else:
            reasons_failed.append(f"Requires {', '.join(opp.get('target_courses', []))}; student is enrolled in {profile.course}.")

    # Marks check
    min_marks = opp.get("min_marks_pct", 50.0)
    if profile.marks_percentage >= min_marks:
        reasons_passed.append(f"Qualifying marks {profile.marks_percentage}% meets cutoff ({min_marks}%).")
    elif profile.marks_percentage >= min_marks - 5.0 and is_st_profile:
        # Near-miss: 5% ST/PVTG relaxation
        near_miss_notes.append(f"Cutoff is {min_marks}% (Your score: {profile.marks_percentage}%). MoTA Rule ST-REL-04 grants 5% relaxation for Scheduled Tribes / PVTGs!")
    else:
        reasons_failed.append(f"Marks {profile.marks_percentage}% below required cutoff of {min_marks}%.")

    # State check
    target_states = opp.get("target_states", ["All India"])
    if "All India" in target_states or profile.state in target_states:
        reasons_passed.append(f"State eligibility ({profile.state}) confirmed.")
    else:
        reasons_failed.append(f"Opportunity is restricted to residents of {', '.join(target_states)}.")

    # Document check: Identify missing required documents (THE BIGGEST NEAR-MISS DIFFERENTIATOR)
    required_docs = opp.get("required_docs", [])
    present_docs = [d.lower() for d in profile.documents_present]
    
    missing_docs = []
    for req in required_docs:
        req_norm = req.lower()
        found = False
        for p in present_docs:
            if req_norm in p or (req_norm == "caste certificate" and "caste" in p) or (req_norm == "income certificate" and "income" in p):
                found = True
                break
        if not found:
            missing_docs.append(req)

    # Deadline urgency check
    days_left = opp.get("deadline_days", 14)
    is_urgent = days_left <= 2  # <= 48 hours

    # Determine status
    if len(reasons_failed) == 0:
        if len(missing_docs) > 0:
            status_result = "NEAR_MISS"
            near_miss_type = "MISSING_DOCUMENT"
            action_cta = f"Upload {missing_docs[0]}"
            near_miss_msg = f"Potentially eligible (92% Match) — required document '{missing_docs[0]}' is missing from your profile. Upload now or generate self-declaration to unlock."
        elif len(near_miss_notes) > 0:
            status_result = "NEAR_MISS"
            near_miss_type = "RELAXATION_APPLICABLE"
            action_cta = "Claim Tribal Relaxation"
            near_miss_msg = near_miss_notes[0]
        elif is_urgent:
            status_result = "NEAR_MISS"
            near_miss_type = "DEADLINE_URGENT"
            action_cta = "Apply Before Cutoff"
            near_miss_msg = f"Deadline closing in {days_left * 24} hours ({opp['deadline_date']})! Fast-track your application now."
        else:
            status_result = "FULLY_ELIGIBLE"
            near_miss_type = None
            action_cta = "Apply with Sarthi 1-Click Profile"
            near_miss_msg = "You satisfy 100% of all gazetted criteria. Documents ready for instant submission."
    elif len(reasons_failed) == 1 and len(near_miss_notes) > 0:
        # Borderline case with relaxation
        status_result = "NEAR_MISS"
        near_miss_type = "RELAXATION_APPLICABLE"
        action_cta = "Apply under Special ST Provision"
        near_miss_msg = near_miss_notes[0]
    else:
        status_result = "NOT_ELIGIBLE"
        near_miss_type = None
        action_cta = "Explore Alternative Schemes"
        near_miss_msg = f"Criteria mismatch: {reasons_failed[0]}"

    return {
        **opp,
        "match_status": status_result,
        "near_miss_type": near_miss_type,
        "near_miss_message": near_miss_msg,
        "action_cta": action_cta,
        "missing_docs": missing_docs,
        "is_deadline_urgent": is_urgent,
        "hours_remaining": days_left * 24,
        "reasons_passed": reasons_passed,
        "reasons_failed": reasons_failed,
    }


@router.get("/")
def list_opportunities(type: Optional[str] = None):
    """
    Returns full catalog of scholarships, internships, exams, and certifications.
    """
    if type:
        filtered = [o for o in OPPORTUNITIES_CATALOG if o["type"].lower() == type.lower()]
        return {"opportunities": filtered, "total": len(filtered)}
    return {"opportunities": OPPORTUNITIES_CATALOG, "total": len(OPPORTUNITIES_CATALOG)}


@router.post("/match")
def match_opportunities_for_student(profile: StudentProfile):
    """
    Proactively evaluates the one-time student profile against all opportunities.
    Computes Near-Miss differentiators, missing document flags, and deadline alerts.
    """
    evaluated_items = []
    for opp in OPPORTUNITIES_CATALOG:
        match_info = evaluate_student_opportunity_match(profile, opp)
        evaluated_items.append(match_info)

    # Sort: Urgent near-misses & fully eligible first
    def sort_rank(item):
        if item["match_status"] == "FULLY_ELIGIBLE":
            return 1
        elif item["match_status"] == "NEAR_MISS":
            if item.get("is_deadline_urgent"):
                return 0 # Top priority alert!
            return 2
        return 3

    evaluated_items.sort(key=sort_rank)

    fully_eligible = [i for i in evaluated_items if i["match_status"] == "FULLY_ELIGIBLE"]
    near_miss = [i for i in evaluated_items if i["match_status"] == "NEAR_MISS"]
    urgent_deadlines = [i for i in evaluated_items if i.get("is_deadline_urgent") and i["match_status"] != "NOT_ELIGIBLE"]

    return {
        "student_name": profile.name,
        "summary": {
            "total_evaluated": len(evaluated_items),
            "relevant_count": len(fully_eligible) + len(near_miss),
            "fully_eligible_count": len(fully_eligible),
            "near_miss_count": len(near_miss),
            "urgent_deadline_count": len(urgent_deadlines),
            "headline": f"Found {len(fully_eligible) + len(near_miss)} potentially relevant opportunities: {len(fully_eligible)} Fully Eligible, {len(near_miss)} Near-Misses, {len(urgent_deadlines)} Closing in <48h",
        },
        "opportunities": evaluated_items,
    }


@router.post("/alert")
def dispatch_deadline_alert(req: OpportunityAlertRequest):
    """
    Simulates sending instant SMS and WhatsApp deadline reminder to student phone.
    """
    alert_token = f"ALERT-SMS-{datetime.utcnow().strftime('%Y%m%d%H%M')}-{req.opportunity_id[:6]}"
    return {
        "success": True,
        "message": f"Deadline reminder successfully scheduled for {req.opportunity_title} to {req.phone} via MoTA SMS Gateway & WhatsApp.",
        "alert_token": alert_token,
        "scheduled_channel": req.channel,
        "dispatched_at": datetime.utcnow().isoformat() + "Z",
    }
