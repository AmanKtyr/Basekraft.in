"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Compass,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  LogIn,
} from "lucide-react";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Mumbai",
    propertyType: "Luxury Villa",
    budget: "₹1 Cr - ₹2.5 Cr",
    timeline: "Next 3-6 Months",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar />

      <main className="flex-1 w-full space-y-20 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[550px] h-[250px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="hero-subtitle-gradient inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Architectural Philosophy & Firm Profile</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Architectural Rigor. Monolithic Restraint. Operational Precision.
          </h1>

          <p className="text-xs sm:text-base text-zinc-300/80 leading-relaxed font-normal">
            Basekraft was founded with a singular conviction: luxury architectural design should never be compromised by chaotic on-site execution.
          </p>
        </div>

        {/* 3 Core Philosophical Tenets with Helionix Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-7 space-y-4 relative overflow-hidden group">
            <div className="features-bg absolute inset-0 pointer-events-none" />
            <div className="icon-border w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm text-purple-300">
              01
            </div>
            <h2 className="text-xl font-bold text-white">
              Material Authenticity
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              We specify materials in their purest states: fluted Travertine, wire-brushed European White Oak, hand-poured micro-topping, and anodized architectural titanium.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-7 space-y-4 relative overflow-hidden group">
            <div className="features-bg absolute inset-0 pointer-events-none" />
            <div className="icon-border w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm text-purple-300">
              02
            </div>
            <h2 className="text-xl font-bold text-white">
              Zero-Variance Fit-outs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Every detail is digitally audited prior to site execution. We bridge the dangerous gap between what was rendered on CAD and what is built on site.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-7 space-y-4 relative overflow-hidden group">
            <div className="features-bg absolute inset-0 pointer-events-none" />
            <div className="icon-border w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm text-purple-300">
              03
            </div>
            <h2 className="text-xl font-bold text-white">
              Client Transparency
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              No hidden contractor kickbacks or ambiguous estimates. Clients receive private portal access with real-time site photos, BOQ item lines, and automated payment tracking.
            </p>
          </div>
        </div>

        {/* Global Hubs Grid */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              Global Presence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Studio Locations & Practice Centers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 font-bold">
                HQ Studio
              </span>
              <h3 className="text-lg font-bold text-white">Gurugram</h3>
              <p className="text-xs text-zinc-400">DLF Cyber City, Tower B, Level 8, DLF Phase II</p>
              <div className="pt-2 text-xs font-mono text-purple-300">hq@basekraft.in</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 font-bold">
                Studio West
              </span>
              <h3 className="text-lg font-bold text-white">Mumbai</h3>
              <p className="text-xs text-zinc-400">Worli Sea Face, High Street Phoenix, Lower Parel</p>
              <div className="pt-2 text-xs font-mono text-purple-300">mumbai@basekraft.in</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 font-bold">
                Studio South
              </span>
              <h3 className="text-lg font-bold text-white">Bengaluru</h3>
              <p className="text-xs text-zinc-400">Outer Ring Road, 100ft Road, Indiranagar</p>
              <div className="pt-2 text-xs font-mono text-purple-300">blr@basekraft.in</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 font-bold">
                International
              </span>
              <h3 className="text-lg font-bold text-white">Dubai & London</h3>
              <p className="text-xs text-zinc-400">One Central, DWTC Dubai • Berkeley Square, Mayfair</p>
              <div className="pt-2 text-xs font-mono text-purple-300">global@basekraft.in</div>
            </div>
          </div>
        </div>

        {/* Interactive Consultation Form */}
        <div className="glass-card rounded-3xl p-6 sm:p-12 max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          <div className="space-y-2">
            <span className="hero-subtitle-gradient inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-300">
              Direct Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Submit Architectural Design Brief
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Share details about your upcoming residential villa, luxury apartment, or commercial HQ.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Brief Received with Gratitude
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                A Senior Partner Architect from our team will contact {formData.name} at {formData.phone} within 24 hours to review drawings and initiate space planning.
              </p>
              <div className="pt-3">
                <Link
                  href="/login"
                  className="hero-button-gradient inline-flex items-center gap-2 px-6 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Launch Studio OS While You Wait</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98110 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                    Target City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition"
                  >
                    <option className="bg-[#0c0a18]">Gurugram / Delhi NCR</option>
                    <option className="bg-[#0c0a18]">Mumbai / MMR</option>
                    <option className="bg-[#0c0a18]">Bengaluru</option>
                    <option className="bg-[#0c0a18]">Hyderabad</option>
                    <option className="bg-[#0c0a18]">Dubai / UAE</option>
                    <option className="bg-[#0c0a18]">Other / International</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                    Property Scale
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition"
                  >
                    <option className="bg-[#0c0a18]">Luxury Villa / Bungalow</option>
                    <option className="bg-[#0c0a18]">Sky Penthouse</option>
                    <option className="bg-[#0c0a18]">Residential 3BHK / 4BHK</option>
                    <option className="bg-[#0c0a18]">Commercial HQ / Tech Office</option>
                    <option className="bg-[#0c0a18]">Boutique Retail / Clinic</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase font-mono text-zinc-300">
                  Project Notes or Spatial Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your design aspirations, target handover date, or specific material preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-white/[0.08] bg-black/40 text-white focus:outline-none focus:border-purple-500 transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="hero-button-gradient w-full py-3.5 px-4 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
                >
                  Submit Brief to Architectural Practice
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
}
