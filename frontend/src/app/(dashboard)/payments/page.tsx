"use client";

import React, { useState } from "react";
import { WalletCards, Plus, CheckCircle, XCircle, Clock, ArrowUpRight } from "lucide-react";
import { mockPaymentRequests } from "@/data/mockData";
import { PaymentRequest } from "@/types";

export default function PaymentsPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>(mockPaymentRequests);

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const updateStatus = (id: string, newStatus: PaymentRequest["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Payment Requests & Site Ledger
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Authorize on-site material purchases, contractor labor advances, and petty cash wallets
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Pending Approvals</span>
          <div className="mt-2 text-xl font-bold font-mono text-zinc-950 dark:text-zinc-100">₹1,45,000</div>
          <span className="text-[11px] text-zinc-400">1 Request awaiting Principal sign-off</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Approved for Disbursement</span>
          <div className="mt-2 text-xl font-bold font-mono text-zinc-950 dark:text-zinc-100">₹80,000</div>
          <span className="text-[11px] text-zinc-400">Contractor carpentry wages</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Active Site Wallets Balance</span>
          <div className="mt-2 text-xl font-bold font-mono text-zinc-950 dark:text-zinc-100">₹65,400</div>
          <span className="text-[11px] text-zinc-400">Distributed across 4 site supervisors</span>
        </div>
      </div>

      {/* Requests Table */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Requester & Role</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 font-sans">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  {r.projectCode}
                  <span className="block font-sans font-normal text-[11px] text-zinc-500">{r.projectName}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">{r.requestedBy}</span>
                  <span className="text-[11px] text-zinc-400">{r.role}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-300">{r.category}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 dark:text-zinc-100">
                  {formatCurrency(r.amount)}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono border ${
                      r.status === "approved"
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950"
                        : r.status === "paid"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {r.status === "pending" ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateStatus(r.id, "approved")}
                        className="px-2.5 py-1 rounded bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[11px] font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "rejected")}
                        className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-600 text-[11px]"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-zinc-400 font-mono">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
