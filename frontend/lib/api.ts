import { ApplicationItem, DeficiencyItem, INITIAL_APPLICATIONS } from "./mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
const STORAGE_KEY = "sarthi_applications_v1";

function getLocalStore(): ApplicationItem[] {
  if (typeof window === "undefined") return INITIAL_APPLICATIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

function saveLocalStore(items: ApplicationItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save local store", e);
  }
}

export async function fetchApplications(): Promise<ApplicationItem[]> {
  try {
    const res = await fetch(`${API_BASE}/applications/`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.applications && json.applications.length > 0) {
        saveLocalStore(json.applications);
        return json.applications;
      }
    }
  } catch (err) {
    console.warn("Backend API not reachable, using local reactive store.", err);
  }
  return getLocalStore();
}

export async function getApplication(id: string): Promise<ApplicationItem | null> {
  try {
    const res = await fetch(`${API_BASE}/applications/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Using local store for getApplication", err);
  }
  const store = getLocalStore();
  return store.find((a) => a.id.toLowerCase() === id.toLowerCase().trim()) || null;
}

export async function submitApplication(data: {
  scheme_id: "NFST" | "NOS";
  user_id: string;
  applicant_name: string;
  gender: string;
  age: number;
  caste: string;
  university: string;
  income_inr: number;
  merit_score?: number;
}): Promise<{ application_id: string; application: ApplicationItem }> {
  try {
    const res = await fetch(`${API_BASE}/applications/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scheme_id: data.scheme_id,
        user_id: data.user_id,
        details: {
          applicant_name: data.applicant_name,
          gender: data.gender,
          age: data.age,
          caste: data.caste,
          university: data.university,
          income: data.income_inr,
          merit_score: data.merit_score || 86.5,
        },
      }),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.application) {
        const store = getLocalStore();
        store.unshift(result.application);
        saveLocalStore(store);
        return result;
      }
    }
  } catch (err) {
    console.warn("Backend POST failed, storing locally", err);
  }

  // Local fallback creation
  const newId = `APP-2026-${data.scheme_id}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newApp: ApplicationItem = {
    id: newId,
    scheme_id: data.scheme_id,
    applicant_name: data.applicant_name,
    gender: data.gender,
    age: data.age,
    caste: data.caste,
    university: data.university,
    income_inr: data.income_inr,
    current_stage: "UNDER_SCRUTINY",
    merit_score: data.merit_score || 87.5,
    created_at: new Date().toISOString(),
    documents: [
      {
        id: `DOC-ST-${Math.floor(100 + Math.random() * 900)}`,
        doc_type: "CASTE_CERTIFICATE",
        title: "ST Community Certificate",
        filename: `${data.applicant_name.toLowerCase().replace(/\s+/g, "_")}_caste.pdf`,
        origin: "DigiLocker_Verified",
        trust_level: 1.0,
        verified_status: "Auto_Approved",
        tamper_score: 0.01,
        confidence_score: 1.0,
        extracted_fields: {
          Name: data.applicant_name,
          Community: data.caste,
          Verification: "DigiLocker Trusted e-KYC",
        },
      },
      {
        id: `DOC-INC-${Math.floor(100 + Math.random() * 900)}`,
        doc_type: "INCOME_CERTIFICATE",
        title: "Income Certificate",
        filename: `${data.applicant_name.toLowerCase().replace(/\s+/g, "_")}_income.pdf`,
        origin: "Scanned_Upload",
        trust_level: 0.94,
        verified_status: "AI_Verified",
        tamper_score: 0.04,
        confidence_score: 0.95,
        extracted_fields: {
          "Gross Annual Income": `₹ ${data.income_inr.toLocaleString("en-IN")}`,
          "Financial Year": "2025-2026",
        },
      },
    ],
    deficiencies: [],
  };

  const store = getLocalStore();
  store.unshift(newApp);
  saveLocalStore(store);

  return { application_id: newId, application: newApp };
}

export async function flagDeficiency(
  applicationId: string,
  docId: string,
  issueDescription: string
): Promise<DeficiencyItem> {
  try {
    const res = await fetch(`${API_BASE}/applications/${applicationId}/deficiency`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: docId,
        issue_description: issueDescription,
        deadline_days: 7,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      // sync local
      const store = getLocalStore();
      const app = store.find((a) => a.id === applicationId);
      if (app) {
        app.deficiencies.push(data.deficiency);
        app.current_stage = "DEFICIENCY_FLAGGED";
        saveLocalStore(store);
      }
      return data.deficiency;
    }
  } catch (err) {
    console.warn("Backend deficiency flag failed, updating local store", err);
  }

  const def: DeficiencyItem = {
    id: `DEF-${Math.floor(1000 + Math.random() * 9000)}`,
    doc_id: docId,
    doc_name: "Document Scan",
    issue_description: issueDescription,
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    status: "OPEN",
    dispatched_at: new Date().toISOString(),
  };

  const store = getLocalStore();
  const app = store.find((a) => a.id === applicationId);
  if (app) {
    app.deficiencies.push(def);
    app.current_stage = "DEFICIENCY_FLAGGED";
    saveLocalStore(store);
  }
  return def;
}

export async function resolveDeficiency(
  applicationId: string,
  deficiencyId: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_BASE}/applications/${applicationId}/deficiency/${deficiencyId}/resolve`,
      { method: "POST" }
    );
    if (res.ok) {
      const store = getLocalStore();
      const app = store.find((a) => a.id === applicationId);
      if (app) {
        const item = app.deficiencies.find((d) => d.id === deficiencyId);
        if (item) {
          item.status = "RESOLVED";
          item.resolved_at = new Date().toISOString();
        }
        if (!app.deficiencies.some((d) => d.status === "OPEN")) {
          app.current_stage = "UNDER_SCRUTINY";
        }
        saveLocalStore(store);
      }
      return true;
    }
  } catch (err) {
    console.warn("Backend resolve deficiency failed, updating local store", err);
  }

  const store = getLocalStore();
  const app = store.find((a) => a.id === applicationId);
  if (app) {
    const item = app.deficiencies.find((d) => d.id === deficiencyId);
    if (item) {
      item.status = "RESOLVED";
      item.resolved_at = new Date().toISOString();
    }
    if (!app.deficiencies.some((d) => d.status === "OPEN")) {
      app.current_stage = "UNDER_SCRUTINY";
    }
    saveLocalStore(store);
    return true;
  }
  return false;
}

