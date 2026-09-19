"use client";

import React, { useState } from "react";
import { X, Building2, MapPin, IndianRupee, Calendar, User, Phone, Check } from "lucide-react";
import { Project, ProjectStage } from "@/types";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export function NewProjectModal({ isOpen, onClose, onAddProject }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [budget, setBudget] = useState("5000000");
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState("2400");
  const [propertyType, setPropertyType] = useState<Project["propertyType"]>("Residential 3BHK");
  const [stage, setStage] = useState<ProjectStage>("sales");
  const [pmName, setPmName] = useState("Rohan Malhotra");
  const [designerName, setDesignerName] = useState("Ananya Deshmukh");

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
      stage,
      subStage: stage === "sales" ? "Initial Pitch & Survey" : "Concept & 3D Drafting",
      budget: Number(budget) || 0,
      spent: 0,
      startDate: new Date().toISOString().split("T")[0],
      targetHandover: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      pmName,
      designerName,
      progressPercent: 5,
      totalCheckpoints: 15,
      completedCheckpoints: 1,
      pendingApprovalsCount: 0,
      pendingIssuesCount: 0,
      propertyType,
      carpetAreaSqFt: Number(carpetAreaSqFt) || 0,
      description: `Turnkey interior fit-out for ${clientName} (${propertyType}) located in ${city}.`,
      checkpoints: [
        { id: "c1", label: "Initial Site Measurement & Layout", isCompleted: true, category: "Design" },
        { id: "c2", label: "Client Brief & Concept Presentation", isCompleted: false, category: "Design" },
      ],
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Initialize New Project</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Create project code, client record, and turnkey milestone framework
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. The Emerald Penthouse, Villa Nirvana..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Client Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. Sameer Kapoor"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Client Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98000 00000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Residential 3BHK">Residential 3BHK</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Retail Boutique">Retail Boutique</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Budget (₹ INR)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Assigned Project Manager</label>
              <select
                value={pmName}
                onChange={(e) => setPmName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="Rohan Malhotra">Rohan Malhotra</option>
                <option value="Karan Johar">Karan Johar</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Lead Interior Designer</label>
              <select
                value={designerName}
                onChange={(e) => setDesignerName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="Ananya Deshmukh">Ananya Deshmukh</option>
                <option value="Meera Nair">Meera Nair</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
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
