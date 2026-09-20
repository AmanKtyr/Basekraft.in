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
  LogIn,
} from "lucide-react";
import {
  studioMetrics,
  showcaseProjects,
  studioFeaturePillars,
} from "@/data/websiteData";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function RootWebsiteHomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1 w-full space-y-24 sm:space-y-32 pb-24 relative">
        {/* ========================================================= */}
        {/* 1. HERO SECTION WITH EXACT HELIONIX CONCENTRIC ORBS & BLURS */}
        {/* ========================================================= */}
        <section id="home" className="relative overflow-hidden z-10 pt-32 sm:pt-40 xl:pt-48 pb-16 w-full isolate">
          {/* Hero Background Shapes from Helyonex */}
          <div className="max-w-7xl mx-auto">
            <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
              {/* Outer Concentric Giant Ring */}
              <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]" />
              {/* Inner Concentric Ring */}
              <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]" />
              {/* Top Blur Radial Glow 02 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <img src="/images/blur-02.svg" alt="blur" className="max-w-none opacity-90" />
              </div>
              {/* Top Blur Radial Glow 01 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <img src="/images/blur-01.svg" alt="blur" className="max-w-none opacity-90" />
              </div>
            </div>
          </div>

          {/* Core Cosmic Violet Halo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#6e25ed]/25 blur-[120px] -z-10 rounded-full pointer-events-none" />

          {/* Hero Content */}
          <div className="mx-auto max-w-[920px] px-4 sm:px-8 xl:px-0 relative z-10 text-center">
            {/* Helyonex-Style Subtitle Shimmer Pill with Sparkle SVG */}
            <div className="mb-6 inline-block">
              <div className="hero-subtitle-gradient relative font-medium text-sm inline-flex items-center gap-2.5 py-2 px-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-[0_0_24px_rgba(160,115,238,0.3)]">
                <img src="/images/icon-title.svg" alt="icon" className="w-4 h-4" />
                <span className="hero-subtitle-text font-semibold text-xs sm:text-sm">
                  Architectural Studio Practice & Turnkey OS
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-white mb-6 text-4xl font-extrabold sm:text-6xl xl:text-[66px] tracking-tight leading-[1.12]">
              Where International Architecture Meets Operational Precision.
            </h1>

            {/* Subtitle */}
            <p className="max-w-[600px] mx-auto mb-9 font-medium text-base sm:text-lg text-zinc-300 leading-relaxed">
              The operating system engineered for luxury residential fit-outs, commercial headquarters, and turnkey practices. Unifying parametric BOQ estimation, private client portals, and site logistics.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="hero-button-gradient inline-flex items-center gap-2.5 py-3.5 px-8 text-white font-semibold text-sm rounded-lg ease-in duration-300 hover:opacity-85 shadow-[0_4px_24px_rgba(110,37,237,0.5)]"
              >
                <span>Launch Studio OS & Multi-Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="button-border-gradient inline-flex items-center gap-2 py-3.5 px-7 text-white font-medium text-sm rounded-lg ease-in duration-300 hover:bg-white/[0.08] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-purple-300" />
                <span>Book Design Discovery</span>
              </button>
            </div>

            {/* Quick Demo Preview Link */}
            <div className="pt-5 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
              <span>Looking for live client view?</span>
              <Link
                href="/client-portal/P-619"
                target="_blank"
                className="text-purple-300 hover:text-purple-200 font-semibold underline underline-offset-4 inline-flex items-center gap-1 transition"
              >
                <span>Preview Live Client Portal (P-619)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. STUDIO TRACK RECORD METRICS WITH GLOWING DIVIDERS */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 relative">
          <div className="features-row-border h-[1px] w-full mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {studioMetrics.map((item, idx) => (
              <div key={idx} className="space-y-1.5 relative">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <div className="features-row-border h-[1px] w-full mt-12" />
        </section>

        {/* ========================================================= */}
        {/* 4. THE 4 PILLARS OF BASEKRAFT OS WITH HELIONIX ICON PODS */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="hero-subtitle-gradient inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-300">
              <img src="/images/icon-title.svg" alt="icon" className="w-3.5 h-3.5" />
              <span>System Architecture</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered Specifically for Architectural Practices.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Generic spreadsheets and project tools break down in high-end design-build. Basekraft unifies architectural drawings, commercial BOQs, and site execution into one seamless discipline.
            </p>
          </div>

          {/* Pillars Tab Selector and Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Pillar List */}
            <div className="lg:col-span-5 space-y-3">
              {studioFeaturePillars.map((pillar, idx) => {
                const isSelected = idx === activePillarIndex;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillarIndex(idx)}
                    className={`w-full text-left p-4.5 rounded-xl border transition cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "border-purple-500/50 bg-[#120c30] shadow-[0_0_25px_-5px_rgba(160,115,238,0.35)] ring-1 ring-purple-500/30"
                        : "border-white/[0.08] bg-[#0a061e]/60 hover:bg-[#120c30]/70 hover:border-white/[0.15]"
                    }`}
                  >
                    <div
                      className={`icon-border p-2.5 rounded-xl shrink-0 ${
                        isSelected
                          ? "bg-purple-900/40 text-purple-200 border-purple-400/40"
                          : "text-zinc-400"
                      }`}
                    >
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {pillar.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {pillar.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Selected Pillar Deep-Dive */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="features-bg absolute inset-0 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    Pillar 0{activePillarIndex + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {studioFeaturePillars[activePillarIndex].title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {studioFeaturePillars[activePillarIndex].tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {studioFeaturePillars[activePillarIndex].description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase text-purple-300 block tracking-wider font-bold">
                    Core Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {studioFeaturePillars[activePillarIndex].capabilities.map((h: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct feature link */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <Link
                    href="/about"
                    className="text-xs font-bold text-purple-300 hover:text-purple-200 hover:underline flex items-center gap-1.5 transition"
                  >
                    <span>Read studio philosophy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/login"
                    className="hero-button-gradient px-4 py-2 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shadow-md"
                  >
                    Explore in Studio OS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CLIENT TESTIMONIALS SECTION (ABOVE THE PLANETARY DOME) */}
        {/* ========================================================= */}
        <section className="relative z-20 pt-8 pb-0">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
            {/* Section Title */}
            <div className="text-center mb-14">
              <div className="mb-4 inline-block">
                <div className="hero-subtitle-gradient relative font-medium text-sm inline-flex items-center gap-2 py-2 px-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-200">
                  <img src="/images/icon-title.svg" alt="icon" className="w-4 h-4" />
                  <span className="hero-subtitle-text font-semibold">Client Testimonials</span>
                </div>
              </div>
              <h2 className="text-white mb-4 text-3xl font-extrabold sm:text-5xl tracking-tight">
                What Our Clients Say
              </h2>
              <p className="max-w-[700px] mx-auto font-medium text-zinc-300 text-sm sm:text-base leading-relaxed">
                Here is what leading architectural studios, luxury homeowners, and turnkey developers say about our precision practice OS.
              </p>
            </div>

            {/* Testimonials Grid (3 Cards matching Screenshot 1 Top Row) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {/* Item 1 */}
              <div className="features-box-border p-8 md:p-9 flex flex-col justify-between group">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <svg width="28" height="22" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 12.5L7.5 0H13.75L8.75 12.5H13.75V25H0V12.5ZM16.25 12.5L23.75 0H30L25 12.5H30V25H16.25V12.5Z" fill="url(#quote_grad_1)"/>
                      <defs>
                        <linearGradient id="quote_grad_1" x1="0" y1="0" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#a073ee"/>
                          <stop offset="1" stopColor="#6e25ed"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed mb-6 font-normal">
                    &ldquo;Basekraft built our 14,000 sq.ft Worli penthouse with zero cost overruns. Their live client portal gave us absolute visibility on parametric material approvals and site milestones.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.08]">
                  <img src="/images/user-01.png" alt="Jane Doe" className="w-12 h-12 rounded-full border border-purple-500/40 object-cover" />
                  <div>
                    <h5 className="text-white text-sm font-bold">Jane Doe</h5>
                    <p className="text-purple-300 text-xs font-mono">CEO, Fashionista</p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="features-box-border p-8 md:p-9 flex flex-col justify-between group">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <svg width="28" height="22" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 12.5L7.5 0H13.75L8.75 12.5H13.75V25H0V12.5ZM16.25 12.5L23.75 0H30L25 12.5H30V25H16.25V12.5Z" fill="url(#quote_grad_2)"/>
                      <defs>
                        <linearGradient id="quote_grad_2" x1="0" y1="0" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#a073ee"/>
                          <stop offset="1" stopColor="#6e25ed"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed mb-6 font-normal">
                    &ldquo;The Studio OS telemetry and parametric BOQ estimator eliminated our site contractor billing disputes. Our turnkey practice expanded from 2 to 9 simultaneous high-end sites seamlessly.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.08]">
                  <img src="/images/user-02.png" alt="John Smith" className="w-12 h-12 rounded-full border border-purple-500/40 object-cover" />
                  <div>
                    <h5 className="text-white text-sm font-bold">John Smith</h5>
                    <p className="text-purple-300 text-xs font-mono">Founder, Foodies</p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="features-box-border p-8 md:p-9 flex flex-col justify-between group">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <svg width="28" height="22" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 12.5L7.5 0H13.75L8.75 12.5H13.75V25H0V12.5ZM16.25 12.5L23.75 0H30L25 12.5H30V25H16.25V12.5Z" fill="url(#quote_grad_3)"/>
                      <defs>
                        <linearGradient id="quote_grad_3" x1="0" y1="0" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#a073ee"/>
                          <stop offset="1" stopColor="#6e25ed"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed mb-6 font-normal">
                    &ldquo;The operational precision for architectural fit-outs created by Basekraft is unmatched. The telemetry is intuitive, snags are resolved in hours, and our clients rave about the experience.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.08]">
                  <img src="/images/user-03.png" alt="David Lee" className="w-12 h-12 rounded-full border border-purple-500/40 object-cover" />
                  <div>
                    <h5 className="text-white text-sm font-bold">David Lee</h5>
                    <p className="text-purple-300 text-xs font-mono">Product Manager, SaaS Co.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. PRICING SECTION WITH COSMIC PLANET HORIZON BACKGROUND */}
        {/* ========================================================= */}
        <section id="pricing" className="relative overflow-hidden py-20 sm:py-28 isolate">
          {/* Cosmic Horizon Background Layers (Behind the Content) */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Ambient Purple Blur Radiance */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <img src="/images/blur-13.svg" alt="blur" className="max-w-none opacity-80" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <img src="/images/blur-14.svg" alt="blur" className="max-w-none opacity-90" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <img src="/images/blur-15.svg" alt="blur" className="max-w-none" />
            </div>

            {/* Core Cosmic Violet Halo */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6e25ed]/20 blur-[130px] rounded-full" />

            {/* Radiant Curved Planet Horizon Arcs */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-t-full border-t border-purple-400/40 bg-gradient-to-b from-purple-950/20 to-transparent shadow-[0_-15px_60px_rgba(134,70,244,0.3)]" />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-t-full border-t border-purple-300/20" />

            {/* Twinkling Star Field Particles */}
            <div className="max-w-[482px] w-full h-60 overflow-hidden absolute top-4 left-1/2 -translate-x-1/2">
              <div className="stars" />
              <div className="stars2" />
            </div>

            {/* Vertical 8 Grid Bars with soft gradient borders */}
            <div className="flex justify-center gap-4 sm:gap-8 absolute top-16 left-1/2 -translate-x-1/2 w-full opacity-40">
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border hidden sm:block" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border" />
              <div className="max-w-[50px] w-full h-[220px] relative pricing-grid pricing-grid-border hidden sm:block" />
            </div>
          </div>

          {/* Section Content (Sitting Proudly in Front of Background) */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10">
            {/* Section Title */}
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block">
                <div className="hero-subtitle-gradient relative font-medium text-sm inline-flex items-center gap-2 py-2 px-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 shadow-[0_0_24px_rgba(160,115,238,0.25)]">
                  <img src="/images/icon-title.svg" alt="icon" className="w-4 h-4" />
                  <span className="hero-subtitle-text font-semibold">Our Pricing</span>
                </div>
              </div>
              <h2 className="text-white mb-4 text-3xl font-extrabold sm:text-5xl xl:text-6xl tracking-tight leading-tight">
                Flexible Pricing for Your Needs
              </h2>
              <p className="max-w-[714px] mx-auto font-medium text-zinc-300 text-sm sm:text-base leading-relaxed">
                We offer a range of pricing plans to suit your budget and project requirements. Contact us for a custom quote for your project.
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
              {/* Plan 1: Boutique Studio */}
              <div className="rounded-3xl bg-[#06031b] relative overflow-hidden pt-10 pb-8 px-8 pricing-item-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">Boutique Studio</h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40 font-semibold">
                      Starter
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-4xl font-extrabold pricing-gradient-text">
                      ₹18,500
                    </h2>
                    <span className="text-xs font-medium text-zinc-400">/ month</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Essential operating system for boutique interior studios and turnkey residential practices.
                  </p>

                  <div className="my-6 w-full h-[1px] pricing-gradient-divider" />

                  <ul className="space-y-3.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Up to 5 Active Turnkey Sites</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Parametric BOQ Estimator</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Private Client Portal Access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Quality Tolerance Snag Lists</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href="/login"
                    className="button-border-gradient w-full py-3 rounded-lg text-xs font-semibold text-white text-center block hover:bg-white/[0.08] transition"
                  >
                    Select Boutique Studio
                  </Link>
                </div>
              </div>

              {/* Plan 2: Turnkey Practice (Featured) */}
              <div className="rounded-3xl bg-[#090425] relative overflow-hidden pt-10 pb-8 px-8 pricing-item-border border border-purple-500/40 shadow-[0_10px_40px_-10px_rgba(110,37,237,0.4)] flex flex-col justify-between md:-translate-y-2">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">Turnkey Practice</h3>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-4xl font-extrabold pricing-gradient-text">
                      ₹38,000
                    </h2>
                    <span className="text-xs font-medium text-zinc-400">/ month</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Complete turnkey delivery engine with contractor rate management, schedule telemetry, and client portals.
                  </p>

                  <div className="my-6 w-full h-[1px] pricing-gradient-divider" />

                  <ul className="space-y-3.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Up to 25 Active Commercial & Villa Sites</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Unlimited Contractor Rate Cards</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Full Multi-Login (Superadmin + Client)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Site Snag Resolution with Photos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Priority 24/7 Studio Engineering SLA</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href="/login"
                    className="hero-button-gradient w-full py-3.5 rounded-lg text-xs font-bold text-white text-center block shadow-lg hover:opacity-90 transition"
                  >
                    Start Free Studio Trial
                  </Link>
                </div>
              </div>

              {/* Plan 3: Enterprise Studio */}
              <div className="rounded-3xl bg-[#06031b] relative overflow-hidden pt-10 pb-8 px-8 pricing-item-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">Enterprise Studio</h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-semibold">
                      Multi-City
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-4xl font-extrabold pricing-gradient-text">
                      Custom
                    </h2>
                    <span className="text-xs font-medium text-zinc-400">quote</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    For multi-city architecture practices requiring private cloud instances, custom domain portals, and bespoke ERP sync.
                  </p>

                  <div className="my-6 w-full h-[1px] pricing-gradient-divider" />

                  <ul className="space-y-3.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Unlimited Sites & Studio Branches</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Custom Domain Client Portals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>SAP / Tally ERP Financial Sync</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Dedicated Architectural Solutions Partner</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="button-border-gradient w-full py-3 rounded-lg text-xs font-semibold text-white text-center block hover:bg-white/[0.08] transition cursor-pointer"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. SHOWCASE BUILT WORKS */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="hero-subtitle-gradient inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-300">
                <img src="/images/icon-title.svg" alt="icon" className="w-3 h-3" />
                <span>Turnkey Portfolio</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Curated Built Architecture & Turnkey Fit-outs
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Delivered across Gurugram, Mumbai, and Bengaluru with zero budget overrun.
              </p>
            </div>
            <Link
              href="/contact"
              className="button-border-gradient px-4 py-2.5 text-xs font-bold rounded-lg text-zinc-200 hover:text-white transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <span>Inquire For Project Showcase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseProjects.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Header */}
                  <div className="h-50 bg-[#0d0922] text-white p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-700/50 text-purple-200 font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        {item.portalCode}
                      </span>
                    </div>
                    <div className="z-10">
                      <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {item.location} • {item.carpetAreaSqFt.toLocaleString()} sq.ft
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                      {item.tagline}
                    </p>

                    <div className="pt-3 border-t border-white/[0.08] space-y-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                        Architectural Finishes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.materialsUsed.map((m: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/client-portal/${item.portalCode}`}
                    target="_blank"
                    className="button-border-gradient w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-center text-zinc-200 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <span>Open Client Portal Walkthrough</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. GLOBAL CTA SECTION */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#140b2e] to-[#090518] border border-purple-500/25 p-8 sm:p-14 lg:p-16 text-center space-y-6 shadow-[0_20px_80px_-20px_rgba(110,37,237,0.4)] relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-500/20 blur-[90px] pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <span className="hero-subtitle-gradient inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                <img src="/images/icon-title.svg" alt="icon" className="w-3.5 h-3.5" />
                <span>Elevate Practice Delivery</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Experience Architectural Execution Without Frictional Snags.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                Whether you are an established practice scaling multiple turnkey sites or a client seeking zero-variance luxury interior delivery.
              </p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/login"
                className="hero-button-gradient w-full sm:w-auto px-8 py-3.5 text-white font-medium text-sm rounded-lg shadow-xl flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Multi-Login Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="button-border-gradient w-full sm:w-auto px-7 py-3.5 text-white font-medium text-sm rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Practice Consultation</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />

      {/* Discovery Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
