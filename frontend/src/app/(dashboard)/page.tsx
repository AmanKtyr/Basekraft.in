"use client";

import React from "react";
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
} from "lucide-react";
import { initialProjects, mockPaymentRequests } from "@/data/mockData";

export default function DashboardOverview() {
  const totalValue = initialProjects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = initialProjects.reduce((acc, p) => acc + p.spent, 0);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Executive Studio Dashboard
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Turnkey project pipeline, active fit-out budgets, and milestone approvals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium hover:opacity-90 transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Turnkey Pipeline */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Turnkey Portfolio</span>
            <span className="font-mono text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-zinc-950 dark:text-zinc-100">
            {formatCurrency(totalValue)}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500">
            <span>Committed: {formatCurrency(totalSpent)}</span>
            <span className="text-zinc-400">({Math.round((totalSpent / totalValue) * 100)}%)</span>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Active Sites</span>
            <FolderKanban className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold text-zinc-950 dark:text-zinc-100">
            5 Projects
          </div>
          <div className="mt-1 text-[11px] text-zinc-500">
            1 Sales • 1 Design • 1 Execution • 1 Handover
          </div>
        </div>

        {/* Card 3: Quality Checkpoints Audit */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Stage Audits Passed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-zinc-950 dark:text-zinc-100">
            39 / 89
          </div>
          <div className="mt-1 text-[11px] text-zinc-500">
            44% completed with zero snag escalation
          </div>
        </div>

        {/* Card 4: Pending Approvals */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Pending Approvals</span>
            <Clock className="w-3.5 h-3.5 text-zinc-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-zinc-950 dark:text-zinc-100">
            7 Items
          </div>
          <div className="mt-1 text-[11px] text-zinc-500">
            Client sign-offs & vendor payment requests
          </div>
        </div>
      </div>

      {/* Main Grid: Projects List + Right Column Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Project Quick Monitor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Priority Projects Execution Status
                </h3>
                <p className="text-xs text-zinc-500">
                  Live tracking of on-site turnkey deliverables
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1"
              >
                <span>Full Pipeline</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {initialProjects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {p.code}
                      </span>
                      <Link
                        href={`/projects/${p.code}`}
                        className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline truncate"
                      >
                        {p.name}
                      </Link>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {p.stage}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {p.clientName} • {p.city} • Handover: {p.targetHandover}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                        {formatCurrency(p.budget)}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {p.progressPercent}% finished
                      </span>
                    </div>
                    <Link
                      href={`/projects/${p.code}`}
                      className="px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Payment Approvals */}
        <div className="space-y-4">
          {/* AI Intelligence Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3">
              <Sparkles className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Studio AI Proactive Alerts
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <p className="font-medium text-zinc-900 dark:text-zinc-100 text-xs">
                  P-619: Daikin VRV Inspection
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Pressure testing required before false ceiling board fastening. Delay risks slipping handover by 3 days.
                </p>
              </div>

              <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <p className="font-medium text-zinc-900 dark:text-zinc-100 text-xs">
                  P-438: 3D Render Approval
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Client viewed Master Suite render 4 times in Client Portal. Ready for one-click digital sign-off.
                </p>
              </div>
            </div>
          </div>

          {/* Pending Payment Requests */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3">
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Site Payment Requests
              </h3>
              <Link href="/payments" className="text-[11px] text-zinc-500 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {mockPaymentRequests.map((pr) => (
                <div
                  key={pr.id}
                  className="flex items-center justify-between p-2.5 rounded border border-zinc-100 dark:border-zinc-800 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">
                      {pr.projectCode}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {pr.requestedBy} • {pr.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                      {formatCurrency(pr.amount)}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
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
