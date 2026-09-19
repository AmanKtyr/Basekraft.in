"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Plus, Calendar, User, Play, Pause } from "lucide-react";
import { mockTimesheets } from "@/data/mockData";
import { TimesheetItem } from "@/types";

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState<TimesheetItem[]>(mockTimesheets);

  const totalHours = timesheets.reduce((sum, t) => sum + t.hoursSpent, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Timesheets & Team Workload
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              All Timesheets
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Log and audit billable designer hours, 3D rendering time, and site supervision logs
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Log Time</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Logged This Week</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">{totalHours} Hours</div>
          <span className="text-[10px] text-zinc-400">Across 4 team members</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Billable Ratio</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">92%</div>
          <span className="text-[10px] text-zinc-400">Direct client turnkey allocations</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Active Stopwatch Timer</span>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 flex items-center gap-2">
            <span>01:45:12</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px] text-zinc-400">P-619: Track lighting review</span>
        </div>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
              <th className="py-3 px-4">Member & Role</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Task Description</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 font-sans text-right">Hours Logged</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {timesheets.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">{t.memberName}</span>
                  <span className="text-[11px] text-zinc-500">{t.role}</span>
                </td>
                <td className="py-3.5 px-4">
                  <Link href={`/projects/${t.projectCode}`} className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline">
                    {t.projectName}
                  </Link>
                  <span className="font-mono text-[11px] text-zinc-400 block">{t.projectCode}</span>
                </td>
                <td className="py-3.5 px-4 text-zinc-700 dark:text-zinc-300 max-w-xs">{t.taskDescription}</td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">{t.date}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-950 dark:text-zinc-100">
                  {t.hoursSpent} hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
