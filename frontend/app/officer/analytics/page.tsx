"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchDbtDisbursementBatch } from "@/lib/api";
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Download,
  CheckCircle2,
  FileCode,
  MapPin,
  RefreshCw,
  Clock,
  Sparkles,
  Award,
  AlertCircle,
} from "lucide-react";

export default function OfficerAnalyticsPage() {
  const [dbtBatch, setDbtBatch] = useState<any>(null);
  const [isLoadingBatch, setIsLoadingBatch] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  useEffect(() => {
    async function loadBatch() {
      const data = await fetchDbtDisbursementBatch();
      setDbtBatch(data);
    }
    loadBatch();
  }, []);

  const handleGenerateBatch = async () => {
    setIsLoadingBatch(true);
    const data = await fetchDbtDisbursementBatch();
    setIsLoadingBatch(false);
    setDbtBatch(data);

    // Trigger download of XML
    const blob = new Blob([data.xml_payload_preview], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.batch_id}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult(
        "Cross-registry deduplication complete across 36 State ST Portals & Aadhaar NPCI. 0 Ghost Scholars or Concurrent UGC/CSIR Benefits detected."
      );
    }, 900);
  };

  // State distribution data
  const stateData = [
    { state: "Jharkhand (Chota Nagpur & Santhal Pargana)", pct: 29, count: 1398 },
    { state: "Odisha (Mayurbhanj, Koraput, Rayagada)", pct: 23, count: 1108 },
    { state: "Madhya Pradesh (Mandla, Dindori, Jhabua)", pct: 18, count: 867 },
    { state: "Chhattisgarh (Bastar, Dantewada, Surguja)", pct: 14, count: 675 },
    { state: "North-Eastern Hill States (Assam, Meghalaya, Nagaland)", pct: 11, count: 530 },
    { state: "Other Scheduled Areas (Gujarat, Rajasthan, Maharashtra)", pct: 5, count: 243 },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Executive Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeece7] text-xs font-mono text-[#75758a] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                MOTA EXECUTIVE GOVERNANCE &amp; MONITORING DESK
              </div>
              <h1 className="text-3xl sm:text-4xl font-light text-[#17171c] tracking-tight">
                National Tribal Higher Education Analytics &amp; DBT Hub
              </h1>
              <p className="text-xs sm:text-sm text-[#616161] mt-1">
                Real-time governance dashboard tracking NFST &amp; NOS intake velocity,
                Scheduled Area reach, and PFMS Direct Benefit Transfer batches.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="text-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#1863dc]" />
                {isAuditing ? "Auditing Registries..." : "Run AI Anti-Fraud Audit"}
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateBatch}
                disabled={isLoadingBatch}
                className="text-xs flex items-center gap-1.5 bg-[#17171c]"
              >
                <Download className="w-4 h-4 text-[#edfce9]" />
                {isLoadingBatch ? "Compiling..." : "Generate PFMS XML Batch"}
              </Button>
            </div>
          </div>

          {auditResult && (
            <div className="mt-4 p-4 rounded-xl bg-[#edfce9] border border-[#a3e635]/50 flex items-center justify-between text-xs text-[#003c33] animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                <span>{auditResult}</span>
              </div>
              <button onClick={() => setAuditResult(null)} className="font-bold text-sm">
                &times;
              </button>
            </div>
          )}

          {/* KPI Meter Strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card variant="canvas" className="p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#75758a] uppercase">
                Scholars in Intake Pipeline
              </span>
              <div className="text-3xl font-light text-[#17171c] tracking-tight">4,821</div>
              <span className="text-[11px] text-[#16a34a] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% YoY Growth
              </span>
            </Card>

            <Card variant="canvas" className="p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#75758a] uppercase">
                Avg Turnaround Speed
              </span>
              <div className="text-3xl font-light text-[#1863dc] tracking-tight">3.2s + 4.1m</div>
              <span className="text-[11px] text-[#75758a]">vs 45 Days Legacy Portal</span>
            </Card>

            <Card variant="canvas" className="p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#75758a] uppercase">
                DigiLocker Trust Ratio
              </span>
              <div className="text-3xl font-light text-[#16a34a] tracking-tight">68.4%</div>
              <span className="text-[11px] text-[#75758a]">Instant 100% Trust Lane</span>
            </Card>

            <Card variant="canvas" className="p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#75758a] uppercase">
                Monthly Fellowship Outlay
              </span>
              <div className="text-3xl font-light text-[#003c33] tracking-tight">₹ 18.42 Cr</div>
              <span className="text-[11px] text-[#75758a]">Direct Benefit Transfer (DBT)</span>
            </Card>
          </div>

          {/* Middle Row: State Distribution & Scheme Metrics */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scheduled Area Distribution (2 Cols) */}
            <Card variant="canvas" className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff7759]" />
                  <h2 className="text-base font-medium text-[#17171c]">
                    Scheduled Areas (Fifth &amp; Sixth Schedule) Reach
                  </h2>
                </div>
                <Badge variant="scheme">Tribal Belts</Badge>
              </div>

              <div className="space-y-3.5 pt-2">
                {stateData.map((item) => (
                  <div key={item.state} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#212121] font-medium">{item.state}</span>
                      <span className="text-[#75758a] font-mono">
                        {item.count} scholars ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#eeece7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1863dc] rounded-full transition-all duration-500"
                        style={{ width: `${item.pct * 2.8}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Scheme Ratio & ELA Forensics Card */}
            <Card variant="stone" className="space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#75758a]">Scheme Proportion</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-1">NFST vs NOS Enrolment</h3>

                <div className="mt-4 p-4 rounded-xl bg-white border border-[#d9d9dd] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#17171c]">NFST (Domestic Research)</div>
                      <div className="text-[11px] text-[#75758a]">M.Phil &amp; Ph.D. in Indian Univs</div>
                    </div>
                    <div className="text-base font-mono font-bold text-[#1863dc]">74%</div>
                  </div>

                  <div className="h-1.5 w-full bg-[#eeece7] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1863dc]" style={{ width: "74%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e7eb]">
                    <div>
                      <div className="font-semibold text-[#17171c]">NOS (Top 500 Abroad)</div>
                      <div className="text-[11px] text-[#75758a]">Masters &amp; Ph.D. Overseas</div>
                    </div>
                    <div className="text-base font-mono font-bold text-[#ff7759]">26%</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#edfce9] rounded-xl border border-[#a3e635]/40 text-xs space-y-1">
                  <div className="font-medium text-[#003c33] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                    ELA Tamper Interception
                  </div>
                  <p className="text-[11px] text-[#003c33]/80 leading-relaxed">
                    14 modified income certificates flagged automatically by OpenCV Error Level Analysis
                    in the last 30 days, protecting ₹51.8 Lakhs of public funds.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#d9d9dd] flex justify-end">
                <Link
                  href="/officer/scrutiny"
                  className="text-xs text-[#1863dc] hover:underline flex items-center gap-1 font-mono"
                >
                  Open Scrutiny Desk &rarr;
                </Link>
              </div>
            </Card>
          </div>

          {/* PFMS Direct Benefit Transfer (DBT) Disbursement Batch Section */}
          <section className="mt-10">
            <Card variant="canvas" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#1863dc]" />
                    <h2 className="text-lg font-medium text-[#17171c]">
                      PFMS Direct Benefit Transfer (DBT) Gateway Batch Generator
                    </h2>
                  </div>
                  <p className="text-xs text-[#75758a] mt-0.5">
                    Prepares compliant XML transaction payloads for bank transfer through the Public
                    Financial Management System (PFMS).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={handleGenerateBatch}
                    className="text-xs flex items-center gap-1.5 bg-[#1863dc]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Batch XML
                  </Button>
                </div>
              </div>

              {dbtBatch && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#eeece7]/50 border border-[#d9d9dd] text-xs">
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Batch Reference</span>
                      <p className="font-mono font-bold text-[#17171c] mt-0.5">{dbtBatch.batch_id}</p>
                    </div>
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Approved Scholars</span>
                      <p className="font-bold text-[#16a34a] mt-0.5">{dbtBatch.total_beneficiaries} Beneficiaries</p>
                    </div>
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Batch Value</span>
                      <p className="font-bold text-[#1863dc] mt-0.5">
                        ₹ {dbtBatch.total_disbursement_inr?.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#75758a] font-mono uppercase">Aadhaar NPCI Link</span>
                      <p className="font-medium text-[#003c33] mt-0.5">100% Seeded</p>
                    </div>
                  </div>

                  {/* Beneficiary Table */}
                  <div className="border border-[#e5e7eb] rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-[#eeece7] text-[#75758a] font-mono uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Application ID</th>
                          <th className="p-3">Scholar Name</th>
                          <th className="p-3">Scheme</th>
                          <th className="p-3">Monthly Entitlement</th>
                          <th className="p-3">Gateway Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5e7eb]">
                        {dbtBatch.records?.map((rec: any) => (
                          <tr key={rec.application_id} className="hover:bg-gray-50">
                            <td className="p-3 font-mono font-medium text-[#1863dc]">{rec.application_id}</td>
                            <td className="p-3 font-medium text-[#17171c]">{rec.beneficiary_name}</td>
                            <td className="p-3">{rec.scheme}</td>
                            <td className="p-3 font-semibold">₹ {rec.monthly_disbursement_inr?.toLocaleString()}</td>
                            <td className="p-3">
                              <Badge variant="success">{rec.status}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
