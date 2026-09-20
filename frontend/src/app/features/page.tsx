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
  LogIn,
} from "lucide-react";
import { studioFeaturePillars } from "@/data/websiteData";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function FeaturesPage() {
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
      traditional: "Endless WhatsApp threads, lost attachment versions & verbal disputes",
      basekraft: "Client Portal magic link with one-click timestamped approvals",
    },
    {
      capability: "Site Quality & Snag Audits",
      traditional: "Messy paper clipboards, delayed reporting to principal architect",
      basekraft: "Real-time mobile checkpoint checklist with instant snag alerts",
    },
    {
      capability: "Vendor PO & Material Dispatch",
      traditional: "Verbal site orders leading to duplicate deliveries & budget leaks",
      basekraft: "Structured PO pipeline with direct catalog rate lock & payment status",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1 w-full space-y-16 sm:space-y-24 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[300px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="hero-subtitle-gradient inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-ping" />
            <span>Platform Capabilities & Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineered for Precision Turnkey Architecture.
          </h1>

          <p className="text-xs sm:text-base text-zinc-300/80 leading-relaxed font-normal">
            Eliminate operational fragmentation between architectural drawing desks, site supervisor punch-lists, and commercial accounting.
          </p>
        </div>

        {/* Feature Grid Deep-Dives with Helionix Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studioFeaturePillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="features-bg absolute inset-0 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Feature 0{idx + 1}
                  </span>
                  <div className="icon-border p-2.5 rounded-xl text-purple-200">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {pillar.title}
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {pillar.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>

                <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase text-purple-300 block font-bold">
                    Key Functionalities:
                  </span>
                  {pillar.capabilities.map((h: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] relative z-10">
                <Link
                  href="/login"
                  className="hero-button-gradient w-full py-3 px-4 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <LogIn className="w-3.5 h-3.5 text-purple-200" />
                  <span>Launch in Studio OS</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              Operational Superiority
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Traditional Disjointed Workflow vs. Basekraft OS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-3.5 font-mono uppercase text-[10px] text-zinc-400">Practice Requirement</th>
                  <th className="p-3.5 font-mono uppercase text-[10px] text-zinc-400">Traditional Methods</th>
                  <th className="p-3.5 font-mono uppercase text-[10px] text-purple-300 font-bold">Basekraft Architecture OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {comparisonItems.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.03] transition">
                    <td className="p-3.5 font-semibold text-white">
                      {row.capability}
                    </td>
                    <td className="p-3.5 text-zinc-400 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="p-3.5 font-medium text-purple-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{row.basekraft}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#140f29] to-[#0c0919] border border-purple-500/20 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_-10px_rgba(109,40,217,0.3)]">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Ready to see these systems live?</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Test drive the live Studio OS or preview our turnkey client portal.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="hero-button-gradient px-5 py-3 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login to Studio OS</span>
            </Link>
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="button-border-gradient px-5 py-3 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              Book Brief
            </button>
          </div>
        </div>
      </main>

      <WebsiteFooter />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
