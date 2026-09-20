"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function ApplyPage() {
  const [step, setStep] = useState<number>(1);
  const [scheme, setScheme] = useState<"NFST" | "NOS">("NFST");

  // Step 1: DigiLocker Mock KYC state
  const [aadhaarInput, setAadhaarInput] = useState<string>("548291038472");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isKycVerified, setIsKycVerified] = useState<boolean>(false);
  const [kycData, setKycData] = useState<any>(null);

  // Step 2: Academic & Eligibility State
  const [university, setUniversity] = useState<string>("Jawaharlal Nehru University, New Delhi");
  const [courseType, setCourseType] = useState<string>("Full-Time Ph.D.");
  const [marksPercentage, setMarksPercentage] = useState<number>(76.4);
  const [annualIncome, setAnnualIncome] = useState<number>(240000);
  const [age, setAge] = useState<number>(27);
  const [qsRank, setQsRank] = useState<number>(85);

  // Step 3: Rule Evaluation Result
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const handleDigiLockerAuth = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsKycVerified(true);
      setKycData({
        digilocker_id: "DL-ST-92841",
        name: "Ramesh Chandra Munda",
        gender: "Male",
        dob: "1999-04-12",
        caste: "Scheduled Tribe (Munda Community)",
        caste_certificate_no: "JH/ST/2022/88219",
        aadhaar_masked: "XXXXXXXX8472",
        trust_level: 1.0,
      });
    }, 800);
  };

  const runEligibilityCheck = () => {
    // Client-side rule execution aligning with Rules.md
    if (scheme === "NFST") {
      const incomeOk = annualIncome <= 600000;
      const ageOk = age <= 36;
      const casteOk = true;
      const isEligible = incomeOk && ageOk && casteOk;
      setEvaluationResult({
        scheme: "NFST",
        eligible: isEligible,
        merit_score: 84.5,
        checks: [
          { rule: "NFST-R01", name: "Scheduled Tribe Category", passed: true },
          { rule: "NFST-R02", name: "Full-Time Research Degree", passed: true },
          { rule: "NFST-R03", name: "Annual Income ≤ ₹6.0 LPA", passed: incomeOk },
          { rule: "NFST-R04", name: "Age Cap (≤ 36 yrs for Men)", passed: ageOk },
        ],
      });
    } else {
      const incomeOk = annualIncome <= 800000;
      const ageOk = age <= 35;
      const rankOk = qsRank <= 500;
      const marksOk = marksPercentage >= 60.0;
      const isEligible = incomeOk && ageOk && rankOk && marksOk;
      setEvaluationResult({
        scheme: "NOS",
        eligible: isEligible,
        merit_score: 88.0,
        checks: [
          { rule: "NOS-R01", name: "Scheduled Tribe Category", passed: true },
          { rule: "NOS-R02", name: "Postgraduate / Doctoral Abroad", passed: true },
          { rule: "NOS-R03", name: "QS World University Rank ≤ 500", passed: rankOk },
          { rule: "NOS-R04", name: "Qualifying Marks ≥ 60%", passed: marksOk },
          { rule: "NOS-R05", name: "Annual Income ≤ ₹8.0 LPA", passed: incomeOk },
          { rule: "NOS-R06", name: "Age Cap (≤ 35 yrs)", passed: ageOk },
        ],
      });
    }
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121]">
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#75758a] mb-3">
            <span className={step >= 1 ? "text-[#1863dc] font-semibold" : ""}>
              01. Identity & KYC
            </span>
            <span className={step >= 2 ? "text-[#1863dc] font-semibold" : ""}>
              02. Academic & Scheme
            </span>
            <span className={step >= 3 ? "text-[#1863dc] font-semibold" : ""}>
              03. Rule Verification & Submit
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
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff7759]">
                STEP 1: ZERO-PAPERWORK KYC
              </span>
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
                    Demo Aadhaar Number (Pre-filled for Hackathon)
                  </label>
                  <input
                    type="text"
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
              <div className="p-6 bg-[#edfce9]/70 rounded-[18px] border border-[#a3e635]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="success" confidence={1.0}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    DigiLocker Verified (100% Trust)
                  </Badge>
                  <span className="text-xs font-mono text-[#003c33]">ID: {kycData.digilocker_id}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#003c33]/70 font-mono uppercase">Full Name</span>
                    <p className="text-sm font-medium text-[#003c33]">{kycData.name}</p>
                  </div>
                  <div>
                    <span className="text-[#003c33]/70 font-mono uppercase">Community / Caste</span>
                    <p className="text-sm font-medium text-[#003c33]">{kycData.caste}</p>
                  </div>
                  <div>
                    <span className="text-[#003c33]/70 font-mono uppercase">Certificate Serial</span>
                    <p className="text-sm font-mono text-[#003c33]">{kycData.caste_certificate_no}</p>
                  </div>
                  <div>
                    <span className="text-[#003c33]/70 font-mono uppercase">Aadhaar (Masked)</span>
                    <p className="text-sm font-mono text-[#003c33]">{kycData.aadhaar_masked}</p>
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
                Select Fellowship Scheme & Academic Records
              </h2>
            </div>

            {/* Scheme Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setScheme("NFST")}
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
                onClick={() => setScheme("NOS")}
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
                    Ceiling: {scheme === "NFST" ? "₹6,00,000" : "₹8,00,000"}
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
                </div>
              </div>

              {scheme === "NFST" ? (
                <div>
                  <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                    Indian University / Institute
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-white border border-[#d9d9dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1863dc]"
                  />
                </div>
              ) : (
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
                    <span className="text-[11px] text-[#75758a]">Must be &le; 500</span>
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
                    <span className="text-[11px] text-[#75758a]">Must be &ge; 60.0%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={runEligibilityCheck} className="flex items-center gap-2">
                Evaluate Rules & Preview
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: Rule Check & Submission Preview */}
        {step === 3 && evaluationResult && (
          <Card variant="canvas" className="space-y-6">
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
                <span className="text-xs font-mono uppercase text-[#75758a]">Overall Status</span>
                <div className="text-lg font-medium text-[#17171c] flex items-center gap-2 mt-0.5">
                  {evaluationResult.eligible ? (
                    <Badge variant="success">Eligible for Selection Board</Badge>
                  ) : (
                    <Badge variant="error">Eligibility Threshold Not Met</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono uppercase text-[#75758a]">Merit Score</span>
                <div className="text-2xl font-light text-[#1863dc]">
                  {evaluationResult.merit_score} / 100
                </div>
              </div>
            </div>

            {/* Rule Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#75758a]">
                Evaluated Scheme Criteria:
              </h3>
              {evaluationResult.checks.map((c: any) => (
                <div
                  key={c.rule}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] bg-white text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-[#17171c]">{c.rule}</span>
                    <span className="text-[#616161]">{c.name}</span>
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
                onClick={() => alert("Application submitted successfully to MoTA Scrutiny Queue!")}
                disabled={!evaluationResult.eligible}
                className="flex items-center gap-2"
              >
                Submit Application to MoTA
                <CheckCircle2 className="w-4 h-4 text-[#edfce9]" />
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