export async function approveApplication(applicationId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/applications/${applicationId}/approve`, {
      method: "POST",
    });
    if (res.ok) {
      const store = getLocalStore();
      const app = store.find((a) => a.id === applicationId);
      if (app) {
        app.current_stage = "PROVISIONALLY_APPROVED";
        saveLocalStore(store);
      }
      return true;
    }
  } catch (err) {
    console.warn("Backend approve failed, updating local store", err);
  }

  const store = getLocalStore();
  const app = store.find((a) => a.id === applicationId);
  if (app) {
    app.current_stage = "PROVISIONALLY_APPROVED";
    saveLocalStore(store);
    return true;
  }
  return false;
}

export async function authenticateDigiLocker(aadhaarNumber: string) {
  try {
    const res = await fetch(`${API_BASE}/auth/digilocker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aadhaar_number: aadhaarNumber }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend DigiLocker auth fallback", err);
  }

  // Fallback simulation
  return {
    success: true,
    digilocker_id: `DL-ST-${Math.floor(10000 + Math.random() * 90000)}`,
    name: "Ramesh Chandra Munda",
    gender: "Male",
    dob: "1999-04-12",
    caste: "Scheduled Tribe (Munda Community)",
    aadhaar_masked: `XXXXXXXX${aadhaarNumber.slice(-4) || "8472"}`,
    caste_certificate_verified: true,
    trust_level: 1.0,
  };
}

