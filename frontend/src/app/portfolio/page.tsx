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
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { ConsultationModal } from "@/components/website/ConsultationModal";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return showcaseProjects;
    return showcaseProjects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-[#f4f4f5] font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <WebsiteNavbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1 w-full space-y-16 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[500px] h-[250px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="hero-subtitle-gradient inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Turnkey Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Crafted with Structural Rigor & Monolithic Elegance.
          </h1>

          <p className="text-xs sm:text-base text-zinc-300/80 leading-relaxed font-normal">
            Explore built turnkey interior fit-outs and architectural spaces executed under Basekraft Studio OS across India.
          </p>
        </div>

        {/* Category Filter Pills with Helionix Styling */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? "nav-gradient text-white font-bold shadow-lg shadow-purple-900/30"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Cover Banner */}
                <div className="h-52 bg-[#120f24] text-white p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-700/50 text-purple-200">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {item.portalCode}
                    </span>
                  </div>
                  <div className="z-10">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.carpetAreaSqFt.toLocaleString()} sq.ft</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent" />
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {item.tagline}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Material Palette & Specifications
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.materialsUsed.map((mat: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-white/[0.08] font-mono text-[11px]">
                    <span>Completion: {item.year}</span>
                    <span className="text-emerald-400 font-bold">100% On-Spec</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <Link
                  href={`/client-portal/${item.portalCode}`}
                  target="_blank"
                  className="button-border-gradient w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-center text-zinc-200 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <span>Inspect Live Client Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-14 border-t border-white/[0.08] space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Prime Residential or Commercial Space in Planning?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Schedule a private architectural design discovery with our principal design team.
          </p>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="hero-button-gradient px-7 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
          >
            Book Space Brief
          </button>
        </div>
      </main>

      <WebsiteFooter />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
