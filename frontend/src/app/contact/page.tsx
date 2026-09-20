"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function ContactPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "Turnkey Architecture & Fit-out Project",
    city: "Gurugram / Delhi NCR",
    budget: "₹1.5 Cr - ₹5 Cr",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1 w-full space-y-20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative isolate">
        {/* Concentric Ambient Rings & Blur Lighting from Helyonex */}
        <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
          <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]" />
          <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <img src="/images/blur-02.svg" alt="blur" className="max-w-none opacity-80" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <img src="/images/blur-01.svg" alt="blur" className="max-w-none opacity-80" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#6e25ed]/20 blur-[130px] rounded-full pointer-events-none" />
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-10 sm:pt-16">
          <div className="hero-subtitle-gradient relative mb-2 font-medium text-xs sm:text-sm inline-flex items-center gap-2 py-2 px-5 rounded-full cursor-pointer hover:scale-105 transition shadow-[0_0_24px_rgba(160,115,238,0.25)]">
            <img src="/images/icon-title.svg" alt="icon" className="w-4 h-4" />
            <span className="hero-subtitle-text font-semibold">
              Get In Touch With Basekraft
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connect With Our Architectural Leadership.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are commissioning a luxury turnkey residence or onboarding your practice to the Studio OS ecosystem, we are here to partner.
          </p>
        </div>

        {/* Grid: Interactive Form (Left) & Studio Direct Contacts (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 rounded-3xl bg-[#07031e]/80 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(110,37,237,0.3)] relative overflow-hidden">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Inquiry Received & Logged
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. A principal studio architect will review your project parameters and respond within 4 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        organization: "",
                        inquiryType: "Turnkey Architecture & Fit-out Project",
                        city: "Gurugram / Delhi NCR",
                        budget: "₹1.5 Cr - ₹5 Cr",
                        message: "",
                      });
                    }}
                    className="button-border-gradient px-6 py-2.5 rounded-lg text-xs font-semibold text-zinc-200 hover:text-white transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Project Consultation Form</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill in your details below for tailored parametric estimation or studio onboarding.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ar. Vikramaditya Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#030014]/60 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#030014]/60 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98100 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#030014]/60 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Studio / Practice Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Roy Atelier & Partners"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-[#030014]/60 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#07041a] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="Turnkey Architecture & Fit-out Project">
                        Turnkey Architecture & Fit-out Project
                      </option>
                      <option value="Studio OS Platform Subscription">
                        Studio OS Platform Subscription
                      </option>
                      <option value="Private Client Portal Walkthrough">
                        Private Client Portal Walkthrough
                      </option>
                      <option value="Contractor / Vendor Rate Partnership">
                        Contractor / Vendor Rate Partnership
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#07041a] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="< ₹50 Lakhs">&lt; ₹50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1.5 Cr">₹50 Lakhs - ₹1.5 Cr</option>
                      <option value="₹1.5 Cr - ₹5 Cr">₹1.5 Cr - ₹5 Cr</option>
                      <option value="₹5 Cr+ Commercial / Villa">₹5 Cr+ Commercial / Villa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">
                    Project Scope & Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your site location, carpet area, target handover date, and specific architectural fit-out requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#030014]/60 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="hero-button-gradient w-full py-4 rounded-xl text-sm font-bold text-white shadow-xl hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Architectural Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Coordinates & Fast Contact */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="rounded-3xl bg-[#07031e]/80 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Studio Headquarters</h4>
                  <p className="text-xs text-zinc-400">Delhi NCR & Mumbai Practice</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/[0.06] text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Gurugram Central:</span>
                    <span>Level 8, DLF Cyber Park, Phase II, Sector 20, Gurugram, Haryana 122008</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Mumbai Atelier:</span>
                    <span>Platina Tower, Bandra Kurla Complex (BKC), Bandra East, Mumbai 400051</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Telemetry & Lines */}
            <div className="rounded-3xl bg-[#07031e]/80 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Communication</h4>
                  <p className="text-xs text-zinc-400">Live Practice Support</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs text-zinc-300">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Inquiries</span>
                  </div>
                  <a
                    href="mailto:partnerships@basekraft.in"
                    className="font-mono text-purple-300 hover:text-purple-200 font-semibold"
                  >
                    partnerships@basekraft.in
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span>Direct Concierge</span>
                  </div>
                  <a
                    href="tel:+919810234567"
                    className="font-mono text-purple-300 hover:text-purple-200 font-semibold"
                  >
                    +91 (0124) 489-0211
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Working Hours</span>
                  </div>
                  <span className="font-mono text-zinc-400">
                    Mon - Sat (09:30 - 19:00 IST)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Virtual Discovery Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1b0e3e] to-[#070318] border border-purple-500/30 p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300">
                <Calendar className="w-4 h-4" />
                <span>Instant Video Discovery</span>
              </div>
              <h4 className="text-lg font-bold text-white leading-tight">
                Schedule a 30-Min Architectural Consultation
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connect directly with our Principal Turnkey Director to review floor plans and BOQ structures over Google Meet.
              </p>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="button-border-gradient w-full py-3 rounded-xl text-xs font-bold text-white hover:bg-white/[0.08] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Video Discovery Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
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
