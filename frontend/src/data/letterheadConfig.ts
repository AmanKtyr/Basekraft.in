export interface CompanyLetterheadConfig {
  legalName: string;
  studioBrand: string;
  tagline: string;
  gstin: string;
  pan: string;
  cin: string;
  address: string;
  cityStatePincode: string;
  phone: string;
  email: string;
  website: string;
  // Banking for invoices / quotes
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  upiId: string;
  // Signatory
  signatoryName: string;
  signatoryTitle: string;
  // Letterhead Mode & Custom Upload
  letterheadMode: "digital" | "uploadedPdf" | "prePrinted";
  uploadedPdfName?: string;
  uploadedPdfUrl?: string; // base64 or url
  topMarginMm: number; // margin for pre-printed letterhead header
  bottomMarginMm: number; // margin for pre-printed letterhead footer
  // Standard terms
  termsAndConditions: string[];
}

export const defaultLetterheadConfig: CompanyLetterheadConfig = {
  legalName: "BASEKRAFT INFRA PRIVATE LIMITED",
  studioBrand: "BASEKRAFT ARCHITECTURAL OS",
  tagline: "Turnkey Architecture • Modular Millwork • Rooftop Solar EPC",
  gstin: "07AAACC2910P1Z4",
  pan: "AAACC2910P",
  cin: "U45201HR2023PTC109824",
  address: "DLF Cyber City, Tower B, Level 8",
  cityStatePincode: "Gurugram, Haryana 122002, India",
  phone: "+91 98101 22345",
  email: "proposals@basekraft.in",
  website: "https://basekraft.in",
  bankName: "HDFC Bank Ltd",
  accountName: "BASEKRAFT INFRA PRIVATE LIMITED",
  accountNumber: "50200098442109",
  ifscCode: "HDFC0000280",
  branch: "DLF Cyber Hub Branch, Gurugram",
  upiId: "basekraft@hdfcbank",
  signatoryName: "Ar. Aman Katyar",
  signatoryTitle: "Principal Architect & Founder",
  letterheadMode: "digital",
  uploadedPdfName: "Basekraft_Corporate_Letterhead_A4.pdf",
  topMarginMm: 42,
  bottomMarginMm: 28,
  termsAndConditions: [
    "50% Mobilization advance required upon quotation sign-off to initiate 3D production drawings and lock procurement batch rates.",
    "40% Milestone payment due upon civil rough-in, conduit completion, or factory carcass inspection before site delivery.",
    "10% Final retention payable upon joint snag rectification and formal project completion certificate sign-off.",
    "Quotation unit rates remain strictly valid for 15 business days from date of issuance.",
    "Site water, 3-phase electricity supply, and municipal lift access to be provided by the client without hindrance.",
    "10-Year warranty on structural modular millwork and 25-year performance warranty on Tier-1 Solar PV modules.",
  ],
};

const STORAGE_KEY = "basekraft_company_letterhead_v1";

export function getLetterheadConfig(): CompanyLetterheadConfig {
  if (typeof window === "undefined") return defaultLetterheadConfig;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultLetterheadConfig, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error("Failed reading letterhead config from localStorage:", err);
  }
  return defaultLetterheadConfig;
}

export function saveLetterheadConfig(config: CompanyLetterheadConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error("Failed saving letterhead config to localStorage:", err);
  }
}
