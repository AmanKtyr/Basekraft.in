"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Download,
  IndianRupee,
  Share2,
  Sparkles,
  ShieldCheck,
  Check,
  MessageSquare,
} from "lucide-react";
import { initialProjects } from "@/data/mockData";

export default function ClientPortalPage() {
  const params = useParams();
  const code = (params.code as string) || "P-619";
  const project =
    initialProjects.find((p) => p.code.toLowerCase() === code.toLowerCase()) ||
    initialProjects[0];

  const [approvedDesigns, setApprovedDesigns] = useState<Record<string, boolean>>({
    d1: true,
    d2: false,
  });

  const toggleApproval = (id: string) => {
    setApprovedDesigns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Client Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs tracking-wider">
            IH
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{project.name}</h1>
            <p className="text-xs text-zinc-500">
              Welcome, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{project.clientName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target Handover: {project.targetHandover}</span>
          </div>
          <Link
            href="/projects"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md"
          >
            Studio View
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Progress Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Current Phase</span>
              <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 mt-0.5">
                {project.subStage}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-zinc-950 dark:text-zinc-100">
                {project.progressPercent}%
              </span>
              <span className="text-xs text-zinc-400 block">Overall Execution Complete</span>
            </div>
          </div>

          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-950 dark:bg-zinc-100 transition-all duration-500 rounded-full"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3D Visual Approvals Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Design Approvals & 3D Renders
              </h3>
              <p className="text-xs text-zinc-500">
                Please review and approve the concept visualizations for on-site fabrication
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Design 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xs">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center relative group">
                <div className="text-center p-4">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">3D Render Preview</span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                    Master Bedroom Custom Smoked Oak Veneer Wardrobe
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <h4 className="text-xs font-semibold">Veneer Finish Sample #V-42</h4>
                  <p className="text-[11px] text-zinc-500">Uploaded by Ananya Deshmukh</p>
                </div>
                <button
                  onClick={() => toggleApproval("d1")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                    approvedDesigns.d1
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{approvedDesigns.d1 ? "Approved" : "Approve Render"}</span>
                </button>
              </div>
            </div>

            {/* Design 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xs">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center relative group">
                <div className="text-center p-4">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">3D Render Preview</span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                    Living Room Italian Statuario Marble & Track Light Layout
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <h4 className="text-xs font-semibold">Lighting Circuit Plan #E-102</h4>
                  <p className="text-[11px] text-zinc-500">Uploaded by Ar. Aman Katyar</p>
                </div>
                <button
                  onClick={() => toggleApproval("d2")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                    approvedDesigns.d2
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{approvedDesigns.d2 ? "Approved" : "Approve Render"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Payment Summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Turnkey Financial Milestone Breakdown
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Milestone 1: Mobilization & Concept Sign-off (15%)</span>
              </div>
              <span className="font-mono font-semibold text-emerald-600">Paid • ₹12,75,000</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Milestone 2: Civil Demolition & Italian Marble Flooring (35%)</span>
              </div>
              <span className="font-mono font-semibold text-emerald-600">Paid • ₹29,75,000</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="font-medium">Milestone 3: Carpentry, Modular Kitchen & False Ceiling (35%)</span>
              </div>
              <span className="font-mono font-bold text-zinc-950 dark:text-zinc-100">Upcoming • ₹29,75,000</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
