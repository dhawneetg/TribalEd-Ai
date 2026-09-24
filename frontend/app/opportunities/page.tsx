"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StudentProfile,
  OpportunityItem,
  matchOpportunities,
  scheduleOpportunityAlert,
} from "@/lib/api";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Bell,
  ArrowRight,
  ShieldCheck,
  FileText,
  FileCheck2,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Check,
  Send,
  Zap,
  Globe2,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  HelpCircle,
  Calendar,
  X,
} from "lucide-react";

function OpportunitiesInner() {
  // Student Profile State
  const [profile, setProfile] = useState<StudentProfile>({
    name: "Ramesh Chandra Munda",
    course: "B.Tech",
    year: "3rd Year",
    branch: "Computer Science & Engineering",
    state: "Jharkhand",
    district: "Khunti",
    category: "Scheduled Tribe (ST)",
    tribe: "Munda",
    income_inr: 240000,
    age: 20,
    gender: "Male",
    marks_percentage: 74.0,
    interests: ["Scholarships", "Internships", "Govt Exams", "Certifications"],
    documents_present: ["Aadhaar", "Caste Certificate"], // Missing Income Certificate by default
  });

  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [matchingData, setMatchingData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Alert Modal State
  const [alertModalOpp, setAlertModalOpp] = useState<OpportunityItem | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("+91 98765 43210");
  const [alertChannel, setAlertChannel] = useState<string>("SMS & WhatsApp");
  const [alertSuccessMsg, setAlertSuccessMsg] = useState<string | null>(null);

  // Document Upload Modal State for Near-Miss
  const [uploadModalOpp, setUploadModalOpp] = useState<OpportunityItem | null>(null);
  const [uploadingDocName, setUploadingDocName] = useState<string>("");
  const [isUploadingDoc, setIsUploadingDoc] = useState<boolean>(false);

  // Quick Presets
  const applyPreset = (type: "ramesh" | "sunita" | "birsa" | "pooja") => {
    if (type === "ramesh") {
      setProfile({
        name: "Ramesh Chandra Munda",
        course: "B.Tech",
        year: "3rd Year",
        branch: "Computer Science & Engineering",
        state: "Jharkhand",
        district: "Khunti",
        category: "Scheduled Tribe (ST)",
        tribe: "Munda",
        income_inr: 240000,
        age: 20,
        gender: "Male",
        marks_percentage: 74.0,
        interests: ["Scholarships", "Internships", "Govt Exams", "Certifications"],
        documents_present: ["Aadhaar", "Caste Certificate"], // Missing Income Cert -> Near Miss
      });
    } else if (type === "sunita") {
      setProfile({
        name: "Sunita Soren",
        course: "Final Year B.Tech",
        year: "Final Year",
        branch: "Computer Science",
        state: "Odisha",
        district: "Mayurbhanj",
        category: "Scheduled Tribe (ST)",
        tribe: "Santhal",
        income_inr: 380000,
        age: 21,
        gender: "Female",
        marks_percentage: 82.5,
        interests: ["Scholarships", "Internships", "Certifications"],
        documents_present: ["Aadhaar", "Caste Certificate", "Income Certificate", "Passport / Offer Letter"],
      });
    } else if (type === "birsa") {
      setProfile({
        name: "Birsa Oraon",
        course: "B.Sc",
        year: "2nd Year",
        branch: "Agriculture & Rural Tech",
        state: "Jharkhand",
        district: "Ranchi",
        category: "Scheduled Tribe (ST)",
        tribe: "Oraon",
        income_inr: 180000,
        age: 19,
        gender: "Male",
        marks_percentage: 58.5, // Near-miss cutoff with 5% relaxation
        interests: ["Scholarships", "Internships", "Govt Exams"],
        documents_present: ["Aadhaar", "Caste Certificate", "College ID / NoC"],
      });
    } else if (type === "pooja") {
      setProfile({
        name: "Pooja Kispotta",
        course: "Ph.D.",
        year: "Research Scholar",
        branch: "Environmental Sciences",
        state: "Jharkhand",
        district: "Simdega",
        category: "Scheduled Tribe (ST)",
        tribe: "Kharia",
        income_inr: 210000,
        age: 26,
        gender: "Female",
        marks_percentage: 86.0,
        interests: ["Scholarships", "Certifications"],
        documents_present: ["Aadhaar", "Caste Certificate", "Income Certificate", "Admission Letter"],
      });
    }
  };

  const runMatching = async (currentProfile = profile) => {
    setIsAnalyzing(true);
    const res = await matchOpportunities(currentProfile);
    setMatchingData(res);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    runMatching();
  }, [profile]);

  const toggleDocument = (docName: string) => {
    setProfile((prev) => {
      const exists = prev.documents_present.includes(docName);
      const updated = exists
        ? prev.documents_present.filter((d) => d !== docName)
        : [...prev.documents_present, docName];
      return { ...prev, documents_present: updated };
    });
  };

  const handleFixNearMissDoc = (opp: OpportunityItem) => {
    const missing = opp.missing_docs?.[0] || "Income Certificate";
    setUploadModalOpp(opp);
    setUploadingDocName(missing);
  };

  const handleConfirmDocUpload = () => {
    setIsUploadingDoc(true);
    setTimeout(() => {
      setIsUploadingDoc(false);
      // Add missing doc to profile documents
      setProfile((prev) => ({
        ...prev,
        documents_present: [...prev.documents_present, uploadingDocName],
      }));
      setUploadModalOpp(null);
      setAlertSuccessMsg(`✅ ${uploadingDocName} attached! Opportunities automatically re-evaluated to Fully Eligible.`);
    }, 800);
  };

  const handleOpenAlertModal = (opp: OpportunityItem) => {
    setAlertModalOpp(opp);
    setAlertSuccessMsg(null);
  };

  const handleScheduleAlert = async () => {
    if (!alertModalOpp) return;
    const res = await scheduleOpportunityAlert({
      opportunity_id: alertModalOpp.id,
      opportunity_title: alertModalOpp.title,
      phone: phoneNumber,
      channel: alertChannel,
    });
    setAlertSuccessMsg(res.message);
    setTimeout(() => {
      setAlertModalOpp(null);
    }, 2200);
  };

  // Filter opportunities based on active tab
  const allOpps: OpportunityItem[] = matchingData?.opportunities || [];
  const filteredOpps = allOpps.filter((opp) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "NEAR_MISS") return opp.match_status === "NEAR_MISS";
    if (activeTab === "URGENT") return opp.is_deadline_urgent && opp.match_status !== "NOT_ELIGIBLE";
    if (activeTab === "SCHOLARSHIP") return opp.type === "Scholarship";
    if (activeTab === "INTERNSHIP") return opp.type === "Internship";
    if (activeTab === "EXAM") return opp.type === "Exam & Coaching";
    if (activeTab === "CERTIFICATION") return opp.type === "Certification";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#212121] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Executive Header Banner */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeece7] text-xs font-mono text-[#75758a] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#ff7759]" />
              AI OPPORTUNITY DISCOVERY &amp; NEAR-MISS INTELLIGENCE
            </div>
            <h1 className="text-3xl sm:text-5xl font-light text-[#17171c] tracking-tight">
              Proactive Opportunity Matcher &amp; Near-Miss Alerts
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#616161] leading-relaxed">
              Register your academic profile once. Sarthi scans central, state, and premier opportunities,
              executes statutory qualification rules, and delivers <strong>actionable near-miss alerts</strong>{" "}
              before deadlines close.
            </p>
          </div>

          {/* Sarthi vs Existing Portals Comparison Strip */}
          <div className="p-5 rounded-[22px] bg-white border border-[#e5e7eb] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
              <span className="text-xs font-mono uppercase text-[#75758a] tracking-wider">
                HOW SARTHI TRANSFORMS STUDENT DISCOVERY
              </span>
              <Badge variant="scheme">Core Differentiator</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 text-xs">
              <div className="space-y-1">
                <span className="text-[#75758a] text-[11px] uppercase">Search Paradigm</span>
                <p className="line-through text-gray-400">Student searches</p>
                <p className="font-semibold text-[#1863dc]">System proactively matches</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#75758a] text-[11px] uppercase">Portal Fragmentation</span>
                <p className="line-through text-gray-400">Multiple portals</p>
                <p className="font-semibold text-[#1863dc]">Unified opportunity feed</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#75758a] text-[11px] uppercase">Eligibility Reading</span>
                <p className="line-through text-gray-400">Student reads PDFs</p>
                <p className="font-semibold text-[#1863dc]">Rule-based AI engine</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#75758a] text-[11px] uppercase">Cutoff Tracking</span>
                <p className="line-through text-gray-400">Student remembers</p>
                <p className="font-semibold text-[#1863dc]">Automated SMS alerts</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#75758a] text-[11px] uppercase">Discovery Insight</span>
                <p className="line-through text-gray-400">Eligible / Rejected</p>
                <p className="font-semibold text-[#ff7759]">Near-Miss Guidance ⚠️</p>
              </div>
            </div>
          </div>

          {/* ONE-TIME STUDENT UNIFIED PROFILE REGISTER */}
          <Card variant="canvas" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#1863dc]">STEP 1: UNIFIED CANDIDATE RECORD</span>
                <h2 className="text-xl sm:text-2xl font-light text-[#17171c] mt-0.5">
                  Single Profile Intake (Registered Once)
                </h2>
                <p className="text-xs text-[#75758a]">
                  Modify your parameters below or select a preset to watch the opportunity feed adapt in real time.
                </p>
              </div>

              {/* Fast Presets */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[#75758a] font-mono mr-1">Demo Profiles:</span>
                <button
                  type="button"
                  onClick={() => applyPreset("ramesh")}
                  className="px-2.5 py-1 rounded-full bg-[#eeece7] hover:bg-[#d9d9dd] font-medium text-[11px]"
                >
                  Ramesh (B.Tech - Missing Doc)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("sunita")}
                  className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 font-medium text-[11px]"
                >
                  Sunita (Final Yr - Urgent 44h)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("birsa")}
                  className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-100 font-medium text-[11px]"
                >
                  Birsa (Agro - Relaxation)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("pooja")}
                  className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium text-[11px]"
                >
                  Pooja (Ph.D. Research)
                </button>
              </div>
            </div>

            {/* Profile Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Course &amp; Stage</label>
                <input
                  type="text"
                  value={profile.course}
                  onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Current Year of Study</label>
                <input
                  type="text"
                  value={profile.year}
                  onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Branch / Specialization</label>
                <input
                  type="text"
                  value={profile.branch}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">State &amp; District</label>
                <input
                  type="text"
                  value={`${profile.state} (${profile.district || "Khunti"})`}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={profile.income_inr}
                  onChange={(e) => setProfile({ ...profile, income_inr: Number(e.target.value) })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Candidate Age &amp; Gender</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-1/2 bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                  />
                  <input
                    type="text"
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-1/2 bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Qualifying Marks (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.marks_percentage}
                  onChange={(e) => setProfile({ ...profile, marks_percentage: Number(e.target.value) })}
                  className="w-full bg-[#eeece7]/40 border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                />
              </div>
            </div>

            {/* Document Checklist in Profile (Triggers Near-Miss!) */}
            <div className="pt-3 border-t border-[#e5e7eb] space-y-2">
              <span className="text-xs font-mono uppercase text-[#75758a]">
                Verified Digital Documents Present in Sarthi DigiLocker Vault:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Aadhaar", "Caste Certificate", "Income Certificate", "Admission Letter", "College ID / NoC", "Passport / Offer Letter"].map(
                  (doc) => {
                    const isPresent = profile.documents_present.includes(doc);
                    return (
                      <button
                        key={doc}
                        type="button"
                        onClick={() => toggleDocument(doc)}
                        className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                          isPresent
                            ? "bg-[#edfce9] border-[#a3e635]/60 text-[#003c33] font-medium"
                            : "bg-white border-[#d9d9dd] text-[#75758a] hover:bg-[#eeece7]"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${isPresent ? "bg-[#16a34a] text-white" : "border border-gray-300"}`}>
                          {isPresent ? "✓" : ""}
                        </span>
                        {doc}
                      </button>
                    );
                  }
                )}
              </div>
              <p className="text-[11px] text-[#75758a]">
                💡 Tip: Toggle a document on/off above to observe how Sarthi flags or clears <strong>Near-Miss</strong> status.
              </p>
            </div>
          </Card>

          {/* AI MATCHING RESULTS HEADER */}
          {matchingData && (
            <div className="p-6 rounded-[22px] bg-[#003c33] text-white space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-[#edfce9]/70 tracking-wider">
                    PROACTIVE OPPORTUNITY INTELLIGENCE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mt-1">
                    {matchingData.summary.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#edfce9]/80 mt-1">
                    Directly matched against MoTA Fellowship Gazettes, AICTE, NITI Aayog, UPSC, and premier certifications.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl text-center min-w-[90px]">
                    <div className="text-2xl font-light text-[#a3e635]">
                      {matchingData.summary.fully_eligible_count}
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[#edfce9]/70">Fully Eligible</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl text-center min-w-[90px]">
                    <div className="text-2xl font-light text-[#ff7759]">
                      {matchingData.summary.near_miss_count}
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[#edfce9]/70">Near-Misses</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl text-center min-w-[90px]">
                    <div className="text-2xl font-light text-amber-300">
                      {matchingData.summary.urgent_deadline_count}
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[#edfce9]/70">&lt;48h Cutoff</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEED CATEGORY FILTER TABS */}
          <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-3 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === "ALL" ? "bg-[#17171c] text-white" : "text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              All Opportunities ({allOpps.length})
            </button>
            <button
              onClick={() => setActiveTab("NEAR_MISS")}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === "NEAR_MISS"
                  ? "bg-[#ff7759] text-white"
                  : "text-[#ff7759] bg-[#ff7759]/10 hover:bg-[#ff7759]/20"
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              Near-Miss Alerts ({matchingData?.summary.near_miss_count || 0})
            </button>
            <button
              onClick={() => setActiveTab("URGENT")}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === "URGENT"
                  ? "bg-amber-600 text-white"
                  : "text-amber-800 bg-amber-50 hover:bg-amber-100"
              }`}
            >
              <Clock className="w-3 h-3" />
              Closing in &lt;48h ({matchingData?.summary.urgent_deadline_count || 0})
            </button>
            <button
              onClick={() => setActiveTab("SCHOLARSHIP")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === "SCHOLARSHIP" ? "bg-[#17171c] text-white" : "text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              Scholarships 🎓
            </button>
            <button
              onClick={() => setActiveTab("INTERNSHIP")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === "INTERNSHIP" ? "bg-[#17171c] text-white" : "text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              Internships 💼
            </button>
            <button
              onClick={() => setActiveTab("EXAM")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === "EXAM" ? "bg-[#17171c] text-white" : "text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              Exams &amp; Coaching 🏛️
            </button>
            <button
              onClick={() => setActiveTab("CERTIFICATION")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === "CERTIFICATION" ? "bg-[#17171c] text-white" : "text-[#616161] hover:bg-[#eeece7]"
              }`}
            >
              Certifications 📜
            </button>
          </div>

          {/* OPPORTUNITIES FEED CARDS */}
          <div className="space-y-4">
            {filteredOpps.map((opp) => {
              const isNearMiss = opp.match_status === "NEAR_MISS";
              const isEligible = opp.match_status === "FULLY_ELIGIBLE";
              const isExpanded = expandedCardId === opp.id;

              return (
                <div
                  key={opp.id}
                  className={`p-6 rounded-[22px] border transition-all ${
                    isNearMiss
                      ? "bg-white border-[#f59e0b]/50 shadow-sm hover:border-[#f59e0b]"
                      : isEligible
                      ? "bg-white border-[#a3e635]/50 shadow-sm hover:border-[#16a34a]"
                      : "bg-[#faf9f7] border-[#e5e7eb] opacity-75"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="scheme">{opp.type}</Badge>
                        <span className="text-xs font-mono text-[#75758a]">{opp.provider}</span>

                        {/* Match Status Badges */}
                        {isEligible && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#edfce9] text-[#16a34a] border border-[#a3e635]/40">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            100% Fully Eligible
                          </span>
                        )}

                        {isNearMiss && opp.near_miss_type === "MISSING_DOCUMENT" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-300">
                            <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                            Near-Miss: 1 Required Document Missing
                          </span>
                        )}

                        {isNearMiss && opp.near_miss_type === "RELAXATION_APPLICABLE" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-900 border border-blue-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#1863dc]" />
                            Near-Miss: 5% Tribal Relaxation Applies
                          </span>
                        )}

                        {opp.is_deadline_urgent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-900 border border-red-300 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-red-600" />
                            Closes in {opp.hours_remaining} Hours!
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-normal text-[#17171c] pt-1">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-[#616161] leading-relaxed max-w-3xl">
                        {opp.summary}
                      </p>

                      {/* Benefits Tag */}
                      <div className="pt-1 flex items-center gap-2 text-xs">
                        <span className="font-mono text-[#75758a] uppercase text-[11px]">Benefit:</span>
                        <span className="font-semibold text-[#1863dc]">{opp.benefit}</span>
                      </div>
                    </div>

                    {/* Deadline Meter */}
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-xs font-mono uppercase text-[#75758a] block">Application Deadline</span>
                      <div
                        className={`text-sm font-mono font-bold mt-0.5 ${
                          opp.is_deadline_urgent ? "text-red-600" : "text-[#17171c]"
                        }`}
                      >
                        {opp.deadline_date} ({opp.deadline_days} days left)
                      </div>
                      <button
                        onClick={() => handleOpenAlertModal(opp)}
                        className="text-[11px] text-[#75758a] hover:text-[#1863dc] flex items-center gap-1 md:justify-end mt-1 cursor-pointer"
                      >
                        <Bell className="w-3 h-3 text-[#ff7759]" />
                        Set SMS / WhatsApp Alert
                      </button>
                    </div>
                  </div>

                  {/* NEAR-MISS GUIDANCE CALLOUT BOX (The user's key feature) */}
                  {isNearMiss && (
                    <div className="mt-4 p-4 rounded-xl bg-[#fffdfa] border border-[#f59e0b]/40 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-medium text-[#b45309]">
                        <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                        <span>Sarthi Proactive Near-Miss Diagnostic:</span>
                      </div>
                      <p className="text-[#212121] leading-relaxed">
                        {opp.near_miss_message}
                      </p>
                      {opp.missing_docs && opp.missing_docs.length > 0 && (
                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <span className="text-[#75758a] text-[11px]">Missing required file:</span>
                          <span className="px-2 py-0.5 bg-amber-100 rounded text-amber-900 font-mono text-[11px]">
                            {opp.missing_docs[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleFixNearMissDoc(opp)}
                            className="text-xs font-semibold text-[#1863dc] hover:underline flex items-center gap-1 cursor-pointer ml-2"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            Attach &amp; Unlock Eligibility Now &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Collapsible Rule & Criteria Checklist */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#e5e7eb] space-y-3 text-xs animate-in fade-in duration-150">
                      <span className="font-mono uppercase text-[#75758a] text-[11px]">
                        Detailed Statutory Rule &amp; Document Evaluation:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {opp.reasons_passed?.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#edfce9]/70 text-[#003c33]">
                            <span className="text-[#16a34a] font-bold">✓</span>
                            <span>{r}</span>
                          </div>
                        ))}
                        {opp.reasons_failed?.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-red-50 text-red-900">
                            <span className="text-red-600 font-bold">&times;</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="mt-4 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setExpandedCardId(isExpanded ? null : opp.id)}
                      className="text-[#75758a] hover:text-[#17171c] flex items-center gap-1 font-mono"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isExpanded ? "Hide Criteria Breakdown" : "View Rule Checklist"}
                    </button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenAlertModal(opp)}
                        className="text-xs flex items-center gap-1.5"
                      >
                        <Bell className="w-3.5 h-3.5 text-[#ff7759]" />
                        Remind Me
                      </Button>

                      {isNearMiss && opp.missing_docs && opp.missing_docs.length > 0 ? (
                        <Button
                          size="sm"
                          onClick={() => handleFixNearMissDoc(opp)}
                          className="text-xs bg-[#ff7759] flex items-center gap-1.5"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          Fix Near-Miss
                        </Button>
                      ) : (
                        <Link
                          href={opp.apply_url}
                          className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                        >
                          {opp.action_cta}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* SCHEDULE DEADLINE ALERT MODAL */}
      {alertModalOpp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[22px] max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#e5e7eb]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#ff7759]">AUTOMATED CUTOFF REMINDER</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-0.5">
                  Schedule Deadline Alert
                </h3>
              </div>
              <button
                onClick={() => setAlertModalOpp(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#616161]">
              Sarthi will dispatch automatic notifications <strong>48 hours</strong> and{" "}
              <strong>24 hours</strong> before the portal closes for:
            </p>

            <div className="p-3 bg-[#eeece7]/60 rounded-xl border border-[#d9d9dd] text-xs space-y-1">
              <div className="font-semibold text-[#17171c]">{alertModalOpp.title}</div>
              <div className="text-[#b45309] font-mono">
                Deadline: {alertModalOpp.deadline_date} ({alertModalOpp.deadline_days * 24} hours remaining)
              </div>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">
                  Mobile Number for SMS / WhatsApp
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#1863dc]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#75758a] mb-1">Alert Channel</label>
                <select
                  value={alertChannel}
                  onChange={(e) => setAlertChannel(e.target.value)}
                  className="w-full bg-white border border-[#d9d9dd] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1863dc]"
                >
                  <option value="SMS & WhatsApp">SMS &amp; WhatsApp Combined</option>
                  <option value="WhatsApp Priority">WhatsApp Priority Message</option>
                  <option value="SMS Gateway">Govt NIC / MoTA SMS Gateway</option>
                </select>
              </div>
            </div>

            {alertSuccessMsg && (
              <div className="p-3 rounded-xl bg-[#edfce9] border border-[#a3e635]/50 text-xs text-[#003c33] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                <span>{alertSuccessMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5e7eb]">
              <Button variant="secondary" size="sm" onClick={() => setAlertModalOpp(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleScheduleAlert} className="flex items-center gap-1.5 bg-[#ff7759]">
                <Send className="w-3.5 h-3.5" />
                Activate Reminder
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FIX NEAR-MISS UPLOAD MODAL */}
      {uploadModalOpp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[22px] max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#e5e7eb]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#1863dc]">ACTIONABLE NEAR-MISS RESOLUTION</span>
                <h3 className="text-lg font-medium text-[#17171c] mt-0.5">
                  Attach {uploadingDocName}
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpp(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#616161]">
              Uploading or generating a DigiLocker token for <strong>{uploadingDocName}</strong> will immediately
              upgrade your match rating to <strong>100% Fully Eligible</strong> for {uploadModalOpp.title}.
            </p>

            <div className="p-6 border-2 border-dashed border-[#d9d9dd] rounded-xl text-center space-y-2 bg-[#fcfbf9]">
              <UploadCloud className="w-8 h-8 text-[#1863dc] mx-auto" />
              <div className="text-xs font-medium text-[#17171c]">
                Click below to simulate instant DigiLocker sync
              </div>
              <p className="text-[11px] text-[#75758a]">
                PDF / JPEG up to 5MB (300 DPI)
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5e7eb]">
              <Button variant="secondary" size="sm" onClick={() => setUploadModalOpp(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmDocUpload}
                disabled={isUploadingDoc}
                className="flex items-center gap-1.5 bg-[#16a34a]"
              >
                <Check className="w-3.5 h-3.5" />
                {isUploadingDoc ? "Verifying OCR..." : "Sync & Convert to Eligible"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-sm text-[#75758a]">
          Loading Sarthi Proactive Opportunity Feed...
        </div>
      }
    >
      <OpportunitiesInner />
    </Suspense>
  );
}
