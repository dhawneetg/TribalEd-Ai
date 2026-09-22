"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  authenticateDigiLocker,
  evaluateSchemeRules,
  submitApplication,
} from "@/lib/api";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Building2,
  Globe2,
  GraduationCap,
  Download,
  Eye,
  Search,
  Check,
  UploadCloud,
  FileText,
  FileCheck2,
} from "lucide-react";

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [scheme, setScheme] = useState<"NFST" | "NOS">("NFST");

  // Step 1: DigiLocker KYC state
  const [aadhaarInput, setAadhaarInput] = useState<string>("548291038472");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isKycVerified, setIsKycVerified] = useState<boolean>(false);
  const [kycData, setKycData] = useState<any>(null);

  // Step 2: Academic & Eligibility State
  const [applicantName, setApplicantName] = useState<string>("Ramesh Chandra Munda");
  const [gender, setGender] = useState<string>("Male");
  const [caste, setCaste] = useState<string>("Scheduled Tribe (Munda Community)");
  const [university, setUniversity] = useState<string>("Jawaharlal Nehru University, New Delhi");
  const [courseType, setCourseType] = useState<string>("Full-Time Ph.D.");
  const [marksPercentage, setMarksPercentage] = useState<number>(76.4);
  const [annualIncome, setAnnualIncome] = useState<number>(240000);
  const [age, setAge] = useState<number>(27);
  const [qsRank, setQsRank] = useState<number>(85);

  // Document Uploads State
  const [incomeDocUploaded, setIncomeDocUploaded] = useState<boolean>(true);
  const [incomeFileName, setIncomeFileName] = useState<string>("income_certificate_2025_torpa.pdf");
  const [admissionDocUploaded, setAdmissionDocUploaded] = useState<boolean>(true);
  const [admissionFileName, setAdmissionFileName] = useState<string>("jnu_phd_admission_letter.pdf");

  // Step 3: Rule Evaluation & Submission State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  useEffect(() => {
    const s = searchParams.get("scheme");
    if (s === "NOS") {
      setScheme("NOS");
      setUniversity("University of Oxford, United Kingdom");
      setAnnualIncome(380000);
      setQsRank(3);
      setMarksPercentage(78.5);
    } else if (s === "NFST") {
      setScheme("NFST");
      setUniversity("Jawaharlal Nehru University, New Delhi");
      setAnnualIncome(240000);
    }
  }, [searchParams]);

  // Persona Presets
  const applyPreset = (type: "ramesh" | "sunita" | "high_income" | "non_st") => {
    if (type === "ramesh") {
      setAadhaarInput("548291038472");
      setApplicantName("Ramesh Chandra Munda");
      setGender("Male");
      setAge(27);
      setCaste("Scheduled Tribe (Munda Community)");
      setScheme("NFST");
      setUniversity("Jawaharlal Nehru University, New Delhi");
      setAnnualIncome(240000);
      setMarksPercentage(76.4);
    } else if (type === "sunita") {
      setAadhaarInput("892104719283");
      setApplicantName("Sunita Soren");
      setGender("Female");
      setAge(25);
      setCaste("Scheduled Tribe (Santhal)");
      setScheme("NOS");
      setUniversity("University of Oxford, United Kingdom");
      setAnnualIncome(380000);
      setQsRank(3);
      setMarksPercentage(82.0);
    } else if (type === "high_income") {
      setAadhaarInput("918237461928");
      setApplicantName("Vikas Meena");
      setGender("Male");
      setAge(31);
      setCaste("Scheduled Tribe (Meena)");
      setScheme("NFST");
      setAnnualIncome(850000); // Exceeds 6.0 LPA
    } else if (type === "non_st") {
      setAadhaarInput("129837461092");
      setApplicantName("Amit Sharma");
      setGender("Male");
      setAge(24);
      setCaste("General");
      setAnnualIncome(300000);
    }
    setIsKycVerified(false);
    setEvaluationResult(null);
    setSubmittedApp(null);
  };

  const handleDigiLockerAuth = async () => {
    setIsVerifying(true);
    const data = await authenticateDigiLocker(aadhaarInput);
    setIsVerifying(false);
    setIsKycVerified(true);
    setKycData(data);
    setApplicantName(data.name || applicantName);
    setCaste(data.caste || caste);
  };

  const handleEvaluateRules = async () => {
    setIsEvaluating(true);
    const res = await evaluateSchemeRules({
      scheme_id: scheme,
      applicant_name: applicantName,
      caste,
      annual_family_income: annualIncome,
      age,
      gender,
      degree_marks_percentage: marksPercentage,
      course_type: courseType,
      qs_world_ranking: qsRank,
    });
    setIsEvaluating(false);
    setEvaluationResult(res);
    setStep(3);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    const res = await submitApplication({
      scheme_id: scheme,
      user_id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      applicant_name: applicantName,
      gender,
      age,
      caste,
      university,
      income_inr: annualIncome,
      merit_score: evaluationResult?.merit_score || 88.0,
    });
    setIsSubmitting(false);
    setSubmittedApp(res.application);
  };

  const handleDownloadReceipt = () => {
    if (!submittedApp) return;
    const receiptContent = `=====================================================
MINISTRY OF TRIBAL AFFAIRS - SARTHI SCHOLARSHIP PORTAL
OFFICIAL APPLICATION INTAKE ACKNOWLEDGEMENT RECEIPT
=====================================================
Application ID     : ${submittedApp.id}
Scheme             : ${submittedApp.scheme_id} (${scheme === "NFST" ? "National Fellowship for STs" : "National Overseas Scholarship"})
Applicant Name     : ${submittedApp.applicant_name}
Gender / Age       : ${submittedApp.gender} / ${submittedApp.age} years
Category / Tribe   : ${submittedApp.caste}
Institution        : ${submittedApp.university}
Assessed Income    : ₹ ${submittedApp.income_inr.toLocaleString("en-IN")} / annum
Merit Score        : ${submittedApp.merit_score} / 100
Current Status     : ${submittedApp.current_stage}
Submission Time    : ${submittedApp.created_at}
DigiLocker Trust   : 100% Certified (Token Active)
=====================================================
Your application has been routed to the MoTA Scrutiny Desk.
You can track updates or remediate micro-deficiencies at:
http://localhost:3000/track?appId=${submittedApp.id}
=====================================================`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sarthi_Receipt_${submittedApp.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121]">
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        {/* If submitted, show success receipt view */}
        {submittedApp ? (
          <Card variant="canvas" className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-md mx-auto py-4">
              <div className="w-14 h-14 rounded-full bg-[#edfce9] text-[#16a34a] mx-auto flex items-center justify-center mb-4 border border-[#a3e635]/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a]">
                TRANSMISSION CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#17171c] mt-1">
                Application Successfully Queued
              </h2>
              <p className="text-xs text-[#616161] mt-2 leading-relaxed">
                Your application has been recorded in the Ministry of Tribal Affairs scrutiny ledger
                with high-priority DigiLocker certification.
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[#eeece7]/60 border border-[#d9d9dd] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9d9dd] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase text-[#75758a]">Application ID</span>
                  <div className="text-lg font-mono font-bold text-[#1863dc]">{submittedApp.id}</div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs font-mono uppercase text-[#75758a]">Status</span>
                  <div>
                    <Badge variant="success">Queued for Desk Scrutiny</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Scholar Name</span>
                  <p className="font-medium text-[#17171c]">{submittedApp.applicant_name}</p>
                </div>
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Scheme</span>
                  <p className="font-medium text-[#17171c]">{submittedApp.scheme_id}</p>
                </div>
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Institution</span>
                  <p className="font-medium text-[#17171c] truncate">{submittedApp.university}</p>
                </div>
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Community</span>
                  <p className="font-medium text-[#17171c]">{submittedApp.caste}</p>
                </div>
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Assessed Income</span>
                  <p className="font-medium text-[#17171c]">₹ {submittedApp.income_inr?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[#75758a] font-mono uppercase">Merit Score</span>
                  <p className="font-medium text-[#1863dc]">{submittedApp.merit_score} / 100</p>
                </div>
              </div>
            </div>

            {/* Next Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e5e7eb]">
              <Button
                variant="secondary"
                onClick={handleDownloadReceipt}
                className="flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download Official Receipt (.txt)
              </Button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/track?appId=${submittedApp.id}`}
                  className="btn-pill-outline text-xs py-2 px-4 flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  Track Status
                </Link>
                <Link
                  href="/officer/scrutiny"
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Inspect in Officer Console
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#75758a] mb-3">
                <span className={step >= 1 ? "text-[#1863dc] font-semibold" : ""}>
                  01. Identity &amp; KYC
                </span>
                <span className={step >= 2 ? "text-[#1863dc] font-semibold" : ""}>
                  02. Academic &amp; Scheme
                </span>
                <span className={step >= 3 ? "text-[#1863dc] font-semibold" : ""}>
                  03. Rule Verification &amp; Submit
                </span>
              </div>
              <div className="h-1 w-full bg-[#eeece7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#17171c] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: DigiLocker KYC */}
            {step === 1 && (
              <Card variant="canvas" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#ff7759]">
                      STEP 1: ZERO-PAPERWORK KYC
                    </span>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#75758a]">
                      <span>Quick Presets:</span>
                      <button
                        type="button"
                        onClick={() => applyPreset("ramesh")}
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-[#17171c]"
                      >
                        Ramesh (NFST)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("sunita")}
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-[#17171c]"
                      >
                        Sunita (NOS)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("high_income")}
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-[#17171c]"
                      >
                        High Income
                      </button>
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#17171c] mt-1">
                    Authenticate with DigiLocker / Aadhaar
                  </h2>
                  <p className="text-sm text-[#616161] mt-2 leading-relaxed">
                    As per ADR-001, pulling your Caste Certificate from DigiLocker grants an
                    immediate 100% confidence badge, bypassing manual scrutiny queues.
                  </p>
                </div>

                {!isKycVerified ? (
                  <div className="p-6 bg-[#eeece7]/60 rounded-[18px] border border-[#d9d9dd] space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                        Aadhaar Number (12-Digit Simulation)
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        value={aadhaarInput}
                        onChange={(e) => setAadhaarInput(e.target.value)}
                        className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#1863dc]"
                      />
                      <span className="text-[11px] text-[#75758a] mt-1 inline-block">
                        🔒 Aadhaar numbers are never stored in raw form (salted SHA-256 hash compliant).
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={handleDigiLockerAuth}
                        disabled={isVerifying}
                        className="w-full py-3 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#edfce9]" />
                        {isVerifying ? "Connecting to DigiLocker..." : "Simulate DigiLocker Instant e-KYC"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-[#edfce9]/70 rounded-[18px] border border-[#a3e635]/40 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="success" confidence={1.0}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        DigiLocker Verified (100% Trust)
                      </Badge>
                      <span className="text-xs font-mono text-[#003c33]">
                        ID: {kycData?.digilocker_id || "DL-ST-92841"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[#003c33]/70 font-mono uppercase">Full Name</span>
                        <p className="text-sm font-medium text-[#003c33]">{applicantName}</p>
                      </div>
                      <div>
                        <span className="text-[#003c33]/70 font-mono uppercase">Community / Caste</span>
                        <p className="text-sm font-medium text-[#003c33]">{caste}</p>
                      </div>
                      <div>
                        <span className="text-[#003c33]/70 font-mono uppercase">Certificate Serial</span>
                        <p className="text-sm font-mono text-[#003c33]">JH/ST/2022/88219</p>
                      </div>
                      <div>
                        <span className="text-[#003c33]/70 font-mono uppercase">Aadhaar (Masked)</span>
                        <p className="text-sm font-mono text-[#003c33]">
                          {kycData?.aadhaar_masked || "XXXXXXXX8472"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!isKycVerified}
                    className="flex items-center gap-2"
                  >
                    Proceed to Academic Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* STEP 2: Academic & Scheme Details */}
            {step === 2 && (
              <Card variant="canvas" className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1863dc]">
                    STEP 2: SCHEME ELIGIBILITY PARAMETERS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#17171c] mt-1">
                    Select Fellowship Scheme &amp; Academic Records
                  </h2>
                </div>

                {/* Scheme Toggle */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setScheme("NFST");
                      setUniversity("Jawaharlal Nehru University, New Delhi");
                    }}
                    className={`p-4 rounded-[16px] text-left border transition-all ${
                      scheme === "NFST"
                        ? "border-[#17171c] bg-[#eeece7]"
                        : "border-[#e5e7eb] hover:border-[#d9d9dd]"
                    }`}
                  >
                    <Badge variant="scheme">NFST</Badge>
                    <div className="text-sm font-medium text-[#17171c] mt-2">
                      National Fellowship for STs
                    </div>
                    <div className="text-xs text-[#75758a] mt-0.5">Ph.D. / M.Phil within India</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScheme("NOS");
                      setUniversity("University of Oxford, United Kingdom");
                    }}
                    className={`p-4 rounded-[16px] text-left border transition-all ${
                      scheme === "NOS"
                        ? "border-[#17171c] bg-[#eeece7]"
                        : "border-[#e5e7eb] hover:border-[#d9d9dd]"
                    }`}
                  >
                    <Badge variant="scheme">NOS</Badge>
                    <div className="text-sm font-medium text-[#17171c] mt-2">
                      National Overseas Scholarship
                    </div>
                    <div className="text-xs text-[#75758a] mt-0.5">Master&apos;s / Ph.D. Abroad</div>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                        Annual Family Income (₹)
                      </label>
                      <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(Number(e.target.value))}
                        className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                      />
                      <span className="text-[11px] text-[#75758a]">
                        Ceiling: {scheme === "NFST" ? "₹6,00,000 (NFST-R03)" : "₹8,00,000 (NOS-R05)"}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                        Candidate Age (Years)
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                      />
                      <span className="text-[11px] text-[#75758a]">
                        Max: {scheme === "NFST" ? "36 yrs (Men) / 41 yrs (Women)" : "35 yrs (NOS)"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                      {scheme === "NFST" ? "Indian University / Institute" : "Global University (Abroad)"}
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>

                  {scheme === "NOS" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                          QS World Ranking
                        </label>
                        <input
                          type="number"
                          value={qsRank}
                          onChange={(e) => setQsRank(Number(e.target.value))}
                          className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                        />
                        <span className="text-[11px] text-[#75758a]">Must be &le; 500 (NOS-R03)</span>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                          Qualifying Degree Marks (%)
                        </label>
                        <input
                          type="number"
                          value={marksPercentage}
                          onChange={(e) => setMarksPercentage(Number(e.target.value))}
                          className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                        />
                        <span className="text-[11px] text-[#75758a]">Must be &ge; 60.0% (NOS-R04)</span>
                      </div>
                    </div>
                  )}

                  {/* Document Upload Simulation Cards */}
                  <div className="pt-3 border-t border-[#e5e7eb] space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#75758a]">
                      Mandatory Document Scans:
                    </span>

                    {/* Caste certificate */}
                    <div className="p-3.5 rounded-xl bg-[#edfce9]/60 border border-[#a3e635]/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="w-5 h-5 text-[#16a34a]" />
                        <div>
                          <div className="font-medium text-[#003c33]">ST Caste / Community Certificate</div>
                          <div className="text-[11px] text-[#003c33]/70">Auto-fetched from DigiLocker repository</div>
                        </div>
                      </div>
                      <Badge variant="success">100% Trust Verified</Badge>
                    </div>

                    {/* Income certificate */}
                    <div className="p-3.5 rounded-xl bg-[#eeece7]/50 border border-[#d9d9dd] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#1863dc]" />
                        <div>
                          <div className="font-medium text-[#17171c]">Gross Annual Income Certificate</div>
                          <div className="text-[11px] text-[#75758a]">{incomeFileName} (300 DPI Scan)</div>
                        </div>
                      </div>
                      <Badge variant="success">AI OCR 95% Match</Badge>
                    </div>

                    {/* University letter */}
                    <div className="p-3.5 rounded-xl bg-[#eeece7]/50 border border-[#d9d9dd] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-[#75758a]" />
                        <div>
                          <div className="font-medium text-[#17171c]">
                            {scheme === "NFST" ? "Ph.D. Confirmation & Supervisor Letter" : "Unconditional Foreign Offer Letter"}
                          </div>
                          <div className="text-[11px] text-[#75758a]">{admissionFileName}</div>
                        </div>
                      </div>
                      <Badge variant="warning">Desk Scrutiny Required</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                  <Button variant="secondary" onClick={() => setStep(1)} className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleEvaluateRules}
                    disabled={isEvaluating}
                    className="flex items-center gap-2"
                  >
                    {isEvaluating ? "Evaluating Gazetted Rules..." : "Evaluate Rules & Preview"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* STEP 3: Rule Check & Submission Preview */}
            {step === 3 && evaluationResult && (
              <Card variant="canvas" className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#003c33]">
                    STEP 3: AUTOMATED RULE VERIFICATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#17171c] mt-1">
                    Scheme Evaluation Scorecard
                  </h2>
                </div>

                <div className="p-5 rounded-[18px] bg-[#eeece7] border border-[#d9d9dd] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#75758a]">Overall Qualification</span>
                    <div className="text-lg font-medium text-[#17171c] flex items-center gap-2 mt-0.5">
                      {evaluationResult.eligible ? (
                        <Badge variant="success">Eligible for MoTA Selection Board</Badge>
                      ) : (
                        <Badge variant="error">Eligibility Threshold Not Met</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono uppercase text-[#75758a]">Merit Rating</span>
                    <div className="text-2xl font-light text-[#1863dc]">
                      {evaluationResult.merit_score} / 100
                    </div>
                  </div>
                </div>

                {/* Rule Checklist */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#75758a]">
                    Statutory Rule Execution Breakdown:
                  </h3>
                  {evaluationResult.rule_results?.map((c: any) => (
                    <div
                      key={c.rule_code}
                      className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] bg-white text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-[#17171c]">{c.rule_code}</span>
                        <span className="text-[#616161]">{c.rule_name}</span>
                        <span className="text-[11px] text-[#75758a] hidden sm:inline">• {c.message}</span>
                      </div>
                      <Badge variant={c.passed ? "success" : "error"}>
                        {c.passed ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                  <Button variant="secondary" onClick={() => setStep(2)} className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    Edit Details
                  </Button>
                  <Button
                    onClick={handleSubmitApplication}
                    disabled={!evaluationResult.eligible || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "Submitting to Scrutiny Queue..." : "Submit Application to MoTA"}
                    <CheckCircle2 className="w-4 h-4 text-[#edfce9]" />
                  </Button>
                </div>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-sm text-[#75758a]">
          Loading MoTA Scholarship Intake...
        </div>
      }
    >
      <ApplyForm />
    </Suspense>
  );
}
