"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  MapPin,
  Phone,
  User,
  ExternalLink,
  Clock,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { initialProjects, mockBOQItems } from "@/data/mockData";
import { ChecklistTracker } from "@/components/workspace/ChecklistTracker";
import { GanttChart } from "@/components/workspace/GanttChart";
import { AIProAssistant } from "@/components/workspace/AIProAssistant";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectCode = (params.id as string) || "P-619";

  const project =
    initialProjects.find((p) => p.code.toLowerCase() === projectCode.toLowerCase()) ||
    initialProjects[0];

  const [activeTab, setActiveTab] = useState<"checklists" | "gantt" | "boq" | "ai">("checklists");

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back link & Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <Link
          href="/projects"
          className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Hub</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>WORKSPACE</span>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{project.code}</span>
        </div>
      </div>

      {/* Project Master Header Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-sm bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 px-2 py-0.5 rounded">
                {project.code}
              </span>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{project.name}</h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                {project.stage}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                {project.clientName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {project.city}, {project.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                Target Handover: {project.targetHandover}
              </span>
              <span className="font-mono text-zinc-400">{project.carpetAreaSqFt} sq.ft</span>
            </div>
          </div>

          {/* Right Metrics & Client Portal link */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xs text-zinc-400 font-mono">Total Budget</div>
              <div className="text-base font-bold font-mono text-zinc-950 dark:text-zinc-100">
                {formatCurrency(project.budget)}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Spent: {formatCurrency(project.spent)} ({project.progressPercent}%)
              </div>
            </div>

            <Link
              href={`/client-portal/${project.code}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-medium transition"
            >
              <span>Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab("checklists")}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === "checklists"
              ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
          }`}
        >
          Checklists & Stage Gate
        </button>
        <button
          onClick={() => setActiveTab("gantt")}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === "gantt"
              ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
          }`}
        >
          Milestone Gantt
        </button>
        <button
          onClick={() => setActiveTab("boq")}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === "boq"
              ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
          }`}
        >
          BOQ & Rates
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`px-4 py-2.5 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "ai"
              ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
          <span>AI Studio Copilot</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "checklists" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChecklistTracker checkpoints={project.checkpoints} />
          </div>
          <div>
            <AIProAssistant projectCode={project.code} />
          </div>
        </div>
      )}

      {activeTab === "gantt" && (
        <div className="space-y-4">
          <GanttChart />
        </div>
      )}

      {activeTab === "boq" && (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Detailed Bill of Quantities (BOQ)
              </h3>
              <p className="text-xs text-zinc-500">
                Version: <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{project.code}/Q-101-V2</span> (Client Approved)
              </p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950">
              Export PDF Proposal
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-mono text-[11px]">
                  <th className="py-2.5 px-3">Room / Zone</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Item Specification</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                  <th className="py-2.5 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {mockBOQItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                    <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{item.room}</td>
                    <td className="py-3 px-3 font-mono text-zinc-500">{item.category}</td>
                    <td className="py-3 px-3 max-w-sm">
                      <p className="text-zinc-800 dark:text-zinc-200">{item.description}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{item.specificationNotes}</p>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-700 dark:text-zinc-300">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-700 dark:text-zinc-300">
                      ₹{item.unitRate.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-zinc-950 dark:text-zinc-100">
                      ₹{item.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="max-w-2xl mx-auto">
          <AIProAssistant projectCode={project.code} />
        </div>
      )}
    </div>
  );
}
