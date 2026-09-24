"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FolderKanban,
  Clock,
  IndianRupee,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  Globe,
  Building2,
  FileSpreadsheet,
  Download,
  Eye,
  FileCode,
  Layers,
  Sun,
  Hammer,
  HardHat,
} from "lucide-react";
import { initialProjects, mockPaymentRequests } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  IndustryType,
  INDUSTRY_DOCUMENTS,
  INDUSTRY_OPTIONS,
} from "@/utils/api";

export default function DashboardOverview() {
  const { user, role, industry, setIndustry } = useAuth();
  const currentIndustry = user.industry || industry || "INTERIOR_DESIGN";

  const totalValue = initialProjects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = initialProjects.reduce((acc, p) => acc + p.spent, 0);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Dynamic files for this company's selected industry
  const currentFiles = INDUSTRY_DOCUMENTS[currentIndustry] || INDUSTRY_DOCUMENTS.INTERIOR_DESIGN;
  const currentIndustryMeta =
    INDUSTRY_OPTIONS.find((i) => i.key === currentIndustry) || INDUSTRY_OPTIONS[0];

  const getIndustryIcon = (ind: IndustryType) => {
    switch (ind) {
      case "SOLAR_EPC":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "MODULAR_FURNITURE":
        return <Hammer className="w-4 h-4 text-purple-500" />;
      case "CIVIL_CONSTRUCTION":
        return <HardHat className="w-4 h-4 text-blue-500" />;
      default:
        return <Building2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enterprise Header & Role / Industry Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">
              {user.roleTitle || "Company Lead"}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              • {user.studioName || "Basekraft Enterprise"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {getIndustryIcon(currentIndustry)}
              <span>{currentIndustryMeta.label}</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Enterprise Operations Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational pipeline, milestone approvals, and technical deliverables tailored for{" "}
            <strong className="text-foreground">{currentIndustryMeta.label}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-foreground text-xs font-medium hover:bg-accent transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Sector Switcher Bar */}
      <div className="p-3.5 rounded-xl border border-border bg-card shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">
                Company Business Sector:
              </p>
              <p className="text-[11px] text-muted-foreground">
                Assigned by Superadmin during company onboarding. Switch below to preview how file vaults adapt:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5">
            {INDUSTRY_OPTIONS.map((ind) => {
              const isSelected = currentIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  type="button"
                  onClick={() => setIndustry(ind.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {getIndustryIcon(ind.key)}
                  <span className="truncate">{ind.badge}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Turnkey / Contract Pipeline */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Contract Portfolio</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-semibold">
              Active
            </span>
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-foreground">
            {formatCurrency(totalValue)}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <span>Committed: {formatCurrency(totalSpent)}</span>
            <span className="text-muted-foreground/80">({Math.round((totalSpent / totalValue) * 100)}%)</span>
          </div>
        </div>

        {/* Card 2: Active Sites & Projects */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Active Sites & Units</span>
            <FolderKanban className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">
            5 Sites
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            1 Procurement • 2 In-Progress • 2 Inspection
          </div>
        </div>

        {/* Card 3: Technical Deliverables */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Sector Deliverables</span>
            <FileSpreadsheet className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground font-mono">
            {currentFiles.length} Approved Files
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Vault tailored for {currentIndustryMeta.badge}
          </div>
        </div>

        {/* Card 4: Team & Contractor Seats */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Provisioned Seats</span>
            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">
            9 Members
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Role-scoped access enabled
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTOR SPECIFIC FILE VAULT & DELIVERABLES (Requested by User)   */}
      {/* ============================================================== */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                {getIndustryIcon(currentIndustry)}
              </div>
              <h2 className="text-base font-bold text-foreground">
                {currentIndustryMeta.label} — Project Technical Vault
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {currentIndustryMeta.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
              {currentFiles.length} Certified Files
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider font-mono border-b border-border">
              <tr>
                <th className="px-5 py-3 font-semibold">Document / Technical File</th>
                <th className="px-4 py-3 font-semibold">File Code</th>
                <th className="px-4 py-3 font-semibold">Technical Category</th>
                <th className="px-4 py-3 font-semibold">Format & Size</th>
                <th className="px-4 py-3 font-semibold">Milestone Stage</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentFiles.map((doc) => (
                <tr key={doc.id} className="hover:bg-accent/30 transition">
                  <td className="px-5 py-3.5 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-foreground font-semibold truncate">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          Authored by {doc.author} • {doc.date}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-foreground font-bold">
                    {doc.code}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted text-foreground font-medium">
                      {doc.category}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-muted-foreground font-mono text-[11px]">
                    {doc.fileType} ({doc.size})
                  </td>

                  <td className="px-4 py-3.5 text-foreground font-medium">
                    {doc.stage}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        doc.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : doc.status === "Issued"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="Download file"
                        className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Content Grid: Active Projects & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Projects Pipeline (2 cols) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Active Projects & Milestones
              </h2>
              <p className="text-xs text-muted-foreground">
                Tracking on-site checkpoints, procurement, and progress
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Full Pipeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {initialProjects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="py-3 flex items-center justify-between gap-4 group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {p.code}
                    </span>
                    <Link
                      href={`/projects/${p.code}`}
                      className="text-xs font-semibold text-foreground group-hover:underline truncate"
                    >
                      {p.name}
                    </Link>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {p.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {p.clientName} • {p.city} • Target: {p.targetHandover}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-xs font-semibold text-foreground block">
                      {formatCurrency(p.budget)}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {p.progressPercent}% completed
                    </span>
                  </div>
                  <Link
                    href={`/projects/${p.code}`}
                    className="px-2.5 py-1 rounded border border-border text-xs font-medium text-foreground hover:bg-accent transition"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Intelligent Site Alerts & Payment Requests */}
        <div className="space-y-4">
          {/* Proactive Sector Alerts */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-border mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground">
                Proactive Operational Alerts
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="font-semibold text-foreground text-xs">
                  {currentIndustry === "SOLAR_EPC"
                    ? "DISCOM Net Metering CEIG NOC Ready"
                    : currentIndustry === "MODULAR_FURNITURE"
                    ? "CNC Edge-banding Tape Batch Dispatched"
                    : currentIndustry === "CIVIL_CONSTRUCTION"
                    ? "Concrete Cube Strength Audit Due (Day 28)"
                    : "P-619: Daikin VRV Inspection Ready"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  {currentIndustry === "SOLAR_EPC"
                    ? "Sanction approved by state distribution company. Ready for bidirectional meter installation."
                    : currentIndustry === "MODULAR_FURNITURE"
                    ? "2mm PUR moisture-cure tape batch passed QA. Factory floor operator notified."
                    : currentIndustry === "CIVIL_CONSTRUCTION"
                    ? "M35 concrete test results certified by NABL laboratory. Ready for upper floor slab staging."
                    : "Pressure testing required before false ceiling board fastening. Delay risks slipping handover."}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="font-semibold text-foreground text-xs">
                  Milestone Sign-off Digital Approval
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Client authenticated drawing revisions via secure client link. Ready for one-click contractor dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Pending Payment Requests */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <h3 className="text-xs font-bold text-foreground">
                Site Payment Disbursements
              </h3>
              <Link href="/payments" className="text-[11px] text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {mockPaymentRequests.map((pr) => (
                <div
                  key={pr.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/20 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-foreground block">
                      {pr.projectCode}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {pr.requestedBy} • {pr.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-foreground block">
                      {formatCurrency(pr.amount)}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1 rounded bg-muted text-muted-foreground">
                      {pr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