export async function evaluateSchemeRules(payload: {
  scheme_id: "NFST" | "NOS";
  applicant_name: string;
  caste: string;
  annual_family_income: number;
  age: number;
  gender: string;
  has_other_fellowship?: boolean;
  degree_marks_percentage?: number;
  course_type?: string;
  qs_world_ranking?: number;
}) {
  try {
    const res = await fetch(`${API_BASE}/schemes/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend rule evaluate fallback", err);
  }

  // Client-side rule evaluation matching Rules.md
  if (payload.scheme_id === "NFST") {
    const incomeOk = payload.annual_family_income <= 600000;
    const ageCap = ["female", "transgender", "third gender"].includes(payload.gender.toLowerCase()) ? 41 : 36;
    const ageOk = payload.age <= ageCap;
    const isST = payload.caste.toUpperCase().includes("ST") || payload.caste.toUpperCase().includes("TRIBE");
    const eligible = incomeOk && ageOk && isST;
    return {
      scheme_id: "NFST",
      eligible,
      merit_score: 87.5,
      rule_results: [
        {
          rule_code: "NFST-R01",
          rule_name: "Scheduled Tribe Verification",
          passed: isST,
          message: isST ? "Verified via DigiLocker token." : "Candidate is not ST.",
        },
        {
          rule_code: "NFST-R02",
          rule_name: "Full-Time Research Degree",
          passed: true,
          message: "Enrolled in regular M.Phil / Ph.D.",
        },
        {
          rule_code: "NFST-R03",
          rule_name: "Annual Family Income Ceiling (≤ ₹6.0 LPA)",
          passed: incomeOk,
          message: incomeOk
            ? `Income ₹${payload.annual_family_income.toLocaleString()} is within ₹6,00,000 ceiling.`
            : `Income ₹${payload.annual_family_income.toLocaleString()} exceeds ₹6.0 LPA limit.`,
        },
        {
          rule_code: "NFST-R04",
          rule_name: `Age Cap (≤ ${ageCap} yrs)`,
          passed: ageOk,
          message: ageOk ? `Age ${payload.age} is within limit.` : `Age ${payload.age} exceeds cap.`,
        },
      ],
      recommendation: eligible
        ? "Application meets statutory criteria for MoTA NFST Selection Board."
        : "Application rejected due to criteria violation.",
    };
  } else {
    const incomeOk = payload.annual_family_income <= 800000;
    const ageOk = payload.age <= 35;
    const marksOk = (payload.degree_marks_percentage || 60) >= 60.0;
    const rankOk = (payload.qs_world_ranking || 100) <= 500;
    const isST = payload.caste.toUpperCase().includes("ST") || payload.caste.toUpperCase().includes("TRIBE");
    const eligible = incomeOk && ageOk && marksOk && rankOk && isST;
    return {
      scheme_id: "NOS",
      eligible,
      merit_score: 91.0,
      rule_results: [
        {
          rule_code: "NOS-R01",
          rule_name: "Scheduled Tribe Verification",
          passed: isST,
          message: isST ? "ST category verified." : "Candidate is not ST.",
        },
        {
          rule_code: "NOS-R02",
          rule_name: "Postgraduate / Doctoral Abroad",
          passed: true,
          message: "Masters / Ph.D. abroad admitted.",
        },
        {
          rule_code: "NOS-R03",
          rule_name: "QS World University Rank (≤ 500)",
          passed: rankOk,
          message: rankOk ? `Institution QS rank ${payload.qs_world_ranking} ≤ 500.` : "University rank > 500.",
        },
        {
          rule_code: "NOS-R04",
          rule_name: "Qualifying Marks (≥ 60%)",
          passed: marksOk,
          message: marksOk ? `Marks ${payload.degree_marks_percentage}% ≥ 60%.` : "Marks below 60%.",
        },
        {
          rule_code: "NOS-R05",
          rule_name: "Annual Family Income Ceiling (≤ ₹8.0 LPA)",
          passed: incomeOk,
          message: incomeOk ? "Income within ₹8.0 LPA." : "Income exceeds ₹8.0 LPA.",
        },
        {
          rule_code: "NOS-R06",
          rule_name: "Age Cap (≤ 35 yrs)",
          passed: ageOk,
          message: ageOk ? "Age within 35 yrs limit." : "Age exceeds 35 years.",
        },
      ],
      recommendation: eligible
        ? "Application meets statutory criteria for MoTA NOS Selection Board."
        : "Application does not meet overseas scholarship threshold.",
    };
  }
}

export async function fetchDbtDisbursementBatch() {
  try {
    const res = await fetch(`${API_BASE}/applications/dbt/batch`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend DBT batch fetch fallback", err);
  }

  const store = getLocalStore();
  const approved = store.filter((a) => a.current_stage === "PROVISIONALLY_APPROVED");
  const total = approved.reduce((acc, curr) => acc + (curr.scheme_id === "NFST" ? 31000 : 125000), 0);
  const batchId = `PFMS-MOTA-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-B01`;

  return {
    batch_id: batchId,
    scheme: "MoTA DBT Unified Fellowship Gateway",
    generated_at: new Date().toISOString(),
    total_beneficiaries: approved.length,
    total_disbursement_inr: total,
    records: approved.map((app) => ({
      application_id: app.id,
      beneficiary_name: app.applicant_name,
      scheme: app.scheme_id,
      account_status: "Aadhaar_NPCI_Seeded",
      monthly_disbursement_inr: app.scheme_id === "NFST" ? 31000 : 125000,
      status: "READY_FOR_PFMS_GATEWAY",
    })),
    xml_payload_preview: `<?xml version="1.0" encoding="UTF-8"?>\n<PFMSBatch id="${batchId}">\n  <Department>Ministry of Tribal Affairs</Department>\n  <TotalAmountINR>${total}</TotalAmountINR>\n  <BeneficiariesCount>${approved.length}</BeneficiariesCount>\n</PFMSBatch>`,
  };
}
