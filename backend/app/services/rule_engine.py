from typing import List, Tuple
from app.models.schemas import RuleEvaluationRequest, RuleEvaluationResponse, RuleCheckResult


class SchemeRuleEngine:
    """
    Evaluator implementing validation and merit scoring rules
    specified in Rules.md for MoTA NFST and NOS schemes.
    """

    @staticmethod
    def evaluate_nfst(req: RuleEvaluationRequest) -> RuleEvaluationResponse:
        results: List[RuleCheckResult] = []
        is_eligible = True

        # NFST-R01: Scheduled Tribe check
        is_st = "ST" in req.caste.upper() or "SCHEDULED TRIBE" in req.caste.upper()
        results.append(
            RuleCheckResult(
                rule_code="NFST-R01",
                rule_name="Scheduled Tribe Verification",
                passed=is_st,
                message="Candidate is verified as ST." if is_st else "Candidate does not belong to Scheduled Tribe (ST).",
                action_on_failure="Hard Reject",
            )
        )
        if not is_st:
            is_eligible = False

        # NFST-R02: Academic Stage
        course = (req.course_type or "").lower()
        is_research = "ph.d" in course or "m.phil" in course or "phd" in course
        results.append(
            RuleCheckResult(
                rule_code="NFST-R02",
                rule_name="Regular Full-Time Research Enrollment",
                passed=is_research,
                message="Valid Full-Time research degree enrollment." if is_research else "Course enrollment requires manual verification of bona fide certificate.",
                action_on_failure="Flag for Review",
            )
        )

        # NFST-R03: Income Ceiling <= 6.0 LPA (600,000 INR)
        income_passed = req.annual_family_income <= 600000
        results.append(
            RuleCheckResult(
                rule_code="NFST-R03",
                rule_name="Annual Family Income Ceiling",
                passed=income_passed,
                message=f"Income INR {req.annual_family_income:,.2f} is within ceiling of INR 6.0 LPA." if income_passed else f"Income INR {req.annual_family_income:,.2f} exceeds ceiling of INR 6.0 LPA.",
                action_on_failure="Hard Reject",
            )
        )
        if not income_passed:
            is_eligible = False

        # NFST-R04: Age Cap (Men <= 36, Women/Third Gender <= 41)
        gender = req.gender.lower()
        age_limit = 41 if (gender in ["female", "transgender", "third gender", "non-binary"]) else 36
        age_passed = req.age <= age_limit
        results.append(
            RuleCheckResult(
                rule_code="NFST-R04",
                rule_name="Age Cap Validation",
                passed=age_passed,
                message=f"Age {req.age} meets criteria (<= {age_limit} years for {req.gender})." if age_passed else f"Age {req.age} exceeds age limit of {age_limit} years for {req.gender}.",
                action_on_failure="Hard Reject",
            )
        )
        if not age_passed:
            is_eligible = False

        # NFST-R05: Double Benefit check
        no_double_benefit = not req.has_other_fellowship
        results.append(
            RuleCheckResult(
                rule_code="NFST-R05",
                rule_name="No Concurrent Fellowship / Double Benefit",
                passed=no_double_benefit,
                message="No other concurrent fellowship declared." if no_double_benefit else "Concurrent fellowship detected; requires scrutiny sign-off.",
                action_on_failure="Flag for Manual Scrutiny",
            )
        )

        # Merit score calculation
        merit_score = 0.0
        if req.degree_marks_percentage:
            merit_score += min(50.0, req.degree_marks_percentage * 0.5)  # up to 50 pts
        # Hardship score based on lower income brackets
        if req.annual_family_income <= 250000:
            merit_score += 30.0
        elif req.annual_family_income <= 450000:
            merit_score += 20.0
        elif req.annual_family_income <= 600000:
            merit_score += 10.0
        # Age merit factor
        if req.age <= 30:
            merit_score += 20.0
        else:
            merit_score += 10.0

        recommendation = "Recommended for Provisional Selection" if is_eligible else "Ineligible under Scheme Criteria"

        return RuleEvaluationResponse(
            scheme_id="NFST",
            eligible=is_eligible,
            merit_score=round(merit_score, 2),
            rule_results=results,
            recommendation=recommendation,
        )

    @staticmethod
    def evaluate_nos(req: RuleEvaluationRequest) -> RuleEvaluationResponse:
        results: List[RuleCheckResult] = []
        is_eligible = True

        # NOS-R01: Scheduled Tribe check
        is_st = "ST" in req.caste.upper() or "SCHEDULED TRIBE" in req.caste.upper()
        results.append(
            RuleCheckResult(
                rule_code="NOS-R01",
                rule_name="Scheduled Tribe Verification",
                passed=is_st,
                message="Candidate is verified as ST." if is_st else "Candidate does not belong to Scheduled Tribe (ST).",
                action_on_failure="Hard Reject",
            )
        )
        if not is_st:
            is_eligible = False

        # NOS-R02: Target Course (Master's or Ph.D. abroad)
        course = (req.course_type or "").lower()
        is_postgrad = any(c in course for c in ["master", "ph.d", "phd", "m.sc", "m.tech", "ms"])
        results.append(
            RuleCheckResult(
                rule_code="NOS-R02",
                rule_name="Target Post-Graduate / Doctoral Degree Abroad",
                passed=is_postgrad,
                message="Target degree valid for overseas funding." if is_postgrad else "Target degree must be Master's or Ph.D.",
                action_on_failure="Hard Reject",
            )
        )
        if not is_postgrad:
            is_eligible = False

        # NOS-R03: Institution QS World Ranking <= 500
        qs_rank = req.qs_world_ranking or 9999
        rank_passed = qs_rank <= 500
        results.append(
            RuleCheckResult(
                rule_code="NOS-R03",
                rule_name="QS World University Ranking <= 500",
                passed=rank_passed,
                message=f"Target University QS Rank #{qs_rank} is within top 500." if rank_passed else f"Target University QS Rank #{qs_rank} is outside the allowed top 500.",
                action_on_failure="Hard Reject",
            )
        )
        if not rank_passed:
            is_eligible = False

        # NOS-R04: Minimum Marks >= 60%
        marks = req.degree_marks_percentage or 0.0
        marks_passed = marks >= 60.0
        results.append(
            RuleCheckResult(
                rule_code="NOS-R04",
                rule_name="Minimum 60% Marks in Qualifying Degree",
                passed=marks_passed,
                message=f"Qualifying marks {marks:.1f}% meets >= 60.0% threshold." if marks_passed else f"Qualifying marks {marks:.1f}% is below required 60.0%.",
                action_on_failure="Hard Reject",
            )
        )
        if not marks_passed:
            is_eligible = False

        # NOS-R05: Income Ceiling <= INR 8,00,000 / annum
        income_passed = req.annual_family_income <= 800000
        results.append(
            RuleCheckResult(
                rule_code="NOS-R05",
                rule_name="Annual Family Income Ceiling",
                passed=income_passed,
                message=f"Income INR {req.annual_family_income:,.2f} is within NOS ceiling of INR 8.0 LPA." if income_passed else f"Income INR {req.annual_family_income:,.2f} exceeds ceiling of INR 8.0 LPA.",
                action_on_failure="Hard Reject",
            )
        )
        if not income_passed:
            is_eligible = False

        # NOS-R06: Age Cap <= 35 years
        age_passed = req.age <= 35
        results.append(
            RuleCheckResult(
                rule_code="NOS-R06",
                rule_name="Age Cap (<= 35 Years)",
                passed=age_passed,
                message=f"Age {req.age} meets age cap (<= 35 years)." if age_passed else f"Age {req.age} exceeds age cap of 35 years.",
                action_on_failure="Hard Reject",
            )
        )
        if not age_passed:
            is_eligible = False

        # Merit score calculation for NOS
        merit_score = 0.0
        # QS ranking score:
        if qs_rank <= 100:
            merit_score += 40.0
        elif qs_rank <= 250:
            merit_score += 30.0
        elif qs_rank <= 500:
            merit_score += 20.0

        # Degree marks score:
        if marks >= 80.0:
            merit_score += 40.0
        elif marks >= 70.0:
            merit_score += 30.0
        elif marks >= 60.0:
            merit_score += 20.0

        # Income hardship:
        if req.annual_family_income <= 400000:
            merit_score += 20.0
        elif req.annual_family_income <= 800000:
            merit_score += 10.0

        recommendation = "Recommended for Provisional Selection" if is_eligible else "Ineligible under Scheme Criteria"

        return RuleEvaluationResponse(
            scheme_id="NOS",
            eligible=is_eligible,
            merit_score=round(merit_score, 2),
            rule_results=results,
            recommendation=recommendation,
        )
