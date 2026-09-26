"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { initialProjects } from "@/data/mockData";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { KanbanBoard } from "@/components/projects/KanbanBoard";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { Project, ProjectStage, ProjectSector } from "@/types";
import { operationsApi } from "@/utils/api";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialStage = searchParams.get("stage") || "all";

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban");
  const [selectedStage, setSelectedStage] = useState<string>(initialStage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    operationsApi.projects.list().then((backendProjects) => {
      if (backendProjects && backendProjects.length > 0) {
        const mapped: Project[] = backendProjects.map((bp) => ({
          id: bp.id,
          code: bp.code,
          name: bp.name,
          clientName: bp.client_name,
          clientPhone: bp.client_phone || "+91 98111 00000",
          clientEmail: bp.client_email || `${bp.client_name.toLowerCase().replace(/\s+/g, '')}@client.com`,
          city: bp.city || "Gurugram",
          state: "Haryana",
          sector: "Interior Design & Turnkey" as ProjectSector,
          stage: (bp.stage === 'PLANNING' ? 'sales' : bp.stage === 'DESIGN' ? 'design' : bp.stage === 'EXECUTION' ? 'execution' : bp.stage === 'HANDOVER' ? 'handover' : 'execution') as ProjectStage,
          subStage: bp.stage_display || "Active Fitout",
          budget: Number(bp.budget) || 25000000,
          spent: Number(bp.spent) || 12000000,
          startDate: bp.start_date || "2025-11-01",
          targetHandover: bp.target_handover || "2026-11-30",
          pmName: bp.assigned_lead_name || "Aman Sharma",
          designerName: "Riya Kapoor",
          progressPercent: bp.progress_pct || 50,
          totalCheckpoints: 12,
          completedCheckpoints: Math.round(((bp.progress_pct || 50) / 100) * 12),
          pendingApprovalsCount: 2,
          pendingIssuesCount: 1,
          description: `Turnkey commercial project for ${bp.client_name}`,
          propertyType: "Luxury Villa",
          carpetAreaSqFt: 3500,
          checkpoints: [],
        }));

        setProjects((prev) => {
          const codes = new Set(prev.map(p => p.code));
          const novel = mapped.filter(m => !codes.has(m.code));
          return [...novel, ...prev];
        });
      }
    }).catch(err => console.warn("Failed fetching live projects:", err));
  }, []);

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    operationsApi.projects.create({
      name: newProject.name,
      code: newProject.code,
      client_name: newProject.clientName,
      client_phone: newProject.clientPhone,
      city: newProject.city,
      budget: newProject.budget,
      spent: newProject.spent,
      stage: 'EXECUTION',
      progress_pct: newProject.progressPercent,
    }).catch(err => console.warn("Could not sync project to backend:", err));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Projects Portfolio
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Turnkey project operations, milestone audits, and design-to-delivery pipeline
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Table / Kanban View Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === "kanban"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          {/* New Project Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Main View Renderer */}
      {viewMode === "table" ? (
        <ProjectsTable
          projects={projects}
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />
      ) : (
        <KanbanBoard projects={projects} />
      )}

      {/* Modal */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-zinc-400 font-mono">
          Loading interior projects portfolio...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
