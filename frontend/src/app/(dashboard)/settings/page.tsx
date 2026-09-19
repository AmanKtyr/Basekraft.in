"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  | "permissions";

interface NavItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: "subscription", label: "Subscription", icon: CreditCard, badge: "Pro" },
  { id: "organizationDetails", label: "Organization Details", icon: Building2 },
  { id: "listingPage", label: "Listing Page", icon: Globe },
  { id: "aiProCredit", label: "AI Pro Credit", icon: Sparkles, badge: "4,850" },
  { id: "itemMaster", label: "Item Master", icon: Box },
  { id: "materialsMaster", label: "Materials Master", icon: Layers },
  { id: "checklistMaster", label: "Checklist Master", icon: ClipboardCheck },
  { id: "moodboard", label: "Moodboard", icon: Palette },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "manpower", label: "Manpower", icon: HardHat },
  { id: "vendors", label: "Vendors", icon: Truck },
  { id: "users", label: "Users", icon: Users, badge: "8" },
  { id: "permissions", label: "Permissions", icon: ShieldCheck },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as SettingsTab) || "organizationDetails";
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

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
            Configure legal identity, billing, multi-sector master catalogs, and team access
          </p>
        </div>

        {/* Mobile & Responsive Dropdown Selector */}
        <div className="sm:hidden w-full">
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

      {/* Main 2-Column Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Sub-Nav Rail (ProjectStudio style) */}
        <div className="hidden md:block md:col-span-3 lg:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 space-y-2 sticky top-20 shadow-xs">
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
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-semibold shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-zinc-950 dark:text-zinc-100" : "text-zinc-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="md:col-span-9 lg:col-span-9 space-y-6">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-xs"
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
            </div>
          )}

          {/* TAB 2: Subscription */}
          {activeTab === "subscription" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Basekraft Enterprise Tier
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Billed annually (Next billing cycle: 15 October 2026)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">₹14,999 / mo</div>
                  <span className="text-[11px] text-zinc-500">15 Dedicated Seats Included</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-1">
                  <span className="text-xs text-zinc-500">Seats In Use</span>
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">8 / 15 Seats</div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-zinc-900 dark:bg-zinc-100 h-full w-[53%]" />
                  </div>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-1">
                  <span className="text-xs text-zinc-500">Multi-Sector Workspaces</span>
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">Unlimited</div>
                  <span className="text-[10px] text-zinc-400">Solar, Interiors, Civil, Furniture</span>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-1">
                  <span className="text-xs text-zinc-500">AI Estimation Tokens</span>
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">4,850 Remaining</div>
                  <span className="text-[10px] text-zinc-400">Auto-refills monthly</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Listing Page */}
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

          {/* TAB 4: AI Pro Credit */}
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
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-xs font-semibold hover:opacity-90">
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

          {/* TAB 5: Item Master */}
          {activeTab === "itemMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Item Master Catalog
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Standard rates, units, and GST slabs for multi-sector proposals
                  </p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-xs font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Add Standard Item
                </button>
              </div>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    <tr>
                      <th className="p-2.5 font-medium">Code</th>
                      <th className="p-2.5 font-medium">Item Name</th>
                      <th className="p-2.5 font-medium">Sector</th>
                      <th className="p-2.5 font-medium">Unit</th>
                      <th className="p-2.5 font-medium">Base Rate</th>
                      <th className="p-2.5 font-medium">GST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
                    <tr>
                      <td className="p-2.5 font-semibold">ITM-SL-01</td>
                      <td className="p-2.5 font-sans font-medium">550W Mono PERC Solar Panel</td>
                      <td className="p-2.5 font-sans text-zinc-500">Solar EPC</td>
                      <td className="p-2.5">Wp / Nos</td>
                      <td className="p-2.5">₹18,500</td>
                      <td className="p-2.5 text-emerald-600">12%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">ITM-WD-04</td>
                      <td className="p-2.5 font-sans font-medium">18mm Marine BWP Plywood Carcass</td>
                      <td className="p-2.5 font-sans text-zinc-500">Modular Millwork</td>
                      <td className="p-2.5">SqFt</td>
                      <td className="p-2.5">₹1,450</td>
                      <td className="p-2.5 text-emerald-600">18%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">ITM-CV-08</td>
                      <td className="p-2.5 font-sans font-medium">Gypsum False Ceiling with LED Troughs</td>
                      <td className="p-2.5 font-sans text-zinc-500">Turnkey Interior</td>
                      <td className="p-2.5">SqFt</td>
                      <td className="p-2.5">₹135</td>
                      <td className="p-2.5 text-emerald-600">18%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: Materials Master */}
          {activeTab === "materialsMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Approved Materials & Specification Brands
                </h3>
                <p className="text-xs text-zinc-500">
                  Pre-approved supplier brands and quality specs across Indian markets
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Solar Inverters & Panels</span>
                  <p className="text-zinc-500 text-[11px]">Approved: Waaree, Adani Solar, Sungrow, Growatt</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Modular Millwork & Hardware</span>
                  <p className="text-zinc-500 text-[11px]">Approved: Hafele, Hettich, CenturyPly, Greenply</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Civil & Structural Concrete</span>
                  <p className="text-zinc-500 text-[11px]">Approved: UltraTech RMC, Tata Tiscon TMT 550D</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Electrical & Switchgear</span>
                  <p className="text-zinc-500 text-[11px]">Approved: Schneider Electric, Havells, Polycab FRLS</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Checklist Master */}
          {activeTab === "checklistMaster" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Master Quality & Site Audit Checklists
                </h3>
                <p className="text-xs text-zinc-500">
                  Automated handover and milestone audit templates across project types
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">Solar Net-Metering & Grid Sync Checklist</div>
                    <span className="text-[11px] text-zinc-500">5 steps • DISCOM inspector sign-off, earthing pit resistance &lt; 5Ω</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
                    Active
                  </span>
                </div>

                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">Modular Factory QA & CNC Sizing Checklist</div>
                    <span className="text-[11px] text-zinc-500">6 steps • 2mm PVC edge banding adhesion, soft-close alignment</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
                    Active
                  </span>
                </div>

                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">Civil RCC Slab Pouring & Cube Test Audit</div>
                    <span className="text-[11px] text-zinc-500">7 steps • Slump test 120mm, rebar cover blocks, 7/14/28-day curing</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: Moodboard */}
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

          {/* TAB 9: Activity */}
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

          {/* TAB 10: Manpower */}
          {activeTab === "manpower" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Labor Contractors & Daily Wages
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Contractor masters, daily headcounts, and specialized trade rates
                  </p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-xs font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Add Contractor
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Master Carpentry Guild</span>
                  <p className="text-zinc-500 text-[11px]">Head Contractor: Suresh Sharma • Daily Wage: ₹1,100 / skilled tech</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded p-3 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Solar Electrical & MMS Gang</span>
                  <p className="text-zinc-500 text-[11px]">Head Contractor: Dinesh Yadav • Daily Wage: ₹950 / technician</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: Vendors */}
          {activeTab === "vendors" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Registered Suppliers & Vendor Directory
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Active credit accounts, GST numbers, and payment terms
                  </p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-xs font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Add Vendor
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Waaree Energies Distribution Hub</span>
                    <p className="text-zinc-500 text-[11px]">GST: 24AAACW2948K1Z3 • Credit Terms: 30 Days Net</p>
                  </div>
                  <span className="text-emerald-600 font-semibold font-mono">₹4.2L Outstanding</span>
                </div>
                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Hafele Architectural Hardware Depot</span>
                    <p className="text-zinc-500 text-[11px]">GST: 27AABCH1092Q1ZV • Credit Terms: 15 Days Net</p>
                  </div>
                  <span className="text-zinc-500 font-mono">₹0 Outstanding</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: Users */}
          {activeTab === "users" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Studio Team & Seat Allocation
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Manage active members and role access across workspaces
                  </p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-xs font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Invite Member
                </button>
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs">
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                      AK
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">Ar. Aman Katyar</div>
                      <span className="text-zinc-500 text-[11px]">aman@basekraft.in</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-semibold">
                    Studio Principal (Admin)
                  </span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center font-bold text-xs">
                      RM
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">Rohan Malhotra</div>
                      <span className="text-zinc-500 text-[11px]">rohan@basekraft.in</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium">
                    Project Director
                  </span>
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
