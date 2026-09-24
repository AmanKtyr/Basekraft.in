"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Clock,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Project, ProjectStage } from "@/types";
import { themeConfig } from "@/config/theme";

interface ProjectsTableProps {
  projects: Project[];
  selectedStage: string;
  onSelectStage: (stage: string) => void;
}

export function ProjectsTable({ projects, selectedStage, onSelectStage }: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesStage = selectedStage === "all" || p.stage === selectedStage;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const getStageBadge = (stage: ProjectStage) => {
    switch (stage) {
      case "sales":
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
      case "design":
        return "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-600";
      case "execution":
        return "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 font-semibold";
      case "handover":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "inactive":
        return "bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs border border-zinc-200 dark:border-zinc-800 rounded-md p-1 bg-white dark:bg-zinc-900">
          {[
            { id: "all", label: "All Projects" },
            { id: "sales", label: "Sales & Pitch" },
            { id: "design", label: "Concept & 3D" },
            { id: "execution", label: "Execution" },
            { id: "handover", label: "Handover" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectStage(tab.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedStage === tab.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Counter */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Filter list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none w-full sm:w-48"
          />
          <span className="font-mono text-[11px] whitespace-nowrap">
            Showing {filteredProjects.length} projects
          </span>
        </div>
      </div>

      {/* Main Clean Table */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium">
                <th className="py-3 px-4 w-24 font-mono">Code</th>
                <th className="py-3 px-4">Project & Client</th>
                <th className="py-3 px-4">Stage & Sub-Stage</th>
                <th className="py-3 px-4">Budget / Spent</th>
                <th className="py-3 px-4">Timeline / Progress</th>
                <th className="py-3 px-4">Key People</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition group"
                >
                  {/* Code */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                    <Link
                      href={`/projects/${p.code}`}
                      className="hover:underline flex items-center gap-1 text-zinc-950 dark:text-zinc-100"
                    >
                      <span>{p.code}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>

                  {/* Project Name & Client Info */}
                  <td className="py-3.5 px-4">
                    <Link href={`/projects/${p.code}`} className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline block text-xs">
                      {p.name}
                    </Link>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-0.5">
                      <span>{p.clientName}</span>
                      <span>•</span>
                      <span>{p.city}, {p.state}</span>
                      <span>•</span>
                      <span className="font-mono">{p.carpetAreaSqFt} sqft</span>
                    </div>
                  </td>

                  {/* Stage & SubStage */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider border ${getStageBadge(
                          p.stage
                        )}`}
                      >
                        {p.stage}
                      </span>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate max-w-[170px]">
                        {p.subStage}
                      </span>
                    </div>
                  </td>

                  {/* Budget & Spend */}
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(p.budget)}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      Spent: {formatCurrency(p.spent)} ({Math.round((p.spent / (p.budget || 1)) * 100)}%)
                    </div>
                  </td>

                  {/* Progress & Checkpoints */}
                  <td className="py-3.5 px-4 min-w-[150px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {p.progressPercent}%
                      </span>
                      <span className="text-zinc-400 text-[10px] font-mono">
                        {p.completedCheckpoints}/{p.totalCheckpoints} checks
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300"
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-1">
                      Handover: {p.targetHandover}
                    </div>
                  </td>

                  {/* Key People */}
                  <td className="py-3.5 px-4 text-[11px]">
                    <div className="text-zinc-800 dark:text-zinc-200">
                      <span className="text-zinc-400">PM:</span> {p.pmName}
                    </div>
                    <div className="text-zinc-500">
                      <span className="text-zinc-400">Design:</span> {p.designerName}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/projects/${p.code}`}
                        className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-[11px] transition"
                      >
                        Workspace
                      </Link>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
