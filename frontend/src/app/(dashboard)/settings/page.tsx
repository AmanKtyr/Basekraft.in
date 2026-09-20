"use client";

import React, { useState, Suspense, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  getLetterheadConfig,
  saveLetterheadConfig,
  defaultLetterheadConfig,
  CompanyLetterheadConfig,
} from "@/data/letterheadConfig";
import {
  Search,
  CreditCard,
  Building2,
  Globe,
  Sparkles,
  Box,
  Layers,
  ClipboardCheck,
  Palette,
  Activity,
  HardHat,
  Truck,
  Users,
  ShieldCheck,
  Edit2,
  Check,
  Plus,
  ArrowUpRight,
  Upload,
  Lock,
  ChevronDown,
  Info,
  CheckCircle2,
  Trash2,
  Download,
  Filter,
  FileSpreadsheet,
  MoreVertical,
  ExternalLink,
  FileText,
  Pencil,
  AlertCircle,
  Clock,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  X,
  Wrench,
  Lightbulb,
  Calendar,
  Share2,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Zap,
  ShieldAlert,
} from "lucide-react";

type SettingsTab =
  | "organizationDetails"
  | "subscription"
  | "listingPage"
  | "aiProCredit"
  | "itemMaster"
  | "materialsMaster"
  | "checklistMaster"
  | "moodboard"
  | "activity"
  | "manpower"
  | "vendors"
  | "users"
  | "permissions"
  | "configuration"
  | "automation"
  | "hrPolicies"
  | "integrations";

