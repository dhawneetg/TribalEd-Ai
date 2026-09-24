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
  GitBranch,
  ArrowRight,
  ArrowDown,
  Copy,
  Check,
  Sparkles,
  Code,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "TOPOLOGY" | "FLOWCHARTS" | "SECURITY" | "STORAGE" | "PIPELINE";
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "TOPOLOGY",
}) => {
  const [activeTab, setActiveTab] = useState<"TOPOLOGY" | "FLOWCHARTS" | "SECURITY" | "STORAGE" | "PIPELINE">(defaultTab);
  const [activeFlowchart, setActiveFlowchart] = useState<"SYSTEM" | "SECURITY" | "STORAGE" | "NEARMISS">("SYSTEM");
  const [flowchartViewMode, setFlowchartViewMode] = useState<"VISUAL" | "MERMAID">("VISUAL");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[22px] max-w-5xl w-full p-5 sm:p-7 space-y-5 shadow-2xl border border-[#e5e7eb] max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#003c33] text-white flex items-center justify-center shrink-0">
              <Server className="w-5 h-5 text-[#edfce9]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
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
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-[#e5e7eb] pb-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("TOPOLOGY")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "TOPOLOGY"
                ? "bg-[#17171c] text-white shadow-sm"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            System Topology
          </button>
          <button
            onClick={() => setActiveTab("FLOWCHARTS")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "FLOWCHARTS"
                ? "bg-[#003c33] text-[#edfce9] shadow-sm font-semibold"
                : "text-[#003c33] bg-[#edfce9]/60 hover:bg-[#edfce9] border border-[#a3e635]/30"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-[#16a34a]" />
            Visual Flowcharts 📊
          </button>
          <button
            onClick={() => setActiveTab("SECURITY")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "SECURITY"
                ? "bg-[#17171c] text-white shadow-sm"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
            Data Privacy &amp; Zero-Trust
          </button>
          <button
            onClick={() => setActiveTab("STORAGE")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "STORAGE"
                ? "bg-[#17171c] text-white shadow-sm"
                : "text-[#616161] hover:bg-[#eeece7]"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Dual-Tier Storage
          </button>
          <button
            onClick={() => setActiveTab("PIPELINE")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "PIPELINE"
                ? "bg-[#17171c] text-white shadow-sm"
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

          {/* TAB: FLOWCHARTS & VISUAL ARCHITECTURE */}
          {activeTab === "FLOWCHARTS" && (
            <div className="space-y-4">
              {/* Top Sub-Bar: Flowchart Selector & View Mode Switcher */}
              <div className="p-3 bg-[#eeece7]/50 rounded-[18px] border border-[#d9d9dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono uppercase text-[#75758a] mr-1">Select Flow:</span>
                  <button
                    onClick={() => setActiveFlowchart("SYSTEM")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium ${
                      activeFlowchart === "SYSTEM"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    1. End-to-End System
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("SECURITY")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium ${
                      activeFlowchart === "SECURITY"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    2. Zero-Trust Security
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("STORAGE")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium ${
                      activeFlowchart === "STORAGE"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    3. Dual-Tier Storage
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("NEARMISS")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium ${
                      activeFlowchart === "NEARMISS"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    4. Near-Miss Engine
                  </button>
                </div>

                {/* View Mode Toggle & Copy Button */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <div className="flex items-center bg-white rounded-full p-0.5 border border-[#e5e7eb] text-[11px]">
                    <button
                      onClick={() => setFlowchartViewMode("VISUAL")}
                      className={`px-2.5 py-1 rounded-full transition-all font-medium ${
                        flowchartViewMode === "VISUAL"
                          ? "bg-[#003c33] text-white"
                          : "text-[#616161] hover:text-[#17171c]"
                      }`}
                    >
                      Visual Flow
                    </button>
                    <button
                      onClick={() => setFlowchartViewMode("MERMAID")}
                      className={`px-2.5 py-1 rounded-full transition-all font-medium flex items-center gap-1 ${
                        flowchartViewMode === "MERMAID"
                          ? "bg-[#003c33] text-white"
                          : "text-[#616161] hover:text-[#17171c]"
                      }`}
                    >
                      <Code className="w-3 h-3" />
                      Mermaid Code
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const codes = {
                        SYSTEM: `graph TD
    subgraph INTAKE ["1. Intake & Opportunity Discovery"]
        A[Tribal Scholar Profile Registration] --> B[Proactive Near-Miss Matcher]
        B --> C[DigiLocker Consent & OAuth2 Sync]
    end

    subgraph GATEWAY ["2. Gateway & Security Controls"]
        C --> D[FastAPI Gateway over TLS 1.3]
        D --> E[JWT & RBAC Auth Verification]
        D --> F[Redis Rate Limiting & Input Sanitizer]
    end

    subgraph WORKERS ["3. Asynchronous Forensic AI Engine"]
        D --> G[OpenCV 300 DPI Pre-Processing]
        G --> H[Error Level Analysis ELA Tamper Engine]
        H --> I[Trilingual PaddleOCR & LayoutLMv3]
        I --> J[Gazette Rules Validator & Near-Miss Evaluator]
    end

    subgraph STORAGE ["4. Dual-Tier Persistence"]
        J --> K[(PostgreSQL 16: Metadata & JSONB Rules)]
        H --> L[(MinIO S3: AES-256 Encrypted Blobs)]
    end

    subgraph DESK ["5. Officer Scrutiny & DBT Disbursement"]
        K --> M[50/50 Dual-Pane Split Console]
        L --> M
        M --> N[Tamper-Proof Watermarked Canvas View]
        N --> O{Officer Decision}
        O -->|Approve| P[PFMS DBT Batch Disbursement]
        O -->|Deficiency| Q[7-Day Micro-Deficiency Remediation]
    end`,
                        SECURITY: `sequenceDiagram
    autonumber
    actor Scholar as Tribal Scholar
    participant Web as Sarthi Web App
    participant API as FastAPI Gateway
    participant Crypt as Salted SHA-256 Hasher
    participant S3 as MinIO Encrypted S3
    participant DB as PostgreSQL 16 DB
    actor Officer as MoTA Desk Officer

    Scholar->>Web: Enters 12-Digit Aadhaar / Connects DigiLocker
    Web->>API: Transmits over Encrypted TLS 1.3
    API->>Crypt: Computes Salted SHA-256 Hash
    Note over API,Crypt: Section 29 Aadhaar Act: Raw 12 digits purged immediately
    API->>DB: Stores Hash + Masked Aadhaar (XXXXXXXX8472)
    Scholar->>Web: Uploads Supporting Documents / Certs
    Web->>API: Multipart Binary Stream
    API->>S3: Encrypts with AES-256 (Server-Side Encryption)
    API->>DB: Links Document S3 URI & Metadata
    Officer->>API: Requests Verification Workspace
    API->>DB: Validates JWT & Officer RBAC Permissions
    API->>S3: Generates 15-Minute Ephemeral Pre-signed URL
    API-->>Officer: Streams Watermarked Canvas (Badge: MOTA-SCR-402, IP, Timestamp)
    Note over Officer,API: Canvas watermark prevents screen-scraping & data leaks`,
                        STORAGE: `graph TD
    A[Incoming Certificate / Application Payload] --> B{Sarthi Gateway Ingestion Router}
    
    subgraph TIER_A ["Tier A: Relational Metadata (PostgreSQL 16)"]
        B -->|Structured Data| C[users: UUID, Salted_Aadhaar_Hash, Role]
        B -->|State Machine| D[applications: Status, Stage, Merit_Score]
        B -->|Field Data| E[app_documents: OCR_JSONB, Tamper_Score, S3_URI]
        B -->|Remediation| F[deficiencies: Doc_ID, 7-Day_Deadline, Status]
        B -->|Compliance| G[audit_logs: Officer_ID, Action, IP, Timestamp]
    end

    subgraph TIER_B ["Tier B: Encrypted Binary Scans (MinIO S3 Vault)"]
        B -->|Encrypted Scans| H[s3://mota-secure-vault/certs/APP-2026-NFST-0842/]
        H --> I[caste_cert_enc_aes256.pdf (DigiLocker Linked)]
        H --> J[income_cert_torpa.enc (AES-256 Encrypted Scans)]
        H --> K[forensic_ela_matrix.json (OpenCV Tamper Grid)]
    end

    subgraph TIER_C ["Tier C: Ephemeral Cache (Redis 7)"]
        B -->|Session Tokens| L[15-Minute Pre-Signed URL Nonces]
        B -->|Rate Limits| M[IP & Officer Request Throttling]
    end`,
                        NEARMISS: `graph TD
    A[Tribal Scholar Unified Profile] --> B[Eligibility Criteria Evaluator]
    
    subgraph SCHEME_RULES ["Gazette Scheme Rule Matrix"]
        B --> C{NFST: Fellowship}
        B --> D{NOS: Overseas Study}
        B --> E{Top Class ST Higher Ed}
    end

    C -->|ST + PG Degree + Income <= 6.0L| F[100% Fully Eligible]
    C -->|ST + PG Degree + Missing Income Doc| G[90% Near-Miss: Document Deficit]
    C -->|Income 6.2L > 6.0L Cap| H[80% Near-Miss: Income Threshold Alert]

    F --> I[Direct 1-Click Priority Application]
    G --> J[Proactive Alert: Missing Income Certificate from Torpa Circle]
    H --> K[Alternative Pathway: Top Class ST with 8.0L Cap Suggested]

    J --> L[Automated 48-Hour Deadline Reminders via SMS & Web Alert]`,
                      };
                      handleCopy(codes[activeFlowchart], activeFlowchart);
                    }}
                    className="p-1.5 rounded-lg border border-[#e5e7eb] bg-white hover:bg-gray-50 text-gray-600 transition-colors flex items-center gap-1 text-[11px]"
                    title="Copy Mermaid Code for Presentation"
                  >
                    {copiedCode === activeFlowchart ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Mermaid</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* FLOWCHART 1: END-TO-END SYSTEM LIFECYCLE */}
              {activeFlowchart === "SYSTEM" && (
                <div className="space-y-4">
                  {/* Context Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-[#edfce9] to-[#eeece7]/40 rounded-xl border border-[#a3e635]/40 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#003c33] flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-[#16a34a]" />
                        End-to-End System &amp; Data Pipeline Architecture
                      </div>
                      <p className="text-[11px] text-[#003c33]/80 mt-0.5">
                        Follows the complete student journey: 1-click discovery → DigiLocker sync → async forensic AI → 50/50 scrutiny → PFMS DBT disbursement.
                      </p>
                    </div>
                    <Badge variant="scheme" className="shrink-0">Latency: &le; 3.5s</Badge>
                  </div>

                  {flowchartViewMode === "VISUAL" ? (
                    <div className="space-y-3">
                      {/* Step 1 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-[#1863dc]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            01
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">Tribal Scholar Intake &amp; Near-Miss Discovery</h4>
                              <Badge variant="neutral" className="text-[10px]">Tier 1: Presentation</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              Student registers once (Course, Year, Branch, State, ST Category, PVTG status). The engine instantly evaluates matching opportunities and highlights <strong>Near-Miss</strong> gaps (e.g. 1 document missing or 48h deadline).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-gray-100">Next.js 16</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">PWA</span>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 2 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-[#16a34a]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            02
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">Sovereign DigiLocker Priority Lane (ADR-001)</h4>
                              <Badge variant="success" className="text-[10px]">100% Trust Score</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              Instead of asking students to scan physical caste/income papers, Sarthi requests verified digital certificates directly from sovereign government DigiLocker servers via ephemeral OAuth2 tokens.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Gov Sovereign API</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">TLS 1.3</span>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 3 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-[#ff7759]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            03
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">FastAPI Gateway, JWT RBAC &amp; Rate Limiter</h4>
                              <Badge variant="neutral" className="text-[10px]">Tier 2: Gateway</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              Enforces role-based guards (`Student`, `Desk Officer`, `Super Admin`). Redis limits brute-force submissions. Aadhaar is salted &amp; hashed in volatile memory; raw 12 digits are immediately cleared.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700">FastAPI</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">Redis 7</span>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 4 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-purple-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            04
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">Asynchronous Forensic &amp; Trilingual OCR Pipeline</h4>
                              <Badge variant="scheme" className="text-[10px]">Tier 3: AI Intelligence</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              OpenCV Error Level Analysis (ELA) flags digitally modified income amounts; trilingual PaddleOCR extracts Name, Category, Income, and Circle; Scheme Rule Engine verifies gazette thresholds.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700">OpenCV ELA</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">PaddleOCR</span>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 5 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-amber-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            05
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">Dual-Tier Air-Gapped Storage Commit</h4>
                              <Badge variant="neutral" className="text-[10px]">Tier 4: Persistence</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              Relational metadata and JSONB rules are committed to PostgreSQL 16. Raw scans are saved in private MinIO/S3 buckets with AES-256 Server-Side Encryption and private bucket policies.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800">PostgreSQL 16</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">AES-256 S3</span>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 6 */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:border-emerald-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                            06
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#17171c] text-xs">Officer 50/50 Dual Pane Scrutiny &amp; PFMS DBT</h4>
                              <Badge variant="success" className="text-[10px]">Decision &amp; Payout</Badge>
                            </div>
                            <p className="text-[11px] text-[#616161] mt-1 leading-relaxed">
                              Desk Officer inspects high-res scans on a tamper-proof watermarked canvas (`MOTA-SCR-402`). 1-click Approval triggers PFMS DBT batch disbursement; incomplete applications receive a 7-day Micro-Deficiency SMS link.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono text-[10px] text-[#75758a]">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">PFMS DBT</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100">Audit Ledger</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Mermaid Code Block */
                    <div className="space-y-2">
                      <div className="p-3 bg-[#17171c] text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                        <pre>{`graph TD
    subgraph INTAKE ["1. Intake & Opportunity Discovery"]
        A[Tribal Scholar Profile Registration] --> B[Proactive Near-Miss Matcher]
        B --> C[DigiLocker Consent & OAuth2 Sync]
    end

    subgraph GATEWAY ["2. Gateway & Security Controls"]
        C --> D[FastAPI Gateway over TLS 1.3]
        D --> E[JWT & RBAC Auth Verification]
        D --> F[Redis Rate Limiting & Input Sanitizer]
    end

    subgraph WORKERS ["3. Asynchronous Forensic AI Engine"]
        D --> G[OpenCV 300 DPI Pre-Processing]
        G --> H[Error Level Analysis ELA Tamper Engine]
        H --> I[Trilingual PaddleOCR & LayoutLMv3]
        I --> J[Gazette Rules Validator & Near-Miss Evaluator]
    end

    subgraph STORAGE ["4. Dual-Tier Persistence"]
        J --> K[(PostgreSQL 16: Metadata & JSONB Rules)]
        H --> L[(MinIO S3: AES-256 Encrypted Blobs)]
    end

    subgraph DESK ["5. Officer Scrutiny & DBT Disbursement"]
        K --> M[50/50 Dual-Pane Split Console]
        L --> M
        M --> N[Tamper-Proof Watermarked Canvas View]
        N --> O{Officer Decision}
        O -->|Approve| P[PFMS DBT Batch Disbursement]
        O -->|Deficiency| Q[7-Day Micro-Deficiency Remediation]
    end`}</pre>
                      </div>
                      <p className="text-[10px] text-[#75758a] font-mono">
                        💡 Tip: Click &quot;Copy Mermaid&quot; above to paste this directly into GitHub, Notion, or your hackathon slide deck.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* FLOWCHART 2: ZERO-TRUST SECURITY & PII FLOW */}
              {activeFlowchart === "SECURITY" && (
                <div className="space-y-4">
                  {/* Context Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-[#edfce9] to-[#eeece7]/40 rounded-xl border border-[#a3e635]/40 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#003c33] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                        Zero-Trust Security &amp; PII Isolation Sequence
                      </div>
                      <p className="text-[11px] text-[#003c33]/80 mt-0.5">
                        Guarantees Section 29 Aadhaar Act &amp; DPDPA 2023 compliance. Raw Aadhaar is never saved, scans are AES-256 encrypted, canvas is dynamically watermarked.
                      </p>
                    </div>
                    <Badge variant="success" className="shrink-0">Aadhaar Act Sec 29</Badge>
                  </div>

                  {flowchartViewMode === "VISUAL" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Security Card 1 */}
                      <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold uppercase">Step 1: Input &amp; TLS 1.3</span>
                          <Lock className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-[#17171c]">In-Transit Network Protection</h4>
                        <p className="text-[11px] text-[#616161] leading-relaxed">
                          Tribal scholar submits identity or connects DigiLocker over forced <strong>TLS 1.3</strong> with PFS (Perfect Forward Secrecy). HSTS headers prevent downgrade attacks.
                        </p>
                      </div>

                      {/* Security Card 2 */}
                      <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">Step 2: Volatile Hashing</span>
                          <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <h4 className="font-medium text-[#17171c]">Zero Raw Aadhaar Persistence</h4>
                        <p className="text-[11px] text-[#616161] leading-relaxed">
                          In volatile RAM, Sarthi calculates <code>SHA-256(Aadhaar + Salt)</code>. Raw 12 digits are discarded instantly. Database only records the hash and masked string <code>XXXXXXXX8472</code>.
                        </p>
                      </div>

                      {/* Security Card 3 */}
                      <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">Step 3: Storage Vault</span>
                          <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <h4 className="font-medium text-[#17171c]">AES-256 Object Encryption</h4>
                        <p className="text-[11px] text-[#616161] leading-relaxed">
                          Scans are written to private MinIO/S3 buckets with <strong>AES-256 Server-Side Encryption</strong>. Direct URL access is blocked. Files can only be opened with temporary 15-minute presigned tokens.
                        </p>
                      </div>

                      {/* Security Card 4 */}
                      <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase">Step 4: Scrutiny Overlay</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-[#17171c]">Dynamic Officer Watermarking</h4>
                        <p className="text-[11px] text-[#616161] leading-relaxed">
                          When Desk Officer views a document, the HTML5 canvas dynamically overlays the officer ID (<code>MOTA-SCR-402</code>), IP, and timestamp. Prevents unauthorized screenshots or leaks.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-[#17171c] text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                        <pre>{`sequenceDiagram
    autonumber
    actor Scholar as Tribal Scholar
    participant Web as Sarthi Web App
    participant API as FastAPI Gateway
    participant Crypt as Salted SHA-256 Hasher
    participant S3 as MinIO Encrypted S3
    participant DB as PostgreSQL 16 DB
    actor Officer as MoTA Desk Officer

    Scholar->>Web: Enters 12-Digit Aadhaar / Connects DigiLocker
    Web->>API: Transmits over Encrypted TLS 1.3
    API->>Crypt: Computes Salted SHA-256 Hash
    Note over API,Crypt: Section 29 Aadhaar Act: Raw 12 digits purged immediately
    API->>DB: Stores Hash + Masked Aadhaar (XXXXXXXX8472)
    Scholar->>Web: Uploads Supporting Documents / Certs
    Web->>API: Multipart Binary Stream
    API->>S3: Encrypts with AES-256 (Server-Side Encryption)
    API->>DB: Links Document S3 URI & Metadata
    Officer->>API: Requests Verification Workspace
    API->>DB: Validates JWT & Officer RBAC Permissions
    API->>S3: Generates 15-Minute Ephemeral Pre-signed URL
    API-->>Officer: Streams Watermarked Canvas (Badge: MOTA-SCR-402, IP, Timestamp)
    Note over Officer,API: Canvas watermark prevents screen-scraping & data leaks`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FLOWCHART 3: DUAL-TIER STORAGE TOPOLOGY */}
              {activeFlowchart === "STORAGE" && (
                <div className="space-y-4">
                  {/* Context Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-[#edfce9] to-[#eeece7]/40 rounded-xl border border-[#a3e635]/40 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#003c33] flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#16a34a]" />
                        Decoupled Dual-Tier Storage Flow &amp; Entity Separation
                      </div>
                      <p className="text-[11px] text-[#003c33]/80 mt-0.5">
                        Separates fast indexed relational entities (Postgres 16) from encrypted binary scans (MinIO S3) and ephemeral caches (Redis 7).
                      </p>
                    </div>
                    <Badge variant="scheme" className="shrink-0">Dual-Tier Decoupled</Badge>
                  </div>

                  {flowchartViewMode === "VISUAL" ? (
                    <div className="space-y-3 text-xs">
                      {/* Ingestion Router */}
                      <div className="p-3 rounded-xl bg-[#f9f9fb] border border-[#e5e7eb] flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono font-medium text-[#17171c]">
                          <Workflow className="w-4 h-4 text-[#1863dc]" />
                          <span>Ingestion Splitter: Sarthi API Gateway Payload Router</span>
                        </div>
                        <Badge variant="neutral">Splits Metadata &amp; Blobs</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Tier A */}
                        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold uppercase">
                              Branch A: Relational Metadata
                            </span>
                            <Database className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-[#17171c]">PostgreSQL 16 Engine</h4>
                          <ul className="space-y-1 text-[11px] text-[#616161]">
                            <li>• <code>users</code>: UUID, Salted_Aadhaar_Hash, Role</li>
                            <li>• <code>applications</code>: Status Machine, Merit Score</li>
                            <li>• <code>app_documents</code>: OCR_JSONB, Tamper Score</li>
                            <li>• <code>deficiencies</code>: 7-Day Deadline countdown</li>
                            <li>• <code>audit_logs</code>: Append-Only Immutable Ledger</li>
                          </ul>
                          <div className="pt-2 border-t border-[#e5e7eb] text-[10px] font-mono text-blue-800">
                            ACID Transactions • JSONB Indexing
                          </div>
                        </div>

                        {/* Tier B */}
                        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">
                              Branch B: Encrypted Binary Scans
                            </span>
                            <HardDrive className="w-4 h-4 text-emerald-600" />
                          </div>
                          <h4 className="font-medium text-[#17171c]">MinIO S3 Object Vault</h4>
                          <ul className="space-y-1 text-[11px] font-mono text-[#212121] bg-gray-50 p-2 rounded">
                            <li>s3://mota-secure-vault/certs/</li>
                            <li className="pl-3">└── APP-2026-NFST-0842/</li>
                            <li className="pl-6 text-emerald-700">├── caste_cert_enc_aes256.pdf</li>
                            <li className="pl-6 text-emerald-700">├── income_cert_torpa.enc</li>
                            <li className="pl-6 text-purple-700">└── forensic_ela_matrix.json</li>
                          </ul>
                          <div className="pt-2 border-t border-[#e5e7eb] text-[10px] font-mono text-emerald-800">
                            AES-256 SSE • 15-Min Pre-signed URLs
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-[#17171c] text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                        <pre>{`graph TD
    A[Incoming Certificate / Application Payload] --> B{Sarthi Gateway Ingestion Router}
    
    subgraph TIER_A ["Tier A: Relational Metadata (PostgreSQL 16)"]
        B -->|Structured Data| C[users: UUID, Salted_Aadhaar_Hash, Role]
        B -->|State Machine| D[applications: Status, Stage, Merit_Score]
        B -->|Field Data| E[app_documents: OCR_JSONB, Tamper_Score, S3_URI]
        B -->|Remediation| F[deficiencies: Doc_ID, 7-Day_Deadline, Status]
        B -->|Compliance| G[audit_logs: Officer_ID, Action, IP, Timestamp]
    end

    subgraph TIER_B ["Tier B: Encrypted Binary Scans (MinIO S3 Vault)"]
        B -->|Encrypted Scans| H[s3://mota-secure-vault/certs/APP-2026-NFST-0842/]
        H --> I[caste_cert_enc_aes256.pdf (DigiLocker Linked)]
        H --> J[income_cert_torpa.enc (AES-256 Encrypted Scans)]
        H --> K[forensic_ela_matrix.json (OpenCV Tamper Grid)]
    end

    subgraph TIER_C ["Tier C: Ephemeral Cache (Redis 7)"]
        B -->|Session Tokens| L[15-Minute Pre-Signed URL Nonces]
        B -->|Rate Limits| M[IP & Officer Request Throttling]
    end`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FLOWCHART 4: PROACTIVE NEAR-MISS ENGINE */}
              {activeFlowchart === "NEARMISS" && (
                <div className="space-y-4">
                  {/* Context Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-[#edfce9] to-[#eeece7]/40 rounded-xl border border-[#a3e635]/40 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#003c33] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#ff7759]" />
                        Proactive Opportunity Matching &amp; Near-Miss Decision Logic
                      </div>
                      <p className="text-[11px] text-[#003c33]/80 mt-0.5">
                        Transforms rejection into remediation: Diagnoses exact missing documents and alerts students 48 hours before deadlines.
                      </p>
                    </div>
                    <Badge variant="scheme" className="shrink-0">Key Differentiator</Badge>
                  </div>

                  {flowchartViewMode === "VISUAL" ? (
                    <div className="space-y-3 text-xs">
                      {/* Step A */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold">
                            A
                          </div>
                          <div>
                            <h4 className="font-medium text-[#17171c]">Student 1-Time Profile Registration</h4>
                            <p className="text-[11px] text-[#616161]">
                              Degree: B.Tech (2nd Yr) • Branch: CSE • State: Jharkhand • ST Category • PVTG: Birhor • Family Income: ₹2.4L
                            </p>
                          </div>
                        </div>
                        <Badge variant="neutral">Input Vector</Badge>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step B: Rule Engine Comparison */}
                      <div className="p-3.5 rounded-xl border border-[#e5e7eb] bg-[#f9f9fb] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-gray-600 font-bold uppercase">
                            Evaluates Scheme Criteria Matrix
                          </span>
                          <Cpu className="w-3.5 h-3.5 text-gray-600" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-white border border-[#e5e7eb] space-y-1">
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">NFST Fellowship</span>
                            <p className="text-[11px] text-[#616161]">ST + M.Tech/PhD + Income &le; ₹6.0L</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-[#e5e7eb] space-y-1">
                            <span className="text-[10px] font-mono text-blue-700 font-bold">NOS Overseas</span>
                            <p className="text-[11px] text-[#616161]">ST + &ge; 55% marks + Top 500 QS</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-[#e5e7eb] space-y-1">
                            <span className="text-[10px] font-mono text-purple-700 font-bold">Top Class ST Higher Ed</span>
                            <p className="text-[11px] text-[#616161]">ST + Notified IIT/NIT + &le; ₹8.0L</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center -my-1 text-gray-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Decision Branches */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-emerald-800 font-bold uppercase">Branch 1: 100% Eligible</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </div>
                          <h4 className="font-medium text-emerald-950">Top Class Education for ST</h4>
                          <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                            Full criteria satisfied. 1-Click Apply activates directly with pre-filled profile information.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-amber-800 font-bold uppercase">Branch 2: Near-Miss (90%)</span>
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          </div>
                          <h4 className="font-medium text-amber-950">National Fellowship (NFST)</h4>
                          <p className="text-[11px] text-amber-800/90 leading-relaxed">
                            <strong>Diagnosed Gap:</strong> Income Certificate from Torpa Circle is missing. Sarthi alerts: &ldquo;Upload 1 document to unlock ₹38,000/mo stipend.&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-[#17171c] text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                        <pre>{`graph TD
    A[Tribal Scholar Unified Profile] --> B[Eligibility Criteria Evaluator]
    
    subgraph SCHEME_RULES ["Gazette Scheme Rule Matrix"]
        B --> C{NFST: Fellowship}
        B --> D{NOS: Overseas Study}
        B --> E{Top Class ST Higher Ed}
    end

    C -->|ST + PG Degree + Income <= 6.0L| F[100% Fully Eligible]
    C -->|ST + PG Degree + Missing Income Doc| G[90% Near-Miss: Document Deficit]
    C -->|Income 6.2L > 6.0L Cap| H[80% Near-Miss: Income Threshold Alert]

    F --> I[Direct 1-Click Priority Application]
    G --> J[Proactive Alert: Missing Income Certificate from Torpa Circle]
    H --> K[Alternative Pathway: Top Class ST with 8.0L Cap Suggested]

    J --> L[Automated 48-Hour Deadline Reminders via SMS & Web Alert]`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
