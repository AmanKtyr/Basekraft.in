"use client";

import React, { useRef, useState } from "react";
import {
  Download,
  Share2,
  X,
  Building2,
  Phone,
  Mail,
  Globe,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileText,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { QuoteProposal } from "@/app/(dashboard)/quotes/page";
import { getLetterheadConfig, CompanyLetterheadConfig } from "@/data/letterheadConfig";
import { generateQuotePdf } from "@/utils/generateQuotePdf";

interface QuotationLetterheadModalProps {
  quote: QuoteProposal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuotationLetterheadModal({
  quote,
  isOpen,
  onClose,
}: QuotationLetterheadModalProps) {
  const config = getLetterheadConfig();
  const printRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<"digital" | "uploadedPdf" | "prePrinted">(
    config.letterheadMode || "digital"
  );
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !quote) return null;

  // Calculate Subtotal & Tax Breakdown
  const subTotal = quote.items.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const totalGst = quote.items.reduce((acc, item) => {
    const itemSub = item.qty * item.unitRate;
    return acc + itemSub * (item.gstPercent / 100);
  }, 0);
  const grandTotal = subTotal + totalGst;

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      generateQuotePdf(quote, config, activeMode);
    } catch (err) {
      console.error("Direct PDF Generation error:", err);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Official Quotation Proposal — ${config.studioBrand}*\n\n` +
      `*Quote Ref:* ${quote.code}\n` +
      `*Project:* ${quote.projectName} (${quote.projectCode})\n` +
      `*Client:* ${quote.clientName}\n` +
      `*Total Investment:* ${formatCurrency(grandTotal)} (Incl. GST)\n` +
      `*Items Count:* ${quote.items.length} Scope deliverables\n\n` +
      `View your interactive digital proposal here:\n` +
      `http://localhost:3000/quotes`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      {/* Container Card */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Top Control Bar (Hidden in Print Mode) */}
        <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-wrap items-center justify-between gap-2.5 shrink-0 print:hidden">
          {/* Mode Switcher Pill */}
          <div className="flex items-center gap-1 bg-zinc-200/70 dark:bg-zinc-800/80 p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveMode("digital")}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                activeMode === "digital"
                  ? "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 shadow-xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Digital Letterhead
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("uploadedPdf")}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1 ${
                activeMode === "uploadedPdf"
                  ? "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 shadow-xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              <FileText className="w-3 h-3 text-blue-500" />
              <span>Custom PDF Template</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("prePrinted")}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                activeMode === "prePrinted"
                  ? "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 shadow-xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
              title="Prints directly onto your company physical pre-printed letterhead sheets"
            >
              Pre-Printed Stationery
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/settings?tab=organizationDetails"
              className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition flex items-center gap-1"
            >
              <span>Letterhead Settings</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </Link>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Direct Save as PDF Button (No browser print popup) */}
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 rounded bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98 disabled:opacity-75"
              title="Directly download official proposal PDF"
            >
              {isDownloading ? (
                <>
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Saving PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Save as PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-xs space-y-6 select-text" ref={printRef} id="printable-quotation">
          
          {/* MODE 1: DIGITAL STUDIO LETTERHEAD */}
          {activeMode === "digital" && (
            <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-zinc-950 dark:bg-zinc-100 rounded-md flex items-center justify-center text-white dark:text-zinc-950 font-black text-sm tracking-wider">
                      BK
                    </div>
                    <div>
                      <h1 className="text-base font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
                        {config.studioBrand}
                      </h1>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-wide">
                        {config.legalName}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1">
                    {config.tagline}
                  </p>
                </div>

                {/* Tax & Entity Identifiers */}
                <div className="text-left sm:text-right text-[11px] font-mono text-zinc-500 space-y-0.5">
                  <div>GSTIN: <strong className="text-zinc-900 dark:text-zinc-100">{config.gstin}</strong></div>
                  <div>PAN: <strong className="text-zinc-900 dark:text-zinc-100">{config.pan}</strong></div>
                  <div>CIN: {config.cin}</div>
                  <div className="text-[10px] text-zinc-400 font-sans pt-1">
                    {config.address}, {config.cityStatePincode}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-sans">
                    {config.phone} • {config.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: CUSTOM UPLOADED PDF LETTERHEAD TEMPLATE */}
          {activeMode === "uploadedPdf" && (
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <span>{config.uploadedPdfName || "Company_Official_Letterhead.pdf"}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 font-medium">
                        Custom PDF Letterhead Active
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      {config.studioBrand} • {config.gstin} • Official stationery overlay
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-[11px] text-zinc-500 font-mono">
                  <div>Top Clearance: {config.topMarginMm || 42}mm</div>
                  <div>CIN: {config.cin}</div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: PRE-PRINTED PHYSICAL STATIONERY MODE */}
          {activeMode === "prePrinted" && (
            <div className="py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-center bg-zinc-50/40 dark:bg-zinc-900/20 print:border-0 print:py-12">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                [ Header Clearance Space: {config.topMarginMm || 42}mm ]
              </span>
              <span className="text-[10px] text-zinc-400 block print:hidden mt-0.5">
                Digital header is suppressed. Insert your physical company letterhead into your office printer.
              </span>
            </div>
          )}

          {/* DOCUMENT TITLE & METADATA BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                COMMERCIAL PROPOSAL & BILL OF QUANTITIES
              </span>
              <span className="text-base font-bold font-mono text-zinc-950 dark:text-zinc-100">
                {quote.code}
              </span>
            </div>

            <div className="flex items-center gap-4 text-left sm:text-right font-mono text-[11px]">
              <div>
                <span className="text-zinc-400 block text-[10px] font-sans">Issue Date</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{quote.createdDate}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] font-sans">Quote Validity</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">15 Calendar Days</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] font-sans">Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950">
                  {quote.status}
                </span>
              </div>
            </div>
          </div>

          {/* CLIENT & PROJECT DETAILS (TWO COLUMN BOX) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bill To */}
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
                Billed To (Client)
              </span>
              <div className="text-sm font-bold text-zinc-950 dark:text-zinc-100">
                {quote.clientName}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-xs">
                Project Site: <strong className="text-zinc-900 dark:text-zinc-200">{quote.projectName}</strong>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                Project Code: {quote.projectCode}
              </div>
            </div>

            {/* Scope / Discipline */}
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
                Project Scope & Classification
              </span>
              <div className="text-sm font-bold text-zinc-950 dark:text-zinc-100">
                {quote.sector}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-xs">
                Specification Standard: <strong className="text-zinc-900 dark:text-zinc-200">Tier-1 Architectural Grade</strong>
              </div>
              <div className="text-[11px] text-zinc-500">
                Authorized Lead: {quote.approvedBy || config.signatoryName}
              </div>
            </div>
          </div>

          {/* ITEMIZED BOQ RATE SCHEDULE TABLE */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
              <span>Itemized Commercial Scope Schedule</span>
              <span className="font-mono text-zinc-500 font-normal">({quote.items.length} Line Items)</span>
            </h3>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold">
                    <th className="p-2.5 w-8 text-center">#</th>
                    <th className="p-2.5">Room / Zone</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 min-w-[220px]">Item Description & Material Specification</th>
                    <th className="p-2.5 text-right w-16">Qty</th>
                    <th className="p-2.5 w-16">Unit</th>
                    <th className="p-2.5 text-right w-24">Rate (₹)</th>
                    <th className="p-2.5 text-right w-16">GST %</th>
                    <th className="p-2.5 text-right w-28">Net Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {quote.items.map((item, idx) => {
                    const itemNet = item.qty * item.unitRate;
                    const itemGst = itemNet * (item.gstPercent / 100);
                    const itemTotal = itemNet + itemGst;

                    return (
                      <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                        <td className="p-2.5 text-center font-mono text-zinc-400">{idx + 1}</td>
                        <td className="p-2.5 font-medium text-zinc-900 dark:text-zinc-100">{item.roomOrZone}</td>
                        <td className="p-2.5 text-zinc-600 dark:text-zinc-400">{item.category}</td>
                        <td className="p-2.5 text-zinc-800 dark:text-zinc-200">{item.description}</td>
                        <td className="p-2.5 text-right font-mono font-semibold">{item.qty}</td>
                        <td className="p-2.5 text-zinc-500 font-mono">{item.uom}</td>
                        <td className="p-2.5 text-right font-mono">₹{item.unitRate.toLocaleString("en-IN")}</td>
                        <td className="p-2.5 text-right font-mono text-zinc-500">{item.gstPercent}%</td>
                        <td className="p-2.5 text-right font-mono font-bold text-zinc-950 dark:text-zinc-100">
                          ₹{itemTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* COMMERCIAL TOTALS & TAX BREAKDOWN */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-2">
            {/* Bank Details for Direct RTGS / NEFT / Cheque */}
            <div className="sm:max-w-md w-full p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
                Official Settlement Bank Account
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Bank Name</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{config.bankName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Account Holder</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate block">{config.accountName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Account Number</span>
                  <span className="font-mono font-bold text-zinc-950 dark:text-zinc-50">{config.accountNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">IFSC Code</span>
                  <span className="font-mono font-bold text-zinc-950 dark:text-zinc-50">{config.ifscCode}</span>
                </div>
              </div>
              <div className="pt-1 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500">
                Direct UPI ID: <strong className="text-zinc-900 dark:text-zinc-100">{config.upiId}</strong>
              </div>
            </div>

            {/* Calculations Summary Ledger */}
            <div className="sm:w-72 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1 text-zinc-600 dark:text-zinc-400">
                <span>Subtotal (Excl. Taxes):</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(subTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1 text-zinc-600 dark:text-zinc-400">
                <span>Total GST (CGST + SGST):</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(totalGst)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t-2 border-b-2 border-zinc-950 dark:border-zinc-100 text-sm">
                <span className="font-bold text-zinc-950 dark:text-zinc-50">Grand Total:</span>
                <span className="font-mono font-black text-zinc-950 dark:text-zinc-50">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 text-right">
                All amounts in Indian Rupees (INR).
              </p>
            </div>
          </div>

          {/* STANDARD PAYMENT TERMS & COMMERCIAL POLICIES */}
          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Commercial Terms & Milestone Disbursal Terms:
            </h4>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {config.termsAndConditions.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ol>
          </div>

          {/* SIGNATURES & AUTHORIZATION STAMP FOOTER */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-8">
            {/* Studio Authorized Signatory */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
                For {config.legalName}
              </span>
              <div className="h-16 flex items-center">
                <div className="px-3 py-1.5 border border-dashed border-zinc-300 dark:border-zinc-700 rounded text-center text-[10px] font-mono text-zinc-400">
                  [DIGITALLY SIGNED & VERIFIED BY ARCHITECTURAL OS]
                </div>
              </div>
              <div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">{config.signatoryName}</div>
                <div className="text-[11px] text-zinc-500">{config.signatoryTitle}</div>
              </div>
            </div>

            {/* Client Acceptance Sign-off */}
            <div className="space-y-3 text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
                Client Acceptance & Confirmation
              </span>
              <div className="h-16 flex items-center justify-end">
                <div className="w-48 border-b border-zinc-400 dark:border-zinc-600" />
              </div>
              <div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">{quote.clientName}</div>
                <div className="text-[11px] text-zinc-500">Date: ________________________</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
