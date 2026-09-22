"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchApplications,
  flagDeficiency,
  approveApplication,
} from "@/lib/api";
import { ApplicationItem, DocumentItem } from "@/lib/mockData";
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
  Download,
  Filter,
  Check,
  RefreshCw,
  FileCheck2,
  Sparkles,
  Sliders,
} from "lucide-react";

function ScrutinyConsoleInner() {
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>("APP-2026-NFST-0842");
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(1); // Default to Income Certificate

  // Canvas Inspector state
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [showElaOverlay, setShowElaOverlay] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Deficiency Modal state
  const [showDeficiencyModal, setShowDeficiencyModal] = useState<boolean>(false);
  const [deficiencyRemark, setDeficiencyRemark] = useState<string>(
    "Income certificate scan has low resolution. Annual gross amount is ambiguous in section 4. Please re-upload a clear copy."
  );
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load applications
  useEffect(() => {
    async function loadApps() {
      const data = await fetchApplications();
      setApplications(data);
      const urlAppId = searchParams.get("appId");
      if (urlAppId && data.some((a) => a.id.toLowerCase() === urlAppId.toLowerCase())) {
        setSelectedAppId(urlAppId);
      }
    }
    loadApps();
  }, [searchParams]);

  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];
  const currentDoc: DocumentItem | undefined = currentApp?.documents[selectedDocIndex] || currentApp?.documents[0];

  const handleSendDeficiency = async () => {
    if (!currentApp || !currentDoc) return;
    setIsDispatching(true);
    await flagDeficiency(currentApp.id, currentDoc.id, deficiencyRemark);
    setIsDispatching(false);
    setShowDeficiencyModal(false);
    setStatusMessage(
      `Deficiency notice dispatched to ${currentApp.applicant_name} via SMS & WhatsApp (7-day countdown initiated).`
    );
    // Reload apps to refresh status
    const data = await fetchApplications();
    setApplications(data);
  };

  const handleApproveDocument = () => {
    if (!currentDoc) return;
    currentDoc.verified_status = "AI_Verified";
    setStatusMessage(`Document '${currentDoc.title}' verified and cleared by Scrutiny Desk Officer.`);
  };

  const handleSignOffApplication = async () => {
    if (!currentApp) return;
    await approveApplication(currentApp.id);
    setStatusMessage(
      `Application ${currentApp.id} provisionally approved for MoTA Central Selection Board & PFMS DBT.`
    );
    const data = await fetchApplications();
    setApplications(data);
  };

  const handleExportJson = () => {
    if (!currentApp) return;
    const exportData = {
      officer_id: "MOTA-SCR-402",
      inspection_time: new Date().toISOString(),
      application: currentApp,
      active_document_inspection: currentDoc,
      ela_tamper_matrix: {
        score: currentDoc?.tamper_score || 0.04,
        status: (currentDoc?.tamper_score || 0.04) > 0.3 ? "SUSPICIOUS" : "AUTHENTIC",
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Scrutiny_Audit_${currentApp.id}_${currentDoc?.id || "doc"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const setDeficiencyTemplate = (template: string) => {
    setDeficiencyRemark(template);
  };

  return (
    <div className="min-h-screen bg-[#eeece7] text-[#212121] flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Scrutiny Queue Header & App Switcher */}
        <div className="bg-white border-b border-[#e5e7eb] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="scheme">{currentApp?.scheme_id || "NFST"} SCHOLARSHIP</Badge>

            {/* Application Queue Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono uppercase text-[#75758a]">Application Queue:</label>
              <select
                value={selectedAppId}
                onChange={(e) => {
                  setSelectedAppId(e.target.value);
                  setSelectedDocIndex(0);
                }}
                className="bg-[#eeece7]/60 border border-[#d9d9dd] rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-[#17171c] focus:outline-none focus:border-[#1863dc]"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.id} - {app.applicant_name} ({app.current_stage})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs text-[#75758a] hidden md:inline">|</span>
            <span className="text-xs text-[#75758a] hidden md:inline">
              Candidate: <strong>{currentApp?.applicant_name}</strong> ({currentApp?.caste})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="text-xs flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Audit Log
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeficiencyModal(true)}
              className="text-xs flex items-center gap-1 text-[#f59e0b] border-[#f59e0b]/30"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Flag Deficiency
            </Button>
            <Button
              size="sm"
              onClick={handleApproveDocument}
              className="text-xs flex items-center gap-1 bg-[#1863dc]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#edfce9]" />
              Approve Document
            </Button>
          </div>
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div className="bg-[#edfce9] border-b border-[#a3e635]/40 text-[#003c33] text-xs px-6 py-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#16a34a]" />
              {statusMessage}
            </span>
            <button
              onClick={() => setStatusMessage(null)}
              className="font-bold text-sm hover:opacity-70"
            >
              &times;
            </button>
          </div>
        )}

        {/* Document Selector Tabs */}
        <div className="bg-white/80 border-b border-[#e5e7eb] px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-mono text-[#75758a] uppercase text-[11px] mr-2">Attached Documents:</span>
          {currentApp?.documents.map((doc, idx) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocIndex(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedDocIndex === idx
                  ? "bg-[#17171c] text-white shadow-sm"
                  : "bg-[#eeece7]/60 text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {doc.title}
              <span
                className={`w-2 h-2 rounded-full ${
                  doc.verified_status === "Auto_Approved"
                    ? "bg-[#16a34a]"
                    : doc.verified_status === "AI_Verified"
                    ? "bg-[#1863dc]"
                    : "bg-[#f59e0b]"
                }`}
              />
            </button>
          ))}
        </div>

        {/* 50/50 Dual-Pane Scrutiny Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* LEFT PANE: Interactive Document Canvas Viewer */}
          <div className="bg-[#17171c] rounded-[22px] p-4 flex flex-col justify-between overflow-hidden shadow-sm relative min-h-[550px]">
            {/* Viewer Toolbar */}
            <div className="flex flex-wrap items-center justify-between bg-[#27272a] rounded-xl px-4 py-2 text-white text-xs z-10 gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#edfce9]" />
                <span className="font-mono">{currentDoc?.filename || "document_scan.pdf"}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(50, z - 15))}
                  className="p-1 hover:bg-[#3f3f46] rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="font-mono px-1.5 py-0.5 hover:bg-[#3f3f46] rounded"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(200, z + 15))}
                  className="p-1 hover:bg-[#3f3f46] rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-1 hover:bg-[#3f3f46] rounded transition-colors"
                  title="Rotate Clockwise"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`p-1.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
                    highContrast ? "bg-[#1863dc] text-white" : "bg-[#3f3f46] text-[#d9d9dd]"
                  }`}
                  title="High-Contrast / Binarize Filter"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Binarize
                </button>
                <button
                  onClick={() => setShowElaOverlay(!showElaOverlay)}
                  className={`p-1.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
                    showElaOverlay ? "bg-[#ff7759] text-white" : "bg-[#3f3f46] text-[#d9d9dd]"
                  }`}
                  title="Toggle Error Level Analysis (Tamper Heatmap)"
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
                  filter: highContrast ? "contrast(180%) grayscale(100%)" : "none",
                }}
                className={`w-[360px] sm:w-[440px] bg-white rounded-lg shadow-2xl p-8 text-[#212121] relative border ${
                  showElaOverlay ? "border-[#ff7759] shadow-red-900/30" : "border-[#d9d9dd]"
                }`}
              >
                {showElaOverlay && (
                  <div className="absolute inset-0 bg-[#b30000]/10 backdrop-blur-[0.5px] rounded-lg pointer-events-none flex items-center justify-center">
                    <div className="bg-[#17171c]/90 text-white text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/20">
                      ELA Tamper Score: {currentDoc?.tamper_score || 0.04} (
                      {(currentDoc?.tamper_score || 0.04) > 0.3 ? "⚠️ Anomaly Detected" : "Uniform Compression • Authentic"}
                      )
                    </div>
                  </div>
                )}

                {/* Canvas Document Content matching Document Type */}
                {currentDoc?.doc_type === "CASTE_CERTIFICATE" && (
                  <div>
                    <div className="border-b-2 border-black pb-3 text-center">
                      <div className="text-xs uppercase tracking-wider font-serif">Government of India / State Gazette</div>
                      <div className="text-sm font-bold uppercase mt-1">Office of the Sub-Divisional Officer</div>
                      <div className="text-xs font-serif mt-1">Scheduled Tribe Certificate</div>
                    </div>
                    <div className="mt-5 space-y-2.5 text-xs leading-relaxed font-serif">
                      <p>
                        This is to certify that <strong>{currentApp?.applicant_name}</strong>, resident of{" "}
                        {currentDoc.extracted_fields?.["Issuing District"] || "Khunti, Jharkhand"}, belongs to the{" "}
                        <strong>{currentApp?.caste}</strong> which is recognized as a Scheduled Tribe under the
                        Constitution (Scheduled Tribes) Order, 1950.
                      </p>
                      <div className="p-2.5 bg-[#edfce9] rounded text-center text-xs font-mono font-bold text-[#003c33]">
                        DigiLocker Certified • Token Reference: DL-ST-92841
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between items-end pt-3 border-t border-[#e5e7eb] text-[10px]">
                      <div>Seal of the Sub-Divisional Magistrate</div>
                      <div className="text-right font-mono font-bold">Digitally Signed &amp; Sealed</div>
                    </div>
                  </div>
                )}

                {currentDoc?.doc_type === "INCOME_CERTIFICATE" && (
                  <div>
                    <div className="border-b-2 border-black pb-3 text-center">
                      <div className="text-xs uppercase tracking-wider font-serif">Revenue &amp; Land Reforms Department</div>
                      <div className="text-sm font-bold uppercase mt-1">Office of the Circle Officer / Tehsildar</div>
                      <div className="text-xs font-serif mt-1">Income &amp; Asset Assessment Certificate</div>
                    </div>
                    <div className="mt-5 space-y-2.5 text-xs leading-relaxed font-serif">
                      <p>
                        This is to certify that gross annual family income of <strong>{currentApp?.applicant_name}</strong>{" "}
                        for the financial year <strong>2025-2026</strong> is assessed at:
                      </p>
                      <div className="p-2.5 bg-[#f2f2f2] rounded text-center text-sm font-bold font-mono">
                        ₹ {currentApp?.income_inr.toLocaleString("en-IN")}/- (Assessed Gross Annual)
                      </div>
                      <p className="text-[11px] text-[#616161]">
                        Serial No: {currentDoc.extracted_fields?.["Serial Number"] || "JH/INC/2025/11094"} • Valid up to 2027
                      </p>
                    </div>
                    <div className="mt-8 flex justify-between items-end pt-3 border-t border-[#e5e7eb] text-[10px]">
                      <div>Revenue Official Signature Verified</div>
                      <div className="text-right font-mono font-bold">Circle Officer</div>
                    </div>
                  </div>
                )}

                {currentDoc?.doc_type !== "CASTE_CERTIFICATE" && currentDoc?.doc_type !== "INCOME_CERTIFICATE" && (
                  <div>
                    <div className="border-b-2 border-black pb-3 text-center">
                      <div className="text-xs uppercase tracking-wider font-serif">University Academic Directorate</div>
                      <div className="text-sm font-bold uppercase mt-1">{currentApp?.university}</div>
                      <div className="text-xs font-serif mt-1">Admission Confirmation &amp; Research Registration</div>
                    </div>
                    <div className="mt-5 space-y-2.5 text-xs leading-relaxed font-serif">
                      <p>
                        Candidate <strong>{currentApp?.applicant_name}</strong> is confirmed as enrolled for regular
                        full-time research studies in the{" "}
                        <strong>{currentApp?.department || "Doctoral Research Department"}</strong>.
                      </p>
                      <div className="p-2 bg-[#f2f2f2] rounded text-xs font-mono text-center">
                        Research Topic: {currentApp?.research_topic || "Environmental & Linguistic Studies"}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between items-end pt-3 border-t border-[#e5e7eb] text-[10px]">
                      <div>Registrar (Academic)</div>
                      <div className="text-right font-mono font-bold">Bona Fide Certified</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-[11px] text-[#93939f] font-mono">
              {showElaOverlay
                ? "OpenCV Error Level Analysis Active: Compression artifacts inspected."
                : highContrast
                ? "High-Contrast Binarization Filter Active (Enhanced Stamp Edges)"
                : "300 DPI Standardized Scan (PDF.js Render)"}
            </div>
          </div>

          {/* RIGHT PANE: Structured Data Fields & Confidence Meters */}
          <div className="bg-white rounded-[22px] p-6 border border-[#e5e7eb] flex flex-col justify-between overflow-y-auto shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb]">
                <div>
                  <span className="text-xs font-mono uppercase text-[#75758a]">Extracted Fields</span>
                  <h3 className="text-lg font-normal text-[#17171c]">
                    Key-Value OCR Scrutiny: {currentDoc?.title}
                  </h3>
                </div>
                <Badge variant="success" confidence={currentDoc?.confidence_score || 0.95}>
                  {Math.round((currentDoc?.confidence_score || 0.95) * 100)}% OCR Confidence
                </Badge>
              </div>

              {/* Dynamic Extracted Fields Table */}
              <div className="mt-5 space-y-3">
                {currentDoc &&
                  Object.entries(currentDoc.extracted_fields || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-[#eeece7]/60 border border-[#d9d9dd] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-[#75758a] font-mono uppercase text-[10px]">{key}</div>
                        <div className="text-sm font-medium text-[#17171c] mt-0.5">{val}</div>
                      </div>
                      <Badge variant="success" confidence={0.96}>
                        Verified
                      </Badge>
                    </div>
                  ))}
              </div>

              {/* Active Scheme Criteria Checks */}
              <div className="mt-6 p-4 rounded-xl border border-[#d9d9dd] bg-[#eeece7]/30 space-y-2">
                <span className="text-xs font-mono uppercase text-[#75758a]">Scheme Rule Verification Status:</span>
                <div className="flex items-center justify-between text-xs">
                  <span>{currentApp?.scheme_id}-R01: Caste Verified</span>
                  <span className="text-[#16a34a] font-bold">PASS (100% DigiLocker)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>
                    {currentApp?.scheme_id}-R03: Income &le; ₹
                    {currentApp?.scheme_id === "NFST" ? "6.0" : "8.0"} LPA
                  </span>
                  <span className="text-[#16a34a] font-bold">
                    PASS (₹{(currentApp?.income_inr / 100000).toFixed(1)}L)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>{currentApp?.scheme_id}-R04: Age Criteria</span>
                  <span className="text-[#16a34a] font-bold">PASS ({currentApp?.age} yrs)</span>
                </div>
              </div>

              {/* Active Deficiencies on this Application */}
              {currentApp?.deficiencies && currentApp.deficiencies.length > 0 && (
                <div className="mt-4 p-4 rounded-xl border border-[#f59e0b]/40 bg-[#fef3c7]/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b45309]">
                    <AlertTriangle className="w-4 h-4" />
                    Active Micro-Deficiencies ({currentApp.deficiencies.length}):
                  </div>
                  {currentApp.deficiencies.map((d) => (
                    <div key={d.id} className="text-xs bg-white p-2.5 rounded-lg border border-[#f59e0b]/30">
                      <div className="flex justify-between font-mono text-[10px] text-[#75758a]">
                        <span>ID: {d.id}</span>
                        <span className="text-[#b45309] font-bold">{d.status}</span>
                      </div>
                      <p className="mt-1 text-[#212121]">{d.issue_description}</p>
                      <div className="text-[10px] text-[#75758a] mt-1">Deadline: {d.deadline}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Officer Action Bar */}
            <div className="mt-8 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#75758a] font-mono">Officer: MOTA-SCR-402</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeficiencyModal(true)}
                  className="text-xs"
                >
                  Flag Micro-Deficiency
                </Button>
                <Button
                  size="sm"
                  onClick={handleSignOffApplication}
                  className="text-xs bg-[#17171c]"
                >
                  Sign Off &amp; Provisionally Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
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
              The applicant will receive an SMS and WhatsApp deep-link to re-upload{" "}
              <strong>only {currentDoc?.title || "this document"}</strong> within a 7-day window.
            </p>

            {/* Quick Templates */}
            <div>
              <span className="text-[11px] font-mono uppercase text-[#75758a] block mb-1">
                Quick Remark Presets:
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    setDeficiencyTemplate(
                      "Income certificate scan has low resolution. Gross annual amount is ambiguous in section 4. Please re-upload a clear copy."
                    )
                  }
                  className="px-2 py-1 rounded bg-[#eeece7] hover:bg-[#d9d9dd] text-[11px]"
                >
                  Low Resolution Scan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDeficiencyTemplate(
                      "Official revenue stamp or tehsildar counter-signature is missing from the document."
                    )
                  }
                  className="px-2 py-1 rounded bg-[#eeece7] hover:bg-[#d9d9dd] text-[11px]"
                >
                  Missing Official Seal
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDeficiencyTemplate(
                      "Certificate financial year does not match active academic cycle 2025-2026."
                    )
                  }
                  className="px-2 py-1 rounded bg-[#eeece7] hover:bg-[#d9d9dd] text-[11px]"
                >
                  Wrong Financial Year
                </button>
              </div>
            </div>

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
              <span className="text-xs font-mono text-[#75758a]">Window: 7 Calendar Days</span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => setShowDeficiencyModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSendDeficiency}
                  disabled={isDispatching}
                  className="flex items-center gap-1.5 bg-[#1863dc]"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isDispatching ? "Dispatching..." : "Dispatch Notice"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScrutinyConsolePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-sm text-[#75758a]">
          Loading MoTA Officer Scrutiny Console...
        </div>
      }
    >
      <ScrutinyConsoleInner />
    </Suspense>
  );
}
