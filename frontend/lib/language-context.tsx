"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.title": "Sarthi",
    "nav.subtitle": "Govt. of India • MoTA",
    "nav.opportunities": "Opportunities",
    "nav.nearMissAi": "Near-Miss AI",
    "nav.apply": "Apply Online",
    "nav.track": "Track & Remediate",
    "nav.scrutiny": "Officer Scrutiny",
    "nav.analytics": "Analytics & DBT",
    "nav.systemDesign": "System Design & Flowcharts",
    "nav.guidelines": "Official Guidelines",
    "nav.digilocker": "DigiLocker Certified",
    "nav.discoverMatches": "Discover Matches",
    "nav.banner": "Ministry of Tribal Affairs (MoTA) • SIH-2026 Problem ID 26239",

    // Hero Section
    "hero.badge": "AI-POWERED SCHOLARSHIP SCRUTINY & GOVERNANCE (SIH ID 26239)",
    "hero.title1": "Empowering Scheduled Tribe Scholars with",
    "hero.titleHighlight1": "Instant Scrutiny",
    "hero.titleAnd": "&",
    "hero.titleHighlight2": "Zero-Friction Fellowships.",
    "hero.description": "Eliminating multi-month manual verification backlogs for the Ministry of Tribal Affairs. Direct DigiLocker verification, trilingual OCR, automated scheme rule execution, and 50/50 dual-pane officer scrutiny.",
    "hero.discoverBtn": "Discover Opportunities & Near-Misses",
    "hero.applyBtn": "Apply for Fellowship",
    "hero.officerBtn": "Officer Scrutiny Console",
    "hero.trackBtn": "Track Application / Fix Deficiency →",

    // Stats Strip
    "stats.time": "≤ 3.5s",
    "stats.timeLabel": "AI Document Verification",
    "stats.trust": "100%",
    "stats.trustLabel": "DigiLocker Trust Level",
    "stats.nearMiss": "Near-Miss",
    "stats.nearMissLabel": "Actionable AI Guidance",
    "stats.streams": "4 Streams",
    "stats.streamsLabel": "Scholarships, Internships, Exams, Certs",

    // Near-Miss Core Feature Section
    "nearMiss.badge": "CORE VALUE PROPOSITION: ZERO-EFFORT DISCOVERY",
    "nearMiss.title": "Proactive Opportunity Feed + “Near-Miss” Intelligence",
    "nearMiss.desc": "Register once with your course, year, branch, and location. Sarthi proactively scans all central, state, and premier opportunities — alerting you when you are potentially eligible (e.g. 1 missing document or cutoff within tribal relaxation) and scheduling automated deadline reminders.",
    "nearMiss.tryBtn": "Try Live Matcher →",
    "nearMiss.tableOld": "Existing Portal Approach (Status Quo)",
    "nearMiss.tableSarthi": "Sarthi AI Solution (Proactive System)",
    "nearMiss.row1Old": "Student searches manually across fragmented sites",
    "nearMiss.row1Sarthi": "System proactively matches with unified candidate profile",
    "nearMiss.row2Old": "Multiple login credentials and separate profiles",
    "nearMiss.row2Sarthi": "Register once: Scholarships, Internships, Exams & Certifications",
    "nearMiss.row3Old": "Dense gazette PDFs & confusing criteria",
    "nearMiss.row3Sarthi": "Rule-based AI engine calculates exact eligibility in seconds",
    "nearMiss.row4Old": "Binary “Eligible / Not Eligible” cold rejection",
    "nearMiss.row4Sarthi": "“Near-Miss” alerts (e.g., “Potentially eligible — 1 doc missing”)",
    "nearMiss.row5Old": "Student forgets deadline and loses benefit",
    "nearMiss.row5Sarthi": "Automated SMS & WhatsApp reminders before 48-hour cutoff",

    // Features Section
    "features.badge": "CORE SYSTEM CAPABILITIES",
    "features.title": "Architected for Accuracy, Accessibility, and Government Integrity.",
    "features.f1Title": "Trilingual Document OCR",
    "features.f1Desc": "Extracts names, dates, issuing authorities, and income figures from Hindi, English, and regional state certificate scans using PaddleOCR and LayoutLMv3.",
    "features.f2Title": "Image Forgery & Tamper ELA",
    "features.f2Desc": "Detects modified income figures, spoofed stamps, and digital edits via OpenCV Error Level Analysis (ELA) and PDF metadata heuristics.",
    "features.f3Title": "50/50 Dual-Pane Scrutiny",
    "features.f3Desc": "Human-in-the-Loop desk console pairing zoomable document scans on the left with confidence-coded metadata badges on the right.",

    // Quick Portals Switchboard
    "quickPortals.p1Tag": "SCHOLAR PORTAL",
    "quickPortals.p1Title": "Direct Intake & e-KYC",
    "quickPortals.p1Desc": "Paperless application wizard connecting directly with DigiLocker with instant rule evaluation.",
    "quickPortals.p1Btn": "Start New Intake →",
    "quickPortals.p2Tag": "MICRO-DEFICIENCY",
    "quickPortals.p2Title": "7-Day Targeted Remediation",
    "quickPortals.p2Desc": "Got an SMS/WhatsApp flag? Re-upload only the specific blurry or missing document without refilling forms.",
    "quickPortals.p2Btn": "Resolve Deficiency →",
    "quickPortals.p3Tag": "GOVERNANCE & DBT",
    "quickPortals.p3Title": "MoTA Executive Analytics",
    "quickPortals.p3Desc": "Scheduled Area heatmaps, verification turnaround bottleneck analytics, and PFMS DBT disbursement batch generator.",
    "quickPortals.p3Btn": "Open MoTA Analytics →",

    // Target Schemes
    "schemes.tag": "MOTA FELLOWSHIP PROGRAMS",
    "schemes.title": "Target Schemes Governed by Rule Engine",
    "schemes.desc": "Declarative eligibility validation configured to central government gazette criteria.",
    "schemes.nfstBadge": "NFST SCHEME",
    "schemes.nfstScope": "DOMESTIC RESEARCH",
    "schemes.nfstTitle": "National Fellowship for Higher Education of ST Students",
    "schemes.nfstDesc": "Financial support for Scheduled Tribe scholars pursuing regular full-time M.Phil. and Ph.D. in recognized Indian universities.",
    "schemes.nfstC1": "Income Ceiling: ≤ ₹6.0 Lakhs Per Annum (LPA)",
    "schemes.nfstC2": "Age Limit: ≤ 36 yrs (Men), ≤ 41 yrs (Women/Transgender)",
    "schemes.nfstC3": "Fellowship Grant: ₹31,000/mo (JRF) + ₹35,000/mo (SRF) + HRA",
    "schemes.nosBadge": "NOS SCHEME",
    "schemes.nosScope": "INTERNATIONAL STUDIES",
    "schemes.nosTitle": "National Overseas Scholarship for ST Candidates",
    "schemes.nosDesc": "Prestigious grant enabling ST scholars to attend top-ranked global universities for Post-Graduate (Masters) and Doctoral (Ph.D.) programs.",
    "schemes.nosC1": "University Rank: QS World Ranking ≤ 500",
    "schemes.nosC2": "Qualifying Marks: ≥ 60% in Bachelor's/Master's",
    "schemes.nosC3": "Coverage: 100% Tuition Fees + Annual Maintenance Allowance",
    "schemes.viewRules": "View Gazette Rules",
    "schemes.applyNfst": "Apply for NFST",
    "schemes.applyNos": "Apply for NOS",

    // Opportunities Page
    "opps.badge": "AI OPPORTUNITY DISCOVERY & NEAR-MISS INTELLIGENCE",
    "opps.title": "Proactive Opportunity Matcher & Near-Miss Alerts",
    "opps.subtitle": "Register your academic profile once. Sarthi scans central, state, and premier opportunities, executes statutory qualification rules, and delivers actionable near-miss alerts before deadlines close.",
    "opps.testSmsBtn": "Test 2G SMS Alert Push",
    "opps.tabAll": "All Opportunities",
    "opps.tabNearMiss": "Near-Miss Gaps",
    "opps.tabUrgent": "Urgent Deadlines",
    "opps.tabScholarships": "Scholarships",
    "opps.tabInternships": "Internships",
    "opps.tabExams": "Exams & Coaching",
    "opps.tabCerts": "Certifications",
    "opps.demoProfiles": "Demo Personas:",
    "opps.profileHeader": "Candidate Profile Parameters",
    "opps.matchBtn": "Re-evaluate Eligibility Rules",

    // SMS Simulator
    "sms.title": "Mobile SMS Alert Dispatcher (2G/Feature Phone)",
    "sms.subtitle": "Simulates rural reach via CDAC Gov SMS Gateway to remote tribal villages",
    "sms.sender": "VM-MOTAGOI",
    "sms.simulate": "Simulate SMS Alert",
    "sms.close": "Close Simulator",

    // Common
    "common.eligible": "Eligible",
    "common.nearMiss": "Near-Miss Gap",
    "common.verified": "DigiLocker Verified",
    "common.urgent": "Urgent Action Required",

    // Footer
    "footer.sarthi": "Sarthi",
    "footer.mota": "Ministry of Tribal Affairs, Government of India",
    "footer.applicant": "Applicant Portal",
    "footer.remediation": "Remediation Desk",
    "footer.scrutiny": "Officer Scrutiny",
    "footer.analytics": "Executive Analytics & DBT",
    "footer.docs": "Document Standards",
    "footer.sih": "Smart India Hackathon 2026",
  },
  hi: {
    // Nav
    "nav.title": "सारथी",
    "nav.subtitle": "भारत सरकार • जनजातीय कार्य मंत्रालय",
    "nav.opportunities": "अवसर एवं छात्रवृत्तियां",
    "nav.nearMissAi": "नियर-मिस एआई",
    "nav.apply": "ऑनलाइन आवेदन करें",
    "nav.track": "आवेदन ट्रैक व सुधारें",
    "nav.scrutiny": "अधिकारी जांच डेस्क",
    "nav.analytics": "विश्लेषण एवं डीबीटी",
    "nav.systemDesign": "सिस्टम डिजाइन एवं फ्लोचार्ट",
    "nav.guidelines": "आधिकारिक दिशानिर्देश",
    "nav.digilocker": "डिजिलॉकर प्रमाणित",
    "nav.discoverMatches": "पात्र अवसर खोजें",
    "nav.banner": "जनजातीय कार्य मंत्रालय (MoTA) • SIH-2026 समस्या आईडी 26239",

    // Hero Section
    "hero.badge": "एआई-संचालित छात्रवृत्ति जांच एवं सुशासन (SIH ID 26239)",
    "hero.title1": "अनुसूचित जनजाति के मेधावी छात्रों का सशक्तिकरण —",
    "hero.titleHighlight1": "त्वरित सत्यापन",
    "hero.titleAnd": "एवं",
    "hero.titleHighlight2": "पारदर्शी छात्रवृत्तियां।",
    "hero.description": "जनजातीय कार्य मंत्रालय के लिए महीनों पुराने सत्यापन बैकलॉग का खात्मा। प्रत्यक्ष डिजिलॉकर सत्यापन, त्रिभाषी ओसीआर, स्वचालित योजना नियम मूल्यांकन और 50/50 दोहरे-फलक अधिकारी जांच।",
    "hero.discoverBtn": "अवसर एवं नियर-मिस खोजें",
    "hero.applyBtn": "छात्रवृत्ति हेतु आवेदन करें",
    "hero.officerBtn": "अधिकारी जांच डेस्क",
    "hero.trackBtn": "आवेदन ट्रैक करें / दस्तावेज सुधारें →",

    // Stats Strip
    "stats.time": "≤ 3.5 से.",
    "stats.timeLabel": "एआई दस्तावेज सत्यापन",
    "stats.trust": "100%",
    "stats.trustLabel": "डिजिलॉकर विश्वसनीयता",
    "stats.nearMiss": "नियर-मिस",
    "stats.nearMissLabel": "सटीक एआई मार्गदर्शन",
    "stats.streams": "4 श्रेणियां",
    "stats.streamsLabel": "छात्रवृत्ति, इंटर्नशिप, प्रतियोगी परीक्षा, प्रमाणन",

    // Near-Miss Core Feature Section
    "nearMiss.badge": "मुख्य नवाचार: स्वतः अवसर खोज",
    "nearMiss.title": "सक्रिय अवसर खोज + “नियर-मिस” एआई तकनीक",
    "nearMiss.desc": "अपने पाठ्यक्रम, वर्ष, शाखा और जिले के साथ केवल एक बार पंजीकरण करें। सारथी सभी केंद्रीय, राज्य और प्रमुख अवसरों को स्कैन कर आपको सूचित करता है यदि आप 'संभावित पात्र' हैं (उदा. केवल 1 दस्तावेज शेष या आयु/कटऑफ छूट) और अंतिम तिथि से पहले अलर्ट भेजता है।",
    "nearMiss.tryBtn": "लाइव मैचर आजमाएं →",
    "nearMiss.tableOld": "वर्तमान पोर्टल प्रणाली (पुरानी व्यवस्था)",
    "nearMiss.tableSarthi": "सारथी एआई समाधान (सक्रिय व्यवस्था)",
    "nearMiss.row1Old": "छात्र अलग-अलग पोर्टलों पर मैन्युअल खोज करते हैं",
    "nearMiss.row1Sarthi": "सिस्टम एकीकृत प्रोफाइल के आधार पर स्वतः अवसर सुझाता है",
    "nearMiss.row2Old": "अलग-अलग पासवर्ड और बार-बार प्रोफाइल बनाना",
    "nearMiss.row2Sarthi": "एक बार पंजीकरण: छात्रवृत्ति, इंटर्नशिप, परीक्षाएं और प्रमाणन",
    "nearMiss.row3Old": "जटिल राजपत्र अधिसूचनाएं और अस्पष्ट पात्रता शर्तें",
    "nearMiss.row3Sarthi": "नियम-आधारित एआई इंजन कुछ ही सेकंड में सटीक पात्रता बताता है",
    "nearMiss.row4Old": "सीधा रिजेक्शन: केवल 'पात्र / अपात्र' बिना कारण बताए",
    "nearMiss.row4Sarthi": "नियर-मिस अलर्ट (उदा. 'संभावित पात्र — केवल 1 दस्तावेज शेष')",
    "nearMiss.row5Old": "छात्र अंतिम तिथि भूल जाते हैं और अवसर चूक जाते हैं",
    "nearMiss.row5Sarthi": "अंतिम तिथि से 48 घंटे पूर्व स्वचालित एसएमएस एवं अलर्ट",

    // Features Section
    "features.badge": "मुख्य तकनीकी क्षमताएं",
    "features.title": "सटीकता, सुलभता और सरकारी पारदर्शिता के लिए निर्मित।",
    "features.f1Title": "त्रिभाषी दस्तावेज ओसीआर",
    "features.f1Desc": "हिंदी, अंग्रेजी और क्षेत्रीय प्रमाणपत्रों से नाम, आय, जाति और प्राधिकारी विवरण को PaddleOCR एवं LayoutLMv3 द्वारा निष्कर्षित करता है।",
    "features.f2Title": "फर्जीवाड़ा एवं छेड़छाड़ पहचान (ELA)",
    "features.f2Desc": "OpenCV एरर लेवल एनालिसिस (ELA) द्वारा फर्जी मुहरों, बदली हुई आय और संपादन के निशानों को तुरंत पकड़ता है।",
    "features.f3Title": "50/50 दोहरा-फलक जांच कंसोल",
    "features.f3Desc": "बाईं ओर मूल दस्तावेज और दाईं ओर एआई द्वारा सत्यापित डेटा — बिना किसी त्रुटि के त्वरित सरकारी सत्यापन।",

    // Quick Portals Switchboard
    "quickPortals.p1Tag": "छात्र पोर्टल",
    "quickPortals.p1Title": "प्रत्यक्ष आवेदन एवं ई-केवाईसी",
    "quickPortals.p1Desc": "डिजिलॉकर से सीधा जुड़ाव और तत्काल नियम-सत्यापन के साथ कागज-रहित आवेदन।",
    "quickPortals.p1Btn": "नया आवेदन प्रारंभ करें →",
    "quickPortals.p2Tag": "दस्तावेज सुधार",
    "quickPortals.p2Title": "7-दिवसीय लक्षित सुधार",
    "quickPortals.p2Desc": "एसएमएस अलर्ट मिला? पूरा फॉर्म दोबारा भरे बिना केवल त्रुटिपूर्ण या छूटा हुआ दस्तावेज अपलोड करें।",
    "quickPortals.p2Btn": "दस्तावेज त्रुटि सुधारें →",
    "quickPortals.p3Tag": "सुशासन एवं डीबीटी",
    "quickPortals.p3Title": "मंत्रालय प्रशासनिक विश्लेषण",
    "quickPortals.p3Desc": "जनजातीय क्षेत्रों के हीटमैप, सत्यापन में रुकावटों का विश्लेषण और पीएफएमएस डीबीटी भुगतान बैच निर्माण।",
    "quickPortals.p3Btn": "मंत्रालय विश्लेषण खोलें →",

    // Target Schemes
    "schemes.tag": "जनजातीय कार्य मंत्रालय छात्रवृत्ति योजनाएं",
    "schemes.title": "नियम इंजन द्वारा संचालित प्रमुख योजनाएं",
    "schemes.desc": "केंद्रीय सरकार की राजपत्र अधिसूचना के अनुसार स्वचालित पात्रता सत्यापन।",
    "schemes.nfstBadge": "NFST योजना",
    "schemes.nfstScope": "घरेलू अनुसंधान (भारत)",
    "schemes.nfstTitle": "अनुसूचित जनजाति छात्रों हेतु राष्ट्रीय उच्च शिक्षा फेलोशिप",
    "schemes.nfstDesc": "मान्यता प्राप्त भारतीय विश्वविद्यालयों में नियमित पूर्णकालिक एम.फिल. और पीएच.डी. कर रहे अनुसूचित जनजाति छात्रों को वित्तीय सहायता।",
    "schemes.nfstC1": "वार्षिक आय सीमा: ≤ ₹6.0 लाख प्रति वर्ष (LPA)",
    "schemes.nfstC2": "आयु सीमा: ≤ 36 वर्ष (पुरुष), ≤ 41 वर्ष (महिला/ट्रांसजेंडर)",
    "schemes.nfstC3": "फेलोशिप राशि: ₹31,000/माह (JRF) + ₹35,000/माह (SRF) + मकान किराया",
    "schemes.nosBadge": "NOS योजना",
    "schemes.nosScope": "अंतरराष्ट्रीय अध्ययन",
    "schemes.nosTitle": "एसटी उम्मीदवारों हेतु राष्ट्रीय विदेश अध्ययन छात्रवृत्ति",
    "schemes.nosDesc": "प्रतिष्ठित वैश्विक विश्वविद्यालयों में स्नातकोत्तर (मास्टर्स) और डॉक्टरेट (पीएच.डी.) हेतु एसटी छात्रों के लिए शत-प्रतिशत सरकारी अनुदान।",
    "schemes.nosC1": "विश्वविद्यालय रैंकिंग: QS वर्ल्ड रैंकिंग ≤ 500",
    "schemes.nosC2": "पात्रता अंक: स्नातक/स्नातकोत्तर में ≥ 60% अंक",
    "schemes.nosC3": "कवरेज: 100% शिक्षण शुल्क + वार्षिक निर्वाह भत्ता",
    "schemes.viewRules": "राजपत्र नियम देखें",
    "schemes.applyNfst": "NFST हेतु आवेदन करें",
    "schemes.applyNos": "NOS हेतु आवेदन करें",

    // Opportunities Page
    "opps.badge": "एआई अवसर खोज एवं नियर-मिस तकनीक",
    "opps.title": "सक्रिय अवसर मैचर एवं नियर-मिस अलर्ट",
    "opps.subtitle": "केवल एक बार अपनी शैक्षणिक जानकारी दर्ज करें। सारथी सभी केंद्रीय व राज्य अवसरों की जांच करता है, नियमों का मूल्यांकन करता है और अंतिम तिथि से पूर्व नियर-मिस अलर्ट प्रदान करता है।",
    "opps.testSmsBtn": "2G एसएमएस अलर्ट टेस्ट करें",
    "opps.tabAll": "सभी अवसर",
    "opps.tabNearMiss": "नियर-मिस (संभावित पात्र)",
    "opps.tabUrgent": "अंतिम तिथि निकट",
    "opps.tabScholarships": "छात्रवृत्तियां",
    "opps.tabInternships": "इंटर्नशिप",
    "opps.tabExams": "प्रतियोगी परीक्षाएं",
    "opps.tabCerts": "प्रमाणन",
    "opps.demoProfiles": "डेमो प्रोफाइल:",
    "opps.profileHeader": "छात्र प्रोफाइल विवरण",
    "opps.matchBtn": "पात्रता नियमों का पुनः मूल्यांकन करें",

    // SMS Simulator
    "sms.title": "मोबाइल एसएमएस अलर्ट प्रेषक (2G/सुदूर ग्रामीण फोन)",
    "sms.subtitle": "सी-डैक सरकारी एसएमएस गेटवे के माध्यम से दूरस्थ आदिवासी क्षेत्रों तक पहुंच",
    "sms.sender": "VM-MOTAGOI",
    "sms.simulate": "एसएमएस अलर्ट सिमुलेशन",
    "sms.close": "सिम्युलेटर बंद करें",

    // Common
    "common.eligible": "पात्र",
    "common.nearMiss": "संभावित पात्र (दस्तावेज शेष)",
    "common.verified": "डिजिलॉकर द्वारा सत्यापित",
    "common.urgent": "तत्काल कार्रवाई आवश्यक",

    // Footer
    "footer.sarthi": "सारथी",
    "footer.mota": "जनजातीय कार्य मंत्रालय, भारत सरकार",
    "footer.applicant": "छात्र पोर्टल",
    "footer.remediation": "दस्तावेज सुधार",
    "footer.scrutiny": "अधिकारी जांच",
    "footer.analytics": "प्रशासनिक विश्लेषण व डीबीटी",
    "footer.docs": "दस्तावेज मानक",
    "footer.sih": "स्मार्ट इंडिया हैकाथॉन 2026",
  },

};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sarthi_lang") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sarthi_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
