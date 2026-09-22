export interface DocumentItem {
  id: string;
  doc_type: "CASTE_CERTIFICATE" | "INCOME_CERTIFICATE" | "PHD_ADMISSION_LETTER" | "OVERSEAS_OFFER_LETTER" | "TRANSCRIPT";
  title: string;
  filename: string;
  origin: "DigiLocker_Verified" | "Scanned_Upload" | "Digital_PDF";
  trust_level: number;
  verified_status: "Auto_Approved" | "AI_Verified" | "Needs_Manual_Scrutiny" | "Flagged_Tampered";
  tamper_score: number;
  confidence_score: number;
  extracted_fields: Record<string, string>;
}

export interface DeficiencyItem {
  id: string;
  doc_id?: string;
  doc_name?: string;
  issue_description: string;
  deadline: string;
  status: "OPEN" | "RESOLVED";
  dispatched_at?: string;
  resolved_at?: string;
}

export interface ApplicationItem {
  id: string;
  scheme_id: "NFST" | "NOS";
  applicant_name: string;
  gender: string;
  age: number;
  caste: string;
  university: string;
  department?: string;
  research_topic?: string;
  income_inr: number;
  current_stage: "UNDER_SCRUTINY" | "DEFICIENCY_FLAGGED" | "PROVISIONALLY_APPROVED" | "SUBMITTED";
  merit_score: number;
  created_at: string;
  documents: DocumentItem[];
  deficiencies: DeficiencyItem[];
}

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "APP-2026-NFST-0842",
    scheme_id: "NFST",
    applicant_name: "Ramesh Chandra Munda",
    gender: "Male",
    age: 27,
    caste: "Scheduled Tribe (Munda Community)",
    university: "Jawaharlal Nehru University, New Delhi",
    department: "School of Environmental Sciences",
    research_topic: "Ethno-botanical Resilience in Chota Nagpur Plateau",
    income_inr: 240000,
    current_stage: "UNDER_SCRUTINY",
    merit_score: 88.5,
    created_at: "2026-09-18T10:30:00Z",
    documents: [
      {
        id: "DOC-ST-001",
        doc_type: "CASTE_CERTIFICATE",
        title: "ST Community Certificate",
        filename: "munda_caste_cert_jharkhand.pdf",
        origin: "DigiLocker_Verified",
        trust_level: 1.0,
        verified_status: "Auto_Approved",
        tamper_score: 0.02,
        confidence_score: 1.0,
        extracted_fields: {
          "Name": "Ramesh Chandra Munda",
          "Father's Name": "Sukhram Munda",
          "Caste/Tribe": "Munda (ST)",
          "Issuing Authority": "Sub-Divisional Officer, Khunti",
          "Issue Date": "12/04/2021",
          "Serial Number": "JH/ST/2021/98421",
        },
      },
      {
        id: "DOC-INC-002",
        doc_type: "INCOME_CERTIFICATE",
        title: "Income & Asset Certificate",
        filename: "income_cert_torpa_2025.pdf",
        origin: "Scanned_Upload",
        trust_level: 0.92,
        verified_status: "AI_Verified",
        tamper_score: 0.04,
        confidence_score: 0.94,
        extracted_fields: {
          "Gross Annual Income": "₹ 2,40,000",
          "Financial Year": "2025-2026",
          "Issuing Circle": "Circle Officer, Torpa, Khunti",
          "Validity": "Valid up to 31/03/2027",
        },
      },
      {
        id: "DOC-ADM-003",
        doc_type: "PHD_ADMISSION_LETTER",
        title: "Ph.D. Confirmation & Bona Fide",
        filename: "jnu_phd_admission_letter.pdf",
        origin: "Scanned_Upload",
        trust_level: 0.82,
        verified_status: "Needs_Manual_Scrutiny",
        tamper_score: 0.12,
        confidence_score: 0.78,
        extracted_fields: {
          "Institution": "Jawaharlal Nehru University",
          "Enrollment No": "22/54/SES/019",
          "Category": "Full-Time Research Scholar",
          "Date of Confirmation": "15/08/2024",
        },
      },
    ],
    deficiencies: [],
  },
  {
    id: "APP-2026-NOS-1109",
    scheme_id: "NOS",
    applicant_name: "Sunita Soren",
    gender: "Female",
    age: 25,
    caste: "Scheduled Tribe (Santhal)",
    university: "University of Oxford, United Kingdom",
    department: "Department of Computer Science",
    research_topic: "M.Sc. in Advanced Computer Science (QS Rank: 3)",
    income_inr: 380000,
    current_stage: "UNDER_SCRUTINY",
    merit_score: 92.0,
    created_at: "2026-09-19T14:15:00Z",
    documents: [
      {
        id: "DOC-ST-004",
        doc_type: "CASTE_CERTIFICATE",
        title: "Santhal Community Certificate",
        filename: "soren_caste_odisha.pdf",
        origin: "DigiLocker_Verified",
        trust_level: 1.0,
        verified_status: "Auto_Approved",
        tamper_score: 0.01,
        confidence_score: 1.0,
        extracted_fields: {
          "Name": "Sunita Soren",
          "Caste/Tribe": "Santhal (Scheduled Tribe)",
          "Issuing District": "Mayurbhanj, Odisha",
          "Issue Date": "18/02/2022",
        },
      },
      {
        id: "DOC-INC-005",
        doc_type: "INCOME_CERTIFICATE",
        title: "Tehsildar Annual Income Certificate",
        filename: "soren_income_mayurbhanj.pdf",
        origin: "Scanned_Upload",
        trust_level: 0.95,
        verified_status: "AI_Verified",
        tamper_score: 0.03,
        confidence_score: 0.96,
        extracted_fields: {
          "Gross Annual Income": "₹ 3,80,000",
          "Financial Year": "2025-2026",
          "Issuing Authority": "Tehsildar, Baripada",
        },
      },
      {
        id: "DOC-OFR-006",
        doc_type: "OVERSEAS_OFFER_LETTER",
        title: "Unconditional Admission Offer",
        filename: "oxford_offer_unconditional.pdf",
        origin: "Digital_PDF",
        trust_level: 0.98,
        verified_status: "AI_Verified",
        tamper_score: 0.01,
        confidence_score: 0.97,
        extracted_fields: {
          "University": "University of Oxford",
          "QS World Rank": "3",
          "Course": "M.Sc. Advanced Computer Science",
          "Session": "Michaelmas Term 2026",
        },
      },
    ],
    deficiencies: [],
  },
  {
    id: "APP-2026-NFST-0412",
    scheme_id: "NFST",
    applicant_name: "Birsa Oraon",
    gender: "Male",
    age: 29,
    caste: "Scheduled Tribe (Oraon)",
    university: "Ranchi University, Jharkhand",
    department: "Department of Tribal & Regional Languages",
    research_topic: "Kurukh Oral Literature Preservation",
    income_inr: 180000,
    current_stage: "DEFICIENCY_FLAGGED",
    merit_score: 79.0,
    created_at: "2026-09-17T09:00:00Z",
    documents: [
      {
        id: "DOC-ST-007",
        doc_type: "CASTE_CERTIFICATE",
        title: "Oraon ST Certificate",
        filename: "oraon_caste_cert.pdf",
        origin: "DigiLocker_Verified",
        trust_level: 1.0,
        verified_status: "Auto_Approved",
        tamper_score: 0.02,
        confidence_score: 1.0,
        extracted_fields: {
          "Name": "Birsa Oraon",
          "Tribe": "Oraon (ST)",
          "District": "Ranchi",
        },
      },
      {
        id: "DOC-INC-008",
        doc_type: "INCOME_CERTIFICATE",
        title: "Income Certificate",
        filename: "blurry_income_cert_2025.jpg",
        origin: "Scanned_Upload",
        trust_level: 0.58,
        verified_status: "Needs_Manual_Scrutiny",
        tamper_score: 0.35,
        confidence_score: 0.62,
        extracted_fields: {
          "Gross Annual Income": "Ambiguous (OCR <70%)",
          "Issuing Authority": "Anchal Adhikari, Bero",
        },
      },
    ],
    deficiencies: [
      {
        id: "DEF-9021A",
        doc_id: "DOC-INC-008",
        doc_name: "Income Certificate",
        issue_description: "Income certificate scan has low resolution. Annual gross amount is ambiguous in section 4. Please re-upload a clean, high-contrast 300 DPI scan.",
        deadline: new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0],
        status: "OPEN",
        dispatched_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
    ],
  },
  {
    id: "APP-2026-NFST-0198",
    scheme_id: "NFST",
    applicant_name: "Pooja Kispotta",
    gender: "Female",
    age: 26,
    caste: "Scheduled Tribe (Kharia)",
    university: "IIT Kharagpur",
    department: "Rural Development Centre",
    research_topic: "Solar Irrigation Architectures in Tribal Belts",
    income_inr: 210000,
    current_stage: "PROVISIONALLY_APPROVED",
    merit_score: 94.0,
    created_at: "2026-09-15T11:20:00Z",
    documents: [
      {
        id: "DOC-ST-009",
        doc_type: "CASTE_CERTIFICATE",
        title: "Kharia ST Certificate",
        filename: "kispotta_caste.pdf",
        origin: "DigiLocker_Verified",
        trust_level: 1.0,
        verified_status: "Auto_Approved",
        tamper_score: 0.01,
        confidence_score: 1.0,
        extracted_fields: {
          "Name": "Pooja Kispotta",
          "Caste": "Kharia (ST)",
          "State": "Jharkhand",
        },
      },
      {
        id: "DOC-INC-010",
        doc_type: "INCOME_CERTIFICATE",
        title: "Income Certificate",
        filename: "kispotta_income.pdf",
        origin: "Scanned_Upload",
        trust_level: 0.98,
        verified_status: "Auto_Approved",
        tamper_score: 0.02,
        confidence_score: 0.98,
        extracted_fields: {
          "Gross Annual Income": "₹ 2,10,000",
          "Circle": "Bano, Simdega",
        },
      },
    ],
    deficiencies: [],
  },
];
