"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Smartphone,
  Send,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Signal,
  Wifi,
  Battery,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface SmsSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipient?: "ramesh" | "sunita" | "birsa" | "pooja";
}

interface SmsPayload {
  name: string;
  phone: string;
  scheme: string;
  urgency: "HIGH" | "MEDIUM" | "SUCCESS";
  enText: string;
  hiText: string;
  actionUrl: string;
}

const SMS_PRESETS: Record<string, SmsPayload> = {
  ramesh: {
    name: "Ramesh Kumar (Khunti, Jharkhand)",
    phone: "+91 98351-XXXXX",
    scheme: "National Fellowship for ST (NFST)",
    urgency: "HIGH",
    enText: "⚠️ MoTA SARTHI ALERT: Ramesh, your application for NFST Fellowship (ID: NFST-0842) is potentially eligible, but 1 required document (Income Certificate from Torpa Circle) is missing. 48 hours remaining before scrutiny freeze. Upload now to unlock ₹38,000/mo stipend: https://sarthi.gov.in/track?ref=NFST-0842 - MoTA, Govt of India",
    hiText: "⚠️ MoTA सारथी अलर्ट: रमेश, आपकी NFST फेलोशिप (ID: NFST-0842) के लिए आवेदन संभावित पात्र है, परंतु 1 आवश्यक दस्तावेज (तोरपा अंचल से आय प्रमाण पत्र) लंबित है। जांच बंद होने में 48 घंटे शेष हैं। ₹38,000/माह छात्रवृत्ति सुरक्षित करने हेतु तुरंत अपलोड करें: https://sarthi.gov.in/track?ref=NFST-0842 - जनजातीय कार्य मंत्रालय, भारत सरकार",
    actionUrl: "/track?ref=NFST-0842",
  },
  sunita: {
    name: "Sunita Oraon (Ranchi, Jharkhand)",
    phone: "+91 94311-XXXXX",
    scheme: "National Overseas Scholarship (NOS)",
    urgency: "HIGH",
    enText: "🚨 URGENT MoTA SARTHI: Sunita, the national deadline for NOS Overseas Scholarship closes in 44 HOURS. Your academic profile qualifies. Submit pending university acceptance letter today: https://sarthi.gov.in/apply?scheme=NOS - MoTA, Govt of India",
    hiText: "🚨 आवश्यक सूचना MoTA सारथी: सुनीता, NOS विदेश छात्रवृत्ति हेतु राष्ट्रीय समयसीमा 44 घंटे में समाप्त हो रही है। आपका शैक्षणिक स्कोर पात्र है। अपना विश्वविद्यालय स्वीकृति पत्र तुरंत जमा करें: https://sarthi.gov.in/apply?scheme=NOS - जनजातीय कार्य मंत्रालय",
    actionUrl: "/apply",
  },
  birsa: {
    name: "Birsa Munda (Gumla, Jharkhand)",
    phone: "+91 97712-XXXXX",
    scheme: "Top Class Higher Education (ST Quota)",
    urgency: "MEDIUM",
    enText: "💡 MoTA SARTHI UPDATE: Birsa, good news! 5% ST Cut-off relaxation is active for your B.Sc course. You now qualify for 100% Tuition Waiver under Top-Class ST scheme. Complete 1-click apply: https://sarthi.gov.in/apply - MoTA",
    hiText: "💡 MoTA सारथी सूचना: बिरसा, खुशखबरी! आपके B.Sc कोर्स हेतु 5% एसटी कट-ऑफ छूट लागू हो गई है। अब आप टॉप-क्लास एसटी योजना के तहत 100% ट्यूशन फीस माफी के पात्र हैं। 1-क्लिक आवेदन करें: https://sarthi.gov.in/apply - भारत सरकार",
    actionUrl: "/apply",
  },
  pooja: {
    name: "Pooja Soren (Dumka, Jharkhand)",
    phone: "+91 91223-XXXXX",
    scheme: "NFST Fellowship DBT Disbursement",
    urgency: "SUCCESS",
    enText: "✅ MoTA SARTHI PFMS: Pooja, your fellowship grant of ₹38,000 for Sept 2026 has been approved by MoTA Scrutiny Desk and dispatched via PFMS DBT to your Aadhaar-linked Bank A/C (A/C: XXXXXX4912). UTR: MOTA2609241849 - Govt of India",
    hiText: "✅ MoTA सारथी डीबीटी: पूजा, आपकी सितंबर 2026 की ₹38,000 फेलोशिप राशि MoTA जांच डेस्क द्वारा स्वीकृत कर आपके आधार-लिंक बैंक खाते (खाता: XXXXXX4912) में भेज दी गई है। यूटीआर: MOTA2609241849 - भारत सरकार",
    actionUrl: "/officer/analytics",
  },
};

