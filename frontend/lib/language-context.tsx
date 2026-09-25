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
