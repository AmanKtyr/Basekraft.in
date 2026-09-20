"use client";

import React from "react";
import Link from "next/link";
import { IndianRupee, TrendingUp, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

export default function FinancesPage() {
  const transactions = [
    { id: "tx-1", projectCode: "P-619", client: "Vikramaditya Singhania", milestone: "Milestone 1: Advance (15%)", amount: 1275000, type: "Client Receipt", date: "2026-07-20", status: "Received" },
    { id: "tx-2", projectCode: "P-619", client: "Vikramaditya Singhania", milestone: "Milestone 2: Civil & Marble (35%)", amount: 2975000, type: "Client Receipt", date: "2026-08-30", status: "Received" },
    { id: "tx-3", projectCode: "P-438", client: "Dr. Radhika Sen", milestone: "Milestone 1: Design Retainer", amount: 500000, type: "Client Receipt", date: "2026-08-10", status: "Received" },
    { id: "tx-4", projectCode: "P-204", client: "Nikhil Kamath", milestone: "Milestone 4: Handover (10%)", amount: 480000, type: "Client Receipt", date: "2026-09-15", status: "Pending" },
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Studio Financials & Milestone Ledger
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              All Finances
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Turnkey cash flow, milestone collections, vendor disbursements, and net studio margins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Total Invoiced</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">₹1.45 Cr</div>
          <span className="text-[10px] text-zinc-400">Current fiscal year</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Total Collected</span>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-600">₹98.50 L</div>
          <span className="text-[10px] text-zinc-400">Received in studio account</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Pending Milestone Dues</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">₹46.50 L</div>
          <span className="text-[10px] text-zinc-400">Awaiting client disbursement</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Studio Net Margin</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">28.4%</div>
          <span className="text-[10px] text-zinc-400">+2.1% efficiency vs baseline</span>
        </div>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Client Milestone Collections</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Milestone Detail</th>
              <th className="py-3 px-4 font-sans">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  <Link href={`/projects/${tx.projectCode}`} className="hover:underline">
                    {tx.projectCode}
                  </Link>
                </td>
                <td className="py-3.5 px-4 font-semibold text-zinc-900 dark:text-zinc-100">{tx.client}</td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">{tx.milestone}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 dark:text-zinc-100">
                  {formatCurrency(tx.amount)}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono border ${
                    tx.status === "Received"
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300"
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
