"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { initialProjects } from "@/data/mockData";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { KanbanBoard } from "@/components/projects/KanbanBoard";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { Project } from "@/types";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialStage = searchParams.get("stage") || "all";

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban");
  const [selectedStage, setSelectedStage] = useState<string>(initialStage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
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
