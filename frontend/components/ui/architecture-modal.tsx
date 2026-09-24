"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  ShieldCheck,
  Server,
  Database,
  Lock,
  FileCheck2,
  Cpu,
  Layers,
  HardDrive,
  Workflow,
  CheckCircle2,
  KeyRound,
  EyeOff,
  AlertCircle,
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "TOPOLOGY" | "SECURITY" | "STORAGE" | "PIPELINE";
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "TOPOLOGY",
}) => {
  const [activeTab, setActiveTab] = useState<"TOPOLOGY" | "SECURITY" | "STORAGE" | "PIPELINE">(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[22px] max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#e5e7eb] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#003c33] text-white flex items-center justify-center">
              <Server className="w-5 h-5 text-[#edfce9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-light text-[#17171c]">
                  System Architecture, Security &amp; Data Storage Design
                </h2>
                <Badge variant="scheme">SIH ID 26239</Badge>
              </div>
              <p className="text-xs text-[#75758a] mt-0.5">
                Technical Blueprint: Zero Raw Aadhaar, Sovereign DigiLocker, Dual-Tier Storage &amp; RBAC
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("TOPOLOGY")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "TOPOLOGY"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            System Topology (4-Tier)
          </button>
          <button
            onClick={() => setActiveTab("SECURITY")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "SECURITY"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
            Data Privacy &amp; Zero-Trust
          </button>
          <button
            onClick={() => setActiveTab("STORAGE")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "STORAGE"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Dual-Tier Storage Design
          </button>
          <button
            onClick={() => setActiveTab("PIPELINE")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "PIPELINE"
                ? "bg-[#17171c] text-white"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Document AI Pipeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm space-y-4">
          {/* TAB 1: SYSTEM TOPOLOGY */}
          {activeTab === "TOPOLOGY" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#eeece7]/40 rounded-[18px] border border-[#d9d9dd] space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#75758a]">High-Level Architecture</span>
                <p className="text-xs text-[#212121] leading-relaxed">
                  Sarthi follows a decoupled, air-gapped 4-Tier Enterprise Architecture separating
                  public applicant intake, authenticated government officer scrutiny, asynchronous AI processing,
                  and isolated cryptographic storage.
                </p>
              </div>

              {/* Visual Topology Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {/* Tier 1 */}
                <div className="p-4 rounded-xl bg-white border border-[#e5e7eb] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] uppercase font-bold">
                      Tier 1: Presentation
                    </span>
                    <h4 className="font-medium text-[#17171c] mt-2">Next.js 16 Web &amp; PWA</h4>
                    <ul className="text-[11px] text-[#616161] space-y-1 mt-2">
                      <li>• Applicant 1-Click Intake</li>
                      <li>• Proactive Near-Miss Feed</li>
                      <li>• 50/50 Dual-Pane Scrutiny</li>
                      <li>• Micro-Deficiency Portal</li>
                    </ul>
                  </div>
                  <div className="text-[10px] font-mono text-[#75758a] pt-2 border-t border-[#e5e7eb]">
                    HTTPS / TLS 1.3
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-4 rounded-xl bg-white border border-[#e5e7eb] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] uppercase font-bold">
                      Tier 2: Gateway &amp; Auth
                    </span>
                    <h4 className="font-medium text-[#17171c] mt-2">FastAPI API Gateway</h4>
                    <ul className="text-[11px] text-[#616161] space-y-1 mt-2">
                      <li>• JWT / RBAC Auth Guards</li>
                      <li>• DigiLocker OAuth2 Token</li>
                      <li>• Rate Limiting &amp; CORS</li>
                      <li>• Redis Task Queue Broker</li>
                    </ul>
                  </div>
                  <div className="text-[10px] font-mono text-[#75758a] pt-2 border-t border-[#e5e7eb]">
                    Stateless Microservices
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-4 rounded-xl bg-white border border-[#e5e7eb] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-[10px] uppercase font-bold">
                      Tier 3: AI Intelligence
                    </span>
                    <h4 className="font-medium text-[#17171c] mt-2">Document AI &amp; Rules</h4>
                    <ul className="text-[11px] text-[#616161] space-y-1 mt-2">
                      <li>• OpenCV ELA Tamper Engine</li>
                      <li>• PaddleOCR (En/Hi/State)</li>
                      <li>• LayoutLMv3 Key-Value Map</li>
                      <li>• Scheme Rule Executor</li>
                    </ul>
                  </div>
                  <div className="text-[10px] font-mono text-[#75758a] pt-2 border-t border-[#e5e7eb]">
                    Celery Worker Pools
                  </div>
                </div>

                {/* Tier 4 */}
                <div className="p-4 rounded-xl bg-white border border-[#e5e7eb] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] uppercase font-bold">
                      Tier 4: Persistence
                    </span>
                    <h4 className="font-medium text-[#17171c] mt-2">Postgres &amp; MinIO S3</h4>
                    <ul className="text-[11px] text-[#616161] space-y-1 mt-2">
                      <li>• PostgreSQL 16 (JSONB)</li>
                      <li>• AES-256 S3 Object Bucket</li>
                      <li>• Zero Raw Aadhaar Hash</li>
                      <li>• Append-Only Audit Log</li>
                    </ul>
                  </div>
                  <div className="text-[10px] font-mono text-[#75758a] pt-2 border-t border-[#e5e7eb]">
                    Air-Gapped Private VPC
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY & DATA PRIVACY */}
          {activeTab === "SECURITY" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#edfce9]/70 rounded-[18px] border border-[#a3e635]/40 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span className="font-semibold text-xs text-[#003c33] uppercase">
                    Direct Response to Judges: &ldquo;Why should a student upload data to Sarthi?&rdquo;
                  </span>
                </div>
                <p className="text-xs text-[#003c33]/90 leading-relaxed">
                  Sarthi is built on a <strong>Zero-Trust, Zero-Knowledge PII</strong> foundation complying with the{" "}
                  <strong>Section 29 of the Aadhaar Act (2016)</strong>,{" "}
                  <strong>Digital Personal Data Protection Act (DPDPA 2023)</strong>, and MeitY cloud standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#1863dc] font-semibold">
                    <EyeOff className="w-4 h-4" />
                    <span>1. Zero Raw Aadhaar Persistence</span>
                  </div>
                  <p className="text-[#616161] leading-relaxed text-[11px]">
                    The 12-digit Aadhaar number is <strong>never stored</strong> in our database. Sarthi computes
                    a salted SHA-256 cryptographic one-way hash (`sih2026_mota_salt`) and only displays
                    the masked last 4 digits (`XXXXXXXX8472`).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#16a34a] font-semibold">
                    <KeyRound className="w-4 h-4" />
                    <span>2. Sovereign DigiLocker Vault</span>
                  </div>
                  <p className="text-[#616161] leading-relaxed text-[11px]">
                    Instead of asking students to scan physical certificates, Sarthi connects via consent-based
                    DigiLocker OAuth2 tokens. The source of truth remains inside the government&apos;s sovereign
                    locker with an instant 100% trust score.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#75758a] font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>3. In-Transit &amp; At-Rest Encryption</span>
                  </div>
                  <p className="text-[#616161] leading-relaxed text-[11px]">
                    All network traffic is encrypted via <strong>TLS 1.3</strong>. Uploaded files are encrypted
                    at rest on MinIO Object Storage using <strong>AES-256 (Server-Side Encryption)</strong> with
                    time-limited pre-signed secure URLs.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-[#ff7759] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>4. Dynamic Officer Security Watermarks</span>
                  </div>
                  <p className="text-[#616161] leading-relaxed text-[11px]">
                    When desk officers inspect documents in the split-screen console, the canvas dynamically
                    overlays invisible and visible cryptographic watermarks with the officer&apos;s badge
                    (`MOTA-SCR-402`) &amp; timestamp to prevent data leakage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DUAL-TIER STORAGE */}
          {activeTab === "STORAGE" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#eeece7]/40 rounded-[18px] border border-[#d9d9dd] space-y-1">
                <span className="font-mono uppercase text-[#75758a] text-[11px]">Storage Architecture</span>
                <p className="text-[#212121]">
                  Structured business entities and binary document blobs are strictly decoupled into two
                  independent persistence layers to optimize performance, access control, and GDPR/DPDPA data isolation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Relational DB */}
                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold text-[#1863dc]">
                    <Database className="w-4 h-4" />
                    <span>Layer 1: PostgreSQL 16 (Relational &amp; JSONB)</span>
                  </div>
                  <p className="text-[11px] text-[#616161]">
                    Houses relational schemas, state machine transitions, and searchable metadata:
                  </p>
                  <ul className="space-y-1 text-[11px] font-mono text-[#212121] bg-[#f9f9fb] p-2.5 rounded-lg border border-[#e5e7eb]">
                    <li>• `users`: UUID, Salted_Aadhaar_Hash, Role, Masked_ID</li>
                    <li>• `applications`: UUID, Scheme_ID, Stage, Merit_Score</li>
                    <li>• `app_documents`: UUID, Doc_Type, Storage_URI, OCR_Data</li>
                    <li>• `deficiencies`: UUID, Issue_Desc, 7-Day Deadline</li>
                    <li>• `audit_logs`: Immutable Append-Only Ledger</li>
                  </ul>
                </div>

                {/* Object Storage */}
                <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold text-[#003c33]">
                    <HardDrive className="w-4 h-4" />
                    <span>Layer 2: MinIO / S3 Object Storage (AES-256)</span>
                  </div>
                  <p className="text-[11px] text-[#616161]">
                    Stores actual document scans, OCR bounding boxes, and OpenCV ELA matrices:
                  </p>
                  <div className="space-y-1 text-[11px] font-mono text-[#212121] bg-[#f9f9fb] p-2.5 rounded-lg border border-[#e5e7eb]">
                    <div className="text-gray-400"># Bucket URI Architecture:</div>
                    <div className="text-[#1863dc]">s3://mota-secure-vault/certs/</div>
                    <div className="pl-4">└── APP-2026-NFST-0842/</div>
                    <div className="pl-8 text-emerald-700">├── caste_cert_enc_aes256.pdf</div>
                    <div className="pl-8 text-emerald-700">├── income_cert_torpa.enc</div>
                    <div className="pl-8 text-purple-700">└── forensic_ela_matrix.json</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENT AI PIPELINE */}
          {activeTab === "PIPELINE" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#eeece7]/40 rounded-[18px] border border-[#d9d9dd] space-y-1">
                <span className="font-mono uppercase text-[#75758a] text-[11px]">Verification Pipeline</span>
                <p className="text-[#212121]">
                  How an uploaded certificate moves from raw scan to validated eligibility in under 3.5 seconds:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-[#75758a] uppercase">Stage 1: Pre-Processing</span>
                    <div className="font-medium text-[#17171c]">OpenCV Binarization &amp; 300 DPI Normalization</div>
                    <div className="text-[11px] text-[#616161]">Deskews low-quality smartphone photos, denoises faded background stamps.</div>
                  </div>
                  <Badge variant="scheme">0.4s</Badge>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-[#75758a] uppercase">Stage 2: Tamper Detection</span>
                    <div className="font-medium text-[#17171c]">Error Level Analysis (ELA) &amp; Splice Detection</div>
                    <div className="text-[11px] text-[#616161]">Analyzes JPEG compression error differences to detect photoshopped income digits.</div>
                  </div>
                  <Badge variant="scheme">0.8s</Badge>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-[#75758a] uppercase">Stage 3: Trilingual OCR</span>
                    <div className="font-medium text-[#17171c]">PaddleOCR &amp; LayoutLMv3 Key-Value Extraction</div>
                    <div className="text-[11px] text-[#616161]">Extracts Name, Father&apos;s Name, Issuing Circle, Serial Number, and Gross Amount.</div>
                  </div>
                  <Badge variant="scheme">1.4s</Badge>
                </div>

                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-[#75758a] uppercase">Stage 4: Rule Engine Execution</span>
                    <div className="font-medium text-[#17171c]">Declarative JSON Scheme Criteria Validation</div>
                    <div className="text-[11px] text-[#616161]">Validates Income ≤ ₹6.0L (NFST) or ₹8.0L (NOS), Age Caps, and Jaro-Winkler name match.</div>
                  </div>
                  <Badge variant="success">&le; 0.2s</Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] pt-4 flex items-center justify-between">
          <span className="text-xs text-[#75758a] font-mono">
            Government of India • Ministry of Tribal Affairs System Architecture
          </span>
          <Button onClick={onClose} size="sm">
            Close Architecture Desk
          </Button>
        </div>
      </div>
    </div>
  );
};
