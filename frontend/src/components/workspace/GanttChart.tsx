"use client";

import React from "react";
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  category: string;
  startWeek: number; // week index 1-12
  durationWeeks: number;
  progress: number;
  status: "completed" | "in-progress" | "pending" | "delayed";
}

const milestones: Milestone[] = [
  { id: "m1", name: "Civil Demolition & Core Masonry", category: "Civil", startWeek: 1, durationWeeks: 3, progress: 100, status: "completed" },
  { id: "m2", name: "MEP Rough-in & AC Conduit", category: "MEP", startWeek: 2, durationWeeks: 3, progress: 100, status: "completed" },
  { id: "m3", name: "Italian Marble Flooring & Epoxy", category: "Civil", startWeek: 4, durationWeeks: 3, progress: 100, status: "completed" },
  { id: "m4", name: "Gypsum False Ceiling Grid", category: "Finishes", startWeek: 5, durationWeeks: 2, progress: 100, status: "completed" },
  { id: "m5", name: "Custom Veneer Wardrobes & Kitchen", category: "Carpentry", startWeek: 7, durationWeeks: 4, progress: 45, status: "in-progress" },
  { id: "m6", name: "PU Wall Paneling & Paint Finish", category: "Finishes", startWeek: 9, durationWeeks: 3, progress: 10, status: "in-progress" },
  { id: "m7", name: "Lighting Trim & Smart Automation", category: "Electrical", startWeek: 10, durationWeeks: 2, progress: 0, status: "pending" },
  { id: "m8", name: "Deep Clean, Snag List & Handover", category: "Handover", startWeek: 11, durationWeeks: 2, progress: 0, status: "pending" },
];

export function GanttChart() {
  const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Interactive Milestone Schedule (Gantt)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            12-week turnkey execution roadmap with critical path dependencies
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-950 dark:bg-zinc-100" /> Done
          </span>
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-400 dark:bg-zinc-600" /> Active
          </span>
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-200 dark:bg-zinc-800" /> Queued
          </span>
        </div>
      </div>

      {/* Gantt Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header Row: Weeks */}
          <div className="grid grid-cols-12 gap-1 pb-2 border-b border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
            <div className="col-span-4 font-sans font-medium text-zinc-700 dark:text-zinc-300">
              Execution Package
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="text-center font-mono">
                W{i + 1}
              </div>
            ))}
          </div>

          {/* Milestone Rows */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 py-2">
            {milestones.map((m) => {
              const startCol = Math.min(m.startWeek, 8);
              const span = Math.min(m.durationWeeks, 8 - startCol + 1);

              return (
                <div key={m.id} className="grid grid-cols-12 gap-1 py-2.5 items-center text-xs">
                  {/* Title */}
                  <div className="col-span-4 pr-2">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-xs truncate">
                      {m.name}
                    </p>
                    <span className="text-[10px] font-mono text-zinc-400">{m.category}</span>
                  </div>

                  {/* 8 Week Timeline Bar Container */}
                  <div className="col-span-8 grid grid-cols-8 gap-1 items-center relative h-7 bg-zinc-50/50 dark:bg-zinc-900/30 rounded px-1">
                    <div
                      className="absolute h-5 rounded flex items-center px-2 text-[10px] font-mono font-medium overflow-hidden transition-all"
                      style={{
                        left: `${((m.startWeek - 1) / 8) * 100}%`,
                        width: `${(m.durationWeeks / 8) * 100}%`,
                        backgroundColor:
                          m.status === "completed"
                            ? "#18181b"
                            : m.status === "in-progress"
                            ? "#71717a"
                            : "#e4e4e7",
                        color: m.status === "pending" ? "#71717a" : "#ffffff",
                      }}
                    >
                      <span className="truncate">{m.progress}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
