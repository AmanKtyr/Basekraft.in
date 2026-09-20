"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Crown,
  Building2,
  Users,
  IndianRupee,
  Activity,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Layers,
  Settings,
  LogIn,
  Globe,
  Sliders,
  Database,
  RefreshCw,
} from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

interface TenantStudio {
  id: string;
  name: string;
  city: string;
  country: string;
  plan: "Enterprise" | "Studio Pro" | "Solo Practice";
  seatsUsed: number;
  seatsTotal: number;
  mrrINR: number;
  storageGB: number;
  status: "Active" | "Trial" | "Suspended";
  joinedDate: string;
  leadArchitect: string;
}

interface FeatureFlag {
  id: string;
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  tier: "All" | "Studio Pro+" | "Enterprise Only";
}

export default function SuperadminDashboardPage() {
  const router = useRouter();
  const { user, quickLogin, logout } = useAuth();

  // Multi-tenant Studios
  const [tenants, setTenants] = useState<TenantStudio[]>([
    {
      id: "tenant_bk_01",
      name: "Basekraft Studio HQ",
      city: "Gurugram",
      country: "India",
      plan: "Enterprise",
      seatsUsed: 14,
      seatsTotal: 25,
      mrrINR: 39999,
      storageGB: 342,
      status: "Active",
      joinedDate: "Jan 2024",
      leadArchitect: "Aman Tyagi",
    },
    {
      id: "tenant_at_02",
      name: "Atelier Nine Architecture",
      city: "Dubai",
      country: "UAE",
      plan: "Enterprise",
      seatsUsed: 18,
      seatsTotal: 30,
      mrrINR: 49999,
      storageGB: 512,
      status: "Active",
      joinedDate: "Mar 2024",
      leadArchitect: "Tariq Mansoor",
    },
    {
      id: "tenant_sf_03",
      name: "Studio Forma Design",
      city: "London",
      country: "UK",
      plan: "Studio Pro",
      seatsUsed: 8,
      seatsTotal: 10,
      mrrINR: 16999,
      storageGB: 180,
      status: "Active",
      joinedDate: "Aug 2024",
      leadArchitect: "Eleanor Vance",
    },
    {
      id: "tenant_va_04",
      name: "Varma & Associates Turnkey",
      city: "Mumbai",
      country: "India",
      plan: "Studio Pro",
      seatsUsed: 9,
      seatsTotal: 10,
      mrrINR: 16999,
      storageGB: 210,
      status: "Active",
      joinedDate: "Nov 2024",
      leadArchitect: "Kavita Varma",
    },
    {
      id: "tenant_za_05",
      name: "Zenith Architectural Studio",
      city: "Bengaluru",
      country: "India",
      plan: "Solo Practice",
      seatsUsed: 3,
      seatsTotal: 3,
      mrrINR: 6999,
      storageGB: 45,
      status: "Trial",
      joinedDate: "Sep 2026",
      leadArchitect: "Arjun Nambiar",
    },
  ]);

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: "ff_bim",
      key: "viewer_bim_3d",
      label: "3D IFC/BIM Model Cloud Viewer",
      description: "Allows client portals and architects to orbit Revit/IFC meshes directly in browser",
      enabled: true,
      tier: "Studio Pro+",
    },
    {
      id: "ff_ai_boq",
      key: "ai_boq_estimator",
      label: "AI Parametric BOQ Generator",
      description: "Generates line-item quantities from CAD carpet area inputs and rate books",
      enabled: true,
      tier: "All",
    },
    {
      id: "ff_payouts",
      key: "instant_razorpay_disburse",
      label: "Instant Subcontractor Disbursal",
      description: "Automated escrow release to verified vendors upon milestone sign-off",
      enabled: true,
      tier: "Enterprise Only",
    },
    {
      id: "ff_whatsapp",
      key: "whatsapp_client_broadcast",
      label: "WhatsApp Snag & Progress Alerts",
      description: "Direct notifications dispatched to homeowners when daily site photos are uploaded",
      enabled: true,
      tier: "Studio Pro+",
    },
    {
      id: "ff_whitelabel",
      key: "custom_domain_cname",
      label: "Custom CNAME Studio Domains",
      description: "Allows practices to run portals on portal.theirstudio.com instead of Basekraft domain",
      enabled: false,
      tier: "Enterprise Only",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"tenants" | "features" | "audit">("tenants");

  // Telemetry KPIs
  const totalStudios = tenants.length;
  const activeSeats = tenants.reduce((acc, t) => acc + t.seatsUsed, 0);
  const totalMRR = tenants.reduce((acc, t) => acc + t.mrrINR, 0);
  const totalStorage = tenants.reduce((acc, t) => acc + t.storageGB, 0);

  const toggleTenantStatus = (id: string) => {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === "Active" ? "Suspended" : "Active";
        return { ...t, status: nextStatus };
      })
    );
  };

  const toggleFeatureFlag = (id: string) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleImpersonateTenant = (tenant: TenantStudio) => {
    // Log into studio admin view
    quickLogin("studio_admin");
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.leadArchitect.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan =
      selectedPlanFilter === "All" || t.plan === selectedPlanFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      {/* Superadmin Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white text-zinc-950 flex items-center justify-center font-black text-xs">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                BASEKRAFT CLOUD ORCHESTRATOR
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                Superadmin Master
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono block">
              Multi-Tenant Architecture Platform Control Plane
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open Studio OS</span>
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-zinc-400 hover:text-white transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Web</span>
          </Link>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-red-950 hover:text-red-300 text-xs font-semibold text-zinc-300 border border-zinc-700 transition cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* KPI Telemetry Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Managed Studio Tenants</span>
              <Building2 className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {totalStudios} Practices
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              <span>4 Global Cities (DEL, BOM, BLR, DXB)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Active Architect Seats</span>
              <Users className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {activeSeats} Seats
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              <span>Concurrent daily active users</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Aggregate Platform MRR</span>
              <IndianRupee className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div className="text-2xl font-black font-mono text-white">
              ₹{(totalMRR / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[11px] text-emerald-400 font-mono">
              <span>+18.4% Net Expansion vs Q2</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Telemetry & Uptime</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              99.98%
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              <span>{totalStorage} GB CAD & BIM Models</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("tenants")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "tenants"
                ? "bg-white text-zinc-950 shadow-xs font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Studio Tenants Directory ({tenants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "features"
                ? "bg-white text-zinc-950 shadow-xs font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Platform Feature Flags ({featureFlags.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "audit"
                ? "bg-white text-zinc-950 shadow-xs font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Security Audit Log</span>
          </button>
        </div>

        {/* TAB 1: STUDIO TENANTS DIRECTORY */}
        {activeTab === "tenants" && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search studio, city, or architect..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-900 text-white focus:outline-none focus:border-white transition"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-zinc-500 font-mono">Filter Tier:</span>
                {["All", "Enterprise", "Studio Pro", "Solo Practice"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlanFilter(p)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                      selectedPlanFilter === p
                        ? "bg-zinc-800 text-white border border-zinc-700 font-bold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenants Table */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-mono text-[10px] uppercase">
                      <th className="p-3.5">Practice Tenant</th>
                      <th className="p-3.5">Plan & Monthly Fee</th>
                      <th className="p-3.5">Active Seats</th>
                      <th className="p-3.5">Storage</th>
                      <th className="p-3.5">Tenancy Status</th>
                      <th className="p-3.5 text-right">Superadmin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {filteredTenants.map((t) => (
                      <tr key={t.id} className="hover:bg-zinc-800/40 transition">
                        <td className="p-3.5">
                          <div className="font-semibold text-white text-xs">
                            {t.name}
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">
                            {t.city}, {t.country} • Principal: {t.leadArchitect}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="font-mono text-white block">
                            ₹{t.mrrINR.toLocaleString("en-IN")}/mo
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {t.plan}
                          </span>
                        </td>

                        <td className="p-3.5 font-mono text-zinc-300">
                          {t.seatsUsed} / {t.seatsTotal} seats
                        </td>

                        <td className="p-3.5 font-mono text-zinc-400">
                          {t.storageGB} GB
                        </td>

                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              t.status === "Active"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : t.status === "Trial"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : "bg-red-950 text-red-300 border border-red-800"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                t.status === "Active"
                                  ? "bg-emerald-400"
                                  : t.status === "Trial"
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              }`}
                            />
                            <span>{t.status}</span>
                          </span>
                        </td>

                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleImpersonateTenant(t)}
                            className="px-2.5 py-1 rounded bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition cursor-pointer inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>Enter Studio OS</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => toggleTenantStatus(t.id)}
                            className="px-2.5 py-1 rounded border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs transition cursor-pointer"
                          >
                            {t.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLATFORM FEATURE FLAGS */}
        {activeTab === "features" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <h3 className="text-sm font-bold text-white">
                Global Platform Capability Toggles
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Enable or disable experimental or tier-gated features across all practice tenants in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {flag.tier}
                      </span>
                      <button
                        onClick={() => toggleFeatureFlag(flag.id)}
                        className="cursor-pointer"
                        aria-label={`Toggle ${flag.label}`}
                      >
                        {flag.enabled ? (
                          <ToggleRight className="w-7 h-7 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-7 h-7 text-zinc-600" />
                        )}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {flag.label}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {flag.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Key: {flag.key}</span>
                    <span className={flag.enabled ? "text-emerald-400" : "text-zinc-500"}>
                      {flag.enabled ? "ACTIVE GLOBALLY" : "DISABLED"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT & TELEMETRY */}
        {activeTab === "audit" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Real-Time Platform Security & Provisioning Log
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Live record of administrative access, plan migrations, and RBAC changes.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 flex items-start justify-between gap-4">
                <div>
                  <span className="text-emerald-400">[RBAC_ROLE_SWITCH]</span>{" "}
                  <span>Superadmin authenticated for multi-tenant orchestrator</span>
                </div>
                <span className="text-zinc-500 text-[10px] shrink-0">Just now</span>
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 flex items-start justify-between gap-4">
                <div>
                  <span className="text-amber-400">[FEATURE_FLAG_UPDATE]</span>{" "}
                  <span>BIM 3D Model Cloud Viewer toggled to active globally</span>
                </div>
                <span className="text-zinc-500 text-[10px] shrink-0">12 min ago</span>
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 flex items-start justify-between gap-4">
                <div>
                  <span className="text-blue-400">[TENANT_PROVISION]</span>{" "}
                  <span>Zenith Architectural Studio (BLR) initialized on Solo Practice trial</span>
                </div>
                <span className="text-zinc-500 text-[10px] shrink-0">1 hour ago</span>
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 flex items-start justify-between gap-4">
                <div>
                  <span className="text-zinc-400">[STORAGE_SYNC]</span>{" "}
                  <span>Atelier Nine Dubai uploaded 4.2 GB CAD drawing revisions</span>
                </div>
                <span className="text-zinc-500 text-[10px] shrink-0">3 hours ago</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
