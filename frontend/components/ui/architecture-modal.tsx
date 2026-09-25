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
  Radio,
  Activity,
  Bell,
  Send,
  Zap,
  Landmark,
} from "lucide-react";

const NODE_SPECS: Record<
  string,
  {
    name: string;
    badge: string;
    subsystem: string;
    protocol: string;
    role: string;
    compliance: string;
    scalability: string;
    judgeDefense: string;
  }
> = {
  CLIENTS: {
    name: "Client Devices & Ingress Actors",
    badge: "Edge Tier",
    subsystem: "Tribal Scholar PWA / Officer Console / MoTA Analytics / DigiLocker Vault",
    protocol: "HTTPS / TLS 1.3 (Port 443)",
    role: "Provides responsive, low-bandwidth interfaces for 2G rural scholars with offline IndexedDB draft sync, plus a dual-pane forensic workspace for desk officers.",
    compliance: "MeitY GIGW 3.0, Web Content Accessibility Guidelines (WCAG 2.1 AA), PWA Offline First Service Workers.",
    scalability: "Stateless client assets delivered via Geo-distributed CDN edge caches with Brotli compression.",
    judgeDefense: "A tribal scholar in remote Torpa with intermittent 2G connection can fill applications offline and receive instant DLT-verified SMS notifications without downloading heavy apps.",
  },
  INGRESS: {
    name: "AWS ELB / Nginx Reverse Proxy & WAF",
    badge: "Network Edge",
    subsystem: "Elastic Load Balancer & Web Application Firewall",
    protocol: "TCP 443 / TLS 1.3 Termination",
    role: "Terminates TLS 1.3 with Perfect Forward Secrecy, filters OWASP Top 10 exploits, and balances inbound traffic across auto-scaled FastAPI replicas.",
    compliance: "CERT-In Cloud Security Guidelines, HSTS Enforced, DDoS mitigation via AWS Shield Standard.",
    scalability: "Auto-scales across 3 availability zones in AP-SOUTH-1 (Mumbai) handling up to 50,000 req/sec during scholarship deadline peaks.",
    judgeDefense: "Traffic spikes when deadlines approach are absorbed at the edge; zero direct public exposure of backend microservices or databases.",
  },
  GATEWAY: {
    name: "API Gateway Service & Salted Hash Shield",
    badge: "Security Tier",
    subsystem: "FastAPI Ingress Gateway & Cryptographic Filter",
    protocol: "HTTP/2 REST / JSON",
    role: "Intercepts incoming requests, computes SHA-256(Aadhaar + Salt) in volatile RAM, immediately purges raw 12 digits, and verifies JWT tokens with RBAC claims.",
    compliance: "Section 29 Aadhaar Act 2016 (Zero Raw Aadhaar Persistence), DPDPA 2023, ISO 27001 ISMS.",
    scalability: "Asynchronous ASGI event loop handling 10,000+ concurrent connections per container with < 15ms latency overhead.",
    judgeDefense: "Even with root access or a complete physical memory dump of our backend database, no raw Aadhaar number can ever be retrieved or reconstructed.",
  },
  APIS: {
    name: "Core Application Microservices Cluster",
    badge: "Compute Tier",
    subsystem: "Opportunity Engine, Near-Miss Matcher, Scrutiny API & DBT Engine",
    protocol: "Internal Private VPC / REST / gRPC",
    role: "Runs rule-based eligibility evaluation, calculates Near-Miss deficit diagnoses, coordinates officer 50/50 dual-pane approvals, and formats PFMS payment batches.",
    compliance: "MoTA Gazette Scheme Guidelines (NFST, NOS, Top Class ST), 7-Day Micro-Deficiency Remediation Protocol.",
    scalability: "Horizontally scalable stateless Docker containers orchestrated via Kubernetes / ECS with target CPU utilization at 70%.",
    judgeDefense: "Unlike binary portals that reject candidates silently, our Near-Miss engine proactively tells students exactly what one missing certificate is blocking their ₹2.8L fellowship.",
  },
  RESILIENCE: {
    name: "Circuit Breaker & Fault Isolation Guard",
    badge: "Resilience Tier",
    subsystem: "Hystrix-Style Circuit Breaker & Fallback Handler",
    protocol: "Internal Latency & Error Rate Monitor",
    role: "Wraps third-party external dependencies (DigiLocker OAuth, PFMS Banking API, CDAC SMS Gateway). Automatically trips open if error rates exceed 30%, serving cached or offline-remediation paths.",
    compliance: "National Critical Information Infrastructure Protection Centre (NCIIPC) High Availability Standard.",
    scalability: "Sliding window metric tracking with automated half-open probe testing every 30 seconds.",
    judgeDefense: "If government servers or DigiLocker undergo scheduled maintenance during peak admission season, Sarthi does not crash—it queues student submissions gracefully for asynchronous verification.",
  },
  SMS_GATEWAY: {
    name: "Gov / CDAC Mobile Seva SMS Gateway & Push Service",
    badge: "Notification Highway",
    subsystem: "CDAC Mobile Seva / DLT Gateway (Header: VM-MOTAGOI)",
    protocol: "SMPP / REST Egress (Port 8443)",
    role: "Dispatches proactive 48-hour deadline countdown alerts, 7-day micro-deficiency SMS reminders, and PFMS disbursement confirmations directly to 2G basic feature phones.",
    compliance: "TRAI Commercial Communications Customer Preference Regulations (TCCCPR 2018), DLT Verified Sender ID.",
    scalability: "Multi-threaded batch dispatcher capable of pushing 120,000 localized SMS alerts per hour in Hindi, English, and regional languages.",
    judgeDefense: "83% of tribal scholars in rural hamlets rely on basic keypad phones. Our 2G SMS push ensures no student loses a fellowship simply because they had no 4G smartphone or broadband access.",
  },
  REDIS: {
    name: "In-Memory Cache & Rate Limiting Engine",
    badge: "Fast Cache Tier",
    subsystem: "Redis 7 Cluster (In-Memory K/V)",
    protocol: "RESP (Redis Serialization Protocol, Port 6379)",
    role: "Maintains active officer session state, tracks 15-minute ephemeral pre-signed S3 URL nonces, manages token revocations, and enforces token-bucket rate limits.",
    compliance: "PCI-DSS 3.2.1 In-Memory Encryption (TLS enabled), Automatic TTL expiration for session keys.",
    scalability: "In-memory sub-millisecond retrieval with Redis Sentinel high-availability multi-node master-replica failover.",
    judgeDefense: "All temporary access tokens to view sensitive student certificates expire automatically within 15 minutes, neutralizing replay attacks or stale URL hazards.",
  },
  POSTGRES: {
    name: "Relational Datastore & Immutable Audit Ledger",
    badge: "Persistence Tier",
    subsystem: "PostgreSQL 16 Enterprise with JSONB & pgCrypto",
    protocol: "Encrypted PostgreSQL Wire Protocol (Port 5432)",
    role: "Persists structured application records, salted Aadhaar hashes, gazette scheme eligibility rules (JSONB), and append-only tamper-proof scrutiny logs.",
    compliance: "AES-256 Storage Volume Encryption, Role-Based Access Control (RBAC), ISO 27001 Forensics Compliance.",
    scalability: "Multi-AZ replication with read-replicas for analytical queries and automatic failover under 60 seconds.",
    judgeDefense: "Every single officer approval, modification, or rejection creates a cryptographic, timestamped audit log entry that cannot be altered or deleted by any administrative user.",
  },
  TREASURY: {
    name: "PFMS & NPCI APB Treasury Highway",
    badge: "Treasury Bridge",
    subsystem: "Public Financial Management System & Aadhaar Payment Bridge",
    protocol: "SFTP / XML ISO 20022 with Digital Signatures (PKI)",
    role: "Packages verified scholarship awards into digitally signed batch XML files and synchronizes Direct Benefit Transfer (DBT) credit statuses from beneficiary bank accounts.",
    compliance: "Ministry of Finance PFMS DBT Standard, NPCI Aadhaar Enabled Payment System (AePS) Guidelines.",
    scalability: "Scheduled batch processing handling up to 50,000 disbursement credits in a single settlement cycle.",
    judgeDefense: "Financial aid is disbursed directly into the student's Aadhaar-seeded bank account without human cash intermediaries, eliminating leakages and ghost beneficiaries entirely.",
  },
  CELERY_QUEUE: {
    name: "Asynchronous Background Task Broker",
    badge: "Async Stream",
    subsystem: "Celery Distributed Task Queue / Redis Broker",
    protocol: "AMQP / Redis Broker Protocol",
    role: "Decouples heavy multi-page PDF processing, image normalization, forensic tamper analysis, and multilingual OCR from synchronous user-facing API threads.",
    compliance: "Zero Task Loss with ACK verification and dead-letter queue (DLQ) retry mechanisms.",
    scalability: "Dynamically spins up autoscale worker pods based on queue length metrics in Redis.",
    judgeDefense: "Even if 1,000 applicants upload 10MB certificates simultaneously, the student receives an immediate receipt while heavy forensic AI processes safely in the background.",
  },
  AI_WORKERS: {
    name: "Computer Vision & Forensic OCR Worker Pool",
    badge: "AI Worker Pool",
    subsystem: "OpenCV 4.x + PaddleOCR + LayoutLMv3 Extraction Engine",
    protocol: "Python Celery Daemon / IPC",
    role: "Upscales scans to 300 DPI, runs Error Level Analysis (ELA) with 0.04 tamper threshold, performs trilingual OCR, and extracts key-value pairs (Income, Category, Validity).",
    compliance: "Automated Fraud Prevention Protocol, 99.2% extraction accuracy on state revenue stamps.",
    scalability: "GPU-accelerated worker pool configured for batch inference with sub-4-second end-to-end turnaround.",
    judgeDefense: "Our forensic ELA engine spots photo-manipulated income numbers and forged rubber stamps before any officer wastes time scrutinizing fake documents.",
  },
  MINIO_S3: {
    name: "Encrypted Document Object Vault",
    badge: "Secure Vault Tier",
    subsystem: "MinIO S3 Sovereign Storage Cluster",
    protocol: "S3 API over TLS (Port 9000)",
    role: "Stores raw and processed applicant documents in private, non-public buckets encrypted with AES-256 Server-Side Encryption (SSE-S3).",
    compliance: "MeitY Data Sovereign Guidelines, WORM (Write Once Read Many) policy for locked submission archives.",
    scalability: "Distributed erasure-coded object storage tolerating simultaneous node failures with zero byte loss.",
    judgeDefense: "No document URL is ever public or indexed by search engines; files can only be accessed via single-use, 15-minute cryptographically signed tokens.",
  },
  OBSERVABILITY: {
    name: "Observability, Telemetry & Audit Stream",
    badge: "Telemetry Tier",
    subsystem: "Prometheus Metrics + OpenTelemetry Traces + Grafana Dashboards",
    protocol: "OTLP / gRPC (Port 4317) & HTTP Pull (Port 9090)",
    role: "Collects real-time P95 latency (180ms target), error budgets, worker throughput, and streams tamper-proof operational audit events.",
    compliance: "CERT-In 6-Hour Security Incident Reporting mandate, ISO 27001 Log Retention Compliance.",
    scalability: "High-throughput time-series database retaining 90 days of detailed performance and security telemetry.",
    judgeDefense: "Ministry executives and security auditors have real-time visibility into system health, latency, and every officer scrutiny action across all 750 tribal districts.",
  },
};


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
  const [selectedNode, setSelectedNode] = useState<string>("GATEWAY");

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
                  <div className="bg-[#fcfcfd] rounded-2xl border-2 border-[#d9d9dd] p-4 sm:p-5 shadow-sm overflow-x-auto">
                    <div className="min-w-[980px] space-y-4">
                      {/* Canvas Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                            PRODUCTION ARCHITECTURE
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm font-semibold text-[#17171c]">
                            Sarthi Sovereign Cloud Architecture (MeitY Empanelled VPC)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                          <span className="text-[11px] text-gray-400">💡 Click any component to inspect specs</span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            ACTIVE REGION: AP-SOUTH-1 (MUMBAI)
                          </span>
                        </div>
                      </div>

                      {/* Main Diagram Grid */}
                      <div className="grid grid-cols-12 gap-3.5 items-stretch relative">
                        {/* ========================================================
                            LEFT COLUMN: CLIENT DEVICES & ACTORS (Cols 1-3)
                           ======================================================== */}
                        <div
                          onClick={() => setSelectedNode("CLIENTS")}
                          className={`col-span-3 rounded-2xl border-2 border-dashed ${
                            selectedNode === "CLIENTS" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-orange-50/20" : "border-gray-300 bg-gray-50/80 hover:border-gray-400"
                          } p-3 flex flex-col justify-between space-y-3 shadow-xs cursor-pointer transition-all`}
                        >
                          <div>
                            <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-2.5">
                              <span className="font-bold text-xs text-[#17171c] uppercase tracking-wide flex items-center gap-1.5">
                                <Smartphone className="w-4 h-4 text-blue-600" />
                                Client Devices &amp; Portals
                              </span>
                              <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                                CLIENT TIER
                              </span>
                            </div>

                            {/* Client Actors */}
                            <div className="space-y-2">
                              {/* Tribal Scholar Mobile PWA */}
                              <div className="p-2 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                  <Smartphone className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">Tribal Scholar PWA</div>
                                  <div className="text-[9.5px] text-gray-500">2G Offline-Sync • Remote Villages</div>
                                </div>
                              </div>

                              {/* Desk Officer Workstation */}
                              <div className="p-2 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                  <Laptop className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">Desk Officer Console</div>
                                  <div className="text-[9.5px] text-gray-500">50/50 Dual-Pane Scrutiny</div>
                                </div>
                              </div>

                              {/* MoTA Executive Hub */}
                              <div className="p-2 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                  <Monitor className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">MoTA Executive Analytics</div>
                                  <div className="text-[9.5px] text-gray-500">PFMS DBT Disbursement Hub</div>
                                </div>
                              </div>

                              {/* Sovereign DigiLocker Vault */}
                              <div className="p-2 rounded-xl bg-white border border-[#e5e7eb] shadow-xs flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-semibold text-[#17171c]">DigiLocker Gov Vault</div>
                                  <div className="text-[9.5px] text-gray-500">OAuth2 Sovereign Gateway</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200 text-[9.5px] font-mono text-gray-500 flex items-center justify-between">
                            <span>Protocol:</span>
                            <span className="font-semibold text-blue-700">HTTPS / TLS 1.3 (Port 443)</span>
                          </div>
                        </div>

                        {/* ========================================================
                            RIGHT CONTAINER: BACKEND ON CLOUD BOUNDARY (Cols 4-12)
                           ======================================================== */}
                        <div className="col-span-9 rounded-2xl border-2 border-[#17171c] bg-[#ffffff] p-4 relative shadow-sm flex flex-col justify-between space-y-3.5">
                          {/* Cloud VPC Tag */}
                          <div className="absolute -top-3.5 right-6 bg-[#17171c] text-white text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <Server className="w-3 h-3 text-[#a3e635]" />
                            Backend on Sovereign Cloud (MeitY Empanelled VPC)
                          </div>

                          {/* Top Sub-Bar: Notification & SMS Push Gateway (Added per user request) */}
                          <div
                            onClick={() => setSelectedNode("SMS_GATEWAY")}
                            className={`p-2 rounded-xl border ${
                              selectedNode === "SMS_GATEWAY" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-orange-50/30" : "border-emerald-200 bg-emerald-50/30 hover:border-emerald-400"
                            } flex items-center justify-between text-xs cursor-pointer transition-all shadow-2xs`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                                <Send className="w-3 h-3 text-white" />
                              </div>
                              <div>
                                <span className="font-bold text-[#003c33] text-[11px] flex items-center gap-1.5">
                                  Gov / CDAC Mobile Seva SMS Gateway &amp; Push Service
                                  <Badge variant="scheme" className="text-[8.5px] py-0 px-1 font-mono">2G Rural Reach</Badge>
                                </span>
                                <p className="text-[10px] text-gray-600">
                                  Proactive 48-Hour Deadline Reminders &amp; 7-Day Micro-Deficiency SMS Push to remote tribal villages
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[9.5px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                              <span>DLT Verified: VM-MOTAGOI</span>
                            </div>
                          </div>

                          {/* Core Architecture Row */}
                          <div className="grid grid-cols-12 gap-2.5 items-stretch">
                            {/* Ingress / Load Balancer (Col 1-2) */}
                            <div
                              onClick={() => setSelectedNode("INGRESS")}
                              className={`col-span-2 rounded-xl border ${
                                selectedNode === "INGRESS" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-orange-50/20" : "border-gray-300 bg-gray-50/90 hover:border-gray-400"
                              } p-2 flex flex-col justify-between space-y-2 relative cursor-pointer transition-all`}
                            >
                              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ff7759] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md border-2 border-white z-10" title="Step 1: Client Ingress">
                                1
                              </div>

                              <div className="text-center pt-0.5">
                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-1 shadow-2xs">
                                  <Network className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-xs font-bold text-[#17171c] leading-tight">AWS ELB / WAF</div>
                                <div className="text-[8.5px] text-gray-500 font-mono mt-0.5">TLS 1.3 Reverse Proxy</div>
                              </div>

                              <div className="space-y-0.5 text-[8.5px] font-mono text-gray-600 bg-white p-1 rounded border border-gray-200">
                                <div>• SSL Offload</div>
                                <div>• DDoS Shield</div>
                                <div>• Auto-Scale</div>
                              </div>
                            </div>

                            {/* Arrow to Gateway with Step 2 */}
                            <div className="col-span-1 flex flex-col items-center justify-center relative">
                              <div className="w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs mb-0.5">
                                2
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 animate-pulse" />
                            </div>

                            {/* API Gateway Service (Col 4-6) */}
                            <div
                              onClick={() => setSelectedNode("GATEWAY")}
                              className={`col-span-3 rounded-xl border-2 ${
                                selectedNode === "GATEWAY" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-emerald-50/60" : "border-emerald-600/40 bg-emerald-50/30 hover:border-emerald-600"
                              } p-2 flex flex-col justify-between space-y-1.5 relative cursor-pointer transition-all`}
                            >
                              <div>
                                <div className="flex items-center justify-between border-b border-emerald-200 pb-1 mb-1.5">
                                  <span className="text-[10.5px] font-bold text-emerald-900 flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    API Gateway Service
                                  </span>
                                  <span className="text-[8px] font-mono bg-emerald-200 text-emerald-800 px-1 rounded font-bold">
                                    FASTAPI
                                  </span>
                                </div>

                                <div className="space-y-1 text-[9px]">
                                  <div className="p-1 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">Inbound Filter</span>
                                    <span className="font-mono text-gray-500">Rate Limiter</span>
                                  </div>
                                  <div className="p-1 rounded bg-emerald-100/70 border border-emerald-300 font-mono text-emerald-900 flex items-center justify-between">
                                    <span className="font-bold">Salted SHA-256</span>
                                    <span>Sec 29 Compliant</span>
                                  </div>
                                  <div className="p-1 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">JWT &amp; RBAC Guard</span>
                                    <span className="font-mono text-emerald-700">Authz</span>
                                  </div>
                                  <div className="p-1 rounded bg-white border border-emerald-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">Outbound Filter</span>
                                    <span className="font-mono text-gray-500">Watermark Header</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-[8.5px] font-mono text-emerald-800 border-t border-emerald-200 pt-0.5 text-center">
                                Zero Raw Aadhaar in RAM
                              </div>
                            </div>

                            {/* Arrow to Microservices with Step 3 */}
                            <div className="col-span-1 flex flex-col items-center justify-center relative">
                              <div className="w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs mb-0.5">
                                3
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </div>

                            {/* Core Microservices Cluster & Resilience (Col 8-10) */}
                            <div
                              onClick={() => setSelectedNode("APIS")}
                              className={`col-span-3 rounded-xl border ${
                                selectedNode === "APIS" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-blue-50/20" : "border-gray-300 bg-white hover:border-gray-400"
                              } p-2 flex flex-col justify-between space-y-1.5 relative cursor-pointer transition-all`}
                            >
                              <div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-1.5">
                                  <span className="text-[10.5px] font-bold text-[#17171c] flex items-center gap-1">
                                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                                    Application APIs
                                  </span>
                                  <span className="text-[8px] font-mono bg-blue-100 text-blue-800 px-1 rounded font-bold">
                                    CORE
                                  </span>
                                </div>

                                <div className="space-y-1 text-[9px]">
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    🔍 Opportunity &amp; Near-Miss API
                                  </div>
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    📝 Student Intake &amp; e-KYC API
                                  </div>
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    🛡️ 50/50 Dual-Pane Scrutiny API
                                  </div>
                                  <div className="p-1 rounded bg-gray-50 border border-gray-200 font-medium text-gray-800">
                                    💳 PFMS DBT Disbursement Engine
                                  </div>
                                </div>

                                {/* Circuit Breaker Tag */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNode("RESILIENCE");
                                  }}
                                  className="mt-1 p-1 rounded bg-amber-50 border border-amber-200 text-[8.5px] font-mono text-amber-800 flex items-center justify-between hover:bg-amber-100"
                                >
                                  <span className="font-bold flex items-center gap-1">
                                    <Zap className="w-2.5 h-2.5 text-amber-600" /> Circuit Breaker
                                  </span>
                                  <span>Hystrix Guard</span>
                                </div>
                              </div>

                              <div className="text-[8.5px] font-mono text-gray-500 border-t border-gray-200 pt-0.5 flex items-center justify-between">
                                <span>Stateless</span>
                                <span className="text-emerald-600 font-bold">&le; 200ms</span>
                              </div>
                            </div>

                            {/* Datastores Column (Col 11-12: Redis & Postgres Cylinders + Treasury Bridge) */}
                            <div className="col-span-2 flex flex-col justify-between space-y-2">
                              {/* Redis Cache Cylinder */}
                              <div
                                onClick={() => setSelectedNode("REDIS")}
                                className={`rounded-xl border ${
                                  selectedNode === "REDIS" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-red-100/50" : "border-red-200 bg-gradient-to-b from-red-50/60 to-red-100/40 hover:border-red-400"
                                } p-1.5 text-center relative shadow-2xs cursor-pointer transition-all`}
                              >
                                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs">
                                  5
                                </div>

                                <div className="flex items-center justify-center gap-1 mb-0.5">
                                  <Database className="w-3 h-3 text-red-600" />
                                  <span className="text-[9.5px] font-bold text-red-950 font-mono">Redis 7 Cache</span>
                                </div>
                                <div className="text-[8px] font-mono text-red-700 bg-white/80 p-0.5 rounded border border-red-200 space-y-0.2">
                                  <div>• Sessions • Rate Limits</div>
                                  <div>• 15m Pre-signed URLs</div>
                                </div>
                              </div>

                              {/* PostgreSQL 16 Cylinder */}
                              <div
                                onClick={() => setSelectedNode("POSTGRES")}
                                className={`rounded-xl border ${
                                  selectedNode === "POSTGRES" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-blue-100/50" : "border-blue-200 bg-gradient-to-b from-blue-50/60 to-blue-100/40 hover:border-blue-400"
                                } p-1.5 text-center relative shadow-2xs cursor-pointer transition-all`}
                              >
                                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs">
                                  6
                                </div>

                                <div className="flex items-center justify-center gap-1 mb-0.5">
                                  <Database className="w-3 h-3 text-blue-600" />
                                  <span className="text-[9.5px] font-bold text-blue-950 font-mono">Postgres 16 DB</span>
                                </div>
                                <div className="text-[8px] font-mono text-blue-700 bg-white/80 p-0.5 rounded border border-blue-200 space-y-0.2">
                                  <div>• Salted Aadhaar Hash</div>
                                  <div>• JSONB Rules • Audit Log</div>
                                </div>
                              </div>

                              {/* External Banking / PFMS Treasury Bridge (Added per user request) */}
                              <div
                                onClick={() => setSelectedNode("TREASURY")}
                                className={`rounded-xl border ${
                                  selectedNode === "TREASURY" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-purple-100/50" : "border-purple-200 bg-purple-50/50 hover:border-purple-400"
                                } p-1.5 text-center cursor-pointer transition-all`}
                              >
                                <div className="text-[9px] font-mono font-bold text-purple-950 flex items-center justify-center gap-1">
                                  <Landmark className="w-3 h-3 text-purple-700" /> PFMS / APB Bridge
                                </div>
                                <div className="text-[7.5px] font-mono text-purple-700 mt-0.5">
                                  NPCI Direct DBT Egress
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row: Asynchronous Stream & Observability Pipeline (Image 2 style) */}
                          <div className="grid grid-cols-12 gap-3">
                            {/* Left Col (Cols 1-8): Asynchronous Celery / AI Queue & S3 Storage */}
                            <div className="col-span-8 rounded-xl border-2 border-purple-200 bg-purple-50/20 p-2.5 space-y-2">
                              <div className="flex items-center justify-between pb-1 border-b border-purple-100">
                                <span className="text-[10.5px] font-bold text-purple-950 uppercase tracking-wide flex items-center gap-1.5">
                                  <Workflow className="w-3.5 h-3.5 text-purple-600" />
                                  Asynchronous Event &amp; AI Document Processing Pipeline
                                </span>
                                <span className="text-[8.5px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">
                                  CELERY POOL
                                </span>
                              </div>

                              <div className="grid grid-cols-12 gap-2 items-center">
                                {/* Celery Queue Node */}
                                <div
                                  onClick={() => setSelectedNode("CELERY_QUEUE")}
                                  className={`col-span-4 rounded-lg bg-white border ${
                                    selectedNode === "CELERY_QUEUE" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40" : "border-purple-200 hover:border-purple-400"
                                  } p-1.5 flex items-center gap-1.5 cursor-pointer transition-all`}
                                >
                                  <div className="w-4 h-4 rounded-full bg-[#ff7759] text-white font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                                    7
                                  </div>
                                  <div>
                                    <div className="text-[9.5px] font-bold text-purple-950 font-mono leading-tight">Celery / Redis Queue</div>
                                    <div className="text-[8px] text-gray-500">Non-blocking background broker</div>
                                  </div>
                                </div>

                                <div className="col-span-1 flex justify-center text-gray-400">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>

                                {/* Concurrent AI Worker Cluster Node */}
                                <div
                                  onClick={() => setSelectedNode("AI_WORKERS")}
                                  className={`col-span-4 rounded-lg bg-white border ${
                                    selectedNode === "AI_WORKERS" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40" : "border-purple-200 hover:border-purple-400"
                                  } p-1.5 space-y-1 cursor-pointer transition-all`}
                                >
                                  <div className="flex items-center justify-between text-[9px] font-bold text-gray-800">
                                    <span>AI Worker Pool</span>
                                    <span className="text-[8px] font-mono text-purple-700 bg-purple-50 px-1 rounded">Celery Daemon</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-1 text-[8px] font-mono text-center">
                                    <div className="p-0.5 rounded bg-gray-50 border border-gray-200">300 DPI</div>
                                    <div className="p-0.5 rounded bg-purple-50 border border-purple-200 font-bold text-purple-800">ELA (0.04)</div>
                                    <div className="p-0.5 rounded bg-gray-50 border border-gray-200">PaddleOCR</div>
                                  </div>
                                </div>

                                <div className="col-span-1 flex justify-center text-gray-400">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>

                                {/* S3 Storage Node */}
                                <div
                                  onClick={() => setSelectedNode("MINIO_S3")}
                                  className={`col-span-2 rounded-lg bg-amber-50/70 border ${
                                    selectedNode === "MINIO_S3" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40" : "border-amber-300 hover:border-amber-400"
                                  } p-1.5 text-center cursor-pointer transition-all`}
                                >
                                  <div className="flex items-center justify-center gap-1 text-[9.5px] font-bold text-amber-900 font-mono">
                                    <HardDrive className="w-3 h-3 text-amber-700" />
                                    <span>MinIO S3</span>
                                  </div>
                                  <div className="text-[7.5px] font-mono text-amber-800">
                                    AES-256 SSE
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Col (Cols 9-12): Observability, Telemetry & Audit Stream (Added per user request) */}
                            <div
                              onClick={() => setSelectedNode("OBSERVABILITY")}
                              className={`col-span-4 rounded-xl border-2 ${
                                selectedNode === "OBSERVABILITY" ? "border-[#ff7759] ring-2 ring-[#ff7759]/40 bg-teal-50/40" : "border-teal-200 bg-teal-50/20 hover:border-teal-400"
                              } p-2.5 space-y-1.5 cursor-pointer transition-all`}
                            >
                              <div className="flex items-center justify-between pb-1 border-b border-teal-100">
                                <span className="text-[10px] font-bold text-teal-950 uppercase tracking-wide flex items-center gap-1.5">
                                  <Activity className="w-3.5 h-3.5 text-teal-600" />
                                  Observability &amp; Audit Stream
                                </span>
                                <Badge variant="neutral" className="text-[8px] py-0 px-1 font-mono">TELEMETRY</Badge>
                              </div>

                              <div className="space-y-1 text-[8.5px] font-mono text-teal-900">
                                <div className="p-1 rounded bg-white border border-teal-200 flex items-center justify-between">
                                  <span>Prometheus Metrics</span>
                                  <span className="text-teal-700 font-bold">P95: 180ms</span>
                                </div>
                                <div className="p-1 rounded bg-white border border-teal-200 flex items-center justify-between">
                                  <span>OpenTelemetry Traces</span>
                                  <span className="text-teal-700 font-bold">Zero Loss</span>
                                </div>
                                <div className="p-1 rounded bg-teal-100/70 border border-teal-300 font-bold flex items-center justify-between">
                                  <span>Immutable Audit Ledger</span>
                                  <span>ISO 27001</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE COMPONENT INSPECTOR DRAWER (Added per user request) */}
                  <div className="rounded-2xl border-2 border-[#17171c] bg-[#ffffff] p-4 shadow-sm space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-start justify-between border-b border-gray-200 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#003c33] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          <Cpu className="w-4 h-4 text-[#a3e635]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#17171c]">
                              {NODE_SPECS[selectedNode]?.name || "Component Deep-Dive Inspector"}
                            </h4>
                            <Badge variant="scheme" className="text-[9.5px] font-mono">
                              {NODE_SPECS[selectedNode]?.badge}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                            Subsystem: {NODE_SPECS[selectedNode]?.subsystem} • Protocol: {NODE_SPECS[selectedNode]?.protocol}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                        Live Architecture Node Inspector
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Box 1: Core Responsibilities & Algorithms */}
                      <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                        <span className="font-bold text-[10px] uppercase font-mono text-gray-500">
                          Core Responsibilities &amp; Operations
                        </span>
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          {NODE_SPECS[selectedNode]?.role}
                        </p>
                      </div>

                      {/* Box 2: Security & Aadhaar Act Compliance */}
                      <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
                        <span className="font-bold text-[10px] uppercase font-mono text-emerald-800 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Security &amp; Compliance Standards
                        </span>
                        <p className="text-[11px] text-emerald-900 leading-relaxed font-sans">
                          {NODE_SPECS[selectedNode]?.compliance}
                        </p>
                        <div className="text-[10px] font-mono text-emerald-700 pt-1">
                          Scalability: {NODE_SPECS[selectedNode]?.scalability}
                        </div>
                      </div>

                      {/* Box 3: 30-Second Judge Elevator Defense */}
                      <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
                        <span className="font-bold text-[10px] uppercase font-mono text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" /> 30-Sec Judge Defense Soundbite
                        </span>
                        <p className="text-[11px] text-amber-950 leading-relaxed font-medium">
                          &ldquo;{NODE_SPECS[selectedNode]?.judgeDefense}&rdquo;
                        </p>
                      </div>
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
