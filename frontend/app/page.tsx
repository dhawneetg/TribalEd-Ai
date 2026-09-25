"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GuidelinesModal } from "@/components/ui/guidelines-modal";
import { useLanguage } from "@/lib/language-context";
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
  Layers,
  BarChart3,
  Search,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
  const [guidelinesTab, setGuidelinesTab] = useState<"NFST" | "NOS" | "DOCS" | "DEFICIENCY">("NFST");

  const openGuidelines = (tab: "NFST" | "NOS" | "DOCS" | "DEFICIENCY") => {
    setGuidelinesTab(tab);
    setGuidelinesModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#212121] selection:bg-[#ff7759] selection:text-white flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section - Cohere Editorial Canvas */}
        <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeece7] text-xs font-mono text-[#75758a] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1863dc]" />
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#17171c] leading-[1.05]">
              {t("hero.title1")}{" "}
              <span className="font-normal italic">{t("hero.titleHighlight1")}</span>{" "}
              {t("hero.titleAnd")}{" "}
              <span className="font-normal">{t("hero.titleHighlight2")}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#616161] max-w-2xl font-normal leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/opportunities" className="btn-primary text-base py-3 px-7 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#edfce9]" />
                {t("hero.discoverBtn")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apply" className="btn-pill-outline text-sm py-2.5 px-5">
                {t("hero.applyBtn")}
              </Link>
              <Link href="/officer/scrutiny" className="btn-pill-outline text-sm py-2.5 px-5">
                {t("hero.officerBtn")}
              </Link>
              <Link
                href="/track"
                className="text-xs sm:text-sm text-[#75758a] hover:text-[#1863dc] flex items-center gap-1.5 px-3 py-2"
              >
                <Search className="w-3.5 h-3.5" />
                {t("hero.trackBtn")}
              </Link>
            </div>
          </div>

          {/* Highlight Stats Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#e5e7eb]">
            <div>
              <div className="text-3xl sm:text-4xl font-light text-[#17171c] tracking-tight">
                {t("stats.time")}
              </div>
              <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
                {t("stats.timeLabel")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-[#1863dc] tracking-tight">
                {t("stats.trust")}
              </div>
              <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
                {t("stats.trustLabel")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-[#ff7759] tracking-tight">
                {t("stats.nearMiss")}
              </div>
              <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
                {t("stats.nearMissLabel")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-[#003c33] tracking-tight">
                {t("stats.streams")}
              </div>
              <div className="text-xs sm:text-sm text-[#75758a] mt-1 font-mono uppercase">
                {t("stats.streamsLabel")}
              </div>
            </div>
          </div>
        </section>

        {/* PROACTIVE OPPORTUNITY & NEAR-MISS FEATURE SECTION */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#eeece7]/40 border border-[#d9d9dd] rounded-[24px] p-6 sm:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#ff7759] tracking-wider font-semibold">
                  {t("nearMiss.badge")}
                </span>
                <h2 className="text-2xl sm:text-4xl font-light text-[#17171c] mt-1">
                  {t("nearMiss.title")}
                </h2>
                <p className="text-xs sm:text-sm text-[#616161] mt-2 max-w-2xl leading-relaxed">
                  {t("nearMiss.desc")}
                </p>
              </div>

              <div className="shrink-0">
                <Link href="/opportunities" className="btn-primary text-xs sm:text-sm py-3 px-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {t("nearMiss.tryBtn")}
                </Link>
              </div>
            </div>

            {/* Comparison Grid Table */}
            <div className="bg-white rounded-[18px] border border-[#d9d9dd] overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] border-b border-[#e5e7eb] bg-[#eeece7]/60 text-xs font-mono font-semibold uppercase text-[#75758a]">
                <div className="p-3">{t("nearMiss.tableOld")}</div>
                <div className="p-3 text-[#1863dc]">{t("nearMiss.tableSarthi")}</div>
              </div>
              <div className="divide-y divide-[#e5e7eb] text-xs">
                <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] p-3">
                  <div className="text-gray-500">{t("nearMiss.row1Old")}</div>
                  <div className="font-medium text-[#17171c]">{t("nearMiss.row1Sarthi")}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] p-3">
                  <div className="text-gray-500">{t("nearMiss.row2Old")}</div>
                  <div className="font-medium text-[#17171c]">{t("nearMiss.row2Sarthi")}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] p-3">
                  <div className="text-gray-500">{t("nearMiss.row3Old")}</div>
                  <div className="font-medium text-[#17171c]">{t("nearMiss.row3Sarthi")}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] p-3">
                  <div className="text-gray-500">{t("nearMiss.row4Old")}</div>
                  <div className="font-medium text-[#ff7759] font-semibold">
                    {t("nearMiss.row4Sarthi")}
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e5e7eb] p-3">
                  <div className="text-gray-500">{t("nearMiss.row5Old")}</div>
                  <div className="font-medium text-[#16a34a]">{t("nearMiss.row5Sarthi")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Green Feature Band - Cohere Product Band */}
        <section className="bg-[#003c33] text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-wider uppercase text-[#edfce9]/70">
                {t("features.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-2 text-white">
                {t("features.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal text-white">{t("features.f1Title")}</h3>
                <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                  {t("features.f1Desc")}
                </p>
              </div>

              <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal text-white">{t("features.f2Title")}</h3>
                <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                  {t("features.f2Desc")}
                </p>
              </div>

              <div className="bg-[#002822] p-8 rounded-[22px] border border-white/10 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-[#edfce9]/10 text-[#edfce9] flex items-center justify-center mb-6">
                  <SplitSquareVertical className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal text-white">{t("features.f3Title")}</h3>
                <p className="mt-3 text-sm text-[#edfce9]/80 leading-relaxed">
                  {t("features.f3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Portal Switchboard Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[22px] bg-[#eeece7]/40 border border-[#d9d9dd] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#1863dc] uppercase">{t("quickPortals.p1Tag")}</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-1">{t("quickPortals.p1Title")}</h3>
                <p className="text-xs text-[#616161] mt-2">
                  {t("quickPortals.p1Desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d9d9dd]">
                <Link href="/apply" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1">
                  {t("quickPortals.p1Btn")}
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-[22px] bg-[#eeece7]/40 border border-[#d9d9dd] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff7759] uppercase">{t("quickPortals.p2Tag")}</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-1">{t("quickPortals.p2Title")}</h3>
                <p className="text-xs text-[#616161] mt-2">
                  {t("quickPortals.p2Desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d9d9dd]">
                <Link href="/track" className="btn-pill-outline text-xs py-2 px-4 inline-flex items-center gap-1">
                  {t("quickPortals.p2Btn")}
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-[22px] bg-[#eeece7]/40 border border-[#d9d9dd] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#003c33] uppercase">{t("quickPortals.p3Tag")}</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-1">{t("quickPortals.p3Title")}</h3>
                <p className="text-xs text-[#616161] mt-2">
                  {t("quickPortals.p3Desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d9d9dd]">
                <Link href="/officer/analytics" className="btn-pill-outline text-xs py-2 px-4 inline-flex items-center gap-1">
                  {t("quickPortals.p3Btn")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Target Schemes Breakdown Section */}
        <section id="schemes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-wider uppercase text-[#ff7759]">
              {t("schemes.tag")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-[#17171c] tracking-tight mt-2">
              {t("schemes.title")}
            </h2>
            <p className="mt-4 text-[#616161]">
              {t("schemes.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NFST Card */}
            <Card variant="stone" className="relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="scheme">{t("schemes.nfstBadge")}</Badge>
                  <span className="text-xs font-mono text-[#75758a]">{t("schemes.nfstScope")}</span>
                </div>
                <h3 className="text-2xl font-normal text-[#17171c] mt-4">
                  {t("schemes.nfstTitle")}
                </h3>
                <p className="text-sm text-[#616161] mt-3 leading-relaxed">
                  {t("schemes.nfstDesc")}
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-[#212121]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "आय सीमा:" : "Income Ceiling:"}</strong> {t("schemes.nfstC1").replace(/.*?:/, "")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "आयु सीमा:" : "Age Limit:"}</strong> {t("schemes.nfstC2").replace(/.*?:/, "")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "फेलोशिप राशि:" : "Fellowship Grant:"}</strong> {t("schemes.nfstC3").replace(/.*?:/, "")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#d9d9dd] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openGuidelines("NFST")}
                  className="text-xs text-[#1863dc] hover:underline flex items-center gap-1 font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {t("schemes.viewRules")} (R01-R05)
                </button>
                <Link href="/apply?scheme=NFST" className="btn-primary text-xs py-2 px-4">
                  {t("schemes.applyNfst")}
                </Link>
              </div>
            </Card>

            {/* NOS Card */}
            <Card variant="canvas" className="relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="scheme">{t("schemes.nosBadge")}</Badge>
                  <span className="text-xs font-mono text-[#1863dc]">{t("schemes.nosScope")}</span>
                </div>
                <h3 className="text-2xl font-normal text-[#17171c] mt-4">
                  {t("schemes.nosTitle")}
                </h3>
                <p className="text-sm text-[#616161] mt-3 leading-relaxed">
                  {t("schemes.nosDesc")}
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-[#212121]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "विश्वविद्यालय रैंकिंग:" : "University Rank:"}</strong> {t("schemes.nosC1").replace(/.*?:/, "")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "पात्रता अंक:" : "Qualifying Marks:"}</strong> {t("schemes.nosC2").replace(/.*?:/, "")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span><strong>{language === "hi" ? "कवरेज:" : "Coverage:"}</strong> {t("schemes.nosC3").replace(/.*?:/, "")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e5e7eb] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openGuidelines("NOS")}
                  className="text-xs text-[#1863dc] hover:underline flex items-center gap-1 font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {t("schemes.viewRules")} (R01-R06)
                </button>
                <Link href="/apply?scheme=NOS" className="btn-primary text-xs py-2 px-4">
                  {t("schemes.applyNos")}
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#17171c] text-[#93939f] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#27272a] mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">{t("footer.sarthi")}</span>
            <span>• {t("footer.mota")}</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/apply" className="hover:text-white transition-colors">
              {t("footer.applicant")}
            </Link>
            <Link href="/track" className="hover:text-white transition-colors">
              {t("footer.remediation")}
            </Link>
            <Link href="/officer/scrutiny" className="hover:text-white transition-colors">
              {t("footer.scrutiny")}
            </Link>
            <Link href="/officer/analytics" className="hover:text-white transition-colors">
              {t("footer.analytics")}
            </Link>
            <button
              onClick={() => openGuidelines("DOCS")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t("footer.docs")}
            </button>
            <span>{t("footer.sih")}</span>
          </div>
        </div>
      </footer>

      {/* Guidelines Modal */}
      <GuidelinesModal
        isOpen={guidelinesModalOpen}
        onClose={() => setGuidelinesModalOpen(false)}
        defaultTab={guidelinesTab}
      />
    </div>
  );
}
