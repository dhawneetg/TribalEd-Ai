"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchApplications,
  resolveDeficiency,
} from "@/lib/api";
import { ApplicationItem, DeficiencyItem } from "@/lib/mockData";
import {
  Search,
  Clock,
  AlertTriangle,
  CheckCircle2,
  UploadCloud,
  FileCheck2,
  FileText,
  ShieldCheck,
  Eye,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

function TrackPageInner() {
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("APP-2026-NFST-0412");
  const [activeApp, setActiveApp] = useState<ApplicationItem | null>(null);

  // Remediation upload state
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [resolutionSuccess, setResolutionSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const data = await fetchApplications();
      setApplications(data);

      const urlAppId = searchParams.get("appId");
      const targetId = urlAppId || "APP-2026-NFST-0412";
      setSearchInput(targetId);

      const found = data.find((a) => a.id.toLowerCase() === targetId.toLowerCase());
      if (found) {
        setActiveApp(found);
      } else if (data.length > 0) {
        setActiveApp(data[0]);
      }
    }
    loadData();
  }, [searchParams]);

  const handleSearch = (idToSearch?: string) => {
    const id = (idToSearch || searchInput).trim().toLowerCase();
    const found = applications.find((a) => a.id.toLowerCase() === id);
    if (found) {
      setActiveApp(found);
      setResolutionSuccess(false);
      setSelectedFile(null);
    } else {
      alert(`Application ${idToSearch || searchInput} not found. Try one of the preset application IDs.`);
    }
  };

  const handleSimulateFileSelect = () => {
    setIsUploading(true);
    setTimeout(() => {
      setSelectedFile("income_cert_2025_highres_signed.pdf");
      setIsUploading(false);
    }, 600);
  };

  const handleResolveDeficiency = async (defId: string) => {
    if (!activeApp) return;
    setIsResolving(true);
    await resolveDeficiency(activeApp.id, defId);
    setIsResolving(false);
    setResolutionSuccess(true);
    // Reload
    const data = await fetchApplications();
    setApplications(data);
    const updated = data.find((a) => a.id === activeApp.id);
    if (updated) setActiveApp(updated);
  };

  const openDeficiency = activeApp?.deficiencies?.find((d) => d.status === "OPEN");

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {/* Header & Search Bar */}
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff7759]">
              REAL-TIME LIFECYCLE DESK
            </span>
            <h1 className="text-3xl sm:text-4xl font-light text-[#17171c] mt-1">
              Track Application &amp; Remediate
            </h1>
            <p className="text-xs text-[#616161] mt-2">
              Inspect current scrutiny stage, verify DigiLocker trust level, or resolve
              targeted document micro-deficiencies directly.
            </p>

            {/* Search Box */}
            <div className="mt-6 flex items-center gap-2 bg-[#eeece7]/60 p-1.5 rounded-2xl border border-[#d9d9dd]">
              <input
                type="text"
                placeholder="Enter Application ID (e.g. APP-2026-NFST-0412)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 text-sm font-mono focus:outline-none text-[#17171c]"
              />
              <Button size="sm" onClick={() => handleSearch()} className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Track
              </Button>
            </div>

            {/* Quick Demo ID Presets */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#75758a]">Test Cases:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput("APP-2026-NFST-0412");
                  handleSearch("APP-2026-NFST-0412");
                }}
                className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 font-mono text-[11px]"
              >
                Birsa (Deficiency Flagged)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchInput("APP-2026-NFST-0842");
                  handleSearch("APP-2026-NFST-0842");
                }}
                className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 font-mono text-[11px]"
              >
                Ramesh (Under Scrutiny)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchInput("APP-2026-NFST-0198");
                  handleSearch("APP-2026-NFST-0198");
                }}
                className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-mono text-[11px]"
              >
                Pooja (Approved)
              </button>
            </div>
          </div>

          {activeApp ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Application Snapshot Card */}
              <Card variant="canvas" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e7eb] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-medium text-[#17171c]">{activeApp.applicant_name}</h2>
                      <Badge variant="scheme">{activeApp.scheme_id}</Badge>
                    </div>
                    <p className="text-xs text-[#75758a] mt-0.5 font-mono">
                      Application ID: <strong className="text-[#17171c]">{activeApp.id}</strong> •{" "}
                      {activeApp.caste}
                    </p>
                  </div>

                  <div>
                    {activeApp.current_stage === "DEFICIENCY_FLAGGED" && (
                      <Badge variant="warning">
                        <AlertTriangle className="w-3 h-3 text-[#f59e0b]" />
                        Micro-Deficiency Pending (7-Day Clock Active)
                      </Badge>
                    )}
                    {activeApp.current_stage === "UNDER_SCRUTINY" && (
                      <Badge variant="scheme">
                        <Clock className="w-3 h-3 text-[#1863dc]" />
                        Under Scrutiny by Desk Officer
                      </Badge>
                    )}
                    {activeApp.current_stage === "PROVISIONALLY_APPROVED" && (
                      <Badge variant="success">
                        <CheckCircle2 className="w-3 h-3 text-[#16a34a]" />
                        Provisionally Approved for Selection Board
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[#75758a] font-mono uppercase">University</span>
                    <p className="font-medium text-[#17171c] truncate">{activeApp.university}</p>
                  </div>
                  <div>
                    <span className="text-[#75758a] font-mono uppercase">Annual Income</span>
                    <p className="font-medium text-[#17171c]">₹ {activeApp.income_inr.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <span className="text-[#75758a] font-mono uppercase">Merit Score</span>
                    <p className="font-medium text-[#1863dc]">{activeApp.merit_score} / 100</p>
                  </div>
                  <div>
                    <span className="text-[#75758a] font-mono uppercase">Attached Docs</span>
                    <p className="font-medium text-[#17171c]">{activeApp.documents.length} Files Verified</p>
                  </div>
                </div>
              </Card>

              {/* TARGETED DEFICIENCY REMEDIATION BOX */}
              {openDeficiency && !resolutionSuccess && (
                <Card variant="canvas" className="border-2 border-[#f59e0b]/60 bg-[#fffdfa] space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-xs font-mono text-[#b45309]">
                        <Clock className="w-3.5 h-3.5" />
                        7-DAY RE-UPLOAD WINDOW ACTIVE
                      </div>
                      <h3 className="text-xl font-normal text-[#17171c] mt-2">
                        Targeted Document Rectification Required
                      </h3>
                      <p className="text-xs text-[#616161] mt-1">
                        As per ADR-003, you only need to re-upload the flagged document. Your existing verified
                        details remain safe and locked.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono uppercase text-[#75758a]">Remediation Deadline</span>
                      <div className="text-base font-mono font-bold text-[#b45309]">
                        {openDeficiency.deadline} (6 Days Left)
                      </div>
                    </div>
                  </div>

                  {/* Officer's Remark Box */}
                  <div className="p-4 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] space-y-1 text-xs">
                    <span className="font-mono uppercase text-[#75758a]">MoTA Scrutiny Officer Remark:</span>
                    <p className="text-[#17171c] font-medium leading-relaxed">
                      &ldquo;{openDeficiency.issue_description}&rdquo;
                    </p>
                  </div>

                  {/* Targeted Re-upload Area */}
                  <div className="border-2 border-dashed border-[#d9d9dd] rounded-[18px] p-6 text-center space-y-3 bg-white">
                    <div className="w-12 h-12 rounded-full bg-[#eeece7] text-[#17171c] mx-auto flex items-center justify-center">
                      <UploadCloud className="w-6 h-6 text-[#1863dc]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#17171c]">
                        Upload Replacement {openDeficiency.doc_name || "Income Certificate"} (300 DPI)
                      </div>
                      <p className="text-xs text-[#75758a] mt-0.5">
                        Supported formats: PDF, JPEG (Max 5MB). High contrast with visible seals.
                      </p>
                    </div>

                    {!selectedFile ? (
                      <Button
                        variant="secondary"
                        onClick={handleSimulateFileSelect}
                        disabled={isUploading}
                        className="text-xs"
                      >
                        {isUploading ? "Reading file..." : "Browse Scanned Document"}
                      </Button>
                    ) : (
                      <div className="p-3 bg-[#edfce9] rounded-xl border border-[#a3e635]/50 flex items-center justify-between text-xs max-w-md mx-auto">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-[#16a34a]" />
                          <span className="font-mono text-[#003c33]">{selectedFile}</span>
                        </div>
                        <Badge variant="success">97% OCR Confirmed</Badge>
                      </div>
                    )}
                  </div>

                  {/* Submit Rectification */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e7eb]">
                    <span className="text-xs text-[#75758a] font-mono">
                      Deficiency ID: {openDeficiency.id}
                    </span>
                    <Button
                      onClick={() => handleResolveDeficiency(openDeficiency.id)}
                      disabled={!selectedFile || isResolving}
                      className="flex items-center gap-2 bg-[#16a34a]"
                    >
                      {isResolving ? "Validating & Resubmitting..." : "Submit Rectified Document"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Resolution Success Message */}
              {resolutionSuccess && (
                <div className="p-6 rounded-[22px] bg-[#edfce9] border border-[#a3e635]/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#16a34a] text-white mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-normal text-[#003c33]">
                    Micro-Deficiency Successfully Resolved!
                  </h3>
                  <p className="text-xs text-[#003c33]/80 max-w-md mx-auto leading-relaxed">
                    Your rectified document has passed AI optical recognition and has been moved
                    back to the desk officer&apos;s priority queue for final sign-off.
                  </p>
                  <div className="pt-2">
                    <Link href="/officer/scrutiny" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View in Officer Scrutiny Console
                    </Link>
                  </div>
                </div>
              )}

              {/* Provisional Approval Certificate Box */}
              {activeApp.current_stage === "PROVISIONALLY_APPROVED" && (
                <Card variant="canvas" className="bg-[#edfce9]/40 border border-[#a3e635]/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#003c33]">
                        Selection Board Provisional Sanction Active
                      </h3>
                      <p className="text-xs text-[#003c33]/70">
                        Fellowship approved under MoTA gazette guidelines. Awaiting next DBT batch cycle.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#a3e635]/40 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Grant Amount</span>
                      <p className="font-semibold text-[#1863dc]">
                        {activeApp.scheme_id === "NFST" ? "₹31,000 / month (JRF)" : "Full Tuition + £9,900"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">PFMS DBT Status</span>
                      <p className="font-semibold text-[#16a34a]">Aadhaar-NPCI Seeded</p>
                    </div>
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Next Milestone</span>
                      <p className="font-medium text-[#17171c]">Bi-annual Research Report</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      href="/officer/analytics"
                      className="text-xs text-[#1863dc] hover:underline flex items-center gap-1 font-mono"
                    >
                      View DBT Disbursement Batch Registry &rarr;
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#75758a] text-sm">
              Please enter an application ID above to track.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-sm text-[#75758a]">
          Loading Application Tracking Desk...
        </div>
      }
    >
      <TrackPageInner />
    </Suspense>
  );
}
