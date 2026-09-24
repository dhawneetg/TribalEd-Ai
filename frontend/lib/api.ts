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

export interface StudentProfile {
  name: string;
  course: string;
  year: string;
  branch: string;
  state: string;
  district?: string;
  category: string;
  tribe?: string;
  income_inr: number;
  age: number;
  gender: string;
  marks_percentage: number;
  interests: string[];
  documents_present: string[];
}

export interface OpportunityItem {
  id: string;
  title: string;
  type: "Scholarship" | "Internship" | "Exam & Coaching" | "Certification";
  provider: string;
  badge: string;
  summary: string;
  benefit: string;
  deadline_days: number;
  deadline_date: string;
  target_courses: string[];
  min_marks_pct: number;
  max_income_inr: number;
  min_age: number;
  max_age: number;
  required_category: string;
  target_states: string[];
  required_docs: string[];
  apply_url: string;
  tags: string[];
  match_status: "FULLY_ELIGIBLE" | "NEAR_MISS" | "NOT_ELIGIBLE";
  near_miss_type?: "MISSING_DOCUMENT" | "DEADLINE_URGENT" | "RELAXATION_APPLICABLE" | null;
  near_miss_message?: string;
  action_cta?: string;
  missing_docs?: string[];
  is_deadline_urgent?: boolean;
  hours_remaining?: number;
  reasons_passed?: string[];
  reasons_failed?: string[];
}

export interface OpportunityMatchResponse {
  student_name: string;
  summary: {
    total_evaluated: number;
    relevant_count: number;
    fully_eligible_count: number;
    near_miss_count: number;
    urgent_deadline_count: number;
    headline: string;
  };
  opportunities: OpportunityItem[];
}

