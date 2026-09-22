import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Zap,
  SplitSquareVertical,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck2,
  Scale,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121] selection:bg-[#ff7759] selection:text-white">
      <Navbar />

      {/* Hero Section - Cohere Editorial Canvas */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeece7] text-xs font-mono text-[#75758a] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1863dc]" />
            AI-POWERED SCHOLARSHIP SCRUTINY & GOVERNANCE
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#17171c] leading-[1.05]">
            Empowering Scheduled Tribe Scholars with{" "}
            <span className="font-normal italic">Instant Scrutiny</span> &{" "}
            <span className="font-normal">Zero-Friction Fellowships.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#616161] max-w-2xl font-normal leading-relaxed">
            Eliminating multi-month manual verification backlogs for the Ministry of
            Tribal Affairs. Direct DigiLocker verification, trilingual OCR, automated
            scheme rule execution, and 50/50 dual-pane officer scrutiny.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/apply" className="btn-primary text-base py-3 px-7">
              Apply for Scholarship
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/officer/scrutiny" className="btn-pill-outline text-sm py-2.5 px-5">
              Open Officer Scrutiny Console
            </Link>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#e5e7eb]">
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#17171c] tracking-tight">
              &le; 3.5s
            </div>
            <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
              AI Document Verification
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#1863dc] tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
              DigiLocker Trust Level
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#17171c] tracking-tight">
              7 Days
            </div>
            <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
              Micro-Deficiency Remediation
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#003c33] tracking-tight">
              2 Schemes
            </div>
            <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
              NFST (India) & NOS (Abroad)
            </div>
          </div>
        </div>
      </section>

      {/* Deep Green Feature Band - Cohere Product Band */}
      <section className="bg-[#003c33] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono tracking-wider uppercase text-[#edfce9]/70">
              CORE SYSTEM CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-2 text-white">
              Architected for Accuracy, Accessibility, and Government Integrity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-normal text-white">Trilingual Document OCR</h3>
              <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                Extracts names, dates, issuing authorities, and income figures from Hindi,
                English, and regional state certificate scans using PaddleOCR and LayoutLMv3.
              </p>
            </div>

            <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-normal text-white">Image Forgery & Tamper ELA</h3>
              <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                Detects modified income figures, spoofed stamps, and digital edits via OpenCV
                Error Level Analysis (ELA) and PDF metadata heuristics.
              </p>
            </div>

            <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                <SplitSquareVertical className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-normal text-white">50/50 Dual-Pane Scrutiny</h3>
              <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                Human-in-the-Loop desk console pairing zoomable document scans on the left with
                confidence-coded metadata badges on the right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Schemes Breakdown Section */}
      <section id="schemes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-wider uppercase text-[#ff7759]">
            MO TA FELLOWSHIP PROGRAMS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-[#17171c] tracking-tight mt-2">
            Target Schemes Governed by Rule Engine
          </h2>
          <p className="mt-4 text-[#616161]">
            Declarative eligibility validation configured to central government gazette criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NFST Card */}
          <Card variant="stone" className="relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="scheme">NFST SCHEME</Badge>
                <span className="text-xs font-mono text-[#75758a]">DOMESTIC RESEARCH</span>
              </div>
              <h3 className="text-2xl font-normal text-[#17171c] mt-4">
                National Fellowship for Higher Education of ST Students
              </h3>
              <p className="text-sm text-[#616161] mt-3 leading-relaxed">
                Financial support for Scheduled Tribe scholars pursuing regular full-time M.Phil.
                and Ph.D. in recognized Indian universities.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#212121]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>Income Ceiling:</strong> &le; ₹6.0 Lakhs Per Annum (LPA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>Age Limit:</strong> &le; 36 yrs (Men), &le; 41 yrs (Women/Transgender)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>Fellowship Grant:</strong> ₹31,000/mo (JRF) + ₹35,000/mo (SRF) + HRA</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d9d9dd] flex items-center justify-between">
              <span className="text-xs text-[#75758a]">Eligibility: Rule NFST-R01 to R05</span>
              <Link href="/apply?scheme=NFST" className="btn-primary text-xs py-2 px-4">
                Apply for NFST
              </Link>
            </div>
          </Card>

          {/* NOS Card */}
          <Card variant="canvas" className="relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="scheme">NOS SCHEME</Badge>
                <span className="text-xs font-mono text-[#1863dc]">INTERNATIONAL STUDIES</span>
              </div>
              <h3 className="text-2xl font-normal text-[#17171c] mt-4">
                National Overseas Scholarship for ST Candidates
              </h3>
              <p className="text-sm text-[#616161] mt-3 leading-relaxed">
                Prestigious grant enabling ST scholars to attend top-ranked global universities for
                Post-Graduate (Masters) and Doctoral (Ph.D.) programs.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#212121]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>University Rank:</strong> QS World Ranking &le; 500</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>Qualifying Marks:</strong> &ge; 60% in Bachelor&apos;s/Master&apos;s</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span><strong>Coverage:</strong> 100% Tuition Fees + Annual Maintenance Allowance</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e7eb] flex items-center justify-between">
              <span className="text-xs text-[#75758a]">Eligibility: Rule NOS-R01 to R06</span>
              <Link href="/apply?scheme=NOS" className="btn-primary text-xs py-2 px-4">
                Apply for NOS
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17171c] text-[#93939f] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#27272a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Sarthi</span>
            <span>• Ministry of Tribal Affairs, Government of India</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/apply" className="hover:text-white transition-colors">Applicant Portal</Link>
            <Link href="/officer/scrutiny" className="hover:text-white transition-colors">Scrutiny Console</Link>
            <span>Smart India Hackathon 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
