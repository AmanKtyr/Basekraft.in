"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  Download,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Building2,
  Tag,
} from "lucide-react";
import { mockMaterialsMaster } from "@/data/mockData";
import { MaterialMasterItem, ProjectSector } from "@/types";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialMasterItem[]>(mockMaterialsMaster);
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"materials" | "contracts">("materials");

  const sectors: (ProjectSector | "All")[] = [
    "All",
    "Residential",
    "Commercial Office",
    "Retail & Showroom",
    "Hospitality & F&B",
    "Healthcare & Wellness",
  ];

  const filteredMaterials = materials.filter((m) => {
    const matchesSector = selectedSector === "All" || m.sectorTag === selectedSector;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Materials Master & Rate Catalog
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              Multi-Sector ERP
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Standard unit rates, contractor purchase benchmarks, and sector-wise material specifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-3 py-1.5 rounded-md text-xs font-medium transition text-zinc-700 dark:text-zinc-300">
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
          <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Material</span>
          </button>
        </div>
      </div>

      {/* Tabs & Multi-Sector Filter Pill Row */}
      <div className="space-y-3">
        {/* Main Tab Switcher */}
        <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 border-b-2 transition ${
              activeTab === "materials"
                ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
            }`}
          >
            All Materials ({materials.length})
          </button>
          <button
            onClick={() => setActiveTab("contracts")}
            className={`px-4 py-2 border-b-2 transition ${
              activeTab === "contracts"
                ? "border-zinc-950 text-zinc-950 dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
            }`}
          >
            Rate Contracts (Vendor MOUs)
          </button>
        </div>

        {/* Sector Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
            <span className="text-zinc-400 text-xs font-mono mr-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Sector:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition whitespace-nowrap ${
                  selectedSector === sec
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search materials, ply, marble, partition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* Materials Master Data Table (Exact ProjectStudio Mirror + Enhanced) */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[780px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-3 w-24">Created</th>
                <th className="py-3 px-3 w-12 text-center">Image</th>
                <th className="py-3 px-4">Item Name & Spec</th>
                <th className="py-3 px-3 font-sans text-right">Client Rate</th>
                <th className="py-3 px-3 font-sans text-right">Purchase Rate</th>
                <th className="py-3 px-3 text-center">UOM</th>
                <th className="py-3 px-3 text-center">GST</th>
                <th className="py-3 px-4">Sector & Tag</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition">
                  {/* Date */}
                  <td className="py-3.5 px-3 font-mono text-zinc-500 text-[11px] whitespace-nowrap">
                    {mat.createdOn}
                  </td>

                  {/* Image Placeholder */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  </td>

                  {/* Name & Description */}
                  <td className="py-3.5 px-4 max-w-sm">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 block text-xs">
                      {mat.name}
                    </span>
                    <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{mat.description}</p>
                  </td>

                  {/* Client Rate */}
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-zinc-950 dark:text-zinc-100">
                    ₹{mat.clientRate.toFixed(2)}
                  </td>

                  {/* Purchase Rate */}
                  <td className="py-3.5 px-3 text-right font-mono text-zinc-500">
                    ₹{mat.purchaseRate.toFixed(2)}
                  </td>

                  {/* UOM */}
                  <td className="py-3.5 px-3 text-center font-mono text-zinc-600 dark:text-zinc-400">
                    {mat.uom}
                  </td>

                  {/* GST */}
                  <td className="py-3.5 px-3 text-center font-mono text-zinc-500">
                    {mat.gstPercent}%
                  </td>

                  {/* Sector Tag */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {mat.sectorTag}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded text-zinc-400 hover:text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
