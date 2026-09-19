"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Plus, ArrowRight, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, GripVertical, MoreHorizontal } from "lucide-react";
import { Project, ProjectStage } from "@/types";

interface KanbanBoardProps {
  projects: Project[];
  onMoveProjectStage?: (projectId: string, newStage: ProjectStage) => void;
}

const columns: { id: ProjectStage; title: string; subtitle: string }[] = [
  { id: "sales", title: "1. Sales & Pitch", subtitle: "Lead qualification & initial quote" },
  { id: "design", title: "2. Concept & 3D", subtitle: "Moodboards, 3D renders & approvals" },
  { id: "execution", title: "3. On-Site Fit-out", subtitle: "Civil, carpentry, MEP & finishes" },
  { id: "handover", title: "4. Snags & Handover", subtitle: "Defect rectification & sign-off" },
];

export function KanbanBoard({ projects: initialProjects, onMoveProjectStage }: KanbanBoardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [draggedProjId, setDraggedProjId] = useState<string | null>(null);
  const [activeDropCol, setActiveDropCol] = useState<ProjectStage | null>(null);
  const [activeMenuProjId, setActiveMenuProjId] = useState<string | null>(null);

  const draggedProjIdRef = useRef<string | null>(null);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const moveProjectStage = (projId: string, targetStage: ProjectStage) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, stage: targetStage } : p))
    );
    if (onMoveProjectStage) {
      onMoveProjectStage(projId, targetStage);
    }
    setActiveMenuProjId(null);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    draggedProjIdRef.current = id;
    setDraggedProjId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    draggedProjIdRef.current = null;
    setDraggedProjId(null);
    setActiveDropCol(null);
  };

  const handleDragOver = (e: React.DragEvent, colId: ProjectStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDropCol !== colId) {
      setActiveDropCol(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: ProjectStage) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (!related || !e.currentTarget.contains(related)) {
      if (activeDropCol === colId) {
        setActiveDropCol(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: ProjectStage) => {
    e.preventDefault();
    e.stopPropagation();

    const projId = draggedProjIdRef.current || e.dataTransfer.getData("text/plain") || draggedProjId;
    if (projId) {
      moveProjectStage(projId, targetStage);
    }

    draggedProjIdRef.current = null;
    setDraggedProjId(null);
    setActiveDropCol(null);
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start select-none"
      onClick={() => setActiveMenuProjId(null)}
    >
      {columns.map((col) => {
        const colProjects = projects.filter((p) => p.stage === col.id);
        const totalBudget = colProjects.reduce((sum, p) => sum + p.budget, 0);
        const isHovered = activeDropCol === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={(e) => handleDragLeave(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex flex-col rounded-lg p-3 min-h-[540px] transition-all duration-150 border ${
              isHovered
                ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 ring-2 ring-zinc-900/20 shadow-md"
                : "bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {/* Column Header */}
            <div className="pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {col.title}
                  </h3>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    {colProjects.length}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{col.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {formatCurrency(totalBudget)}
                </span>
              </div>
            </div>

            {/* Drop Target Indicator */}
            {draggedProjId && isHovered && (
              <div className="mb-2.5 p-2 rounded border border-dashed border-zinc-900 dark:border-zinc-100 bg-zinc-200/60 dark:bg-zinc-800/80 text-center text-[10px] font-medium text-zinc-900 dark:text-zinc-100 animate-pulse">
                Drop to transition: {col.title}
              </div>
            )}

            {/* Cards Stack */}
            <div
              className={`space-y-3 flex-1 overflow-y-auto ${
                draggedProjId ? "pointer-events-none" : ""
              }`}
            >
              {colProjects.length === 0 ? (
                <div className="h-32 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-400 bg-white/40 dark:bg-zinc-900/20">
                  Drop project here
                </div>
              ) : (
                colProjects.map((p) => {
                  const isBeingDragged = draggedProjId === p.id;
                  const isMenuOpen = activeMenuProjId === p.id;

                  return (
                    <div
                      key={p.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, p.id)}
                      onDragEnd={handleDragEnd}
                      className={`group relative bg-white dark:bg-zinc-900 border rounded-lg p-3.5 shadow-2xs transition-all cursor-grab active:cursor-grabbing pointer-events-auto ${
                        isBeingDragged
                          ? "opacity-30 border-dashed border-zinc-900 dark:border-zinc-100 scale-95"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                      }`}
                    >
                      {/* Top Row: Code, Property Type, & Quick Move Action */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-grab">
                            <GripVertical className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          </div>
                          <span className="font-mono font-bold text-xs text-zinc-950 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                            {p.code}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                            {p.propertyType}
                          </span>

                          {/* Quick Move Button */}
                          <div className="relative">
                            <button
                              type="button"
                              title="Move stage"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuProjId(isMenuOpen ? null : p.id);
                              }}
                              className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                            >
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-6 z-50 w-44 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg py-1 text-xs animate-in fade-in zoom-in-95 duration-100"
                              >
                                <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                                  Move to Stage
                                </div>
                                {columns.map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    disabled={p.stage === c.id}
                                    onClick={() => moveProjectStage(p.id, c.id)}
                                    className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition ${
                                      p.stage === c.id
                                        ? "text-zinc-400 bg-zinc-50 dark:bg-zinc-900 cursor-default font-medium"
                                        : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    }`}
                                  >
                                    <span>{c.title}</span>
                                    {p.stage === c.id && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title (Link without drag hijacking) */}
                      <Link
                        href={`/projects/${p.code}`}
                        draggable={false}
                        className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 group-hover:underline flex items-center justify-between pl-5"
                      >
                        <span>{p.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition" />
                      </Link>

                      {/* Client & City */}
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 pl-5">
                        {p.clientName} • {p.city}
                      </p>

                      {/* SubStage Tag */}
                      <div className="my-2.5 pl-5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200 dark:border-zinc-700">
                          {p.subStage}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1 mb-3 pl-5">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                          <span>Progress</span>
                          <span>{p.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                            style={{ width: `${p.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Row: Budget & Handover Date */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                        <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatCurrency(p.budget)}
                        </span>
                        <span className="text-zinc-400 font-mono text-[10px]">
                          Target: {p.targetHandover.slice(5)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
