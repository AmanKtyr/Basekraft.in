"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { showcaseProjects, ShowcaseProject } from "@/data/websiteData";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function WebsitePortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ShowcaseProject | null>(null);

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return showcaseProjects;
    return showcaseProjects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-16 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <Building2 className="w-3.5 h-3.5 text-zinc-500" />
          <span>Curated Turnkey Portfolio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Crafted with Structural Rigor & Monolithic Elegance.
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Explore built turnkey interior fit-outs and architectural spaces executed under Basekraft Studio OS across India.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-xs"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition flex flex-col group"
          >
            {/* Top Architectural Spec Bar */}
            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-wider">
                  {project.category} • Year {project.year}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded">
                  {project.budgetFormatted}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 italic">
                &ldquo;{project.tagline}&rdquo;
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block font-semibold">
                  Architectural Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials Master Palette */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block font-semibold">
                  Materials Specified
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.materialsUsed.map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between gap-3">
              <Link
                href={`/client-portal/${project.portalCode}`}
                target="_blank"
                className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 inline-flex items-center gap-1.5 transition"
              >
                <span>Launch Client Live Portal Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="text-xs font-bold text-zinc-950 dark:text-zinc-50 hover:underline cursor-pointer"
              >
                Inquire Project Scope →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation Strip */}
      <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-8 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Have an upcoming luxury interior or commercial fit-out?
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Our studio team provides comprehensive space layout planning, 3D renderings, and transparent turnkey execution schedules.
        </p>
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-xs cursor-pointer"
        >
          Book Design Discovery Brief
        </button>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