export const SmsSimulatorModal: React.FC<SmsSimulatorModalProps> = ({
  isOpen,
  onClose,
  defaultRecipient = "ramesh",
}) => {
  const [recipient, setRecipient] = useState<string>(defaultRecipient);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentPayload = SMS_PRESETS[recipient] || SMS_PRESETS.ramesh;
  const currentText = lang === "en" ? currentPayload.enText : currentPayload.hiText;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateResend = () => {
    setIsSent(false);
    setTimeout(() => setIsSent(true), 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-[#e5e7eb] max-h-[92vh] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17171c] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Smartphone className="w-5 h-5 text-[#ff7759]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-light text-[#17171c]">
                  Rural 2G / Feature Phone SMS Simulator
                </h3>
                <Badge variant="scheme" className="text-[10px] font-mono">CDAC Gateway</Badge>
              </div>
              <p className="text-xs text-[#75758a]">
                Proactive Near-Miss &amp; Micro-Deficiency Push for Remote Tribal Villages (No Internet Required)
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

        {/* Student Preset Selectors */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-[#75758a] uppercase">Simulate Recipient:</span>
            <button
              onClick={() => setRecipient("ramesh")}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                recipient === "ramesh"
                  ? "bg-[#17171c] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Ramesh (Missing Doc ⚠️)
            </button>
            <button
              onClick={() => setRecipient("sunita")}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                recipient === "sunita"
                  ? "bg-[#17171c] text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              Sunita (44h Deadline 🚨)
            </button>
            <button
              onClick={() => setRecipient("birsa")}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                recipient === "birsa"
                  ? "bg-[#17171c] text-white"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Birsa (5% Relaxation 💡)
            </button>
            <button
              onClick={() => setRecipient("pooja")}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                recipient === "pooja"
                  ? "bg-[#17171c] text-white"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Pooja (DBT Payout ₹38k ✅)
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 border border-gray-200 text-[11px] shrink-0">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                lang === "en" ? "bg-white text-black shadow-xs" : "text-gray-500"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                lang === "hi" ? "bg-white text-black shadow-xs" : "text-gray-500"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Mobile Phone Screen Mockup */}
        <div className="flex justify-center py-2">
          <div className="w-full max-w-md bg-[#1e1e24] rounded-[28px] p-3 shadow-xl border-4 border-[#33333d]">
            {/* Phone Top Speaker & Camera Bezel */}
            <div className="flex items-center justify-between px-3 pb-2 text-[10px] text-gray-400 font-mono border-b border-gray-700">
              <span className="font-bold text-white flex items-center gap-1">
                <Signal className="w-3 h-3 text-emerald-400" /> BSNL 2G (Khunti Rural)
              </span>
              <div className="w-12 h-2 rounded-full bg-gray-700 mx-auto"></div>
              <span className="flex items-center gap-1 font-bold text-white">
                10:42 AM <Battery className="w-3.5 h-3.5 text-gray-300" />
              </span>
            </div>

            {/* SMS Header */}
            <div className="bg-[#282832] py-2 px-3 my-2 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  GOI
                </div>
                <div>
                  <div className="text-white font-bold flex items-center gap-1.5 text-xs">
                    <span>VM-MOTAGOI</span>
                    <Badge variant="success" className="text-[9px] py-0 px-1 bg-emerald-500/20 text-emerald-300 border-none">
                      VERIFIED GOV
                    </Badge>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">Ministry of Tribal Affairs</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-gray-400">Just now</span>
            </div>

            {/* Message Bubble Container */}
            <div className="p-2 space-y-2 min-h-[170px] flex flex-col justify-end">
              <div className="text-center">
                <span className="text-[9.5px] font-mono bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                  Today • SMS Gateway Dispatch #CDAC-7892
                </span>
              </div>

              {/* Inbound SMS Bubble */}
              <div className={`p-3.5 rounded-2xl bg-[#003c33] text-white border border-[#a3e635]/30 space-y-2 text-xs shadow-md transition-all ${
                isSent ? "animate-in fade-in zoom-in-95 duration-200" : "opacity-30"
              }`}>
                <p className="leading-relaxed font-sans text-[12.5px] text-[#edfce9]">
                  {currentText}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#003c33]/80 text-[10px] text-emerald-300/80 font-mono">
                  <span>Delivered to {currentPayload.phone}</span>
                  <span>10:42 AM ✓✓</span>
                </div>
              </div>
            </div>

            {/* Phone Bottom Home Bar */}
            <div className="pt-2 text-center">
              <div className="w-20 h-1 bg-gray-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Action Controls & Judge Soundbite */}
        <div className="pt-2 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[11px] text-[#75758a]">
            <strong className="text-[#17171c]">Why this wins SIH:</strong> Solves digital divide for remote tribal areas with zero smartphone dependency via CDAC gateway fallback.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] bg-white hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5 font-medium shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied SMS" : "Copy SMS Text"}</span>
            </button>

            <Link
              href={currentPayload.actionUrl}
              onClick={onClose}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 font-medium whitespace-nowrap shadow-xs"
            >
              <span>Test Student Remediation Flow</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
