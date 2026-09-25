"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GuidelinesModal } from "@/components/ui/guidelines-modal";
import { ArchitectureModal } from "@/components/ui/architecture-modal";
import {
  ShieldCheck,
  ArrowUpRight,
  GraduationCap,
  BookOpen,
  Search,
  BarChart3,
  Layers,
  Menu,
  X,
  Sparkles,
  Server,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export const Navbar: React.FC = () => {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb]">
        {/* Top Government Announcement Bar */}
        <div className="bg-[#000000] text-[#eeece7] text-[11.5px] py-1.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff7759]" />
              <span className="truncate tracking-wide">
                {t("nav.banner")}
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-5 text-[#93939f]">
              {/* Language Switcher */}
              <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20 text-[10.5px]">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                    language === "en" ? "bg-[#ff7759] text-white shadow-xs" : "text-gray-300 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hi")}
                  className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                    language === "hi" ? "bg-[#ff7759] text-white shadow-xs" : "text-gray-300 hover:text-white"
                  }`}
                >
                  हिंदी
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsArchitectureOpen(true)}
                className="text-white hover:text-[#a3e635] transition-colors flex items-center gap-1.5 cursor-pointer font-medium whitespace-nowrap"
              >
                <Server className="w-3.5 h-3.5 text-[#a3e635]" />
                {t("nav.systemDesign")}
              </button>
              <button
                type="button"
                onClick={() => setIsGuidelinesOpen(true)}
                className="text-white hover:text-[#edfce9] transition-colors flex items-center gap-1.5 cursor-pointer font-medium whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#edfce9]" />
                {t("nav.guidelines")}
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#17171c] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <GraduationCap className="w-5 h-5 text-[#edfce9]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-[#17171c] tracking-tight leading-none">
                {t("nav.title")}
              </span>
              <span className="text-[9.5px] text-[#75758a] tracking-wider uppercase font-mono mt-0.5">
                {t("nav.subtitle")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13.5px] text-[#333333]">
            <Link
              href="/opportunities"
              className="hover:text-[#1863dc] transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff7759]" />
              <span>{t("nav.opportunities")}</span>
              <span className="text-[10px] bg-[#ff7759]/10 text-[#ff7759] border border-[#ff7759]/20 font-mono px-2 py-0.5 rounded-full font-semibold tracking-tight whitespace-nowrap">
                {t("nav.nearMissAi")}
              </span>
            </Link>

            <Link
              href="/apply"
              className="hover:text-[#1863dc] transition-colors font-medium whitespace-nowrap"
            >
              {t("nav.apply")}
            </Link>

            <Link
              href="/track"
              className="hover:text-[#1863dc] transition-colors font-medium whitespace-nowrap"
            >
              {t("nav.track")}
            </Link>

            <Link
              href="/officer/scrutiny"
              className="hover:text-[#1863dc] transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap"
            >
              <span>{t("nav.scrutiny")}</span>
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" title="Live Scrutiny Queue Active" />
            </Link>

            <Link
              href="/officer/analytics"
              className="hover:text-[#1863dc] transition-colors flex items-center gap-1.5 font-medium text-[#616161] hover:text-[#17171c] whitespace-nowrap"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t("nav.analytics")}</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#edfce9] text-[#003c33] border border-[#a3e635]/40 text-xs font-medium font-mono whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
              {t("nav.digilocker")}
            </div>

            <Link
              href="/opportunities"
              className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <span>{t("nav.discoverMatches")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#e5e7eb] px-4 py-4 space-y-3 text-sm animate-in fade-in duration-150">
            <Link
              href="/opportunities"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-[#ff7759] font-medium border-b border-gray-100"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Opportunities &amp; Near-Miss AI
              </span>
              <span className="text-[10px] bg-[#ff7759]/10 text-[#ff7759] px-2 py-0.5 rounded-full font-mono font-semibold">
                NEW
              </span>
            </Link>

            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#212121] font-medium border-b border-gray-100"
            >
              Apply for Scholarship / Fellowship
            </Link>

            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#212121] font-medium border-b border-gray-100"
            >
              Track Application &amp; Remediate (7-Day Desk)
            </Link>

            <Link
              href="/officer/scrutiny"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-[#1863dc] font-medium border-b border-gray-100"
            >
              <span>Officer Scrutiny Console</span>
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            </Link>

            <Link
              href="/officer/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-[#212121] font-medium border-b border-gray-100"
            >
              <BarChart3 className="w-4 h-4 text-[#75758a]" />
              Executive MoTA Analytics &amp; DBT Hub
            </Link>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsArchitectureOpen(true);
                }}
                className="text-[#1863dc] font-medium flex items-center gap-1"
              >
                <Server className="w-3.5 h-3.5" />
                System Design &amp; Flowcharts
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsGuidelinesOpen(true);
                }}
                className="text-[#75758a] hover:text-[#17171c] font-medium flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Official Guidelines
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Guidelines Modal */}
      <GuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      {/* System Architecture & Security Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </>
  );
};
