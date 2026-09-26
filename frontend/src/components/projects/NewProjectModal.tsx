"use client";

import React, { useState, useId } from "react";
import { X, Building2, MapPin, IndianRupee, Calendar, User, Phone, Check, Sun, Factory, Home, Layers, ShieldCheck } from "lucide-react";
import { Project, ProjectStage, ProjectSector } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

const mapIndustryToSector = (ind?: string): ProjectSector => {
  switch (ind) {
    case "SOLAR_EPC":
      return "Solar Energy & Rooftop EPC";
    case "MODULAR_FURNITURE":
      return "Modular Furniture & Manufacturing";
    case "CIVIL_CONSTRUCTION":
      return "Real Estate & Civil Contracting";
    default:
      return "Interior Design & Turnkey";
  }
};

const sectorOptions: {
  id: ProjectSector;
  label: string;
  subTypes: string[];
  checkpoints: { label: string; category: "Civil" | "Design" | "Electrical" | "Finishes" | "Legal" }[];
}[] = [
  {
    id: "Interior Design & Turnkey",
    label: "Interior Design & Turnkey Fit-out",
    subTypes: [
      "Residential Apartment (2BHK / 3BHK / 4BHK)",
      "Luxury Penthouse / Duplex",
      "Corporate Office Interior",
      "Retail Showroom / F&B Restaurant",
    ],
    checkpoints: [
      { label: "Site Survey & 2D Space Planning", category: "Design" },
      { label: "3D Visual Concept & Client Sign-off", category: "Design" },
      { label: "Civil, Electrical & Plumbing Concealing", category: "Civil" },
      { label: "Carpentry, False Ceiling & Surface Finishes", category: "Finishes" },
      { label: "Final Snag Rectification & Handover", category: "Finishes" },
    ],
  },
  {
    id: "Solar Energy & Rooftop EPC",
    label: "Solar Energy & Rooftop EPC",
    subTypes: [
      "Residential Rooftop Solar (3 kW - 10 kW)",
      "Commercial Net-Metered Solar (25 kW - 150 kW)",
      "Industrial Captive Solar Plant (500 kW+)",
      "Agricultural PM-KUSUM Solar Pump System",
    ],
    checkpoints: [
      { label: "Drone Roof Survey & Shadow Analysis", category: "Design" },
      { label: "DISCOM Load Sanction & Net-Meter Application", category: "Legal" },
      { label: "Module Mounting Structure (MMS) Installation", category: "Civil" },
      { label: "Inverter, ACDB/DCDB & Earthing Pit Testing", category: "Electrical" },
      { label: "Grid Synchronization & Subsidy Disbursal", category: "Legal" },
    ],
  },
  {
    id: "Modular Furniture & Manufacturing",
    label: "Modular Furniture & Manufacturing",
    subTypes: [
      "Modular Kitchen & Wardrobe Package",
      "Full Home Factory Millwork Package",
      "Corporate Office Workstations & Desks",
      "Retail Display Fixtures & Wall Paneling",
    ],
    checkpoints: [
      { label: "Site Laser Measurement & Cut-list Generation", category: "Design" },
      { label: "CNC Board Cutting & 2mm Edge Banding", category: "Civil" },
      { label: "Hardware & Soft-close Channel QA", category: "Finishes" },
      { label: "Factory Flat-pack Packaging & Dispatch", category: "Civil" },
      { label: "On-site Modular Carcass Assembly & Sign-off", category: "Finishes" },
    ],
  },
  {
    id: "Real Estate & Civil Contracting",
    label: "Real Estate & Civil Construction",
    subTypes: [
      "Independent Luxury Villa (Turnkey Civil)",
      "Plotted Housing Scheme Development",
      "Commercial Complex Structure (RCC + Façade)",
      "Civil Extension & Structural Retrofit",
    ],
    checkpoints: [
      { label: "Land Demarcation & Soil Testing", category: "Civil" },
      { label: "Foundation & Plinth RCC Casting", category: "Civil" },
      { label: "Columns, Beams & Slab Casting", category: "Civil" },
      { label: "Brickwork, MEP Concealing & Internal Plaster", category: "Electrical" },
      { label: "Flooring, Façade & OC Handover", category: "Legal" },
    ],
  },
];

