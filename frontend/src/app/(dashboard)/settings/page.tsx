"use client";

import React from "react";
import { Settings, Palette, ShieldCheck, Building2, Code2, Sparkles, Check } from "lucide-react";
import { themeConfig } from "@/config/theme";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Studio & Theme Architecture Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Workspace profile, seat licensing, and central design system tokens
        </p>
      </div>

      {/* Central Theme Controller Highlight */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <Palette className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Central Design System Token Controller
            </h3>
            <p className="text-xs text-zinc-500">
              Change the look and feel of the entire platform by editing a single file:
            </p>
          </div>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md font-mono text-xs text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
          <span>frontend/src/config/theme.ts</span>
          <span className="text-[10px] text-zinc-400 font-sans">Single Source of Truth</span>
        </div>

        {/* Theme Tokens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          <div className="border border-zinc-100 dark:border-zinc-800 rounded p-3 space-y-2">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Brand & Identity</span>
            <div className="text-[11px] text-zinc-500 space-y-1 font-mono">
              <p>Name: <span className="text-zinc-900 dark:text-zinc-100">{themeConfig.brand.name}</span></p>
              <p>Domain: <span className="text-zinc-900 dark:text-zinc-100">{themeConfig.brand.domain}</span></p>
              <p>Corner Radius: <span className="text-zinc-900 dark:text-zinc-100">{themeConfig.layout.radius}</span></p>
            </div>
          </div>

          <div className="border border-zinc-100 dark:border-zinc-800 rounded p-3 space-y-2">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Monochrome Palette</span>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-6 h-6 rounded bg-black border border-zinc-300" title="Pure Black" />
              <div className="w-6 h-6 rounded bg-zinc-800" title="Dark Slate" />
              <div className="w-6 h-6 rounded bg-zinc-400" title="Muted Grey" />
              <div className="w-6 h-6 rounded bg-zinc-100 border border-zinc-200" title="Surface Light" />
              <div className="w-6 h-6 rounded bg-white border border-zinc-300" title="Stark White" />
            </div>
          </div>
        </div>
      </div>

      {/* Studio Organization Profile */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <Building2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Studio Legal & Invoicing Info
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-zinc-500 font-medium">Studio Name</label>
            <input
              type="text"
              defaultValue="Vistarra Interior Architecture Ltd."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1.5 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-zinc-500 font-medium">GSTIN Number</label>
            <input
              type="text"
              defaultValue="27AABCU9603R1ZM"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1.5 font-mono text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
