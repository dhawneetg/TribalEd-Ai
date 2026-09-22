from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_applications():
    response = client.get("/api/v1/applications/")
    assert response.status_code == 200
    data = response.json()
    assert "applications" in data
    assert len(data["applications"]) >= 4


def test_get_application_by_id():
    response = client.get("/api/v1/applications/APP-2026-NFST-0842")
    assert response.status_code == 200
    data = response.json()
    assert data["applicant_name"] == "Ramesh Chandra Munda"
    assert len(data["documents"]) == 3


def test_submit_and_approve_application():
    payload = {
        "scheme_id": "NFST",
        "user_id": "usr-test-101",
        "details": {
            "applicant_name": "Karan Murmu",
            "annual_income": 200000,
            "age": 28,
            "gender": "Male",
            "caste": "Scheduled Tribe (Santhal)",
            "university": "Delhi University",
        },
    }
    create_res = client.post("/api/v1/applications/", json=payload)
    assert create_res.status_code == 201
    new_app = create_res.json()
    app_id = new_app["application_id"]
    assert "APP-2026-NFST-" in app_id

    # Approve application
    approve_res = client.post(f"/api/v1/applications/{app_id}/approve")
    assert approve_res.status_code == 200
    assert approve_res.json()["current_stage"] == "PROVISIONALLY_APPROVED"


def test_deficiency_lifecycle():
    # Flag deficiency on APP-2026-NFST-0842
    def_payload = {
        "doc_id": "DOC-INC-002",
        "issue_description": "Annual income certificate requires updated tehsildar counter-signature.",
        "deadline_days": 7,
    }
    flag_res = client.post("/api/v1/applications/APP-2026-NFST-0842/deficiency", json=def_payload)
    assert flag_res.status_code == 200
    def_data = flag_res.json()["deficiency"]
    def_id = def_data["id"]

    # Verify status changed
    app_res = client.get("/api/v1/applications/APP-2026-NFST-0842")
    assert app_res.json()["current_stage"] == "DEFICIENCY_FLAGGED"

    # Resolve deficiency
    res_resolve = client.post(f"/api/v1/applications/APP-2026-NFST-0842/deficiency/{def_id}/resolve")
    assert res_resolve.status_code == 200
    assert res_resolve.json()["current_stage"] == "UNDER_SCRUTINY"


def test_dbt_disbursement_batch():
    response = client.get("/api/v1/applications/dbt/batch")
    assert response.status_code == 200
    data = response.json()
    assert "PFMS-MOTA-" in data["batch_id"]
    assert data["total_beneficiaries"] >= 1
    assert data["total_disbursement_inr"] > 0


def test_digilocker_kyc_endpoint():
    res = client.post("/api/v1/auth/digilocker", json={"aadhaar_number": "548291038472"})
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert data["trust_level"] == 1.0
    assert data["caste_certificate_verified"] is True
