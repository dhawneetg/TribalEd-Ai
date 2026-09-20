"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Send,
  Eye,
  FileText,
  UserCheck,
  ShieldCheck,
  Building2,
  Clock,
  Layers,
} from "lucide-react";

export default function ScrutinyConsolePage() {
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [showElaOverlay, setShowElaOverlay] = useState<boolean>(false);
  const [showDeficiencyModal, setShowDeficiencyModal] = useState<boolean>(false);
  const [deficiencyRemark, setDeficiencyRemark] = useState<string>(
    "Income certificate scan has low resolution. Annual gross amount is ambiguous in section 4. Please re-upload a clear copy."
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Scrutiny metadata mock
  const docMetadata = {
    docType: "Income Certificate (JH-INC-2025)",
    applicantName: "Ramesh Chandra Munda",
    annualIncome: "₹ 2,40,000 / year",
    circleOffice: "Torpa, Khunti, Jharkhand",
    issueDate: "14/05/2025",
    serialNo: "JH/INC/2025/11094",
    tamperScore: 0.04,
    ocrConfidence: 0.94,
    trustLevel: "AI_Verified",
  };

  const handleSendDeficiency = () => {
    setStatusMessage("Deficiency notice dispatched via SMS/WhatsApp with 7-day countdown window.");
    setShowDeficiencyModal(false);
  };

  const handleApprove = () => {
    setStatusMessage("Document marked as Scrutinized & Approved by Desk Officer.");
  };

  return (
    <div className="min-h-screen bg-[#eeece7] text-[#212121] flex flex-col">
      <Navbar />

      {/* Scrutiny Header */}
      <div className="bg-white border-b border-[#e5e7eb] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="scheme">NFST SCHOLARSHIP</Badge>
          <span className="text-sm font-medium text-[#17171c]">
            Application ID: <span className="font-mono">APP-2026-NFST-0842</span>
          </span>
          <span className="text-xs text-[#75758a]">|</span>
          <span className="text-xs text-[#75758a]">Candidate: Ramesh Chandra Munda</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowDeficiencyModal(true)}>
            <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
            Flag Deficiency
          </Button>
          <Button size="sm" onClick={handleApprove}>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#edfce9]" />
            Approve Document
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="bg-[#edfce9] border-b border-[#a3e635]/40 text-[#003c33] text-xs px-6 py-2 flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="font-bold">&times;</button>
        </div>
      )}

      {/* 50/50 Dual-Pane Scrutiny Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* LEFT PANE: Interactive Document Canvas Viewer */}
        <div className="bg-[#17171c] rounded-[22px] p-4 flex flex-col justify-between overflow-hidden shadow-sm relative min-h-[520px]">
          {/* Viewer Toolbar */}
          <div className="flex items-center justify-between bg-[#27272a] rounded-xl px-4 py-2 text-white text-xs z-10">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#edfce9]" />
              <span>income_certificate_torpa.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 15))}
                className="p-1 hover:bg-[#3f3f46] rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 15))}
                className="p-1 hover:bg-[#3f3f46] rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1 hover:bg-[#3f3f46] rounded transition-colors ml-2"
                title="Rotate Clockwise"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowElaOverlay(!showElaOverlay)}
                className={`p-1.5 rounded text-[11px] font-mono transition-colors ml-2 flex items-center gap-1 ${
                  showElaOverlay ? "bg-[#ff7759] text-white" : "bg-[#3f3f46] text-[#d9d9dd]"
                }`}
                title="Toggle Error Level Analysis (Tamper Detection Heatmap)"
              >
                <Layers className="w-3.5 h-3.5" />
                ELA Heatmap
              </button>
            </div>
          </div>

          {/* Simulated Document Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
            <div
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transition: "transform 0.2s ease",
              }}
              className={`w-[360px] sm:w-[440px] bg-white rounded-lg shadow-2xl p-8 text-[#212121] relative border ${
                showElaOverlay ? "border-[#ff7759] shadow-red-900/30" : "border-[#d9d9dd]"
              }`}
            >
              {showElaOverlay && (
                <div className="absolute inset-0 bg-[#b30000]/10 backdrop-blur-[0.5px] rounded-lg pointer-events-none flex items-center justify-center">
                  <div className="bg-[#17171c]/90 text-white text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/20">
                    ELA Tamper Score: 0.04 (Uniform Compression • Authentic)
                  </div>
                </div>
              )}

              <div className="border-b-2 border-black pb-4 text-center">
                <div className="text-xs uppercase tracking-wider font-serif">Government of Jharkhand</div>
                <div className="text-sm font-bold uppercase mt-1">Office of the Circle Officer, Torpa</div>
                <div className="text-xs font-serif mt-1">Income & Asset Certificate</div>
              </div>

              <div className="mt-6 space-y-3 text-xs leading-relaxed font-serif">
                <p>
                  This is to certify that <strong>Shri Ramesh Chandra Munda</strong>, son of Shri Sukhram Munda,
                  resident of Village Khunti, District Khunti, Jharkhand.
                </p>
                <p>
                  Gross annual family income for the Financial Year <strong>2025-2026</strong> is assessed at:
                </p>
                <div className="p-3 bg-[#f2f2f2] rounded text-center text-sm font-bold font-mono">
                  ₹ 2,40,000/- (Two Lakhs Forty Thousand Rupees Only)
                </div>
                <p className="text-[11px] text-[#616161]">
                  Certificate Serial Number: JH/INC/2025/11094 • Issued on 14th May 2025
                </p>
              </div>

              <div className="mt-8 flex justify-between items-end pt-4 border-t border-[#e5e7eb] text-[10px]">
                <div>Digital Signature Verified</div>
                <div className="text-right font-mono font-bold">Circle Officer, Torpa</div>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-[#93939f] font-mono">
            {showElaOverlay
              ? "OpenCV Error Level Analysis Active: No pixel splicing detected."
              : "Raw 300 DPI Canvas Rendering (PDF.js Adapter)"}
          </div>
        </div>

        {/* RIGHT PANE: Structured Data Fields & Confidence Meters */}
        <div className="bg-white rounded-[22px] p-6 border border-[#e5e7eb] flex flex-col justify-between overflow-y-auto shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb]">
              <div>
                <span className="text-xs font-mono uppercase text-[#75758a]">Extracted Fields</span>
                <h3 className="text-lg font-normal text-[#17171c]">Key-Value OCR Scrutiny</h3>
              </div>
              <Badge variant="success" confidence={docMetadata.ocrConfidence}>
                94% OCR Confidence
              </Badge>
            </div>

            {/* Field Row 1: Candidate Name */}
            <div className="mt-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#75758a] font-mono uppercase">Candidate Name (OCR)</div>
                  <div className="text-sm font-medium text-[#17171c] mt-0.5">{docMetadata.applicantName}</div>
                </div>
                <Badge variant="success" confidence={0.98}>98% Match</Badge>
              </div>

              {/* Field Row 2: Annual Income */}
              <div className="p-3.5 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#75758a] font-mono uppercase">Assessed Gross Annual Income</div>
                  <div className="text-sm font-semibold text-[#1863dc] mt-0.5">{docMetadata.annualIncome}</div>
                  <span className="text-[11px] text-[#16a34a]">Below ₹6.0 LPA Ceiling for NFST</span>
                </div>
                <Badge variant="success" confidence={0.95}>95% Match</Badge>
              </div>

              {/* Field Row 3: Issuing Authority */}
              <div className="p-3.5 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#75758a] font-mono uppercase">Issuing Circle / Authority</div>
                  <div className="text-sm font-medium text-[#17171c] mt-0.5">{docMetadata.circleOffice}</div>
                </div>
                <Badge variant="warning" confidence={0.88}>88% Match</Badge>
              </div>

              {/* Field Row 4: Certificate Serial */}
              <div className="p-3.5 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#75758a] font-mono uppercase">Certificate Serial & Date</div>
                  <div className="text-sm font-mono text-[#17171c] mt-0.5">{docMetadata.serialNo} ({docMetadata.issueDate})</div>
                </div>
                <Badge variant="success" confidence={0.96}>96% Match</Badge>
              </div>
            </div>

            {/* Scheme Rule Verification Summary */}
            <div className="mt-6 p-4 rounded-xl border border-[#d9d9dd] bg-[#eeece7]/30 space-y-2">
              <span className="text-xs font-mono uppercase text-[#75758a]">Dynamic Rule Checks:</span>
              <div className="flex items-center justify-between text-xs">
                <span>NFST-R01: Caste verified via DigiLocker</span>
                <span className="text-[#16a34a] font-bold">PASS (100%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>NFST-R03: Income ≤ ₹6.0 LPA</span>
                <span className="text-[#16a34a] font-bold">PASS (₹2.4L &le; ₹6.0L)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>NFST-R04: Age ≤ 36 yrs</span>
                <span className="text-[#16a34a] font-bold">PASS (27 yrs)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-xs text-[#75758a] font-mono">Officer ID: MOTA-SCR-402</span>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowDeficiencyModal(true)}>
                Single-Click Deficiency
              </Button>
              <Button size="sm" onClick={handleApprove}>
                Sign Off & Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[22px] max-w-lg w-full p-6 space-y-4 shadow-xl border border-[#e5e7eb]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-normal text-[#17171c] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
                Dispatch Micro-Deficiency Notice
              </h3>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#616161]">
              The applicant will receive an SMS and WhatsApp notification with a deep-link to
              re-upload <strong>only this specific document</strong> within a 7-day window.
            </p>

            <div>
              <label className="block text-xs font-mono uppercase text-[#75758a] mb-1">
                Remediation Remarks
              </label>
              <textarea
                rows={4}
                value={deficiencyRemark}
                onChange={(e) => setDeficiencyRemark(e.target.value)}
                className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl p-3 text-xs focus:outline-none focus:border-[#1863dc]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-[#75758a]">Deadline: 7 Calendar Days</span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => setShowDeficiencyModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendDeficiency} className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Notice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
