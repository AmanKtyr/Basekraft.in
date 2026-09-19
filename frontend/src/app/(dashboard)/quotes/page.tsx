"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, Plus, Download, Eye, CheckCircle2, Clock, X, Building2, Check } from "lucide-react";
import { initialProjects } from "@/data/mockData";

interface QuoteProposal {
  code: string;
  project: string;
  client: string;
  total: number;
  status: "Approved" | "Client Review" | "Draft";
  date: string;
}

const initialQuotes: QuoteProposal[] = [
  { code: "P-619/Q-101-V2", project: "The Skydeck Penthouse", client: "Vikramaditya Singhania", total: 8500000, status: "Approved", date: "2026-08-15" },
  { code: "P-438/Q-104-V1", project: "Oberoi Forest Villa", client: "Dr. Radhika Sen", total: 14500000, status: "Client Review", date: "2026-09-02" },
  { code: "P-512/Q-102-V1", project: "Casa Serena Boutique Villa", client: "Armaan D'Souza", total: 7200000, status: "Draft", date: "2026-09-12" },
];

export function NewProposalModal({
  isOpen,
  onClose,
  onAddProposal,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddProposal: (quote: QuoteProposal) => void;
}) {
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [totalAmount, setTotalAmount] = useState("4500000");
  const [scopeName, setScopeName] = useState("Civil, Carpentry & Modular Kitchen Phase 1");
  const [marginPercent, setMarginPercent] = useState("18");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: QuoteProposal = {
      code: `${selectedProject.code}/Q-${Math.floor(100 + Math.random() * 900)}-V1`,
      project: selectedProject.name,
      client: selectedProject.clientName,
      total: Number(totalAmount) || 0,
      status: "Draft",
      date: new Date().toISOString().split("T")[0],
    };
    onAddProposal(newQuote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Create New BOQ Proposal
            </h2>
            <p className="text-xs text-zinc-500">
              Generate versioned bill of quantities with markup margins
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

          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Proposal Scope / Title *</label>
            <input
              type="text"
              required
              value={scopeName}
              onChange={(e) => setScopeName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Estimated Total (₹) *</label>
              <input
                type="number"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Target Margin (%)</label>
              <input
                type="number"
                value={marginPercent}
                onChange={(e) => setMarginPercent(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
            <div className="flex justify-between">
              <span>Client:</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{selectedProject.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{selectedProject.city}</span>
            </div>
            <div className="flex justify-between">
              <span>Initial Version:</span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200">{selectedProject.code}/Q-Draft-V1</span>
            </div>
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
              Generate Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteProposal[]>(initialQuotes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const handleAddProposal = (newQ: QuoteProposal) => {
    setQuotes((prev) => [newQ, ...prev]);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs cursor-pointer active:scale-98"
        >
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
                    href={`/projects/P-619?tab=boq`}
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

      <NewProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProposal={handleAddProposal}
      />
    </div>
  );
}