interface NavItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "organizationDetails", label: "Organization Details", icon: Building2 },
  { id: "listingPage", label: "Listing Page", icon: Globe },
  { id: "aiProCredit", label: "AI Pro Credit", icon: Sparkles },
  { id: "itemMaster", label: "Item Master", icon: Box },
  { id: "materialsMaster", label: "Materials Master", icon: Layers },
  { id: "checklistMaster", label: "Checklist Master", icon: ClipboardCheck },
  { id: "moodboard", label: "Moodboard", icon: Palette },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "manpower", label: "Manpower", icon: HardHat },
  { id: "vendors", label: "Vendors", icon: Truck },
  { id: "users", label: "Users", icon: Users },
  { id: "permissions", label: "Permissions", icon: ShieldCheck },
  { id: "configuration", label: "Configuration", icon: Wrench },
  { id: "automation", label: "Automation", icon: Lightbulb },
  { id: "hrPolicies", label: "HR & Policies", icon: Calendar },
  { id: "integrations", label: "Integrations", icon: Share2 },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as SettingsTab) || "organizationDetails";
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-tabs states
  const [materialsSubTab, setMaterialsSubTab] = useState<"all" | "rateContracts">("all");
  const [vendorSubTab, setVendorSubTab] = useState<"all" | "active" | "inactive" | "blacklist">("all");
  const [userSubTab, setUserSubTab] = useState<"internal" | "clients" | "vendors">("internal");

  // Organization Details State
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    legalName: "BASEKRAFT INFRA PRIVATE LIMITED",
    studioName: "BASEKRAFT INFRA PRIVATE LIMITED",
    gstNumber: "09AALCV3822B1ZE",
    panNumber: "AALCV3822B",
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    line1: "Plot 42, DLF Cyber City, Phase 5",
    line2: "Executive Tower B, Sector 43",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
    country: "India",
  });

  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: "HDFC Bank Limited",
    accountNumber: "50200084920194",
    ifscCode: "HDFC0001024",
    accountType: "Current Account",
    udyamNumber: "UDYAM-HR-05-0039210",
  });

  // Company Letterhead & Proposal State (initialized with defaultLetterheadConfig to prevent SSR hydration mismatch)
  const [letterheadConfig, setLetterheadConfig] = useState<CompanyLetterheadConfig>(defaultLetterheadConfig);
  const [isEditingLetterhead, setIsEditingLetterhead] = useState(false);
  const [letterheadSavedToast, setLetterheadSavedToast] = useState(false);

  // Sync client-persisted letterhead config from localStorage after hydration
  useEffect(() => {
    setLetterheadConfig(getLetterheadConfig());
  }, []);

  // Instant Letterhead mode change with automatic localStorage save
  const handleLetterheadModeChange = (mode: "digital" | "uploadedPdf" | "prePrinted") => {
    const updated: CompanyLetterheadConfig = { ...letterheadConfig, letterheadMode: mode };
    setLetterheadConfig(updated);
    saveLetterheadConfig(updated);
    setLetterheadSavedToast(true);
    setTimeout(() => setLetterheadSavedToast(false), 3000);
  };

  // Instant Letterhead file upload with base64 data persistence
  const handleLetterheadFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result as string;
        const updated: CompanyLetterheadConfig = {
          ...letterheadConfig,
          uploadedPdfName: file.name,
          uploadedPdfUrl: base64Url,
          letterheadMode: "uploadedPdf",
        };
        setLetterheadConfig(updated);
        saveLetterheadConfig(updated);
        setLetterheadSavedToast(true);
        setTimeout(() => setLetterheadSavedToast(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Instant margin clearance adjustments
  const handleLetterheadMarginChange = (key: "topMarginMm" | "bottomMarginMm", val: number) => {
    const updated: CompanyLetterheadConfig = { ...letterheadConfig, [key]: val };
    setLetterheadConfig(updated);
    saveLetterheadConfig(updated);
  };

  // HR Holidays Calendar State
  const [holidaysList, setHolidaysList] = useState([
    { id: "h-1", date: "26 Jan 2026", name: "Republic Day", day: "Monday", siteStatus: "All Sites Closed" },
    { id: "h-2", date: "04 Mar 2026", name: "Holi Festival", day: "Wednesday", siteStatus: "All Sites Closed" },
    { id: "h-3", date: "21 Mar 2026", name: "Eid-ul-Fitr", day: "Saturday", siteStatus: "All Sites Closed" },
    { id: "h-4", date: "15 Aug 2026", name: "Independence Day", day: "Saturday", siteStatus: "All Sites Closed" },
    { id: "h-5", date: "02 Oct 2026", name: "Gandhi Jayanti", day: "Friday", siteStatus: "All Sites Closed" },
    { id: "h-6", date: "10 Nov 2026", name: "Diwali & Deepawali", day: "Tuesday", siteStatus: "All Sites Closed" },
    { id: "h-7", date: "25 Dec 2026", name: "Christmas", day: "Friday", siteStatus: "All Sites Closed" },
  ]);
  const [isAddHolidayModalOpen, setIsAddHolidayModalOpen] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("2026-10-02");
  const [newHolidayStatus, setNewHolidayStatus] = useState("All Sites Closed");

  // Integrations State (WhatsApp & Razorpay)
  const [whatsappConfig, setWhatsappConfig] = useState({
    isConnected: true,
    phoneNumberId: "108291049281023",
    wabaId: "928104829104812",
    accessToken: "EAABwz84920194829104812903",
    senderPhone: "+91 98101 22345",
  });
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [waTestFeedback, setWaTestFeedback] = useState<string | null>(null);

  const [razorpayConfig, setRazorpayConfig] = useState({
    isConnected: true,
    mode: "live" as "live" | "test",
    keyId: "rzp_live_Basekraft99",
    keySecret: "••••••••••••••••••••",
    merchantName: "Basekraft Infra Private Limited",
    webhookSecret: "whsec_984102948129",
  });
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [rzpTestFeedback, setRzpTestFeedback] = useState<string | null>(null);

  // Master Items Data
  const [itemMasterList, setItemMasterList] = useState([
    {
      id: "itm-1",
      createdOn: "19 Sep 2026",
      name: "Wooden Fluted Wall Partition",
      description: "Charcoal fluted louvers with concealed acoustic backing & aluminum channels",
      clientRate: 1450,
      purchaseRate: 980,
      uom: "SQFT",
      gst: 18,
      tag: "Carpentry - Partitions",
    },
    {
      id: "itm-2",
      createdOn: "19 Sep 2026",
      name: "Modular Kitchen Carcass Package",
      description: "18mm Marine BWP ply with 2mm PVC edge banding & Hafele soft-close hardware",
      clientRate: 2600,
      purchaseRate: 1850,
      uom: "SQFT",
      gst: 18,
      tag: "Modular Kitchen",
    },
    {
      id: "itm-3",
      createdOn: "18 Sep 2026",
      name: "550W Mono PERC Solar PV Panel",
      description: "Tier-1 bifacial high-efficiency solar module with 25-yr linear warranty",
      clientRate: 18500,
      purchaseRate: 14200,
      uom: "Nos",
      gst: 12,
      tag: "Solar EPC",
    },
    {
      id: "itm-4",
      createdOn: "17 Sep 2026",
      name: "Panel Light & Cove Light Supply",
      description: "Trimless architectural COB warm white 3000K recessed ceiling light fixtures",
      clientRate: 1250,
      purchaseRate: 780,
      uom: "Nos",
      gst: 18,
      tag: "Electrical",
    },
    {
      id: "itm-5",
      createdOn: "15 Sep 2026",
      name: "Italian Marble Flooring & Polish",
      description: "Statuario / Dyna marble dry cladding with diamond pad mirror polishing",
      clientRate: 1850,
      purchaseRate: 1280,
      uom: "SQFT",
      gst: 18,
      tag: "Civil - Flooring",
    },
  ]);

  // Master Manpower Roles (ProjectStudio reference)
  const [manpowerRoles, setManpowerRoles] = useState([
    { id: "mp-1", name: "Snag List / Handover Team", count: 4, dailyWage: 950, trade: "Finishing & Snagging", status: "Active" },
    { id: "mp-2", name: "Quality Control Inspector", count: 2, dailyWage: 1600, trade: "Engineering & QA", status: "Active" },
    { id: "mp-3", name: "Safety Officer", count: 1, dailyWage: 1400, trade: "EHS & Compliance", status: "Active" },
    { id: "mp-4", name: "Scaffolding Team", count: 6, dailyWage: 850, trade: "Civil & Façade", status: "Active" },
    { id: "mp-5", name: "Security / Watchman", count: 3, dailyWage: 700, trade: "Site Security", status: "Active" },
    { id: "mp-6", name: "Pest Control Agency", count: 2, dailyWage: 1200, trade: "Pre-construction", status: "Active" },
    { id: "mp-7", name: "Wardrobe Installer", count: 5, dailyWage: 1100, trade: "Modular Millwork", status: "Active" },
    { id: "mp-8", name: "Modular Kitchen Installer", count: 4, dailyWage: 1150, trade: "Modular Millwork", status: "Active" },
    { id: "mp-9", name: "Polishing Specialist", count: 3, dailyWage: 1050, trade: "Veneer & PU Polish", status: "Active" },
    { id: "mp-10", name: "Wallpaper Installer", count: 2, dailyWage: 1000, trade: "Wall Finishes", status: "Active" },
  ]);

  // Master Vendors (ProjectStudio reference)
  const [vendorsList, setVendorsList] = useState([
    {
      id: "v-1",
      code: "BKVR-001",
      displayName: "CenturyPly Distribution Hub",
      legalName: "Century Plyboards (India) Limited",
      pan: "AAACC2910P",
      gst: "07AAACC2910P1Z4",
      phone: "+91 98110 44210",
      city: "New Delhi",
      type: "Timber & Plywood",
      status: "Active",
      outstanding: "₹3,45,000",
    },
    {
      id: "v-2",
      code: "BKVR-002",
      displayName: "Hafele Architectural Depot",
      legalName: "Hafele India Private Limited",
      pan: "AABCH1092Q",
      gst: "27AABCH1092Q1ZV",
      phone: "+91 98200 88412",
      city: "Mumbai",
      type: "Hardware & Fittings",
      status: "Active",
      outstanding: "₹1,20,000",
    },
    {
      id: "v-3",
      code: "BKVR-003",
      displayName: "Waaree Solar EPC Supplies",
      legalName: "Waaree Energies Limited",
      pan: "AAACW2948K",
      gst: "24AAACW2948K1Z3",
      phone: "+91 98790 33190",
      city: "Surat",
      type: "Solar PV Modules",
      status: "Active",
      outstanding: "₹4,20,000",
    },
    {
      id: "v-4",
      code: "BKVR-004",
      displayName: "UltraTech RMC Concrete",
      legalName: "UltraTech Cement Limited",
      pan: "AAACU0391A",
      gst: "06AAACU0391A1ZB",
      phone: "+91 99100 55432",
      city: "Gurugram",
      type: "Ready-Mix Concrete",
      status: "Active",
      outstanding: "₹0",
    },
  ]);

  // Master Users (ProjectStudio reference)
  const [usersList, setUsersList] = useState([
    {
      id: "u-1",
      name: "Ar. Aman Katyar",
      email: "aman@basekraft.in",
      phone: "+91 98101 22345",
      joiningDate: "01 May 2026",
      role: "Studio Principal (Admin)",
      permissions: ["Can change project stage", "BOQ Margins", "Bank Ledger", "Clients"],
      status: "Active",
    },
    {
      id: "u-2",
      name: "Rohan Malhotra",
      email: "rohan@basekraft.in",
      phone: "+91 98204 55120",
      joiningDate: "15 May 2026",
      role: "Project Director",
      permissions: ["Can change project stage", "Approve POs", "Site Snag Sign-off"],
      status: "Active",
    },
    {
      id: "u-3",
      name: "Ananya Deshmukh",
      email: "ananya@basekraft.in",
      phone: "+91 99301 77812",
      joiningDate: "01 Jun 2026",
      role: "Lead Architect & Designer",
      permissions: ["Moodboard", "3D Concepts", "Drawings"],
      status: "Active",
    },
    {
      id: "u-4",
      name: "Vikram Mehta",
      email: "vikram@basekraft.in",
      phone: "+91 98114 99014",
      joiningDate: "10 Jun 2026",
      role: "Solar EPC Lead Engineer",
      permissions: ["Solar Net-Metering", "DISCOM Filings", "Site Inverters"],
      status: "Active",
    },
    {
      id: "u-5",
      name: "Pooja Hegde",
      email: "pooja@basekraft.in",
      phone: "+91 98402 33419",
      joiningDate: "20 Jun 2026",
      role: "Procurement & Cost Estimator",
      permissions: ["PO Issuance", "Vendor Ledger", "Item Master"],
      status: "Active",
    },
    {
      id: "u-6",
      name: "Amit Verma",
      email: "amit@basekraft.in",
      phone: "+91 97110 88204",
      joiningDate: "01 Jul 2026",
      role: "Site Supervisor",
      permissions: ["Daily Logs", "Labor Attendance", "Snagging"],
      status: "Active",
    },
    {
      id: "u-7",
      name: "Neha Sundaram",
      email: "neha@basekraft.in",
      phone: "+91 98221 66509",
      joiningDate: "15 Jul 2026",
      role: "Client Relations Manager",
      permissions: ["Client Handover", "Reviews", "Portal Support"],
      status: "Active",
    },
  ]);

  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Studio Settings & Master Controls
          </h1>
          <p className="text-xs text-zinc-500">
            Workspace configuration, seat allocations, multi-sector master catalogs, and access permissions
          </p>
        </div>

        {/* Mobile & Responsive Dropdown Selector (< md) */}
        <div className="md:hidden w-full pt-1">
          <label className="text-[11px] font-medium text-zinc-500 block mb-1">Select Settings Page</label>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as SettingsTab)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 appearance-none pr-8 focus:outline-none"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Settings Layout with Compact Sub-Nav Rail */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Sub-Nav Rail (Clean, compact width without blank space) */}
        <div className="hidden md:block w-52 lg:w-56 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 space-y-2 sticky top-20 shadow-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          {/* Navigation Items */}
          <div className="space-y-0.5 pt-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-2.5 py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-semibold shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-zinc-950 dark:text-zinc-100" : "text-zinc-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Panel - Expansive & Clean */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* TAB 1: Organization Details */}
          {activeTab === "organizationDetails" && (
            <div className="space-y-6">
              {/* Section 1: Company Information */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Company Information
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Legal and brand details of your organization
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingCompany(!isEditingCompany)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs cursor-pointer"
                  >
                    {isEditingCompany ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Legal Company Name</label>
                    <input
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyInfo.legalName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, legalName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Studio Name</label>
                    <input
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyInfo.studioName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, studioName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">GST Number</label>
                    <input
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyInfo.gstNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, gstNumber: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">PAN Number</label>
                    <input
                      type="text"
                      disabled={!isEditingCompany}
                      placeholder="Enter PAN"
                      value={companyInfo.panNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, panNumber: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                </div>

                {/* Logos Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Company Logo</label>
                    <div className="h-28 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
                      <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center font-bold text-sm tracking-wider mb-1.5">
                        BK
                      </div>
                      <span className="text-[11px] text-zinc-500">Basekraft Primary Vector</span>
                      {isEditingCompany && (
                        <button className="mt-1 text-[10px] text-zinc-900 dark:text-zinc-100 underline hover:no-underline">
                          Change file
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      Thumbnail Logo <span className="text-[10px] text-zinc-400">(shown in nav rail — square, min 100×100px)</span>
                    </label>
                    <div className="h-28 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
                      <div className="w-10 h-10 rounded-md bg-zinc-900 text-white flex items-center justify-center font-semibold text-xs border border-zinc-700 mb-1.5">
                        BK
                      </div>
                      <span className="text-[11px] text-zinc-500">120 × 120 px Icon</span>
                      {isEditingCompany && (
                        <button className="mt-1 text-[10px] text-zinc-900 dark:text-zinc-100 underline hover:no-underline">
                          Upload new
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Company Address */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Company Address
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Official registered business address for invoicing and dispatch notes
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs cursor-pointer"
                  >
                    {isEditingAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Address Line 1</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.line1}
                      onChange={(e) => setAddressInfo({ ...addressInfo, line1: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Address Line 2</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.line2}
                      onChange={(e) => setAddressInfo({ ...addressInfo, line2: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">City</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.city}
                      onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">State</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.state}
                      onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">PIN Code</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.pincode}
                      onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Country</label>
                    <input
                      type="text"
                      disabled={!isEditingAddress}
                      value={addressInfo.country}
                      onChange={(e) => setAddressInfo({ ...addressInfo, country: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Statutory & Banking Details */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Bank & Settlement Account
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Client payment receivables, vendor escrow RTGS/NEFT, and UPI settlement
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingBank(!isEditingBank)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs cursor-pointer"
                  >
                    {isEditingBank ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Bank Name</label>
                    <input
                      type="text"
                      disabled={!isEditingBank}
                      value={bankInfo.bankName}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Account Number</label>
                    <input
                      type="text"
                      disabled={!isEditingBank}
                      value={bankInfo.accountNumber}
                      onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">IFSC Code</label>
                    <input
                      type="text"
                      disabled={!isEditingBank}
                      value={bankInfo.ifscCode}
                      onChange={(e) => setBankInfo({ ...bankInfo, ifscCode: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">MSME / Udyam Reg. No.</label>
                    <input
                      type="text"
                      disabled={!isEditingBank}
                      value={bankInfo.udyamNumber}
                      onChange={(e) => setBankInfo({ ...bankInfo, udyamNumber: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Official Quotation Letterhead & Proposal Template */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <span>Quotation Letterhead & Commercial Proposal Template</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-mono font-bold">
                        Live on /quotes
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Customize how client proposals, BOQ printouts, bank details, and digital signatures appear on official documents
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/quotes"
                      className="px-2.5 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs flex items-center gap-1"
                    >
                      <span>Preview on Quotes</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (isEditingLetterhead) {
                          saveLetterheadConfig(letterheadConfig);
                          setLetterheadSavedToast(true);
                          setTimeout(() => setLetterheadSavedToast(false), 3000);
                        }
                        setIsEditingLetterhead(!isEditingLetterhead);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-md transition shadow-xs cursor-pointer"
                    >
                      {isEditingLetterhead ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Save Letterhead</span>
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Letterhead</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {letterheadSavedToast && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-md text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Company Letterhead & Proposal Template updated successfully! All quotations and PDF printouts now use this branding.</span>
                  </div>
                )}

                {/* Letterhead Mode Switcher & PDF Upload Option */}
                <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        Proposal Letterhead Mode
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        Choose whether the system generates your letterhead, overlays your uploaded PDF stationery, or prints for pre-printed physical paper
                      </p>
                    </div>

                    {/* 3 Modes - Fully interactive 1-click switcher */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLetterheadModeChange("digital")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                          letterheadConfig.letterheadMode === "digital"
                            ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                            : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        Digital Letterhead
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLetterheadModeChange("uploadedPdf")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                          letterheadConfig.letterheadMode === "uploadedPdf"
                            ? "bg-blue-600 text-white font-semibold shadow-xs"
                            : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Upload Custom PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLetterheadModeChange("prePrinted")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                          letterheadConfig.letterheadMode === "prePrinted"
                            ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                            : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        Pre-Printed Paper
                      </button>
                    </div>
                  </div>

                  {/* UPLOAD PDF SECTION */}
                  {letterheadConfig.letterheadMode === "uploadedPdf" && (
                    <div className="p-3.5 rounded-md bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                              <span>{letterheadConfig.uploadedPdfName || "Upload Official Letterhead (PDF / PNG / JPG)"}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-mono">
                                PDF Stationery
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500">
                              Upload your company&apos;s official A4 letterhead graphic. The quote table and totals will overlay cleanly onto this template.
                            </p>
                          </div>
                        </div>

                        {/* Always accessible upload & replace buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded cursor-pointer transition shadow-xs text-center flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{letterheadConfig.uploadedPdfName ? "Replace PDF / Image" : "Choose PDF / Image"}</span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg"
                              className="hidden"
                              onChange={handleLetterheadFileUpload}
                            />
                          </label>
                          {letterheadConfig.uploadedPdfName && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated: CompanyLetterheadConfig = {
                                  ...letterheadConfig,
                                  uploadedPdfName: undefined,
                                  uploadedPdfUrl: undefined,
                                  letterheadMode: "digital",
                                };
                                setLetterheadConfig(updated);
                                saveLetterheadConfig(updated);
                                setLetterheadSavedToast(true);
                                setTimeout(() => setLetterheadSavedToast(false), 2500);
                              }}
                              className="p-1.5 text-xs text-zinc-500 hover:text-red-600 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                              title="Remove custom template and revert to Digital"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Margin adjustments for custom template */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blue-200/60 dark:border-blue-900/30 text-xs">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                            Header Top Clearance Margin (mm)
                          </label>
                          <input
                            type="number"
                            value={letterheadConfig.topMarginMm || 42}
                            onChange={(e) => handleLetterheadMarginChange("topMarginMm", Number(e.target.value))}
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                            Footer Bottom Clearance Margin (mm)
                          </label>
                          <input
                            type="number"
                            value={letterheadConfig.bottomMarginMm || 28}
                            onChange={(e) => handleLetterheadMarginChange("bottomMarginMm", Number(e.target.value))}
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PRE-PRINTED PHYSICAL PAPER NOTICE */}
                  {letterheadConfig.letterheadMode === "prePrinted" && (
                    <div className="p-3.5 rounded-md bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs space-y-2">
                      <div className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>Pre-Printed Stationery Offset Mode Active</span>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400">
                        When printing or saving quotes, digital headers/footers will be suppressed. The proposal table will start with a {letterheadConfig.topMarginMm || 42}mm top clearance to align onto your pre-printed stationery.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <label className="text-[11px] font-medium text-amber-900 dark:text-amber-200">
                          Pre-Printed Top Clearance Margin (mm):
                        </label>
                        <input
                          type="number"
                          value={letterheadConfig.topMarginMm || 42}
                          onChange={(e) => handleLetterheadMarginChange("topMarginMm", Number(e.target.value))}
                          className="w-24 bg-white dark:bg-zinc-900 border border-amber-300 dark:border-amber-800 rounded px-2.5 py-1 text-xs font-mono focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Studio Brand Header</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.studioBrand}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, studioBrand: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Tagline / Subheading</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.tagline}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, tagline: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">CIN / Corporate Registration</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.cin}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, cin: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Official Contact Email</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.email}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, email: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Official Contact Phone</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.phone}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, phone: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Website URL</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.website}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, website: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Bank Name</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.bankName}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, bankName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Account Beneficiary Name</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.accountName}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, accountName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Account Number</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.accountNumber}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, accountNumber: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">IFSC Code</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.ifscCode}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, ifscCode: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Direct Settlement UPI ID</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.upiId}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, upiId: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Bank Branch</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.branch}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, branch: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Authorized Signatory Name</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.signatoryName}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, signatoryName: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-zinc-600 dark:text-zinc-400 font-medium">Authorized Signatory Official Title</label>
                    <input
                      type="text"
                      disabled={!isEditingLetterhead}
                      value={letterheadConfig.signatoryTitle}
                      onChange={(e) => setLetterheadConfig({ ...letterheadConfig, signatoryTitle: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Standard Terms & Conditions Clause List */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <label className="text-zinc-700 dark:text-zinc-300 font-medium text-xs block">
                    Commercial Proposal Terms & Payment Clauses (Displayed on Letterhead)
                  </label>
                  <div className="space-y-2">
                    {letterheadConfig.termsAndConditions.map((clause, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-mono text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          disabled={!isEditingLetterhead}
                          value={clause}
                          onChange={(e) => {
                            const updated = [...letterheadConfig.termsAndConditions];
                            updated[idx] = e.target.value;
                            setLetterheadConfig({ ...letterheadConfig, termsAndConditions: updated });
                          }}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 disabled:opacity-85 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Subscription (Matching ProjectStudio subscription structure) */}
          {activeTab === "subscription" && (
            <div className="space-y-6">
              {/* Top 6 KPI Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">Subscription Type</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 mt-1 block">Per Seats</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">Start Date</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">May 01, 2026</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">End Date</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">May 01, 2027</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">Days Left</span>
                  <span className="font-bold text-emerald-600 mt-1 block font-mono">224 Days</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">Total Seats</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 mt-1 block font-mono">9 Seats</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xs">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">Seats Used</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 mt-1 block font-mono">7 Seats</span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between shadow-xs">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Need Additional Team Access?</h4>
                  <p className="text-xs text-zinc-500">Expand concurrent project directors, site supervisors, and 3D visualizers</p>
                </div>
                <button
                  onClick={() => alert("Initiating seat expansion checkout...")}
                  className="px-3.5 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold rounded-md shadow-xs hover:opacity-90"
                >
                  Buy More Seats
                </button>
              </div>

              {/* Consumed Projects Section (Exact Match) */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Consumed Projects (4 Active)
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Unlimited Multi-Sector Quota</span>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-md overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                      <tr>
                        <th className="p-2.5">Project Code</th>
                        <th className="p-2.5">Project Name</th>
                        <th className="p-2.5">Sector</th>
                        <th className="p-2.5">Activation Date</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      <tr>
                        <td className="p-2.5 font-mono font-bold">P-438</td>
                        <td className="p-2.5 font-medium">Oberoi Forest Villa</td>
                        <td className="p-2.5 text-zinc-500">Interior Design</td>
                        <td className="p-2.5 font-mono text-zinc-500">01 May 2026</td>
                        <td className="p-2.5 text-right"><span className="text-emerald-600 font-medium">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold">P-619</td>
                        <td className="p-2.5 font-medium">The Skydeck Penthouse</td>
                        <td className="p-2.5 text-zinc-500">Solar EPC</td>
                        <td className="p-2.5 font-mono text-zinc-500">12 May 2026</td>
                        <td className="p-2.5 text-right"><span className="text-emerald-600 font-medium">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold">P-593</td>
                        <td className="p-2.5 font-medium">Mittal Luxury Residence</td>
                        <td className="p-2.5 text-zinc-500">Modular Furniture</td>
                        <td className="p-2.5 font-mono text-zinc-500">04 Jun 2026</td>
                        <td className="p-2.5 text-right"><span className="text-emerald-600 font-medium">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Payment History & Tax Invoices
                </h3>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono">₹57,000.00 SUCCESS</span>
                    <p className="text-zinc-500 text-[11px]">Billed for 6 Seats Renewal on May 1, 2026 • Invoice #INV-2026-904</p>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-100">
                    <Download className="w-3 h-3" /> Download GST Invoice
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Item Master (Exact Match with ProjectStudio) */}
          {activeTab === "itemMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Item Master Catalog
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Reusable item definitions, standard billing vs. purchase rates, UOM, and GST brackets
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Exporting Item Master Excel sheet...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Export Excel</span>
                  </button>
                  <button
                    onClick={() => alert("Opening Add Item modal...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold hover:opacity-90 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Data Table with Column Search Filters */}
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                    <tr>
                      <th className="p-2.5">Created On</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-right">Client Rate</th>
                      <th className="p-2.5 text-right">Purchase Rate</th>
                      <th className="p-2.5 text-center">UOM</th>
                      <th className="p-2.5 text-center">GST</th>
                      <th className="p-2.5">Tag</th>
                      <th className="p-2.5 text-center w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {itemMasterList.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5 font-mono text-[11px] text-zinc-500">{item.createdOn}</td>
                        <td className="p-2.5 font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</td>
                        <td className="p-2.5 text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{item.description}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-zinc-900 dark:text-zinc-100">
                          ₹{item.clientRate.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2.5 text-right font-mono text-zinc-500">
                          ₹{item.purchaseRate.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono">
                            {item.uom}
                          </span>
                        </td>
                        <td className="p-2.5 text-center font-mono text-emerald-600">{item.gst}%</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {item.tag}
                          </span>
                        </td>
                        <td className="p-2.5 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-zinc-400">
                            <button className="hover:text-zinc-900 dark:hover:text-zinc-100"><Pencil className="w-3 h-3" /></button>
                            <button className="hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                <span>Showing 5 of 5 items</span>
                <span className="font-mono">Page 1 of 1</span>
              </div>
            </div>
          )}

          {/* TAB 4: Materials Master (Sub-tabs: All Materials | Rate Contracts) */}
          {activeTab === "materialsMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                {/* Sub-tab switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMaterialsSubTab("all")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      materialsSubTab === "all"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    All Materials
                  </button>
                  <button
                    onClick={() => setMaterialsSubTab("rateContracts")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      materialsSubTab === "rateContracts"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Rate Contracts
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Exporting Materials Excel...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Export Excel</span>
                  </button>
                  <button
                    onClick={() => alert("Add Material...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Material</span>
                  </button>
                </div>
              </div>

              {materialsSubTab === "all" ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">CenturyPly Club Prime 710</span>
                        <span className="font-mono font-bold text-emerald-600">₹142 / SqFt</span>
                      </div>
                      <p className="text-zinc-500 text-[11px]">BWP Marine plywood with firewall & viro-kill protection</p>
                      <span className="text-[10px] text-zinc-400 font-mono">GST: 18% • UOM: SQFT</span>
                    </div>

                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Hafele Metalla 3-Way Hinge</span>
                        <span className="font-mono font-bold text-emerald-600">₹245 / Pair</span>
                      </div>
                      <p className="text-zinc-500 text-[11px]">Soft-close clip-on hydraulic concealed cabinet hinges</p>
                      <span className="text-[10px] text-zinc-400 font-mono">GST: 18% • UOM: Set</span>
                    </div>

                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Waaree 550W Bifacial Panel</span>
                        <span className="font-mono font-bold text-emerald-600">₹18,500 / Piece</span>
                      </div>
                      <p className="text-zinc-500 text-[11px]">144-cell TopCon high-yield solar PV modules</p>
                      <span className="text-[10px] text-zinc-400 font-mono">GST: 12% • UOM: Nos</span>
                    </div>

                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">UltraTech M25 RMC Concrete</span>
                        <span className="font-mono font-bold text-emerald-600">₹4,850 / Cu.M</span>
                      </div>
                      <p className="text-zinc-500 text-[11px]">Design mix ready concrete with slump certification</p>
                      <span className="text-[10px] text-zinc-400 font-mono">GST: 18% • UOM: Cu.M</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs space-y-2">
                  <div className="flex justify-between items-center font-medium text-zinc-900 dark:text-zinc-100">
                    <span>Hafele India Annual Rate Agreement (FY 26-27)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Active Contract</span>
                  </div>
                  <p className="text-zinc-500 text-[11px]">Guaranteed 38% distributor discount on all architectural fittings & drawer runners across NCR projects.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Checklist Master (ProjectStudio reference) */}
          {activeTab === "checklistMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Checklist Master
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Standardized design deliverables, site execution milestones, and handover inspection audits
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Create Design Checklist...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Design Checklist</span>
                  </button>
                  <button
                    onClick={() => alert("Add Handover Checklist...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Handover Checklist</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Design Deliverables Master</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-600 border border-blue-500/20 font-medium">
                        Design
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">8 Checkpoints • Moodboard, 2D Cad layout, 3D photorealistic concepts, MEP schematic, Structural sign-off</p>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200">
                    Edit Checklist
                  </button>
                </div>

                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Final Turnkey Handover Checklist</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">
                        Handover
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">10 Checkpoints • Touch-up paint inspection, soft-close calibration, plumbing pressure test, deep cleaning sign-off</p>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200">
                    Edit Checklist
                  </button>
                </div>

                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Solar Net-Metering & DISCOM Commissioning</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/20 font-medium">
                        Solar EPC
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">6 Checkpoints • Earthing resistance test &lt; 5Ω, inverter anti-islanding test, bidirectional net meter installation</p>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200">
                    Edit Checklist
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Manpower (Exact Match with ProjectStudio roles) */}
          {activeTab === "manpower" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Manpower & Trade Roles
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Designated site trade categories, quality inspectors, safety officers, and standard wage benchmarks
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Importing Manpower Excel...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Import Excel</span>
                  </button>
                  <button
                    onClick={() => alert("Add Manpower...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Manpower</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                    <tr>
                      <th className="p-2.5">Trade / Role Name</th>
                      <th className="p-2.5">Specialization</th>
                      <th className="p-2.5 text-center">Active Crew</th>
                      <th className="p-2.5 text-right">Standard Daily Wage</th>
                      <th className="p-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {manpowerRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <HardHat className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{role.name}</span>
                        </td>
                        <td className="p-2.5 text-zinc-500">{role.trade}</td>
                        <td className="p-2.5 text-center font-mono">{role.count} Workers</td>
                        <td className="p-2.5 text-right font-mono font-bold text-zinc-900 dark:text-zinc-100">
                          ₹{role.dailyWage.toLocaleString("en-IN")} / day
                        </td>
                        <td className="p-2.5 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold">
                            {role.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: Vendors (Exact Match with ProjectStudio vendors tabs & fields) */}
          {activeTab === "vendors" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                {/* Vendor Sub-tabs */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVendorSubTab("all")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      vendorSubTab === "all"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    All ({vendorsList.length})
                  </button>
                  <button
                    onClick={() => setVendorSubTab("active")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      vendorSubTab === "active"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Active ({vendorsList.filter((v) => v.status === "Active").length})
                  </button>
                  <button
                    onClick={() => setVendorSubTab("inactive")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      vendorSubTab === "inactive"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Inactive (0)
                  </button>
                  <button
                    onClick={() => setVendorSubTab("blacklist")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      vendorSubTab === "blacklist"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Blacklist (0)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Exporting Vendor database...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Export Excel</span>
                  </button>
                  <button
                    onClick={() => alert("Add Vendor onboarding...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Vendor</span>
                  </button>
                </div>
              </div>

              {/* Vendors Table */}
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left min-w-[750px]">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                    <tr>
                      <th className="p-2.5">Vendor Code</th>
                      <th className="p-2.5">Display Name & Legal Name</th>
                      <th className="p-2.5">GST & PAN</th>
                      <th className="p-2.5">Phone & City</th>
                      <th className="p-2.5">Vendor Type</th>
                      <th className="p-2.5 text-right">Outstanding</th>
                      <th className="p-2.5 text-center">Status</th>
                      <th className="p-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {vendorsList.map((v) => (
                      <tr key={v.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5 font-mono font-bold text-zinc-900 dark:text-zinc-100">{v.code}</td>
                        <td className="p-2.5">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">{v.displayName}</span>
                          <span className="text-[11px] text-zinc-500">{v.legalName}</span>
                        </td>
                        <td className="p-2.5 font-mono text-[11px]">
                          <div>GST: {v.gst}</div>
                          <div className="text-zinc-500">PAN: {v.pan}</div>
                        </td>
                        <td className="p-2.5 text-zinc-600 dark:text-zinc-400">
                          <div>{v.phone}</div>
                          <span className="text-[11px] text-zinc-500">{v.city}</span>
                        </td>
                        <td className="p-2.5 text-zinc-600 dark:text-zinc-400">{v.type}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-600">{v.outstanding}</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold">
                            {v.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => alert(`View details for ${v.displayName}`)}
                            className="text-[11px] px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-zinc-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: Users (Exact Match with ProjectStudio users tabs & fields) */}
          {activeTab === "users" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                {/* Sub-tabs: Internal Users | Clients | Vendors */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserSubTab("internal")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      userSubTab === "internal"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Internal Users ({usersList.length})
                  </button>
                  <button
                    onClick={() => setUserSubTab("clients")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      userSubTab === "clients"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Clients (0)
                  </button>
                  <button
                    onClick={() => setUserSubTab("vendors")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      userSubTab === "vendors"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    Vendors (0)
                  </button>
                </div>

                <button
                  onClick={() => alert("Add User / Invite Team Member modal...")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add User</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                    <tr>
                      <th className="p-2.5">Name & Email</th>
                      <th className="p-2.5">Phone Number</th>
                      <th className="p-2.5">Joining Date</th>
                      <th className="p-2.5">Role</th>
                      <th className="p-2.5">Groups & Permissions</th>
                      <th className="p-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5">
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">{u.name}</div>
                          <span className="text-[11px] text-zinc-500">{u.email}</span>
                        </td>
                        <td className="p-2.5 font-mono text-zinc-600 dark:text-zinc-400">{u.phone}</td>
                        <td className="p-2.5 font-mono text-zinc-500 text-[11px]">{u.joiningDate}</td>
                        <td className="p-2.5">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{u.role}</span>
                        </td>
                        <td className="p-2.5">
                          <div className="flex flex-wrap gap-1">
                            {u.permissions.map((p, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-2.5 text-right">
                          <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-1">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: Listing Page */}
          {activeTab === "listingPage" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Public Listing Profile
                </h3>
                <p className="text-xs text-zinc-500">
                  Your public turnkey studio showcase page visible to potential clients
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-zinc-600 dark:text-zinc-400 font-medium">Public Studio URL</label>
                  <div className="flex items-center">
                    <span className="bg-zinc-100 dark:bg-zinc-800 border border-r-0 border-zinc-200 dark:border-zinc-700 px-3 py-2 rounded-l-md text-zinc-500 font-mono">
                      basekraft.in/studio/
                    </span>
                    <input
                      type="text"
                      defaultValue="basekraft-infra"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-r-md px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-600 dark:text-zinc-400 font-medium">Studio Bio & Tagline</label>
                  <textarea
                    rows={3}
                    defaultValue="Turnkey Architectural Fit-Outs, Rooftop Solar EPC, and Factory Modular Millwork in Delhi-NCR & Mumbai."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: AI Pro Credit */}
          {activeTab === "aiProCredit" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    AI Pro Credits & Generation Quota
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Used for automated CAD BOQ parsing, solar shadow raytracing, and concept rendering
                  </p>
                </div>
                <button
                  onClick={() => alert("Purchasing additional compute credits...")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold hover:opacity-90"
                >
                  <Plus className="w-3.5 h-3.5" /> Buy Credits
                </button>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">4,850</div>
                  <div className="text-xs text-zinc-500">Available compute credits this billing cycle</div>
                </div>
                <div className="text-right text-xs text-zinc-400 font-mono">5,000 Total Allocation</div>
              </div>
            </div>
          )}

          {/* TAB 11: Moodboard */}
          {activeTab === "moodboard" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Concept Moodboards & Material Swatches
                </h3>
                <p className="text-xs text-zinc-500">
                  Digital finish swatches, veneer cuts, tile textures, and client palettes
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="aspect-square bg-zinc-900 rounded-md border border-zinc-800 p-3 flex flex-col justify-end text-white">
                  <span className="text-xs font-semibold">B&W Minimal</span>
                  <span className="text-[10px] text-zinc-400">Architectural Slate</span>
                </div>
                <div className="aspect-square bg-stone-100 dark:bg-stone-900 rounded-md border border-zinc-200 dark:border-zinc-800 p-3 flex flex-col justify-end text-zinc-900 dark:text-zinc-100">
                  <span className="text-xs font-semibold">Travertine Beige</span>
                  <span className="text-[10px] text-zinc-500">Italian Marble</span>
                </div>
                <div className="aspect-square bg-amber-950/20 rounded-md border border-amber-900/30 p-3 flex flex-col justify-end text-amber-900 dark:text-amber-200">
                  <span className="text-xs font-semibold">Smoked Oak</span>
                  <span className="text-[10px] text-amber-700/60 dark:text-amber-400">Natural Veneer</span>
                </div>
                <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 p-3 flex flex-col items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[11px] font-medium">New Swatch</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: Activity */}
          {activeTab === "activity" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Studio Activity & Audit Trail
                </h3>
                <p className="text-xs text-zinc-500">
                  Immutable security log of financial, project, and procurement actions
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-zinc-200">Ar. Aman Katyar updated BOQ P-619/Q-101-V2 total</span>
                  <span className="text-[10px] text-zinc-400">12 mins ago</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-zinc-200">Rohan Malhotra issued PO-901 for CenturyPly BWP</span>
                  <span className="text-[10px] text-zinc-400">1 hour ago</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-zinc-200">Payment Request PR-204 approved by Studio Admin</span>
                  <span className="text-[10px] text-zinc-400">3 hours ago</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: Permissions */}
          {activeTab === "permissions" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Role-Based Access Control (RBAC)
                </h3>
                <p className="text-xs text-zinc-500">
                  Define read/write privileges for BOQ margins, bank ledgers, and site approvals
                </p>
              </div>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    <tr>
                      <th className="p-2.5 font-medium">Role</th>
                      <th className="p-2.5 font-medium text-center">View BOQ Margins</th>
                      <th className="p-2.5 font-medium text-center">Approve POs</th>
                      <th className="p-2.5 font-medium text-center">Bank Ledger</th>
                      <th className="p-2.5 font-medium text-center">Site Snag Sign-off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
                    <tr>
                      <td className="p-2.5 font-semibold">Studio Admin</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Project Director</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-2.5 text-center text-zinc-300 dark:text-zinc-700">—</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Site Engineer</td>
                      <td className="p-2.5 text-center text-zinc-300 dark:text-zinc-700">—</td>
                      <td className="p-2.5 text-center text-zinc-300 dark:text-zinc-700">—</td>
                      <td className="p-2.5 text-center text-zinc-300 dark:text-zinc-700">—</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 14: Configuration */}
          {activeTab === "configuration" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Studio Configuration & Defaults
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Project numbering series, billing margins, working hours, and milestone brackets
                  </p>
                </div>
                <button
                  onClick={() => alert("Configuration settings saved successfully!")}
                  className="px-3.5 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Save Configuration
                </button>
              </div>

              {/* Grid 1: Project Numbering & Financials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-700 dark:text-zinc-300">Project Code Prefix</label>
                  <input
                    type="text"
                    defaultValue="P-"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100"
                  />
                  <span className="text-[10px] text-zinc-400">Generates P-101, P-438, P-619</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-700 dark:text-zinc-300">Default BOQ Markup Margin (%)</label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100"
                  />
                  <span className="text-[10px] text-zinc-400">Applied automatically to item costs</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-700 dark:text-zinc-300">Service GST Bracket (%)</label>
                  <input
                    type="number"
                    defaultValue="18"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100"
                  />
                  <span className="text-[10px] text-zinc-400">Architectural & Fit-out standard</span>
                </div>
              </div>

              {/* Grid 2: Working Shifts & Operations */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-3 text-xs">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Working Calendar & Studio Shifts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500">Working Days</label>
                    <input
                      type="text"
                      defaultValue="Monday – Saturday"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500">Standard Studio Hours</label>
                    <input
                      type="text"
                      defaultValue="09:30 AM – 06:30 PM"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500">Overtime Rate Multiplier</label>
                    <input
                      type="text"
                      defaultValue="1.5× Normal Wage"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 3: Turnkey Payment Schedule Defaults */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-3 text-xs">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Turnkey Milestone Billing Defaults</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-400 font-sans block">Phase 1: Advance Sign-off</span>
                    <strong className="text-sm text-zinc-900 dark:text-zinc-100">20%</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-400 font-sans block">Phase 2: Civil / Structure</span>
                    <strong className="text-sm text-zinc-900 dark:text-zinc-100">35%</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-400 font-sans block">Phase 3: Millwork / Finishes</span>
                    <strong className="text-sm text-zinc-900 dark:text-zinc-100">30%</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-400 font-sans block">Phase 4: Snag Handover</span>
                    <strong className="text-sm text-zinc-900 dark:text-zinc-100">15%</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: Automation */}
          {activeTab === "automation" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Automated Workflows & Notifications
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Real-time triggers for client milestones, WhatsApp alerts, PO approvals, and inventory alerts
                  </p>
                </div>
                <button
                  onClick={() => alert("Add Custom Automation Rule modal...")}
                  className="px-3.5 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Rule
                </button>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {/* Rule 1 */}
                <div className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Client Milestone WhatsApp Notification</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Active</span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Trigger: When site supervisor signs off a milestone checklist — Auto-send client WhatsApp message with photos and progress PDF.
                    </p>
                  </div>
                  <div className="w-9 h-5 bg-zinc-950 dark:bg-zinc-100 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Daily Site Headcount & Labor WhatsApp Prompt</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Active</span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Trigger: Every morning at 09:00 AM — Sends interactive attendance checklist to on-site supervisors.
                    </p>
                  </div>
                  <div className="w-9 h-5 bg-zinc-950 dark:bg-zinc-100 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Auto-Approve POs Below ₹50,000</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Active</span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Trigger: When procurement order amount is less than or equal to ₹50,000 from pre-approved catalog vendor — Instantly mark status as Approved.
                    </p>
                  </div>
                  <div className="w-9 h-5 bg-zinc-950 dark:bg-zinc-100 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Payment Due Escalation Reminder</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Active</span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Trigger: 3 days prior to invoice due date — Auto-sends courteous reminder with UPI / Bank payment link to client.
                    </p>
                  </div>
                  <div className="w-9 h-5 bg-zinc-950 dark:bg-zinc-100 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 16: HR & Policies */}
          {activeTab === "hrPolicies" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Studio HR Policies & Site Governance
                </h3>
                <p className="text-xs text-zinc-500">
                  Annual leaves, site travel reimbursement allowances, and construction safety compliance
                </p>
              </div>

              {/* Policy Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Annual Leave Quota</span>
                  </div>
                  <p className="text-zinc-500 text-[11px]">
                    18 Paid Leaves + 8 Casual/Sick Leaves per calendar year. Maximum 10 leaves encashable upon fiscal close.
                  </p>
                </div>

                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-zinc-400" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Site Travel Allowance</span>
                  </div>
                  <p className="text-zinc-500 text-[11px]">
                    ₹14 / km for four-wheelers, ₹7 / km for two-wheelers. Outstation site visits include ₹2,500 / day per-diem allowance.
                  </p>
                </div>

                <div className="p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-zinc-400" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">PPE & Site Safety</span>
                  </div>
                  <p className="text-zinc-500 text-[11px]">
                    Mandatory ISI-marked hard hat, steel-toe shoes, and safety vest for all visiting architects and contractor staff.
                  </p>
                </div>
              </div>

              {/* Holidays Calendar 2026 */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Studio Holidays Calendar (2026)
                    </h4>
                    <span className="text-[11px] text-zinc-500 font-mono">{holidaysList.length} Gazetted Holidays</span>
                  </div>
                  <button
                    onClick={() => setIsAddHolidayModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md text-xs font-semibold hover:opacity-90 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Holiday</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Holiday Occasion</th>
                        <th className="p-2.5">Day</th>
                        <th className="p-2.5 text-right">Site Status</th>
                        <th className="p-2.5 text-center w-12">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
                      {holidaysList.map((h) => (
                        <tr key={h.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                          <td className="p-2.5 font-bold">{h.date}</td>
                          <td className="p-2.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">{h.name}</td>
                          <td className="p-2.5 font-sans text-zinc-500">{h.day}</td>
                          <td className="p-2.5 text-right">
                            <span className={`font-sans font-medium ${
                              h.siteStatus === "All Sites Closed" ? "text-red-500" : "text-amber-600"
                            }`}>
                              {h.siteStatus}
                            </span>
                          </td>
                          <td className="p-2.5 text-center">
                            <button
                              onClick={() => setHolidaysList(holidaysList.filter((item) => item.id !== h.id))}
                              title="Delete Holiday"
                              className="text-zinc-400 hover:text-red-500 transition p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Holiday Modal */}
              {isAddHolidayModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          Add New Studio Holiday
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsAddHolidayModalOpen(false)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newHolidayName) return;

                        const dateObj = new Date(newHolidayDate);
                        const formattedDate = dateObj.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                        const dayName = dateObj.toLocaleDateString("en-GB", { weekday: "long" });

                        const newEntry = {
                          id: `h-${Date.now()}`,
                          date: formattedDate,
                          name: newHolidayName,
                          day: dayName,
                          siteStatus: newHolidayStatus,
                        };

                        setHolidaysList([...holidaysList, newEntry]);
                        setNewHolidayName("");
                        setIsAddHolidayModalOpen(false);
                      }}
                      className="p-5 space-y-4 text-xs overflow-y-auto flex-1"
                    >
                      <div className="space-y-1.5">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">
                          Holiday Occasion / Festival Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Gandhi Jayanti, Eid-ul-Fitr, Christmas"
                          value={newHolidayName}
                          onChange={(e) => setNewHolidayName(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">
                          Holiday Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={newHolidayDate}
                          onChange={(e) => setNewHolidayDate(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">
                          Site & Office Status *
                        </label>
                        <select
                          value={newHolidayStatus}
                          onChange={(e) => setNewHolidayStatus(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                        >
                          <option value="All Sites Closed">All Sites Closed (Gazetted Holiday)</option>
                          <option value="Optional Half Day">Optional Half Day (Restricted Holiday)</option>
                          <option value="Work Allowed with Double Wage">Work Allowed with Double Wage</option>
                        </select>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddHolidayModalOpen(false)}
                          className="px-3.5 py-2 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Add to Calendar</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 17: Integrations */}
          {activeTab === "integrations" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-5">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Connected Integrations & Cloud Services
                </h3>
                <p className="text-xs text-zinc-500">
                  Connect third-party accounting, payment gateways, WhatsApp notifications, and CAD sync
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Integration 1: WhatsApp */}
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                          WA
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">WhatsApp Business Cloud API</div>
                          <span className="text-[11px] text-zinc-500">
                            {whatsappConfig.isConnected ? `Sender: ${whatsappConfig.senderPhone}` : "Not Configured"}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        whatsappConfig.isConnected
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}>
                        {whatsappConfig.isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Sends automated milestone photos, invoice reminders, and PDF proposal links directly to client WhatsApp numbers.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setWaTestFeedback(null);
                        setIsWhatsAppModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{whatsappConfig.isConnected ? "Configure WhatsApp" : "Connect WhatsApp"}</span>
                    </button>
                  </div>
                </div>

                {/* Integration 2: Tally / Zoho */}
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                          TL
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">Tally Prime / Zoho Books</div>
                          <span className="text-[11px] text-zinc-500">ERP Accounting Bridge</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                        Sync Active
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Two-way synchronization for purchase orders, vendor invoices, GST e-way bills, and bank ledger reconciliations.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => alert("Tally Prime XML port 9000 connector is running.")}
                      className="px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium"
                    >
                      Manage Sync
                    </button>
                  </div>
                </div>

                {/* Integration 3: Razorpay */}
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                          RZ
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">Razorpay Payment Gateway</div>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            {razorpayConfig.isConnected ? `MID: ${razorpayConfig.keyId} (${razorpayConfig.mode.toUpperCase()})` : "Not Configured"}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        razorpayConfig.isConnected
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}>
                        {razorpayConfig.isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Enables instant UPI QR codes and netbanking escrow payment links inside client quotation portals.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setRzpTestFeedback(null);
                        setIsRazorpayModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{razorpayConfig.isConnected ? "Configure Razorpay" : "Connect Razorpay"}</span>
                    </button>
                  </div>
                </div>

                {/* Integration 4: CAD */}
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
                          CAD
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">AutoCAD & Revit BIM Link</div>
                          <span className="text-[11px] text-zinc-500">Direct Drawing Extractor</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                        Installed
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">
                      Extracts room carpet areas, wall perimeter running feet, and false ceiling cutouts straight into BOQ line items.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => alert("AutoCAD / Revit plugin sync active for DWG & RVT models.")}
                      className="px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium"
                    >
                      Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* MODAL 1: WhatsApp Connection Flow */}
              {isWhatsAppModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                          WA
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Connect WhatsApp Business Cloud API
                          </h3>
                          <p className="text-[11px] text-zinc-500">Meta for Developers Graph API credentials</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsWhatsAppModalOpen(false)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setWhatsappConfig({ ...whatsappConfig, isConnected: true });
                        setIsWhatsAppModalOpen(false);
                      }}
                      className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1"
                    >
                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">
                          Registered WhatsApp Sender Phone *
                        </label>
                        <input
                          type="text"
                          required
                          value={whatsappConfig.senderPhone}
                          onChange={(e) => setWhatsappConfig({ ...whatsappConfig, senderPhone: e.target.value })}
                          placeholder="+91 98101 22345"
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-medium text-zinc-700 dark:text-zinc-300">Phone Number ID *</label>
                          <input
                            type="text"
                            required
                            value={whatsappConfig.phoneNumberId}
                            onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumberId: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-medium text-zinc-700 dark:text-zinc-300">WABA Account ID *</label>
                          <input
                            type="text"
                            required
                            value={whatsappConfig.wabaId}
                            onChange={(e) => setWhatsappConfig({ ...whatsappConfig, wabaId: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">
                          Meta Permanent Access Token *
                        </label>
                        <input
                          type="password"
                          required
                          value={whatsappConfig.accessToken}
                          onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accessToken: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                        />
                      </div>

                      {/* Webhook Endpoint Box */}
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded space-y-1 font-mono text-[11px]">
                        <span className="text-zinc-500 font-sans block text-[10px]">Webhook Callback URL:</span>
                        <div className="text-zinc-800 dark:text-zinc-200 select-all">
                          https://api.basekraft.in/v1/webhooks/whatsapp
                        </div>
                      </div>

                      {/* Test Connection Button */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setWaTestFeedback(`Verified! WhatsApp Ping sent successfully to ${whatsappConfig.senderPhone}`)}
                          className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-medium cursor-pointer"
                        >
                          Send Test Ping
                        </button>
                        {waTestFeedback && (
                          <span className="text-emerald-600 font-medium text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> {waTestFeedback}
                          </span>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        {whatsappConfig.isConnected ? (
                          <button
                            type="button"
                            onClick={() => {
                              setWhatsappConfig({ ...whatsappConfig, isConnected: false });
                              setIsWhatsAppModalOpen(false);
                            }}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Disconnect WhatsApp
                          </button>
                        ) : <div />}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsWhatsAppModalOpen(false)}
                            className="px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold hover:opacity-90 shadow-xs"
                          >
                            Save & Connect
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* MODAL 2: Razorpay Connection Flow */}
              {isRazorpayModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-xs">
                          RZ
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Connect Razorpay Payment Gateway
                          </h3>
                          <p className="text-[11px] text-zinc-500">API keys for automated client escrow & UPI collection</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsRazorpayModalOpen(false)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setRazorpayConfig({ ...razorpayConfig, isConnected: true });
                        setIsRazorpayModalOpen(false);
                      }}
                      className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1"
                    >
                      {/* Environment Mode Switch */}
                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">Environment Mode *</label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setRazorpayConfig({ ...razorpayConfig, mode: "live", keyId: "rzp_live_Basekraft99" })}
                            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                              razorpayConfig.mode === "live"
                                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                                : "border border-zinc-200 dark:border-zinc-700 text-zinc-500"
                            }`}
                          >
                            Live Mode (Production)
                          </button>
                          <button
                            type="button"
                            onClick={() => setRazorpayConfig({ ...razorpayConfig, mode: "test", keyId: "rzp_test_BasekraftSandbox" })}
                            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                              razorpayConfig.mode === "test"
                                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                                : "border border-zinc-200 dark:border-zinc-700 text-zinc-500"
                            }`}
                          >
                            Test / Sandbox Mode
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">Key ID *</label>
                        <input
                          type="text"
                          required
                          value={razorpayConfig.keyId}
                          onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keyId: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">Key Secret *</label>
                        <input
                          type="password"
                          required
                          value={razorpayConfig.keySecret}
                          onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keySecret: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-zinc-700 dark:text-zinc-300">Merchant Business Name</label>
                        <input
                          type="text"
                          value={razorpayConfig.merchantName}
                          onChange={(e) => setRazorpayConfig({ ...razorpayConfig, merchantName: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                        />
                      </div>

                      {/* Test Connection Button */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setRzpTestFeedback(`Authentication Successful! Connected to ${razorpayConfig.keyId}`)}
                          className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-medium cursor-pointer"
                        >
                          Validate Key Pair
                        </button>
                        {rzpTestFeedback && (
                          <span className="text-emerald-600 font-medium text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> {rzpTestFeedback}
                          </span>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        {razorpayConfig.isConnected ? (
                          <button
                            type="button"
                            onClick={() => {
                              setRazorpayConfig({ ...razorpayConfig, isConnected: false });
                              setIsRazorpayModalOpen(false);
                            }}
                            className="text-red-500 hover:underline text-xs cursor-pointer"
                          >
                            Disconnect Gateway
                          </button>
                        ) : <div />}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsRazorpayModalOpen(false)}
                            className="px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold hover:opacity-90 shadow-xs cursor-pointer"
                          >
                            Save & Connect
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-xs text-zinc-400 font-mono animate-pulse">
          Loading studio settings...
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
