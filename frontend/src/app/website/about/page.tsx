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
} from "lucide-react";

export default function WebsiteAboutPage() {
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
    <div className="space-y-20 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <Compass className="w-3.5 h-3.5 text-zinc-500" />
          <span>Architectural Philosophy & Firm Profile</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Architectural Rigor. Monolithic Restraint. Operational Excellence.
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Basekraft was founded with a singular conviction: luxury architectural design should never be compromised by chaotic on-site execution.
        </p>
      </div>

      {/* 3 Core Philosophical Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs">
            01
          </div>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
            Material Authenticity
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We prioritize honest, enduring natural textures—hand-selected Italian marble, sustainable teak woodwork, micro-cement, and tempered raw brass over superficial veneers.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs">
            02
          </div>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
            Zero-Variance Turnkey Execution
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Blueprints must reflect reality down to the millimeter. Our integrated Studio OS enforces rigorous site supervisor tolerances (+/- 1.5mm) across civil, carpentry, and electrical rough-ins.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs">
            03
          </div>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
            Total Commercial Transparency
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every client receives an itemized, room-wise BOQ and a live private portal. No hidden contractor margins, zero ambiguous lump-sums, and 100% auditable invoice milestones.
          </p>
        </div>
      </div>

      {/* Global Studio Locations Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Global Studio Presence
          </h2>
          <p className="text-xs text-zinc-500">
            Operating across major design-build hubs with localized project teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600">Headquarters</span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Gurugram Studio</h3>
            <p className="text-xs text-zinc-500 leading-snug">
              DLF Cyber City, Tower B, Level 8, Phase 5, Gurugram, Haryana 122002
            </p>
            <span className="text-[11px] font-mono text-zinc-400 block pt-1">+91 98101 22345</span>
          </div>

          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-400">West India Hub</span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Mumbai Studio</h3>
            <p className="text-xs text-zinc-500 leading-snug">
              Worli Sea Face, High Street Phoenix Annexe, Lower Parel, Mumbai 400013
            </p>
            <span className="text-[11px] font-mono text-zinc-400 block pt-1">+91 98200 44210</span>
          </div>

          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-400">South India Hub</span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Bengaluru Studio</h3>
            <p className="text-xs text-zinc-500 leading-snug">
              Outer Ring Road, Indiranagar 100ft Road, Bengaluru, Karnataka 560038
            </p>
            <span className="text-[11px] font-mono text-zinc-400 block pt-1">+91 98450 11984</span>
          </div>

          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-400">International Hubs</span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Dubai & London</h3>
            <p className="text-xs text-zinc-500 leading-snug">
              One Central DWTCA, Dubai UAE • Berkeley Square, Mayfair London W1J 6BQ
            </p>
            <span className="text-[11px] font-mono text-zinc-400 block pt-1">global@basekraft.in</span>
          </div>
        </div>
      </div>

      {/* On-Page Full Project Consultation Booking Form */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Sparkles className="w-3 h-3 text-zinc-500" />
            <span>Direct Principal Architect Inquiry</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Book a Design & Turnkey Discovery Session
          </h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
            Fill in your property specifications to schedule an architectural consultation, space planning survey, or preliminary BOQ study.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Inquiry Confirmed & Logged
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-zinc-900 dark:text-zinc-100">{formData.name}</strong>. Your project brief has been logged into Basekraft Studio CRM. Our Lead Architect will reach out via WhatsApp on <strong className="text-zinc-900 dark:text-zinc-100">{formData.phone}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/website/portfolio"
                className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 underline hover:text-zinc-500"
              >
                Browse Built Architectural Portfolio →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Dr. Radhika Sen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. +91 99102 33890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. client@aiims.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Property City / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gurugram / Mumbai / Alibaug"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Property Classification
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                >
                  <option value="Luxury Villa">Luxury Villa</option>
                  <option value="Penthouse / Duplex">Penthouse / Duplex</option>
                  <option value="Residential 3BHK / 4BHK">Residential 3BHK / 4BHK</option>
                  <option value="Commercial Office / HQ">Commercial Office / HQ</option>
                  <option value="Retail Boutique">Retail Boutique</option>
                  <option value="Solar EPC / Rooftop">Solar EPC / Rooftop</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                >
                  <option value="₹40 L - ₹75 L">₹40 L - ₹75 L</option>
                  <option value="₹75 L - ₹1.5 Cr">₹75 L - ₹1.5 Cr</option>
                  <option value="₹1.5 Cr - ₹3 Cr">₹1.5 Cr - ₹3 Cr</option>
                  <option value="₹3 Cr+ (Ultra Luxury)">₹3 Cr+ (Ultra Luxury)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Project Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                >
                  <option value="Immediate (This Month)">Immediate (This Month)</option>
                  <option value="Next 1-3 Months">Next 1-3 Months</option>
                  <option value="Next 3-6 Months">Next 3-6 Months</option>
                  <option value="Planning Phase">Planning Phase</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Design Vision, Carpet Area & Requirements
              </label>
              <textarea
                rows={4}
                placeholder="e.g. Bare shell 4,500 sq.ft villa in DLF Phase 5. Looking for turn-key interior civil, carpentry, marble laying, and concealed smart automation..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md leading-relaxed focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-md cursor-pointer"
              >
                Submit Consultation Request →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
