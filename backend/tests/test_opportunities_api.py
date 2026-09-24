from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_opportunities():
    res = client.get("/api/v1/opportunities/")
    assert res.status_code == 200
    data = res.json()
    assert "opportunities" in data
    assert data["total"] >= 8


def test_match_opportunities_for_student_near_miss():
    # Student profile: 20 yrs old B.Tech CS student in Jharkhand with missing Income Certificate
    student_profile = {
        "name": "Ramesh Chandra Munda",
        "course": "B.Tech",
        "year": "3rd Year",
        "branch": "Computer Science & Engineering",
        "state": "Jharkhand",
        "district": "Khunti",
        "category": "Scheduled Tribe (ST)",
        "tribe": "Munda",
        "income_inr": 240000,
        "age": 20,
        "gender": "Male",
        "marks_percentage": 74.0,
        "interests": ["Scholarships", "Internships", "Govt Exams", "Certifications"],
        "documents_present": ["Aadhaar", "Caste Certificate"], # Missing Income Certificate & College NoC
    }

    res = client.post("/api/v1/opportunities/match", json=student_profile)
    assert res.status_code == 200
    data = res.json()
    summary = data["summary"]
    assert summary["relevant_count"] > 0
    assert summary["near_miss_count"] > 0

    # Verify that near-miss opportunities properly identify missing document
    near_misses = [o for o in data["opportunities"] if o["match_status"] == "NEAR_MISS"]
    assert len(near_misses) > 0
    
    missing_doc_near_miss = [o for o in near_misses if o.get("near_miss_type") == "MISSING_DOCUMENT"]
    assert len(missing_doc_near_miss) > 0
    assert "Income Certificate" in missing_doc_near_miss[0]["missing_docs"]


def test_dispatch_deadline_alert():
    payload = {
        "opportunity_id": "OPP-SCH-04",
        "opportunity_title": "Jharkhand E-Kalyan Post-Matric ST Scholarship",
        "phone": "+91 9876543210",
        "channel": "SMS & WhatsApp",
    }
    res = client.post("/api/v1/opportunities/alert", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert "ALERT-SMS-" in data["alert_token"]
