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
  Smartphone,
  Laptop,
  Monitor,
  Network,
  Maximize2,
  Minimize2,
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className={`bg-white rounded-[22px] ${isExpanded ? "w-[98vw] max-w-[98vw] h-[96vh] max-h-[96vh]" : "max-w-6xl w-full max-h-[94vh]"} p-4 sm:p-6 space-y-4 shadow-2xl border border-[#e5e7eb] flex flex-col transition-all duration-200`}>
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-3">
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
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={isExpanded ? "Collapse View" : "Expand to Wide Canvas"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
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
              {/* Top Sub-Bar: Architecture Views & Controls */}
              <div className="p-3 bg-[#eeece7]/50 rounded-[18px] border border-[#d9d9dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono uppercase text-[#75758a] mr-1">Architecture View:</span>
                  <button
                    onClick={() => setActiveFlowchart("SYSTEM")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium flex items-center gap-1.5 ${
                      activeFlowchart === "SYSTEM"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    <Layers className="w-3 h-3 text-[#ff7759]" />
                    Backend System Architecture (Netflix-Style)
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("SECURITY")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium flex items-center gap-1.5 ${
                      activeFlowchart === "SECURITY"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3 text-[#16a34a]" />
                    Zero-Trust Security Flow
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("STORAGE")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium flex items-center gap-1.5 ${
                      activeFlowchart === "STORAGE"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    <Database className="w-3 h-3 text-[#1863dc]" />
                    Dual-Tier Storage Topology
                  </button>
                  <button
                    onClick={() => setActiveFlowchart("NEARMISS")}
                    className={`px-3 py-1 rounded-full text-xs transition-all font-medium flex items-center gap-1.5 ${
                      activeFlowchart === "NEARMISS"
                        ? "bg-[#17171c] text-white shadow-sm"
                        : "bg-white text-[#616161] hover:bg-[#eeece7] border border-[#e5e7eb]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#ff7759]" />
                    Near-Miss Engine
                  </button>
                </div>

                {/* Right controls: View mode + Copy Mermaid */}
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
                      System Diagram Canvas
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
    subgraph CLIENTS ["Client Devices & Actors"]
        A[Tribal Scholar: Mobile PWA / Offline Sync]
        B[Desk Officer: 50/50 Dual-Pane Console]
        C[MoTA Admin: Executive Analytics & PFMS DBT]
        D[Sovereign DigiLocker Vault Gateway]
    end

    subgraph CLOUD ["Backend on Sovereign Cloud VPC (NIC / MeitY Empanelled)"]
        subgraph INGRESS ["Ingress & Edge Security"]
            E[AWS ELB / Nginx Reverse Proxy<br/>TLS 1.3 Termination • WAF DDoS Shield]
        end

        subgraph GATEWAY ["API Gateway Service (FastAPI)"]
            F[Inbound Rate Limiting • Leaky Bucket]
            G[Zero-Raw Aadhaar Salted SHA-256 Hasher]
            H[JWT RBAC Authentication Guard]
            I[Outbound Watermark & CORS Filter]
        end

        subgraph APIS ["Core Application APIs & Microservices"]
            J[Opportunity & Near-Miss Matcher API]
            K[Student Intake & DigiLocker e-KYC API]
            L[Officer 50/50 Scrutiny & Watermark API]
            M[PFMS DBT Batch Disbursement API]
        end

        subgraph STORES ["Datastores & Fast Caches"]
            N[(In-Memory Cache: Redis 7<br/>Sessions, 15m Presigned Nonces)]
            O[(Relational Datastore: PostgreSQL 16<br/>Users, JSONB Rules, Immutable Audit Logs)]
        end

        subgraph PIPELINE ["Async Stream & AI Task Queue"]
            P[[Celery / Redis Async Task Broker]]
            Q[OpenCV 300 DPI Pre-Processing]
            R[OpenCV ELA Tamper Detection Unit]
            S[PaddleOCR Trilingual + LayoutLMv3 Key-Value]
            T[(MinIO S3 Encrypted Object Vault<br/>AES-256 Server-Side Encryption)]
        end
    end

    CLIENTS -->|1. HTTPS / TLS 1.3| E
    E -->|2. Ingress Forward| GATEWAY
    GATEWAY -->|3. Validated Request| APIS
    APIS <-->|4. Fast Session Lookup| N
    APIS <-->|5. Structured State Machine| O
    APIS -->|6. Enqueue Heavy AI Job| P
    P --> Q --> R --> S
    S -->|7. Encrypted Scans & Maps| T
    O -->|8. PFMS DBT Batch XML Export| C`,
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

              {/* 1. NETFLIX-STYLE FULL BACKEND ARCHITECTURAL DIAGRAM CANVAS */}
              {activeFlowchart === "SYSTEM" && flowchartViewMode === "VISUAL" && (
                <div className="space-y-4">
                  {/* Step Journey Navigator (Circled 1 to 8 like in the Netflix diagram) */}
                  <div className="bg-[#17171c] text-white p-3.5 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#ff7759] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        8
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#edfce9] uppercase tracking-wider font-mono">
                          Request Lifecycle Walkthrough
                        </span>
                        <p className="text-[11px] text-gray-300">
                          Follow numbers ① through ⑧ to trace an encrypted intake from client devices to PFMS DBT payout.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 text-xs font-mono">
                      {[
                        { num: "1", label: "Client Ingress" },
                        { num: "2", label: "ELB / WAF" },
                        { num: "3", label: "API Gateway" },
                        { num: "4", label: "Microservices" },
                        { num: "5", label: "Redis Cache" },
                        { num: "6", label: "Postgres DB" },
                        { num: "7", label: "Async Queue" },
                        { num: "8", label: "AI Workers & S3" },
                      ].map((step) => (
                        <div
                          key={step.num}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-gray-200 text-[11px] whitespace-nowrap hover:bg-[#ff7759]/20 transition-colors"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#ff7759] text-white font-bold flex items-center justify-center text-[10px]">
                            {step.num}
                          </span>
                          <span>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* THE ARCHITECTURAL CANVAS (Netflix Backend on AWS Style) */}
                  <div className="bg-[#fcfcfd] rounded-2xl border-2 border-[#d9d9dd] p-4 sm:p-6 shadow-sm overflow-x-auto">
                    <div className="min-w-[940px] space-y-5">
                      {/* Canvas Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                            PRODUCTION ARCHITECTURE
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm font-semibold text-[#17171c]">
                            Sarthi Sovereign Cloud Architecture (MeitY Empanelled VPC)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            ACTIVE CLOUD REGION: AP-SOUTH-1 (MUMBAI)
                          </span>
                        </div>
                      </div>

                      {/* Main Diagram Grid */}
                      <div className="grid grid-cols-12 gap-4 items-stretch relative">
                        {/* ========================================================
                            LEFT COLUMN: CLIENT DEVICES & ACTORS (Cols 1-3)
                           ======================================================== */}
                        <div className="col-span-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/80 p-3.5 flex flex-col justify-between space-y-4 shadow-xs">
                          <div>
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                              <span className="font-bold text-xs text-[#17171c] uppercase tracking-wide flex items-center gap-1.5">
                                <Smartphone className="w-4 h-4 text-blue-600" />
                                Client Devices &amp; Portals
                              </span>
                              <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                                CLIENT TIER
                              </span>
                            </div>

                            {/* Client Actors */}
                            <div className="space-y-2.5">
                              {/* Tribal Scholar Mobile PWA */}
                              <div className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2.5 hover:border-blue-400 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                  <Smartphone className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">Tribal Scholar PWA</div>
                                  <div className="text-[10px] text-gray-500">Offline-capable • Low bandwidth</div>
                                </div>
                              </div>

                              {/* Desk Officer Workstation */}
                              <div className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2.5 hover:border-blue-400 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                  <Laptop className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">Desk Officer Console</div>
                                  <div className="text-[10px] text-gray-500">50/50 Dual-Pane Scrutiny</div>
                                </div>
                              </div>

                              {/* MoTA Executive Hub */}
                              <div className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2.5 hover:border-blue-400 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                  <Monitor className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">MoTA Executive Analytics</div>
                                  <div className="text-[10px] text-gray-500">PFMS DBT Disbursement Hub</div>
                                </div>
                              </div>

                              {/* Sovereign DigiLocker Vault */}
                              <div className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2.5 hover:border-blue-400 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">DigiLocker Gov Vault</div>
                                  <div className="text-[10px] text-gray-500">OAuth2 Sovereign Gateway</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                            <span>Protocols:</span>
                            <span className="font-semibold text-blue-700">HTTPS / TLS 1.3 (Port 443)</span>
                          </div>
                        </div>

                        {/* ========================================================
                            RIGHT CONTAINER: BACKEND ON CLOUD BOUNDARY (Cols 4-12)
                           ======================================================== */}
                        <div className="col-span-9 rounded-2xl border-2 border-[#17171c] bg-[#ffffff] p-4.5 relative shadow-sm flex flex-col justify-between space-y-4">
                          {/* Cloud VPC Tag */}
                          <div className="absolute -top-3.5 right-6 bg-[#17171c] text-white text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <Server className="w-3 h-3 text-[#a3e635]" />
                            Backend on Sovereign Cloud (MeitY Empanelled VPC)
                          </div>

                          {/* Top Row: Ingress -> API Gateway -> Application Services -> Datastores */}
                          <div className="grid grid-cols-12 gap-3 items-stretch">
                            {/* Ingress / Load Balancer (Col 1-2) */}
                            <div className="col-span-2 rounded-xl border border-gray-300 bg-gray-50/90 p-2.5 flex flex-col justify-between space-y-2 relative">
                              {/* Step 1 badge entering ELB */}
                              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff7759] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md border-2 border-white z-10" title="Step 1: Client Ingress">
                                1
                              </div>

                              <div className="text-center pt-1">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-1.5 shadow-xs">
                                  <Network className="w-4 h-4" />
                                </div>
                                <div className="text-xs font-bold text-[#17171c] leading-tight">AWS ELB / Ingress</div>
                                <div className="text-[9px] text-gray-500 font-mono mt-0.5">TLS 1.3 Reverse Proxy</div>
                              </div>

                              <div className="space-y-1 text-[9.5px] font-mono text-gray-600 bg-white p-1.5 rounded border border-gray-200">
                                <div>• SSL Offloading</div>
                                <div>• WAF DDoS Guard</div>
                                <div>• Auto-Scaling Group</div>
                              </div>
                            </div>

                            {/* Arrow to Gateway with Step 2 */}
                            <div className="col-span-1 flex flex-col items-center justify-center relative">
                              <div className="w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm mb-1" title="Step 2: Forward to API Gateway">
                                2
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 animate-pulse" />
                            </div>

                            {/* API Gateway Service (Col 4-6) */}
                            <div className="col-span-3 rounded-xl border-2 border-emerald-600/40 bg-emerald-50/30 p-2.5 flex flex-col justify-between space-y-2 relative">
                              <div>
                                <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5 mb-2">
                                  <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    API Gateway Service
                                  </span>
                                  <span className="text-[8.5px] font-mono bg-emerald-200 text-emerald-800 px-1 rounded font-bold">
                                    FASTAPI
                                  </span>
                                </div>

                                <div className="space-y-1.5 text-[10px]">
                                  {/* Inbound Filter */}
                                  <div className="p-1.5 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">Inbound Filter</span>
                                    <span className="text-[9px] font-mono text-gray-500">Rate Limiter</span>
                                  </div>
                                  {/* Aadhaar Hasher */}
                                  <div className="p-1.5 rounded bg-emerald-100/70 border border-emerald-300 font-mono text-[9px] text-emerald-900 flex items-center justify-between">
                                    <span className="font-bold">Salted SHA-256 Hasher</span>
                                    <span>Sec 29 Compliant</span>
                                  </div>
                                  {/* JWT Guard */}
                                  <div className="p-1.5 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">JWT &amp; RBAC Guard</span>
                                    <span className="text-[9px] font-mono text-emerald-700">Authz</span>
                                  </div>
                                  {/* Outbound Filter */}
                                  <div className="p-1.5 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">Outbound Filter</span>
                                    <span className="text-[9px] font-mono text-gray-500">Watermark/CORS</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-[9px] font-mono text-emerald-800 border-t border-emerald-200 pt-1 text-center">
                                Zero Raw Aadhaar in RAM
                              </div>
                            </div>

                            {/* Arrow to Microservices with Step 3 */}
                            <div className="col-span-1 flex flex-col items-center justify-center relative">
                              <div className="w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm mb-1" title="Step 3: Dispatched to Targeted Microservice">
                                3
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>

                            {/* Core Microservices Cluster (Col 8-10) */}
                            <div className="col-span-3 rounded-xl border border-gray-300 bg-white p-2.5 flex flex-col justify-between space-y-2 relative">
                              <div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-2">
                                  <span className="text-[11px] font-bold text-[#17171c] flex items-center gap-1">
                                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                                    Application APIs
                                  </span>
                                  <span className="text-[8.5px] font-mono bg-blue-100 text-blue-800 px-1 rounded font-bold">
                                    CORE
                                  </span>
                                </div>

                                <div className="space-y-1.5 text-[9.5px]">
                                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    🔍 Opportunity &amp; Near-Miss API
                                  </div>
                                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    📝 Student Intake &amp; e-KYC API
                                  </div>
                                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    🛡️ 50/50 Dual-Pane Scrutiny API
                                  </div>
                                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    💳 PFMS DBT Disbursement Engine
                                  </div>
                                </div>
                              </div>

                              <div className="text-[9px] font-mono text-gray-500 border-t border-gray-200 pt-1 flex items-center justify-between">
                                <span>Stateless Workers</span>
                                <span className="text-emerald-600 font-bold">&le; 200ms</span>
                              </div>
                            </div>

                            {/* Datastores Column (Col 11-12: Redis & Postgres Cylinders) */}
                            <div className="col-span-2 flex flex-col justify-between space-y-3">
                              {/* Redis Cache Cylinder */}
                              <div className="rounded-xl border border-red-200 bg-gradient-to-b from-red-50/60 to-red-100/40 p-2 text-center relative shadow-xs">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm" title="Step 5: Cache Lookup">
                                  5
                                </div>

                                {/* Cylinder SVG Header */}
                                <div className="flex items-center justify-center gap-1.5 mb-1">
                                  <Database className="w-3.5 h-3.5 text-red-600" />
                                  <span className="text-[10.5px] font-bold text-red-950 font-mono">Redis 7 Cache</span>
                                </div>
                                <div className="text-[8.5px] font-mono text-red-700 bg-white/80 p-1 rounded border border-red-200 space-y-0.5">
                                  <div>• Session Nonces</div>
                                  <div>• Rate Limiters</div>
                                  <div>• 15m Pre-signed URLs</div>
                                </div>
                              </div>

                              {/* PostgreSQL 16 Cylinder */}
                              <div className="rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50/60 to-blue-100/40 p-2 text-center relative shadow-xs">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm" title="Step 6: Relational Datastore Commit">
                                  6
                                </div>

                                {/* Cylinder SVG Header */}
                                <div className="flex items-center justify-center gap-1.5 mb-1">
                                  <Database className="w-3.5 h-3.5 text-blue-600" />
                                  <span className="text-[10.5px] font-bold text-blue-950 font-mono">Postgres 16 DB</span>
                                </div>
                                <div className="text-[8.5px] font-mono text-blue-700 bg-white/80 p-1 rounded border border-blue-200 space-y-0.5">
                                  <div>• Salted Aadhaar Hash</div>
                                  <div>• JSONB Rule Schemes</div>
                                  <div>• Append-Only Audit Log</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row: Asynchronous Stream & Task Processing Pipeline (Image 2 & 3 style) */}
                          <div className="rounded-xl border-2 border-purple-200 bg-purple-50/20 p-3 relative">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                              <span className="text-[11px] font-bold text-purple-950 uppercase tracking-wide flex items-center gap-1.5">
                                <Workflow className="w-4 h-4 text-purple-600" />
                                Asynchronous Event &amp; AI Document Processing Pipeline
                              </span>
                              <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
                                DECOUPLED STREAM
                              </span>
                            </div>

                            <div className="grid grid-cols-12 gap-3 items-center">
                              {/* Connector from Microservice down to Queue (Step 7) */}
                              <div className="col-span-3 rounded-lg bg-white border border-purple-200 p-2 flex items-center gap-2 relative">
                                <div className="w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm" title="Step 7: Enqueue Async Document Analysis">
                                  7
                                </div>
                                <div>
                                  <div className="text-[10.5px] font-bold text-purple-950 font-mono">Celery / Redis Queue</div>
                                  <div className="text-[9px] text-gray-500">Non-blocking background broker</div>
                                </div>
                              </div>

                              <div className="col-span-1 flex justify-center">
                                <div className="flex items-center gap-1 text-gray-400">
                                  <div className="w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center" title="Step 8: Distributed to AI Workers & S3">
                                    8
                                  </div>
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Concurrent Async AI Workers */}
                              <div className="col-span-5 rounded-lg bg-white border border-purple-200 p-2 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-gray-800">Concurrent AI Worker Pool</span>
                                  <span className="text-[8.5px] font-mono text-purple-700 bg-purple-50 px-1 rounded">Celery Daemon</span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono text-center">
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200">OpenCV 300 DPI</div>
                                  <div className="p-1 rounded bg-purple-50 border border-purple-200 font-bold text-purple-800">ELA Tamper Unit</div>
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200">PaddleOCR Trilingual</div>
                                </div>
                              </div>

                              <div className="col-span-1 flex justify-center">
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>

                              {/* S3 Object Storage Bucket */}
                              <div className="col-span-2 rounded-lg bg-amber-50/70 border border-amber-300 p-2 text-center">
                                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-900 font-mono">
                                  <HardDrive className="w-3.5 h-3.5 text-amber-700" />
                                  <span>MinIO S3 Vault</span>
                                </div>
                                <div className="text-[8.5px] font-mono text-amber-800 mt-0.5">
                                  AES-256 Encrypted Scans
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 8-Step Deep-Dive Technical Explanation Cards (Directly addressing judges) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#17171c]">
                        <span className="w-4 h-4 rounded-full bg-[#ff7759] text-white text-[10px] flex items-center justify-center font-mono">1</span>
                        <span>Client Ingress (TLS 1.3)</span>
                      </div>
                      <p className="text-[11px] text-[#616161] leading-relaxed">
                        Students access via low-bandwidth PWA. Desk officers connect via 50/50 scrutiny console. All requests enforce TLS 1.3 with Perfect Forward Secrecy.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#17171c]">
                        <span className="w-4 h-4 rounded-full bg-[#ff7759] text-white text-[10px] flex items-center justify-center font-mono">2-3</span>
                        <span>Gateway &amp; Zero Aadhaar</span>
                      </div>
                      <p className="text-[11px] text-[#616161] leading-relaxed">
                        FastAPI Gateway intercepts payloads. Section 29 Aadhaar Act: computes <code>SHA-256(Aadhaar + Salt)</code> and purges raw digits immediately from volatile RAM.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#17171c]">
                        <span className="w-4 h-4 rounded-full bg-[#ff7759] text-white text-[10px] flex items-center justify-center font-mono">4-6</span>
                        <span>Dual-Tier Datastores</span>
                      </div>
                      <p className="text-[11px] text-[#616161] leading-relaxed">
                        Redis cache provides lightning-fast session verification &amp; rate limit checks. PostgreSQL 16 commits state transitions &amp; immutable audit ledgers.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#17171c]">
                        <span className="w-4 h-4 rounded-full bg-[#ff7759] text-white text-[10px] flex items-center justify-center font-mono">7-8</span>
                        <span>Async AI &amp; AES-256 S3</span>
                      </div>
                      <p className="text-[11px] text-[#616161] leading-relaxed">
                        Celery workers run OpenCV ELA tamper detection (0.04 authentic threshold) and trilingual OCR. Scans stored in private MinIO S3 with AES-256 encryption.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ZERO-TRUST SECURITY VIEW */}
              {activeFlowchart === "SECURITY" && flowchartViewMode === "VISUAL" && (
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
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
                </div>
              )}

              {/* 3. DUAL-TIER STORAGE TOPOLOGY VIEW */}
              {activeFlowchart === "STORAGE" && flowchartViewMode === "VISUAL" && (
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
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
              )}

              {/* 4. PROACTIVE NEAR-MISS ENGINE VIEW */}
              {activeFlowchart === "NEARMISS" && flowchartViewMode === "VISUAL" && (
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
              )}

              {/* 5. MERMAID RAW CODE VIEW (When MERMAID mode is selected) */}
              {flowchartViewMode === "MERMAID" && (
                <div className="space-y-2">
                  <div className="p-3.5 bg-[#17171c] text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                    <pre>{activeFlowchart === "SYSTEM" ? `graph TD
    subgraph CLIENTS ["Client Devices & Actors"]
        A[Tribal Scholar: Mobile PWA / Offline Sync]
        B[Desk Officer: 50/50 Dual-Pane Console]
        C[MoTA Admin: Executive Analytics & PFMS DBT]
        D[Sovereign DigiLocker Vault Gateway]
    end

    subgraph CLOUD ["Backend on Sovereign Cloud VPC (NIC / MeitY Empanelled)"]
        subgraph INGRESS ["Ingress & Edge Security"]
            E[AWS ELB / Nginx Reverse Proxy<br/>TLS 1.3 Termination • WAF DDoS Shield]
        end

        subgraph GATEWAY ["API Gateway Service (FastAPI)"]
            F[Inbound Rate Limiting • Leaky Bucket]
            G[Zero-Raw Aadhaar Salted SHA-256 Hasher]
            H[JWT RBAC Authentication Guard]
            I[Outbound Watermark & CORS Filter]
        end

        subgraph APIS ["Core Application APIs & Microservices"]
            J[Opportunity & Near-Miss Matcher API]
            K[Student Intake & DigiLocker e-KYC API]
            L[Officer 50/50 Scrutiny & Watermark API]
            M[PFMS DBT Batch Disbursement API]
        end

        subgraph STORES ["Datastores & Fast Caches"]
            N[(In-Memory Cache: Redis 7<br/>Sessions, 15m Presigned Nonces)]
            O[(Relational Datastore: PostgreSQL 16<br/>Users, JSONB Rules, Immutable Audit Logs)]
        end

        subgraph PIPELINE ["Async Stream & AI Task Queue"]
            P[[Celery / Redis Async Task Broker]]
            Q[OpenCV 300 DPI Pre-Processing]
            R[OpenCV ELA Tamper Detection Unit]
            S[PaddleOCR Trilingual + LayoutLMv3 Key-Value]
            T[(MinIO S3 Encrypted Object Vault<br/>AES-256 Server-Side Encryption)]
        end
    end

    CLIENTS -->|1. HTTPS / TLS 1.3| E
    E -->|2. Ingress Forward| GATEWAY
    GATEWAY -->|3. Validated Request| APIS
    APIS <-->|4. Fast Session Lookup| N
    APIS <-->|5. Structured State Machine| O
    APIS -->|6. Enqueue Heavy AI Job| P
    P --> Q --> R --> S
    S -->|7. Encrypted Scans & Maps| T
    O -->|8. PFMS DBT Batch XML Export| C` : activeFlowchart === "SECURITY" ? `sequenceDiagram
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
    Note over Officer,API: Canvas watermark prevents screen-scraping & data leaks` : activeFlowchart === "STORAGE" ? `graph TD
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
    end` : `graph TD
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
                  <p className="text-[10px] text-[#75758a] font-mono">
                    💡 Click &quot;Copy Mermaid&quot; above to paste this directly into GitHub, Notion, or your hackathon slide deck.
                  </p>
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
