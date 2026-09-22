"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GuidelinesModal } from "@/components/ui/guidelines-modal";
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
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb]">
        {/* Announcement Bar */}
        <div className="bg-[#000000] text-[#eeece7] text-[12px] py-2 px-4 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ff7759]" />
              <span className="truncate">
                Ministry of Tribal Affairs (MoTA) • SIH-2026 Problem ID 26239
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#93939f]">
              <span className="hidden md:inline">NFST & NOS Unified System</span>
              <button
                type="button"
                onClick={() => setIsGuidelinesOpen(true)}
                className="text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#edfce9]" />
                Official Guidelines
              </button>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-[#17171c] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <GraduationCap className="w-5 h-5 text-[#edfce9]" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-[#17171c] tracking-tight leading-none">
                  Sarthi
                </span>
                <span className="text-[10px] text-[#75758a] tracking-wider uppercase">
                  Govt. of India • MoTA
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-5 text-sm text-[#212121]">
              <Link href="/#schemes" className="hover:text-[#1863dc] transition-colors">
                Schemes
              </Link>
              <Link href="/apply" className="hover:text-[#1863dc] transition-colors">
                Applicant Portal
              </Link>
              <Link href="/track" className="hover:text-[#1863dc] transition-colors flex items-center gap-1">
                Track &amp; Remediate
                <span className="text-[10px] bg-[#eeece7] text-[#17171c] px-1.5 py-0.5 rounded font-mono">7-Day</span>
              </Link>
              <Link
                href="/officer/scrutiny"
                className="hover:text-[#1863dc] transition-colors flex items-center gap-1 font-medium text-[#1863dc]"
              >
                Officer Scrutiny
                <span className="text-[10px] bg-[#edfce9] text-[#003c33] px-1.5 py-0.5 rounded font-mono">
                  Live Queue
                </span>
              </Link>
              <Link
                href="/officer/analytics"
                className="hover:text-[#1863dc] transition-colors flex items-center gap-1 text-[#616161]"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                MoTA Analytics &amp; DBT
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="digilocker" className="hidden sm:inline-flex">
              <ShieldCheck className="w-3.5 h-3.5" />
              DigiLocker Certified
            </Badge>

            <Link
              href="/apply"
              className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5"
            >
              Start Application
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#e5e7eb] px-4 py-4 space-y-3 text-sm">
            <Link
              href="/#schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#212121] font-medium"
            >
              Schemes
            </Link>
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#212121] font-medium"
            >
              Applicant Portal
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#212121] font-medium"
            >
              Track Application &amp; Remediate
            </Link>
            <Link
              href="/officer/scrutiny"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#1863dc] font-medium"
            >
              Officer Scrutiny Console
            </Link>
            <Link
              href="/officer/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#212121] font-medium"
            >
              Executive MoTA Analytics &amp; DBT Hub
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsGuidelinesOpen(true);
              }}
              className="w-full text-left py-1.5 text-[#ff7759] font-medium"
            >
              View Official Guidelines
            </button>
          </div>
        )}
      </header>

      {/* Guidelines Modal */}
      <GuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </>
  );
};
