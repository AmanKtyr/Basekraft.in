"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Building2,
  Compass,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  UserCheck,
  ChevronRight,
  Globe,
  KeyRound,
  Crown,
  Briefcase,
  HardHat,
  Users,
} from "lucide-react";
import { useAuth, UserRole, DEMO_PROFILES } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, quickLogin } = useAuth();

  const [email, setEmail] = useState("admin@basekraft.in");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("studio_admin");
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions: {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    email: string;
    targetRoute: string;
  }[] = [
    {
      role: "superadmin",
      title: "Global Superadmin",
      description: "Platform-wide tenancy, studio subscriptions, global audit logs & feature flags",
      icon: Crown,
      badge: "Master Admin",
      email: DEMO_PROFILES.superadmin.email,
      targetRoute: "/superadmin",
    },
    {
      role: "studio_admin",
      title: "Studio Admin / Principal",
      description: "Full studio practice OS: Turnkey projects, dynamic BOQ matrix, CRM & financials",
      icon: Briefcase,
      badge: "Studio Owner",
      email: DEMO_PROFILES.studio_admin.email,
      targetRoute: "/dashboard",
    },
    {
      role: "architect",
      title: "Project Architect",
      description: "CAD drawings, site checkpoint snags, task checklists & billable timesheets",
      icon: HardHat,
      badge: "Field Ops",
      email: DEMO_PROFILES.architect.email,
      targetRoute: "/dashboard",
    },
    {
      role: "client",
      title: "Property Owner / Client",
      description: "Private live client portal: 3D render approvals, timeline & milestone payments",
      icon: Users,
      badge: "Live Portal",
      email: DEMO_PROFILES.client.email,
      targetRoute: "/client-portal/P-619",
    },
    {
      role: "contractor",
      title: "Vendor / Subcontractor",
      description: "Material purchase orders, dispatch status, invoices & payment disbursements",
      icon: Building2,
      badge: "Supplier",
      email: DEMO_PROFILES.contractor.email,
      targetRoute: "/orders",
    },
  ];

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, selectedRole);
      setIsLoading(false);
    }, 400);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const profile = DEMO_PROFILES[role];
    setEmail(profile.email);
    setPassword("••••••••••••");
  };

  const handleOneClickLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      quickLogin(role);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-white selection:text-zinc-950">
      {/* Top Bar with brand and return to website */}
      <header className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white text-zinc-950 rounded flex items-center justify-center font-bold text-xs">
            BK
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-white block">
              BASEKRAFT
            </span>
            <span className="text-[10px] text-zinc-400 font-mono block">
              Architectural Studio OS
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
      </header>

      {/* Main Login Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Quick Multi-Role Selector */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300 border border-zinc-700">
                <KeyRound className="w-3 h-3 text-zinc-400" />
                <span>Multi-Role Studio Authentication</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
                Select Your Access Role & Credentials
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Choose a role below for 1-click instant login, or inspect specific permission surfaces.
              </p>
            </div>

            {/* Role Cards List */}
            <div className="space-y-2.5">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRole === opt.role;

                return (
                  <div
                    key={opt.role}
                    onClick={() => handleRoleSelect(opt.role)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-white bg-zinc-800/90 shadow-md ring-1 ring-white/20"
                        : "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/50 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-white text-zinc-950"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {opt.title}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                          {opt.description}
                        </p>
                        <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block">
                          {opt.email}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOneClickLogin(opt.role);
                      }}
                      className="shrink-0 px-3 py-1.5 rounded bg-zinc-800 hover:bg-white hover:text-zinc-950 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>1-Click In</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Credential Sign-In Card */}
          <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-5">
              <div className="pb-4 border-b border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                  Active Session
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Sign In to Studio OS
                </h2>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Logging in as: <strong className="text-white font-mono">{DEMO_PROFILES[selectedRole].roleTitle}</strong></span>
                </div>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase text-zinc-400">
                    Studio Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-white font-mono focus:outline-none focus:border-white transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono font-bold uppercase text-zinc-400">
                      Password
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">Demo Auto-filled</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-white font-mono focus:outline-none focus:border-white transition"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <span>Enter Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Security Notice */}
            <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit Encrypted Architectural Session</span>
              </div>
              <p className="text-[10px]">
                Basekraft OS enforces multi-tenant tenant isolation and RBAC security policies.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-zinc-800 text-center text-xs text-zinc-500 font-mono">
        Basekraft Cloud Orchestrator v2.4 • Multi-tenant Security Active
      </footer>
    </div>
  );
}