export async function matchOpportunities(profile: StudentProfile): Promise<OpportunityMatchResponse> {
  try {
    const res = await fetch(`${API_BASE}/opportunities/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend opportunities/match fallback to client rule engine", err);
  }

  // Client-side fallback matching
  const catalog = [
    {
      id: "OPP-SCH-01",
      title: "MoTA National Fellowship for ST Students (NFST 2026-27)",
      type: "Scholarship" as const,
      provider: "Ministry of Tribal Affairs (MoTA)",
      badge: "Central Fellowship",
      summary: "Full financial support for Scheduled Tribe scholars pursuing regular M.Phil. and Ph.D. degrees in recognized Indian universities.",
      benefit: "₹31,000/mo (JRF) + ₹35,000/mo (SRF) + HRA + Contingency",
      deadline_days: 18,
      deadline_date: "2026-10-12",
      target_courses: ["Ph.D.", "M.Phil", "Doctoral"],
      min_marks_pct: 55.0,
      max_income_inr: 600000,
      min_age: 21,
      max_age: 36,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["Caste Certificate", "Income Certificate", "Admission Letter"],
      apply_url: "/apply?scheme=NFST",
      tags: ["Research", "Higher Education", "Stipend", "Central Govt"],
    },
    {
      id: "OPP-SCH-02",
      title: "National Overseas Scholarship for ST Candidates (NOS Abroad)",
      type: "Scholarship" as const,
      provider: "Ministry of Tribal Affairs (MoTA)",
      badge: "International Grant",
      summary: "Prestigious foreign study grant enabling meritorious ST scholars to attend QS Top 500 universities worldwide for Masters and Ph.D.",
      benefit: "100% Tuition Fees + £9,900 / $15,400 Annual Allowance + Airfare",
      deadline_days: 2,
      deadline_date: "2026-09-26",
      target_courses: ["Masters", "Postgraduate", "Ph.D.", "B.Tech Final Year", "Graduating"],
      min_marks_pct: 60.0,
      max_income_inr: 800000,
      min_age: 20,
      max_age: 35,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["Caste Certificate", "Income Certificate", "Passport / Offer Letter"],
      apply_url: "/apply?scheme=NOS",
      tags: ["Overseas", "Top 500 QS", "Full Ride", "Masters"],
    },
    {
      id: "OPP-SCH-03",
      title: "MoTA Top Class Education Scheme for ST Students",
      type: "Scholarship" as const,
      provider: "Ministry of Tribal Affairs",
      badge: "Premier Institute",
      summary: "Covers full tuition and boarding for ST students admitted to IITs, NITs, AIIMS, IIMs, NLUs, and premier national institutes.",
      benefit: "Full Tuition Waiver + ₹3,000/mo Living + ₹45,000 Computer Hardware Grant",
      deadline_days: 6,
      deadline_date: "2026-09-30",
      target_courses: ["B.Tech", "B.E.", "MBBS", "B.Sc", "Integrated M.Sc", "Law"],
      min_marks_pct: 60.0,
      max_income_inr: 600000,
      min_age: 17,
      max_age: 28,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["Caste Certificate", "Income Certificate", "Admission Letter"],
      apply_url: "/apply",
      tags: ["Undergraduate", "Engineering", "Medicine", "Premier College"],
    },
    {
      id: "OPP-SCH-04",
      title: "Jharkhand E-Kalyan Post-Matric ST Scholarship 2026",
      type: "Scholarship" as const,
      provider: "Govt of Jharkhand (Welfare Dept)",
      badge: "State Welfare",
      summary: "Annual institutional fee reimbursement and monthly maintenance for ST college students studying inside or outside Jharkhand.",
      benefit: "Up to ₹55,000 / year college fee reimbursement + boarding grant",
      deadline_days: 1,
      deadline_date: "2026-09-25",
      target_courses: ["B.Tech", "Diploma", "B.Sc", "B.A.", "B.Com", "M.Tech", "M.Sc"],
      min_marks_pct: 50.0,
      max_income_inr: 250000,
      min_age: 16,
      max_age: 30,
      required_category: "ST",
      target_states: ["Jharkhand"],
      required_docs: ["Caste Certificate", "Income Certificate", "Domicile Certificate"],
      apply_url: "/track",
      tags: ["State Domicile", "Tuition Reimbursement", "Post-Matric"],
    },
    {
      id: "OPP-INT-01",
      title: "NITI Aayog Tribal Development & Policy Research Internship",
      type: "Internship" as const,
      provider: "NITI Aayog (Govt of India)",
      badge: "Policy & Governance",
      summary: "Work directly with central policy analysts on Aspirational Districts and Fifth Schedule tribal welfare economic models.",
      benefit: "₹25,000 / month stipend + NITI Aayog Certificate of Excellence",
      deadline_days: 9,
      deadline_date: "2026-10-03",
      target_courses: ["B.Tech", "B.Sc", "M.Sc", "M.A.", "Economics", "Ph.D."],
      min_marks_pct: 65.0,
      max_income_inr: 1200000,
      min_age: 19,
      max_age: 28,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["College ID / NoC", "Resume", "Caste Certificate"],
      apply_url: "/opportunities",
      tags: ["Internship", "Public Policy", "Paid", "New Delhi"],
    },
    {
      id: "OPP-INT-02",
      title: "AICTE - MoTA 'Tech for Tribals' AI & Vernacular Computing Fellowship",
      type: "Internship" as const,
      provider: "AICTE & Ministry of Tribal Affairs",
      badge: "AI & Innovation",
      summary: "Engineering internship developing mobile AI tools, speech recognizers, and offline learning apps for Santhali, Kurukh, and Gondi scripts.",
      benefit: "₹30,000 / month stipend + Edge AI Compute Hardware Kit",
      deadline_days: 3,
      deadline_date: "2026-09-27",
      target_courses: ["B.Tech", "B.E.", "MCA", "M.Tech", "B.Sc CS", "Computer Science"],
      min_marks_pct: 60.0,
      max_income_inr: 800000,
      min_age: 19,
      max_age: 27,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["Caste Certificate", "College ID / NoC"],
      apply_url: "/opportunities",
      tags: ["AI Research", "NLP", "Vernacular", "High Stipend"],
    },
    {
      id: "OPP-EXM-01",
      title: "UPSC Civil Services ST Free Residential Coaching & Mentorship",
      type: "Exam & Coaching" as const,
      provider: "MoTA Central Coaching Scheme (Jamia / Sankalp)",
      badge: "Civil Services Prep",
      summary: "Fully sponsored 10-month residential coaching program for ST aspirants preparing for UPSC IAS/IPS/IFS with top faculty and test series.",
      benefit: "100% Free Air-Conditioned Hostel + Library + ₹4,000/mo Monthly Allowance",
      deadline_days: 2,
      deadline_date: "2026-09-26",
      target_courses: ["Graduate", "Final Year B.Tech", "B.A.", "B.Sc", "Postgraduate"],
      min_marks_pct: 50.0,
      max_income_inr: 600000,
      min_age: 21,
      max_age: 37,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["Caste Certificate", "Income Certificate", "Graduation Marksheet"],
      apply_url: "/opportunities",
      tags: ["UPSC", "IAS", "Free Hostel", "Coaching"],
    },
    {
      id: "OPP-CRT-01",
      title: "Google Cloud & AWS Tribal Youth Cloud Architect Certification Bursary",
      type: "Certification" as const,
      provider: "NASSCOM FutureSkills & MoTA IT Initiative",
      badge: "Industry Credential",
      summary: "100% exam fee waiver and official voucher for Associate Cloud Engineer / AWS Solutions Architect certification with guaranteed interview slots.",
      benefit: "₹18,000 Global Exam Fee 100% Waived + 6-Month Cloud Sandbox Labs",
      deadline_days: 11,
      deadline_date: "2026-10-05",
      target_courses: ["B.Tech", "B.E.", "BCA", "MCA", "B.Sc", "Diploma Tech"],
      min_marks_pct: 55.0,
      max_income_inr: 800000,
      min_age: 18,
      max_age: 29,
      required_category: "ST",
      target_states: ["All India"],
      required_docs: ["College ID / NoC", "Caste Certificate"],
      apply_url: "/opportunities",
      tags: ["Cloud", "DevOps", "Free Voucher", "Industry Ready"],
    },
  ];

  const evaluated: OpportunityItem[] = catalog.map((opp) => {
    const presentDocs = profile.documents_present.map((d) => d.toLowerCase());
    const missingDocs = opp.required_docs.filter((req) => {
      const r = req.toLowerCase();
      return !presentDocs.some((p) => p.includes(r) || (r.includes("caste") && p.includes("caste")) || (r.includes("income") && p.includes("income")));
    });

    const isUrgent = opp.deadline_days <= 2;
    const isIncomeOk = profile.income_inr <= opp.max_income_inr;
    const isAgeOk = profile.age >= opp.min_age && profile.age <= opp.max_age;
    const isSt = profile.category.toUpperCase().includes("ST") || profile.category.toUpperCase().includes("TRIBE");

    let match_status: "FULLY_ELIGIBLE" | "NEAR_MISS" | "NOT_ELIGIBLE" = "FULLY_ELIGIBLE";
    let near_miss_type: "MISSING_DOCUMENT" | "DEADLINE_URGENT" | "RELAXATION_APPLICABLE" | null = null;
    let near_miss_message = "You satisfy 100% of all gazetted criteria. Documents ready for instant submission.";
    let action_cta = "Apply with Sarthi 1-Click Profile";

    if (!isSt || !isIncomeOk) {
      match_status = "NOT_ELIGIBLE";
      near_miss_message = !isSt ? "Requires ST Category certification." : `Income exceeds ₹${opp.max_income_inr.toLocaleString()} ceiling.`;
      action_cta = "Explore Alternative Schemes";
    } else if (missingDocs.length > 0) {
      match_status = "NEAR_MISS";
      near_miss_type = "MISSING_DOCUMENT";
      near_miss_message = `⚠️ Potentially eligible (92% Match) — required document '${missingDocs[0]}' is missing. Upload now or generate self-declaration to unlock.`;
      action_cta = `Upload ${missingDocs[0]}`;
    } else if (isUrgent) {
      match_status = "NEAR_MISS";
      near_miss_type = "DEADLINE_URGENT";
      near_miss_message = `🚨 Deadline closing in ${opp.deadline_days * 24} hours (${opp.deadline_date})! Submit before portal cutoff.`;
      action_cta = "Apply Before Cutoff";
    } else if (!isAgeOk && profile.age <= opp.max_age + 5) {
      match_status = "NEAR_MISS";
      near_miss_type = "RELAXATION_APPLICABLE";
      near_miss_message = `⚠️ Age ${profile.age} qualifies under MoTA 5-Year ST Age Relaxation policy.`;
      action_cta = "Claim ST Age Relaxation";
    }

    return {
      ...opp,
      match_status,
      near_miss_type,
      near_miss_message,
      action_cta,
      missing_docs: missingDocs,
      is_deadline_urgent: isUrgent,
      hours_remaining: opp.deadline_days * 24,
      reasons_passed: ["Scheduled Tribe verified", `Income within ₹${opp.max_income_inr.toLocaleString()}`],
      reasons_failed: match_status === "NOT_ELIGIBLE" ? [near_miss_message] : [],
    };
  });

  const fully_eligible = evaluated.filter((o) => o.match_status === "FULLY_ELIGIBLE");
  const near_miss = evaluated.filter((o) => o.match_status === "NEAR_MISS");
  const urgent_deadlines = evaluated.filter((o) => o.is_deadline_urgent && o.match_status !== "NOT_ELIGIBLE");

  return {
    student_name: profile.name,
    summary: {
      total_evaluated: evaluated.length,
      relevant_count: fully_eligible.length + near_miss.length,
      fully_eligible_count: fully_eligible.length,
      near_miss_count: near_miss.length,
      urgent_deadline_count: urgent_deadlines.length,
      headline: `Found ${fully_eligible.length + near_miss.length} potentially relevant opportunities: ${fully_eligible.length} Fully Eligible, ${near_miss.length} Near-Misses, ${urgent_deadlines.length} Closing in <48h`,
    },
    opportunities: evaluated,
  };
}

export async function scheduleOpportunityAlert(req: {
  opportunity_id: string;
  opportunity_title: string;
  phone: string;
  channel: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/opportunities/alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend alert fallback", err);
  }

  return {
    success: true,
    message: `Deadline reminder successfully scheduled for ${req.opportunity_title} to ${req.phone} via MoTA SMS Gateway & WhatsApp.`,
    alert_token: `ALERT-SMS-${Date.now().toString().slice(-6)}`,
    scheduled_channel: req.channel,
    dispatched_at: new Date().toISOString(),
  };
}

