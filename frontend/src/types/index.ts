export type ProjectStage = "sales" | "design" | "execution" | "handover" | "inactive";

export type ProjectSector =
  | "Interior Design & Turnkey"
  | "Solar Energy & Rooftop EPC"
  | "Modular Furniture & Manufacturing"
  | "Real Estate & Civil Contracting"
  | "Residential"
  | "Commercial Office"
  | "Retail & Showroom"
  | "Hospitality & F&B"
  | "Healthcare & Wellness";

export interface MaterialMasterItem {
  id: string;
  name: string;
  description: string;
  clientRate: number;
  purchaseRate: number;
  uom: "SQFT" | "RFT" | "Nos" | "LumpSum";
  gstPercent: number;
  sectorTag: ProjectSector;
  category: "Civil" | "Carpentry" | "Electrical" | "Plumbing" | "Finishes";
  createdOn: string;
}

export interface Checkpoint {
  id: string;
  label: string;
  isCompleted: boolean;
  category: "Civil" | "Design" | "Electrical" | "Finishes" | "Legal";
  dueDate?: string;
}

export interface Project {
  id: string;
  code: string; // e.g., "P-101", "P-619"
  name: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  city: string;
  state: string;
  sector: ProjectSector;
  leadSource?: "Referral" | "Instagram / Social" | "Architect Network" | "Website Inbound" | "Walk-in";
  stage: ProjectStage;
  subStage: string;
  budget: number; // in INR
  spent: number;
  startDate: string;
  targetHandover: string;
  pmName: string;
  designerName: string;
  progressPercent: number;
  totalCheckpoints: number;
  completedCheckpoints: number;
  pendingApprovalsCount: number;
  pendingIssuesCount: number;
  description: string;
  propertyType: "Residential 3BHK" | "Luxury Villa" | "Commercial Office" | "Retail Boutique" | "Penthouse";
  carpetAreaSqFt: number;
  checkpoints: Checkpoint[];
}

export interface BOQItem {
  id: string;
  room: "Living Room" | "Master Suite" | "Modular Kitchen" | "Balcony / Deck" | "Foyer & Dining";
  category: "Civil & Masonry" | "Carpentry & Paneling" | "Electrical & Automation" | "Painting & Wallpaper" | "Plumbing & Fixtures";
  description: string;
  unit: "Sq.Ft" | "R.Ft" | "Nos" | "LumpSum";
  quantity: number;
  unitRate: number;
  total: number;
  taxPercent: number;
  specificationNotes: string;
}

export interface PaymentRequest {
  id: string;
  projectCode: string;
  projectName: string;
  requestedBy: string;
  role: string;
  amount: number;
  category: string;
  status: "pending" | "approved" | "rejected" | "paid";
  date: string;
  invoiceUrl?: string;
  invoiceRef?: string;
  notes?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  projectCode: string;
  projectName: string;
  clientName: string;
  assigneeName: string;
  category: "Task" | "Snags" | "Hindrance" | "Followup";
  status: "created" | "in-progress" | "completed" | "on-hold" | "discarded";
  createdDate: string;
  dueDate: string;
  isOverdue: boolean;
  timeLogged: string; // e.g., "02:45:00"
  commentsCount: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string; // e.g. "PO-8821"
  projectCode: string;
  projectName: string;
  vendorName: string;
  itemCategory: string;
  amount: number;
  paidAmount: number;
  status: "Approved" | "Pending PO" | "Dispatched" | "Delivered" | "Cancelled";
  expectedDelivery: string;
}

export interface FinanceSummary {
  totalInvoiced: number;
  totalCollected: number;
  totalPending: number;
  totalExpenses: number;
  netMargin: number;
}

export interface TimesheetItem {
  id: string;
  memberName: string;
  role: string;
  projectCode: string;
  projectName: string;
  taskDescription: string;
  date: string;
  hoursSpent: number;
  billable: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: "Principal Architect" | "Interior Designer" | "Project Manager" | "Site Supervisor" | "Estimator";
  email: string;
  phone: string;
  activeProjectsCount: number;
  avatarUrl?: string;
}

export type LeadStage =
  | "new_inquiry"
  | "site_consultation"
  | "concept_pitch"
  | "negotiation"
  | "won"
  | "dropped";

export interface LeadItem {
  id: string;
  leadNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  city: string;
  propertyType: "Residential 3BHK" | "Luxury Villa" | "Commercial Office" | "Retail Boutique" | "Penthouse" | "F&B / Hospitality";
  carpetAreaSqFt: number;
  estimatedBudget: number; // in INR
  stage: LeadStage;
  leadSource: "Referral" | "Instagram / Social" | "Architect Network" | "Website Inbound" | "Walk-in";
  assignedDesigner: string;
  notes: string;
  nextFollowupDate?: string;
  siteVisitDate?: string;
  convertedProjectCode?: string;
  createdAt: string;
}

export interface ClientDirectoryItem {
  id: string;
  clientName: string;
  companyName?: string;
  clientPhone: string;
  clientEmail?: string;
  city: string;
  activeProjectsCount: number;
  lifetimeValue: number; // Total billed/committed in INR
  status: "Active" | "Prospect" | "Completed";
  primaryProjectCode?: string;
  portalCode?: string;
  leadSource: string;
  clientSince: string;
  lastInteraction: string;
  avatar?: string;
}


