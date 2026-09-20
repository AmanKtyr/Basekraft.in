"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronDown,
  ShieldCheck,
  IndianRupee,
  LogIn,
} from "lucide-react";
import { pricingPlans, studioFAQs } from "@/data/websiteData";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [monthlyTurnover, setMonthlyTurnover] = useState(5000000); // 50 Lakhs
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // ROI Calculations
  const estimatedSavingsINR = Math.round(monthlyTurnover * 0.042 * 12);
  const estimatedHoursSaved = Math.round((monthlyTurnover / 1000000) * 18);

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1 w-full space-y-20 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[300px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="hero-subtitle-gradient inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300">
            <IndianRupee className="w-3.5 h-3.5 text-purple-400" />
            <span>Transparent Architectural Commercials</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Invest in High-Margin Studio Operations.
          </h1>

          <p className="text-xs sm:text-base text-zinc-300/80 leading-relaxed font-normal">
            Predictable pricing with zero hidden implementation fees. Choose the scale that fits your architectural practice.
          </p>

          {/* Monthly / Annual Billing Switcher with Helionix Styling */}
          <div className="pt-3 inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-zinc-950 shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-white text-zinc-950 shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual Plan</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-full bg-purple-900/60 text-purple-300 font-bold border border-purple-700/50">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards with Glowing Popular Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price =
              billingCycle === "annual"
                ? `₹${Math.round(plan.annualPriceINR / 12).toLocaleString("en-IN")}`
                : `₹${plan.monthlyPriceINR.toLocaleString("en-IN")}`;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition relative ${
                  plan.isPopular
                    ? "glass-card border-2 border-purple-500/60 bg-[#120f26] shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)] ring-1 ring-purple-400/30"
                    : "glass-card"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold shadow-lg">
                    Most Popular for Growing Studios
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 min-h-[32px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                        {price}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {billingCycle === "annual" ? "/month (billed annually)" : "/month"}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-purple-300 block tracking-wider font-bold">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8">
                  <Link
                    href="/login"
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "hero-button-gradient text-white shadow-lg"
                        : "button-border-gradient text-zinc-200 hover:text-white"
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{plan.ctaText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice Margin Recovery Calculator */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-2">
            <div className="hero-subtitle-gradient inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-xs font-mono uppercase text-purple-300">
              <Calculator className="w-3.5 h-3.5 text-purple-400" />
              <span>Interactive Practice ROI Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Calculate Your Studio&apos;s Leakage Recovery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Contractor dispute leakage, unbilled revision variations, and manual BOQ math discrepancies cost practices ~4.2% of annual fit-out turnover.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase font-mono text-zinc-300">
                  Monthly Project Pipeline Value
                </label>
                <span className="text-2xl font-mono font-black text-white">
                  {formatINR(monthlyTurnover)}
                </span>
              </div>

              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={monthlyTurnover}
                onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-white/[0.08] rounded-lg"
              />

              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>₹10 Lakhs / mo</span>
                <span>₹2.5 Cr / mo</span>
                <span>₹5.0 Cr / mo</span>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1c1638] to-[#120d26] border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                  Estimated Annual Recovery
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                  +{formatINR(estimatedSavingsINR)}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Saved via locked material price contracts and audit trails
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-zinc-400">Staff drafting & calculation hours freed:</span>
                <span className="font-mono font-bold text-white">~{estimatedHoursSaved} hrs/yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Practice Inquiries
            </h2>
            <p className="text-xs text-zinc-400">
              Have questions regarding studio migration, CAD imports, or white-label client portals?
            </p>
          </div>

          <div className="space-y-3">
            {studioFAQs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition hover:border-white/[0.15]"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4.5 pb-5 sm:px-5 text-xs text-zinc-300 leading-relaxed border-t border-white/[0.06] pt-3 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
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
