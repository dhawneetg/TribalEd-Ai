import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowUpRight, GraduationCap } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb]">
      {/* Announcement Bar */}
      <div className="bg-[#000000] text-[#eeece7] text-[12px] py-2 px-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff7759]" />
            <span>
              Ministry of Tribal Affairs (MoTA) • SIH-2026 System (Problem ID 26239)
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#93939f]">
            <span>NFST & NOS Unified Portal</span>
            <span className="text-white hover:underline cursor-pointer">Official Guidelines</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
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

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#212121]">
            <Link href="/#schemes" className="hover:text-[#1863dc] transition-colors">
              Schemes
            </Link>
            <Link href="/apply" className="hover:text-[#1863dc] transition-colors flex items-center gap-1">
              Applicant Portal
            </Link>
            <Link href="/officer/scrutiny" className="hover:text-[#1863dc] transition-colors flex items-center gap-1 font-medium text-[#1863dc]">
              Officer Scrutiny
              <span className="text-[10px] bg-[#edfce9] text-[#003c33] px-1.5 py-0.5 rounded font-mono">Live Demo</span>
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
        </div>
      </div>
    </header>
  );
};
