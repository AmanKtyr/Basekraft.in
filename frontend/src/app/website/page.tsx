"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Layers,
  FileSpreadsheet,
  Users,
  Compass,
  ArrowUpRight,
  Calendar,
  ChevronRight,
} from "lucide-react";
import {
  studioMetrics,
  showcaseProjects,
  studioFeaturePillars,
} from "@/data/websiteData";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function WebsiteHomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle architectural grid backdrop accent */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider text-[10px]">Architectural Studio Practice & Turnkey OS</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1] sm:leading-[1.1]">
            Where International Architecture Meets Operational Precision.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The operating system engineered for luxury residential interior fit-outs, commercial headquarters, and turnkey architecture firms. Unifying CAD moodboards, dynamic BOQ estimation, private client portals, and on-site fit-out logistics.
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Launch Studio OS Platform</span>
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </Link>

            <button
              onClick={() => setIsConsultationOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 rounded-md transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>Book Design Consultation</span>
            </button>
          </div>

          {/* Quick Client Portal Link Badge */}
          <div className="pt-2">
            <Link
              href="/client-portal/P-619"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition font-mono underline decoration-zinc-300 dark:decoration-zinc-700"
            >
              <span>Explore live private client portal (Worli Penthouse Demo)</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Live OS Mockup Card Preview */}
        <div className="mt-12 sm:mt-16 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 sm:p-4 shadow-xl overflow-hidden">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 sm:p-5 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-4">
            {/* Mockup Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="text-[11px] font-mono text-zinc-400 ml-2">basekraft-studio-os.internal</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span>Active Project: P-619 The Skydeck Penthouse</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">55% Executed</span>
              </div>
            </div>

            {/* Mockup Mini Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Total Contract Value</div>
                <div className="text-lg font-bold font-mono text-zinc-950 dark:text-zinc-50">₹85,00,000</div>
                <div className="text-[10px] text-emerald-600">Milestone Stage 3/5 Confirmed</div>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="text-[10px] uppercase font-mono text-zinc-400">BOQ Items Logged</div>
                <div className="text-lg font-bold font-mono text-zinc-950 dark:text-zinc-50">48 Specifications</div>
                <div className="text-[10px] text-zinc-500">Statuario Marble & HDHMR</div>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Client Portal Status</div>
                <div className="text-lg font-bold font-mono text-zinc-950 dark:text-zinc-50">Live Sync Enabled</div>
                <div className="text-[10px] text-zinc-500">Last viewed 2 hours ago</div>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Proposal Output</div>
                <div className="text-lg font-bold font-mono text-zinc-950 dark:text-zinc-50">Letterhead PDF</div>
                <div className="text-[10px] text-zinc-500">1-Click direct download</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. METRICS STRIP */}
      {/* ========================================================= */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {studioMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1 border-l-2 border-zinc-950 dark:border-zinc-100 pl-4">
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-zinc-950 dark:text-zinc-50">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
                  {metric.label}
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CORE STUDIO OS PILLARS (INTERACTIVE TABS) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-400">
              The Architecture OS Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1">
              Engineered for Complete Studio Autonomy
            </h2>
          </div>
          <Link
            href="/website/features"
            className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 inline-flex items-center gap-1.5 transition underline font-mono"
          >
            <span>Explore all features & workflows</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillars Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {studioFeaturePillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillarIndex(idx)}
              className={`text-left p-4 rounded-lg border transition cursor-pointer ${
                activePillarIndex === idx
                  ? "bg-white dark:bg-zinc-900 border-zinc-950 dark:border-zinc-100 shadow-sm"
                  : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-zinc-400">{pillar.number}</div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 mt-1">
                {pillar.title}
              </h3>
              <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                {pillar.tagline}
              </p>
            </button>
          ))}
        </div>

        {/* Active Pillar Deep-Dive Display Card */}
        {studioFeaturePillars[activePillarIndex] && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  Feature Spotlight: {studioFeaturePillars[activePillarIndex].number}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {studioFeaturePillars[activePillarIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {studioFeaturePillars[activePillarIndex].description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase font-mono text-zinc-400 block">
                    Core Technical Capabilities
                  </span>
                  <ul className="space-y-2">
                    {studioFeaturePillars[activePillarIndex].capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href="/"
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold rounded transition inline-flex items-center gap-1.5"
                  >
                    <span>Test In Studio OS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/website/features"
                    className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold rounded text-zinc-700 dark:text-zinc-300 transition"
                  >
                    Read Technical Specs
                  </Link>
                </div>
              </div>

              {/* Decorative Architectural Schematic */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span>MODULE_SPECS.CAD</span>
                  <span>STATUS: VERIFIED</span>
                </div>
                <div className="space-y-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  <p>› Tolerances: +/- 1.5mm Laser Verification</p>
                  <p>› Direct PDF Proposal Export: ASCII & Latin Safe</p>
                  <p>› Indian Taxation Engine: Dual CGST + SGST (18%)</p>
                  <p>› Client Portal Security: Zero-friction token link</p>
                  <p>› Auto-sync with Materials Master: 200+ Live items</p>
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Architectural Standard</span>
                  <span>IS 1200 / NBC Compliant</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 4. SHOWCASE WORKS PREVIEW */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-400">
              Curated Architectural Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1">
              Select Turnkey Built Works
            </h2>
          </div>
          <Link
            href="/website/portfolio"
            className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 inline-flex items-center gap-1.5 transition underline font-mono"
          >
            <span>View all 5 showcase case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition flex flex-col group"
            >
              <div className="p-5 flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-zinc-400">
                    {project.category} • {project.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    {project.budgetFormatted}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">
                  {project.title}
                </h3>
                <p className="text-[11px] font-mono text-zinc-500">
                  {project.location} • {project.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">Key Specifications</span>
                  <div className="flex flex-wrap gap-1">
                    {project.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
                <Link
                  href={`/client-portal/${project.portalCode}`}
                  target="_blank"
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white inline-flex items-center gap-1"
                >
                  <span>Client Portal Live View</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </Link>
                <Link
                  href="/website/portfolio"
                  className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline"
                >
                  Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/10 dark:bg-zinc-900/10 border border-white/20 dark:border-zinc-900/20 text-white dark:text-zinc-950">
            <Sparkles className="w-3 h-3 text-white dark:text-zinc-950" />
            <span>Turnkey Architectural Precision</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Streamline Your Architecture & Turnkey Practice?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 dark:text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Eliminate estimation variances, delight luxury clients with transparent live portals, and manage your entire turnkey portfolio in one elegant platform.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-zinc-950 dark:text-white font-bold text-xs uppercase tracking-wider rounded-md transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Launch Studio OS Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsConsultationOpen(true)}
              className="w-full sm:w-auto px-6 py-3 border border-white/30 dark:border-zinc-900/30 hover:bg-white/10 dark:hover:bg-zinc-900/10 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md transition cursor-pointer"
            >
              Book Design Discovery
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
