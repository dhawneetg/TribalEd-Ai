"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  GraduationCap,
  Clock,
  Layers,
  HelpCircle,
  FileCheck,
} from "lucide-react";

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "NFST" | "NOS" | "DOCS" | "DEFICIENCY";
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "NFST",
}) => {
  const [activeTab, setActiveTab] = useState<"NFST" | "NOS" | "DOCS" | "DEFICIENCY">(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[22px] max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#e5e7eb] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17171c] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#edfce9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-light text-[#17171c]">
                  Official MoTA Scheme Guidelines & Norms
                </h2>
                <Badge variant="scheme">SIH ID 26239</Badge>
              </div>
              <p className="text-xs text-[#75758a] mt-0.5">
                Central Government Gazette Standards for Scheduled Tribe Higher Education
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("NFST")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "NFST"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            NFST (Domestic)
          </button>
          <button
            onClick={() => setActiveTab("NOS")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "NOS"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            NOS (Overseas)
          </button>
          <button
            onClick={() => setActiveTab("DOCS")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "DOCS"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Document & ELA Criteria
          </button>
          <button
            onClick={() => setActiveTab("DEFICIENCY")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "DEFICIENCY"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            7-Day Micro-Deficiency
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm space-y-4">
          {activeTab === "NFST" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#eeece7]/50 rounded-[16px] border border-[#d9d9dd]">
                <h3 className="font-medium text-[#17171c] text-base">
                  National Fellowship for Higher Education of ST Students
                </h3>
                <p className="text-xs text-[#616161] mt-1 leading-relaxed">
                  Financial assistance to Scheduled Tribe scholars to pursue regular full-time
                  M.Phil. and Ph.D. degrees in Sciences, Humanities, Engineering, and Social Sciences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Income Ceiling</span>
                  <p className="font-medium text-[#17171c]">₹ 6,00,000 / annum (₹6.0 LPA)</p>
                  <p className="text-[11px] text-[#75758a]">Assessed via revenue authority certificate.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Age Ceiling</span>
                  <p className="font-medium text-[#17171c]">Men: ≤ 36 yrs | Women: ≤ 41 yrs</p>
                  <p className="text-[11px] text-[#75758a]">Relaxation for Transgender & PwD candidates.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Fellowship Amount</span>
                  <p className="font-medium text-[#1863dc]">₹31,000/mo (JRF) • ₹35,000/mo (SRF)</p>
                  <p className="text-[11px] text-[#75758a]">+ House Rent Allowance (HRA) + Annual Contingency.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Double Benefit Clause</span>
                  <p className="font-medium text-[#17171c]">Strictly One Fellowship Rule</p>
                  <p className="text-[11px] text-[#75758a]">Candidate cannot concurrently draw CSIR/UGC fellowship.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "NOS" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#eeece7]/50 rounded-[16px] border border-[#d9d9dd]">
                <h3 className="font-medium text-[#17171c] text-base">
                  National Overseas Scholarship for ST Candidates
                </h3>
                <p className="text-xs text-[#616161] mt-1 leading-relaxed">
                  Provides financial grant to meritorious ST students for pursuing Master&apos;s level
                  courses and Ph.D. abroad in prestigious global institutions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">QS World Ranking</span>
                  <p className="font-medium text-[#1863dc]">QS Rank ≤ 500 Worldwide</p>
                  <p className="text-[11px] text-[#75758a]">Must possess unconditional offer letter.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Qualifying Marks</span>
                  <p className="font-medium text-[#17171c]">Minimum 60.0% Aggregate</p>
                  <p className="text-[11px] text-[#75758a]">In Bachelor&apos;s (for Master&apos;s) or Master&apos;s (for Ph.D.).</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Income Ceiling</span>
                  <p className="font-medium text-[#17171c]">₹ 8,00,000 / annum (₹8.0 LPA)</p>
                  <p className="text-[11px] text-[#75758a]">Total family income including candidate and parents.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                  <span className="font-mono text-[#75758a] uppercase">Grant Coverage</span>
                  <p className="font-medium text-[#16a34a]">100% Tuition Fees + Living Allowance</p>
                  <p className="text-[11px] text-[#75758a]">$15,400/yr (USA) or £9,900/yr (UK) + Return Airfare.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "DOCS" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#edfce9]/70 rounded-[16px] border border-[#a3e635]/40 space-y-1">
                <div className="flex items-center gap-2 font-medium text-[#003c33]">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>DigiLocker Priority Lane (ADR-001)</span>
                </div>
                <p className="text-[#003c33]/80 leading-relaxed text-[11px]">
                  Caste and Income documents verified via direct DigiLocker token integration achieve
                  instant 100% trust score and bypass manual desk scrutiny queues automatically.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono uppercase text-[#75758a]">Required Document Standards:</h4>
                <div className="p-3 rounded-xl border border-[#e5e7eb] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#17171c]">ST Caste / Community Certificate</div>
                    <div className="text-[11px] text-[#75758a]">Issued by SDO / Tehsildar / Competent Revenue Authority</div>
                  </div>
                  <Badge variant="success">Mandatory</Badge>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#17171c]">Annual Income Certificate</div>
                    <div className="text-[11px] text-[#75758a]">Current financial year (2025-26) with official stamp</div>
                  </div>
                  <Badge variant="success">Mandatory</Badge>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#17171c]">Ph.D. / University Admission Letter</div>
                    <div className="text-[11px] text-[#75758a]">Registration number, supervisor signature, date of joining</div>
                  </div>
                  <Badge variant="scheme">NFST / NOS</Badge>
                </div>
              </div>

              <div className="p-3.5 bg-[#eeece7]/60 rounded-xl border border-[#d9d9dd] space-y-1 text-[11px]">
                <span className="font-mono uppercase text-[#75758a]">Forensic Tamper Detection (ELA)</span>
                <p className="text-[#616161]">
                  Scans are automatically analyzed via OpenCV Error Level Analysis (ELA) to detect spliced
                  numbers, forged digital stamps, and modified income figures. Files with tamper score &gt;0.40
                  are flagged for immediate investigation.
                </p>
              </div>
            </div>
          )}

          {activeTab === "DEFICIENCY" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#eeece7]/50 rounded-[16px] border border-[#d9d9dd] space-y-2">
                <div className="flex items-center gap-2 font-medium text-[#17171c]">
                  <Clock className="w-4 h-4 text-[#f59e0b]" />
                  <span>Micro-Deficiency Policy (ADR-003)</span>
                </div>
                <p className="text-[#616161] leading-relaxed">
                  Traditional scholarship portals reject entire applications when a single document is blurry.
                  Under Sarthi, the applicant receives a direct SMS/WhatsApp deep-link allowing targeted
                  re-upload of <strong>only the flagged document</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white">
                  <span className="font-medium text-[#17171c]">1. 7 Calendar Days Window</span>
                  <p className="text-[11px] text-[#616161] mt-0.5">
                    Applicants have exactly 7 days from the notification timestamp to upload rectified documents.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white">
                  <span className="font-medium text-[#17171c]">2. Non-Destructive Preservation</span>
                  <p className="text-[11px] text-[#616161] mt-0.5">
                    Previously verified records (e.g. DigiLocker caste status) remain intact and locked.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white">
                  <span className="font-medium text-[#17171c]">3. Scrutiny Re-Queue</span>
                  <p className="text-[11px] text-[#616161] mt-0.5">
                    Once uploaded, the document is immediately processed through OCR and returned to the desk officer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] pt-4 flex items-center justify-between">
          <span className="text-xs text-[#75758a] font-mono">
            Ministry of Tribal Affairs • New Delhi
          </span>
          <Button onClick={onClose} size="sm">
            Close Guidelines
          </Button>
        </div>
      </div>
    </div>
  );
};
