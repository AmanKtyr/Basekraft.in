"use client";

import React from "react";
import { Users, Mail, Phone, Plus, FolderKanban } from "lucide-react";
import { mockTeamMembers } from "@/data/mockData";

export default function TeamPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Design & Site Team Directory
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Architects, interior designers, 3D visualizers, and site supervisors
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockTeamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-800 dark:text-zinc-200">
                {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{member.name}</h3>
                <p className="text-[11px] text-zinc-500">{member.role}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-zinc-400" />
                <span className="truncate">{member.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-zinc-400" />
                <span>{member.phone}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Assigned Workload</span>
              <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                {member.activeProjectsCount} active sites
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
