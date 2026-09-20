import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    phone = Column(String(20), nullable=True)
    role = Column(String(50), default="APPLICANT")  # APPLICANT, SCRUTINY_OFFICER, ADMIN
    aadhaar_hash = Column(String(64), nullable=True)  # Salted SHA-256
    digilocker_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    applications = relationship("Application", back_populates="user")


class Application(Base):
    __tablename__ = "applications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    scheme_id = Column(String(50), nullable=False)  # NFST or NOS
    current_stage = Column(String(50), default="SUBMITTED")
    merit_score = Column(Float, default=0.0)
    submission_data = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="applications")
    documents = relationship("AppDocument", back_populates="application")
    deficiencies = relationship("Deficiency", back_populates="application")


class AppDocument(Base):
    __tablename__ = "app_documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    application_id = Column(String(36), ForeignKey("applications.id"), nullable=False)
    doc_type = Column(String(50), nullable=False)  # CASTE, INCOME, TRANSCRIPT, ADMISSION
    storage_uri = Column(String(512), nullable=True)
    ocr_payload = Column(JSON, default=dict)
    tamper_score = Column(Float, default=0.0)
    verified_status = Column(String(50), default="PENDING")  # Auto_Approved, AI_Verified, Needs_Manual_Scrutiny, Flagged_Tampered
    confidence_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="documents")


class Deficiency(Base):
    __tablename__ = "deficiencies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    application_id = Column(String(36), ForeignKey("applications.id"), nullable=False)
    doc_id = Column(String(36), ForeignKey("app_documents.id"), nullable=True)
    issue_description = Column(Text, nullable=False)
    deadline_date = Column(DateTime, nullable=False)
    status = Column(String(20), default="OPEN")  # OPEN, RESOLVED
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="deficiencies")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String(36), nullable=False)
    actor_id = Column(String(36), nullable=False)
    action = Column(String(100), nullable=False)
    remarks = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
