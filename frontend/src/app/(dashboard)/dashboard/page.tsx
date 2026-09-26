"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FolderKanban,
  Clock,
  IndianRupee,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Plus,
  Search,
  Building2,
  ChevronRight,
  Calendar,
  Layers,
  ArrowRight,
  FileText,
  CreditCard,
  Users,
} from "lucide-react";
import { initialProjects, mockPaymentRequests } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  IndustryType,
  INDUSTRY_DOCUMENTS,
  INDUSTRY_OPTIONS,
  operationsApi,
  DashboardStatsData,
} from "@/utils/api";
import { Project } from "@/types";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

export default function DashboardOverview() {
  const { user } = useAuth();
  const currentIndustry: IndustryType = user?.industry || "INTERIOR_DESIGN";
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  useEffect(() => {
    operationsApi
      .getDashboardStats()
      .then((data) => {
        if (data) setStats(data);
      })
      .catch((err) => console.warn("Live dashboard stats fetch:", err));

    operationsApi.projects
      .list()
      .then((backendProjects) => {
        if (backendProjects && backendProjects.length > 0) {
          const mapped: Project[] = backendProjects.map((bp) => ({
            id: bp.id,
            code: bp.code,
            name: bp.name,
            clientName: bp.client_name,
            clientPhone: bp.client_phone || "+91 98111 00000",
            clientEmail: bp.client_email || `${bp.client_name.toLowerCase().replace(/\s+/g, "")}@client.com`,
            city: bp.city || "Gurugram",
            state: "Haryana",
            sector: "Interior Design & Turnkey",
            stage: (bp.stage === "PLANNING"
              ? "sales"
              : bp.stage === "DESIGN"
              ? "design"
              : bp.stage === "EXECUTION"
              ? "execution"
              : bp.stage === "HANDOVER"
              ? "handover"
              : "execution"),
            subStage: bp.stage_display || "Active Fitout",
            budget: Number(bp.budget) || 25000000,
            spent: Number(bp.spent) || 12000000,
            startDate: bp.start_date || "2026-07-01",
            targetHandover: bp.target_handover || "2026-12-31",
            pmName: bp.assigned_lead_name || "Aman Sharma",
            designerName: "Riya Kapoor",
            progressPercent: bp.progress_pct || 45,
            totalCheckpoints: 12,
            completedCheckpoints: Math.round(((bp.progress_pct || 45) / 100) * 12),
            pendingApprovalsCount: 2,
            pendingIssuesCount: 1,
            description: `Turnkey project for ${bp.client_name}`,
            propertyType: "Luxury Villa",
            carpetAreaSqFt: 3500,
            checkpoints: [],
          }));

          setProjects((prev) => {
            const codes = new Set(prev.map((p) => p.code));
            const novel = mapped.filter((m) => !codes.has(m.code));
            return [...novel, ...prev];
          });
        }
      })
      .catch((err) => console.warn("Live projects fetch:", err));
  }, []);

  const totalValue =
    stats?.projects.total_budget ||
    projects.reduce((acc, p) => acc + (Number(p.budget) || 0), 0);
  const totalSpent =
    stats?.projects.total_spent ||
    projects.reduce((acc, p) => acc + (Number(p.spent) || 0), 0);
  const spentRatio = totalValue > 0 ? Math.round((totalSpent / totalValue) * 100) : 0;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const currentFiles =
    INDUSTRY_DOCUMENTS[currentIndustry] || INDUSTRY_DOCUMENTS.INTERIOR_DESIGN;
  const currentIndustryMeta =
    INDUSTRY_OPTIONS.find((i) => i.key === currentIndustry) || INDUSTRY_OPTIONS[0];

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects.slice(0, 5);
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* ============================================================== */}
      {/* 1. CLEAN, MINIMAL HEADER                                       */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">
              {user?.studioName || "Basekraft Studio"}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {currentIndustryMeta.label}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Good evening, {user?.name?.split(" ")[0] || "Director"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational overview of active sites, financials, and project deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/quotes"
            className="px-3.5 py-2 rounded-lg border border-border bg-card text-foreground text-xs font-medium hover:bg-accent transition"
          >
            BOQ Builder
          </Link>
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. CRISP KPI METRICS (4 CARDS)                                 */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Portfolio Value</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              +14% YoY
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-foreground">
            {formatCurrency(totalValue)}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground font-mono">
            Committed: {formatCurrency(totalSpent)} ({spentRatio}%)
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Active Sites</span>
            <FolderKanban className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">
            {projects.length} Projects
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            In Design & Site Execution
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Technical Vault</span>
            <FileSpreadsheet className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">
            {currentFiles.length} Certified Files
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            GFC Drawings & BOQ Schedules
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Team & Access</span>
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">
            9 Members
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Role-Scoped Permissions
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT: PROJECTS + SIDE ACTIONS             */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Projects (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-border bg-card shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <div>
              <h2 className="text-sm font-bold text-foreground">Active Projects</h2>
              <p className="text-xs text-muted-foreground">Recent sites and milestone progression</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-48 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-md pl-7 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold text-primary hover:underline shrink-0"
              >
                View all
              </Link>
            </div>
          </div>

          <div className="divide-y divide-border">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="py-3 flex items-center justify-between gap-3 group hover:bg-muted/20 px-2 rounded-lg transition"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {p.code}
                    </span>
                    <Link
                      href="/projects"
                      className="text-xs font-bold text-foreground group-hover:text-primary transition truncate"
                    >
                      {p.name}
                    </Link>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-semibold">
                      {p.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {p.clientName} • {p.city}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-xs font-semibold text-foreground block">
                      {formatCurrency(p.budget)}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {p.progressPercent}% done
                    </span>
                  </div>
                  <Link
                    href="/projects"
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions & Disbursements */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
              Quick Shortcuts
            </h3>
            <div className="space-y-1.5">
              <Link
                href="/quotes"
                className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-accent transition text-xs group"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground">New BOQ Estimate</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
              </Link>

              <Link
                href="/materials"
                className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-accent transition text-xs group"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground">Materials Master</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
              </Link>

              <Link
                href="/team"
                className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-accent transition text-xs group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground">Team & Access</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
              </Link>
            </div>
          </div>

          {/* Pending Vendor Disbursements */}
          <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                Recent Disbursements
              </h3>
              <Link href="/payments" className="text-[11px] text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {mockPaymentRequests.slice(0, 3).map((pr) => (
                <div
                  key={pr.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-foreground block">
                      {pr.projectCode}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {pr.requestedBy}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-foreground block">
                      {formatCurrency(pr.amount)}
                    </span>
                    <span className="text-[9px] uppercase font-mono px-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                      {pr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. CLEAN TECHNICAL VAULT LIST                                  */}
      {/* ============================================================== */}
      <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              {currentIndustryMeta.label} — Technical Files & Standards
            </h2>
            <p className="text-xs text-muted-foreground">
              Essential technical drawing sets and specifications for your practice
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground font-semibold">
            {currentFiles.length} Certified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentFiles.map((doc) => (
            <div
              key={doc.id}
              className="p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-primary">
                    {doc.code}
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {doc.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-foreground line-clamp-1">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground">{doc.fileType} • {doc.size}</p>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{doc.stage}</span>
                <button
                  title="Download"
                  className="p-1 rounded hover:bg-accent text-foreground transition cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={(newProj) => {
          setProjects((prev) => [newProj, ...prev]);
          setIsNewProjectModalOpen(false);
        }}
      />
    </div>
  );
}
