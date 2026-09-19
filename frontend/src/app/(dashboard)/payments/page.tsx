"use client";

import React, { useState } from "react";
import { WalletCards, Plus, CheckCircle, XCircle, Clock, ArrowUpRight, X } from "lucide-react";
import { mockPaymentRequests, initialProjects } from "@/data/mockData";
import { PaymentRequest } from "@/types";

export function NewPaymentRequestModal({
  isOpen,
  onClose,
  onAddRequest,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddRequest: (req: PaymentRequest) => void;
}) {
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [requestedBy, setRequestedBy] = useState("Amit Verma (Site Supervisor)");
  const [category, setCategory] = useState("Material Purchase");
  const [amount, setAmount] = useState("35000");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: PaymentRequest = {
      id: `pay-${Date.now()}`,
      projectCode: selectedProject.code,
      projectName: selectedProject.name,
      requestedBy: requestedBy.split("(")[0].trim(),
      role: "Site Supervisor",
      amount: Number(amount) || 0,
      category,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      notes: `Site authorization request for ${selectedProject.name}`,
    };
    onAddRequest(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              New Site Payment Request
            </h2>
            <p className="text-xs text-zinc-500">
              Request contractor advance, urgent materials, or supervisor wallet replenishment
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Select Project *</label>
            <select
              value={selectedProject.code}
              onChange={(e) => {
                const found = initialProjects.find((p) => p.code === e.target.value);
                if (found) setSelectedProject(found);
              }}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
            >
              {initialProjects.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} - {p.name} ({p.clientName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Requester Name *</label>
              <input
                type="text"
                required
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="Material Purchase">Material Purchase</option>
                <option value="Labor Wages">Labor Wages</option>
                <option value="Contractor Advance">Contractor Advance</option>
                <option value="Equipment Rental">Equipment Rental</option>
                <option value="Site Petty Cash">Site Petty Cash</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Requested Amount (₹) *</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium hover:opacity-90 transition shadow-xs"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>(mockPaymentRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const updateStatus = (id: string, newStatus: PaymentRequest["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleAddRequest = (newReq: PaymentRequest) => {
    setRequests((prev) => [newReq, ...prev]);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs cursor-pointer active:scale-98"
        >
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
                        className="px-2.5 py-1 rounded bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[11px] font-medium hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "rejected")}
                        className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-600 text-[11px] transition"
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

      <NewPaymentRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddRequest={handleAddRequest}
      />
    </div>
  );
}
