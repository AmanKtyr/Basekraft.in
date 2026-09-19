"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, Plus, Download, Eye, CheckCircle2, Clock } from "lucide-react";
import { mockBOQItems } from "@/data/mockData";

export default function QuotesPage() {
  const quotes = [
    { code: "P-619/Q-101-V2", project: "The Skydeck Penthouse", client: "Vikramaditya Singhania", total: 8500000, status: "Approved", date: "2026-08-15" },
    { code: "P-438/Q-104-V1", project: "Oberoi Forest Villa", client: "Dr. Radhika Sen", total: 14500000, status: "Client Review", date: "2026-09-02" },
    { code: "P-512/Q-102-V1", project: "Casa Serena Boutique Villa", client: "Armaan D'Souza", total: 7200000, status: "Draft", date: "2026-09-12" },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Estimates & BOQ Proposals
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Dynamic bill of quantities with room-wise itemization, margins, and revision history
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>New Proposal</span>
        </button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
              <th className="py-3 px-4">Quote Version</th>
              <th className="py-3 px-4">Project & Client</th>
              <th className="py-3 px-4 font-sans">Total Proposal Value</th>
              <th className="py-3 px-4">Approval Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {quotes.map((q) => (
              <tr key={q.code} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  {q.code}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">{q.project}</span>
                  <span className="text-[11px] text-zinc-500">{q.client}</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-zinc-950 dark:text-zinc-100">
                  {formatCurrency(q.total)}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono border ${
                    q.status === "Approved"
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
                  }`}>
                    {q.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">{q.date}</td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/projects/P-619`}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium"
                  >
                    View Items
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