export function NewProjectModal({ isOpen, onClose, onAddProject }: NewProjectModalProps) {
  const { user } = useAuth();
  const companySector = mapIndustryToSector(user?.industry);

  const [sector, setSector] = useState<ProjectSector>(companySector);
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [budget, setBudget] = useState("5000000");
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState("2400");
  const [stage, setStage] = useState<ProjectStage>("sales");
  const [pmName, setPmName] = useState("Rohan Malhotra");
  const [designerName, setDesignerName] = useState("Ananya Deshmukh");

  // Keep sector synced with company's provisioned industry
  React.useEffect(() => {
    const sec = mapIndustryToSector(user?.industry);
    setSector(sec);
    const config = sectorOptions.find((s) => s.id === sec) || sectorOptions[0];
    setSubType(config.subTypes[0]);
  }, [user?.industry]);

  const currentSectorConfig = sectorOptions.find((s) => s.id === sector) || sectorOptions[0];
  const [subType, setSubType] = useState(currentSectorConfig.subTypes[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientName) return;

    const newCode = `P-${Math.floor(100 + Math.random() * 900)}`;
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      code: newCode,
      name,
      clientName,
      clientPhone,
      city,
      state,
      sector,
      stage,
      subStage: stage === "sales" ? "Initial Pitch & Survey" : "Concept & 3D Drafting",
      budget: Number(budget) || 0,
      spent: 0,
      startDate: new Date().toISOString().split("T")[0],
      targetHandover: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      pmName,
      designerName,
      progressPercent: 5,
      totalCheckpoints: currentSectorConfig.checkpoints.length,
      completedCheckpoints: 1,
      pendingApprovalsCount: 0,
      pendingIssuesCount: 0,
      propertyType: subType as any,
      carpetAreaSqFt: Number(carpetAreaSqFt) || 0,
      description: `${sector} execution for ${clientName} (${subType}) in ${city}.`,
      checkpoints: currentSectorConfig.checkpoints.map((cp, idx) => ({
        id: `cp-${idx + 1}`,
        label: cp.label,
        isCompleted: idx === 0,
        category: cp.category,
      })),
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Initialize New Project
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Supports Solar, Modular Furniture, Turnkey Interiors, and Real Estate Construction
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Business Sector & Domain (Provisioned by Superadmin) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>Operating Business Sector</span>
              </label>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Auto-Configured by Superadmin
              </span>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                  {sector === "Solar Energy & Rooftop EPC" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : sector === "Modular Furniture & Manufacturing" ? (
                    <Factory className="w-4 h-4 text-purple-500" />
                  ) : sector === "Real Estate & Civil Contracting" ? (
                    <Building2 className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Home className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{currentSectorConfig.label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Tenant Studio: {user?.studioName || "Basekraft Enterprise"}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted border border-border text-muted-foreground font-semibold">
                LOCKED
              </span>
            </div>
          </div>

          {/* Project Title */}
          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Project Title *</label>
            <input
              type="text"
              required
              placeholder={
                sector === "Solar Energy & Rooftop EPC"
                  ? "e.g. 50kW Rooftop Solar at Patel Cold Storage"
                  : sector === "Modular Furniture & Manufacturing"
                  ? "e.g. 3BHK Modular Kitchen & Wardrobe Package - Mittal Villa"
                  : sector === "Real Estate & Civil Contracting"
                  ? "e.g. 4500 SqFt Turnkey Villa RCC Construction"
                  : "e.g. The Emerald Penthouse, Villa Nirvana..."
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          {/* Client Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Client / Company Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. Sameer Kapoor"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Client Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98000 00000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Sector-Specific Type, City & Budget */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5 col-span-2">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">
                {sector === "Solar Energy & Rooftop EPC"
                  ? "Solar System Capacity & Type"
                  : sector === "Modular Furniture & Manufacturing"
                  ? "Furniture Scope & Package"
                  : sector === "Real Estate & Civil Contracting"
                  ? "Construction Scope"
                  : "Property & Project Type"}
              </label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                {currentSectorConfig.subTypes.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">City / Location</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Project Budget (₹ INR) *</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">
                {sector === "Solar Energy & Rooftop EPC" ? "Estimated System Size (kW)" : "Carpet / Plot Area (Sq. Ft.)"}
              </label>
              <input
                type="number"
                value={carpetAreaSqFt}
                onChange={(e) => setCarpetAreaSqFt(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Sector Checkpoint Preview */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
            <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Auto-loaded {sector} Checkpoint Pipeline:</span>
              <span className="font-mono text-[10px]">{currentSectorConfig.checkpoints.length} Stages</span>
            </div>
            <p className="text-[10px] text-zinc-400">
              {currentSectorConfig.checkpoints.map((c) => c.label).join(" → ")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-4 py-2 rounded-md text-xs font-medium transition shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
