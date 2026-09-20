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
} from "lucide-react";
import { pricingPlans, studioFAQs } from "@/data/websiteData";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function WebsitePricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [monthlyTurnover, setMonthlyTurnover] = useState(5000000); // 50 Lakhs
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // ROI Calculations
  // Industry estimates show ~3.5% lost to BOQ calculation errors & unbilled scope changes
  const estimatedSavingsINR = Math.round(monthlyTurnover * 0.042 * 12);
  const estimatedHoursSaved = Math.round((monthlyTurnover / 1000000) * 18);

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-20 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <IndianRupee className="w-3.5 h-3.5 text-zinc-500" />
          <span>Transparent Architectural Studio Commercials</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Invest in High-Margin Studio Operations.
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Predictable pricing with zero hidden implementation fees. Choose the scale that fits your architectural practice.
        </p>

        {/* Monthly / Annual Billing Switcher */}
        <div className="pt-3 inline-flex items-center p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <span>Annual Commitment</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan) => {
          const displayPrice =
            billingCycle === "annual"
              ? Math.round(plan.annualPriceINR / 12)
              : plan.monthlyPriceINR;

          return (
            <div
              key={plan.id}
              className={`rounded-xl border p-6 sm:p-8 flex flex-col justify-between transition relative ${
                plan.isPopular
                  ? "bg-white dark:bg-zinc-900 border-zinc-950 dark:border-zinc-100 ring-2 ring-zinc-950/10 dark:ring-zinc-100/10 shadow-lg"
                  : "bg-white/80 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-zinc-400"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 min-h-[32px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-y border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-zinc-950 dark:text-zinc-50">
                      ₹{displayPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">/ month</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                    {billingCycle === "annual"
                      ? `Billed annually (₹${plan.annualPriceINR.toLocaleString("en-IN")}/yr)`
                      : "Billed month-to-month, cancel anytime"}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">
                    What&apos;s Included
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-6">
                <Link
                  href="/"
                  className={`w-full py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-center block transition shadow-xs ${
                    plan.isPopular
                      ? "bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {plan.ctaText} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Studio Margin & ROI Calculator */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-zinc-400">
              <Calculator className="w-3.5 h-3.5 text-zinc-500" />
              <span>Interactive Practice Savings Model</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1">
              Calculate Your Studio&apos;s Annual Margin Recovery
            </h2>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-zinc-400 block">Current Turnover:</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{formatINR(monthlyTurnover)}/mo</span>
          </div>
        </div>

        {/* Turnover Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-500">
            <span>₹15 Lakhs / mo</span>
            <span>₹1 Crore / mo</span>
            <span>₹3 Crores+ / mo</span>
          </div>
          <input
            type="range"
            min={1500000}
            max={30000000}
            step={500000}
            value={monthlyTurnover}
            onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
            className="w-full accent-zinc-950 dark:accent-zinc-100 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* ROI Output Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-zinc-400 uppercase font-mono text-[10px]">Recovered Annual Wastage</span>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {formatINR(estimatedSavingsINR)}
            </div>
            <p className="text-[11px] text-zinc-500 leading-snug">
              Prevented via dynamic BOQ tax verification & vendor purchase orders
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-zinc-400 uppercase font-mono text-[10px]">Designer Hours Reclaimed</span>
            <div className="text-2xl font-black font-mono text-zinc-950 dark:text-zinc-50">
              ~{estimatedHoursSaved} hrs / mo
            </div>
            <p className="text-[11px] text-zinc-500 leading-snug">
              Saved from repetitive quote formatting & unorganized WhatsApp approvals
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-zinc-400 uppercase font-mono text-[10px]">Net Practice ROI</span>
            <div className="text-2xl font-black font-mono text-zinc-950 dark:text-zinc-50">
              18.4x
            </div>
            <p className="text-[11px] text-zinc-500 leading-snug">
              Platform software subscription cost vs margin leakage stopped
            </p>
          </div>
        </div>
      </div>

      {/* Studio FAQs Accordion */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-500">
            Common questions regarding letterheads, client portals, and Indian tax compliance.
          </p>
        </div>

        <div className="space-y-3">
          {studioFAQs.map((faq, idx) => {
            const isOpen = expandedFaqIndex === idx;

            return (
              <div
                key={idx}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 text-xs font-bold text-zinc-950 dark:text-zinc-50 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-zinc-900 dark:text-zinc-100" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Consultation Strip */}
      <div className="text-center py-4">
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 underline cursor-pointer"
        >
          Need custom multi-studio or enterprise branch licensing? Talk to our practice director →
        </button>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
