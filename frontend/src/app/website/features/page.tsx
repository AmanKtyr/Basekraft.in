"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Users,
  Compass,
  CheckSquare,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Printer,
  FileText,
  Calendar,
  IndianRupee,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { studioFeaturePillars } from "@/data/websiteData";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function WebsiteFeaturesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const comparisonItems = [
    {
      capability: "Proposal Creation & Calculation",
      traditional: "Manual Excel sheets with broken formulas & margin errors",
      basekraft: "Dynamic room-wise BOQ matrix with automated GST & rate contracts",
    },
    {
      capability: "Official Letterhead Output",
      traditional: "Clunky manual Word copy-paste, formatting shifts on every PDF export",
      basekraft: "3-Mode Letterhead: Digital, Custom Uploaded PDF, & Pre-Printed Paper",
    },
    {
      capability: "Client 3D & Drawing Approvals",
      traditional: "Chaotic WhatsApp threads, buried render files, unverified verbal agreements",
      basekraft: "Private Live Client Portal with 1-click Approve or Request Revision",
    },
    {
      capability: "Lead Pipeline Management",
      traditional: "Sticky notes, missed discovery calls, untracked site surveys",
      basekraft: "Interactive 5-Stage Drag & Drop Kanban with automatic WhatsApp reminders",
    },
    {
      capability: "On-Site Snagging & Quality Audits",
      traditional: "Paper checklists lost on site, disputes during final handover",
      basekraft: "Digital site supervisor checklist with civil, MEP & finish tolerances",
    },
  ];

  return (
    <div className="space-y-20 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <Layers className="w-3.5 h-3.5 text-zinc-500" />
          <span>Full-Stack Architectural Studio Capabilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Everything You Need to Run High-End Architecture & Turnkey Projects.
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          From first site consultation measurement to signed contract, itemized BOQ procurement, and final snag-free key handover.
        </p>
      </div>

      {/* Feature Pillars Detailed Breakdown */}
      <div className="space-y-16">
        {studioFeaturePillars.map((pillar, idx) => (
          <div
            key={pillar.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Left Content */}
            <div className={`space-y-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono font-bold text-xs flex items-center justify-center">
                  {pillar.number}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {pillar.tagline}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                {pillar.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {pillar.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  href="/"
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold rounded-md transition inline-flex items-center gap-1.5"
                >
                  <span>Experience in OS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold rounded-md text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                >
                  Request Studio Walkthrough
                </button>
              </div>
            </div>

            {/* Right Architectural Schematic Mockup */}
            <div
              className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm font-mono text-xs space-y-4 ${
                idx % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                <span>ARCHITECTURE_PILLAR_{pillar.number}.SYS</span>
                <span className="text-emerald-600 font-bold">READY TO USE</span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="text-[11px] text-zinc-400 uppercase">Interactive Workflow State</div>
                <div className="space-y-1.5 text-zinc-800 dark:text-zinc-200">
                  <div className="flex justify-between">
                    <span>Active Modules:</span>
                    <span className="font-bold">Quotes • CRM • Portal • Snagging</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxation Standard:</span>
                    <span className="font-bold">Indian CGST + SGST (18%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Letterhead Modes:</span>
                    <span className="font-bold">Digital • PDF Overlay • Pre-Printed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Device Support:</span>
                    <span className="font-bold">Desktop • iPad • Mobile Touch</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 leading-relaxed">
                Tested across luxury residential penthouses, villa compounds, and commercial corporate floors with zero margin variance.
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix: Old Way vs Basekraft OS */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Why Modern Studios Replace Spreadsheets with Basekraft OS
          </h2>
          <p className="text-xs text-zinc-500">
            A direct comparison of daily architectural practice operations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-500">
                <th className="py-3 px-4 font-medium">Studio Workflow</th>
                <th className="py-3 px-4 font-medium text-red-600 dark:text-red-400">Traditional Spreadsheets & WhatsApp</th>
                <th className="py-3 px-4 font-medium text-emerald-600 dark:text-emerald-400">Basekraft Architectural OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                    {item.capability}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-500 text-[11px] leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{item.traditional}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-900 dark:text-zinc-100 text-[11px] font-medium leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.basekraft}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-sm"
        >
          <span>Open Full Studio Platform Demo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
