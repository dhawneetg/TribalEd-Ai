from fastapi import APIRouter, HTTPException, status
from app.models.schemas import DigiLockerAuthRequest, DigiLockerAuthResponse
import hashlib
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication & KYC"])


@router.post("/digilocker", response_model=DigiLockerAuthResponse)
def digilocker_kyc_verification(payload: DigiLockerAuthRequest):
    """
    Simulates DigiLocker instant OAuth2 token verification and
    e-KYC retrieval with 100% verified trust level as per ADR-001.
    """
    if not payload.aadhaar_number or len(payload.aadhaar_number) != 12 or not payload.aadhaar_number.isdigit():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Aadhaar format. Must be a 12-digit numeric identifier.",
        )

    # Salted hash generation for zero raw Aadhaar storage compliance
    salt = "sih2026_mota_salt"
    aadhaar_hash = hashlib.sha256((payload.aadhaar_number + salt).encode()).hexdigest()
    masked_aadhaar = f"XXXXXXXX{payload.aadhaar_number[-4:]}"

    return DigiLockerAuthResponse(
        success=True,
        digilocker_id=f"DL-ST-{uuid.uuid4().hex[:8].upper()}",
        name="Ramesh Chandra Munda",
        gender="Male",
        dob="1998-07-14",
        caste="Scheduled Tribe (Munda Community)",
        aadhaar_masked=masked_aadhaar,
        caste_certificate_verified=True,
        trust_level=1.0,
        token=f"jwt_mock_token_{aadhaar_hash[:16]}",
    )
