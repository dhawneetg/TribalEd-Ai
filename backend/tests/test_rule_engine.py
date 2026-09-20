import pytest
from app.services.rule_engine import SchemeRuleEngine
from app.models.schemas import RuleEvaluationRequest


def test_nfst_eligible_candidate():
    req = RuleEvaluationRequest(
        scheme_id="NFST",
        applicant_name="Birsa Oraon",
        caste="Scheduled Tribe (Oraon)",
        annual_family_income=180000.0,
        age=26,
        gender="male",
        has_other_fellowship=False,
        course_type="Full-Time Ph.D. in Tribal Folklore",
        degree_marks_percentage=78.5,
    )
    res = SchemeRuleEngine.evaluate_nfst(req)
    assert res.eligible is True
    assert res.scheme_id == "NFST"
    assert res.merit_score > 0
    # Check that all critical hard-reject rules passed
    passed_rules = {r.rule_code: r.passed for r in res.rule_results}
    assert passed_rules["NFST-R01"] is True
    assert passed_rules["NFST-R03"] is True
    assert passed_rules["NFST-R04"] is True


def test_nfst_income_exceeded_rejected():
    req = RuleEvaluationRequest(
        scheme_id="NFST",
        applicant_name="Karan Munda",
        caste="Scheduled Tribe",
        annual_family_income=750000.0,  # Exceeds 6.0 LPA limit
        age=28,
        gender="male",
        has_other_fellowship=False,
        course_type="Ph.D.",
    )
    res = SchemeRuleEngine.evaluate_nfst(req)
    assert res.eligible is False
    passed_rules = {r.rule_code: r.passed for r in res.rule_results}
    assert passed_rules["NFST-R03"] is False


def test_nos_eligible_candidate():
    req = RuleEvaluationRequest(
        scheme_id="NOS",
        applicant_name="Ananya Santhal",
        caste="Scheduled Tribe (Santhal)",
        annual_family_income=500000.0,
        age=29,
        gender="female",
        degree_marks_percentage=72.0,
        course_type="Master of Science in Machine Learning",
        qs_world_ranking=85,  # Top 100
    )
    res = SchemeRuleEngine.evaluate_nos(req)
    assert res.eligible is True
    assert res.scheme_id == "NOS"
    assert res.merit_score > 60


def test_nos_qs_rank_outside_cutoff():
    req = RuleEvaluationRequest(
        scheme_id="NOS",
        applicant_name="Vijay Gond",
        caste="Scheduled Tribe",
        annual_family_income=400000.0,
        age=30,
        degree_marks_percentage=68.0,
        course_type="Ph.D. in Renewable Energy",
        qs_world_ranking=620,  # Exceeds 500
    )
    res = SchemeRuleEngine.evaluate_nos(req)
    assert res.eligible is False
    passed_rules = {r.rule_code: r.passed for r in res.rule_results}
    assert passed_rules["NOS-R03"] is False
