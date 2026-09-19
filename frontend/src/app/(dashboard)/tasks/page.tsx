"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpRight,
  Filter,
  Layers,
  GripVertical,
  MoreHorizontal,
  ArrowRightCircle,
  MoveRight,
} from "lucide-react";
import { mockTasks } from "@/data/mockData";
import { TaskItem } from "@/types";

type TaskTab = "tasks" | "requests" | "issues";
type CategoryFilter = "All" | "Task" | "Snags" | "Hindrance" | "Followup";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(mockTasks);
  const [activeTab, setActiveTab] = useState<TaskTab>("tasks");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [activeDropCol, setActiveDropCol] = useState<TaskItem["status"] | null>(null);
  const [activeMenuTaskId, setActiveMenuTaskId] = useState<string | null>(null);

  // Ref to guarantee drag ID persistence across all browser drag event cycles
  const draggedTaskIdRef = useRef<string | null>(null);

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "in-progress" || t.status === "on-hold").length;
  const overdueCount = tasks.filter((t) => t.isOverdue && t.status !== "completed").length;

  const filteredTasks = tasks.filter((t) => {
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const columns: { id: TaskItem["status"]; title: string }[] = [
    { id: "created", title: "Created" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
    { id: "on-hold", title: "On Hold" },
    { id: "discarded", title: "Discarded" },
  ];

  // Direct move handler for both drag-and-drop and 1-click menu
  const moveTaskToStatus = (taskId: string, targetStatus: TaskItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: targetStatus,
            isOverdue: targetStatus === "completed" ? false : t.isOverdue,
          };
        }
        return t;
      })
    );
    setActiveMenuTaskId(null);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    draggedTaskIdRef.current = id;
    setDraggedTaskId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    draggedTaskIdRef.current = null;
    setDraggedTaskId(null);
    setActiveDropCol(null);
  };

  const handleDragOver = (e: React.DragEvent, colId: TaskItem["status"]) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDropCol !== colId) {
      setActiveDropCol(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: TaskItem["status"]) => {
    // Only clear if leaving the container itself
    const related = e.relatedTarget as HTMLElement | null;
    if (!related || !e.currentTarget.contains(related)) {
      if (activeDropCol === colId) {
        setActiveDropCol(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskItem["status"]) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = draggedTaskIdRef.current || e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (taskId) {
      moveTaskToStatus(taskId, targetStatus);
    }

    draggedTaskIdRef.current = null;
    setDraggedTaskId(null);
    setActiveDropCol(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto" onClick={() => setActiveMenuTaskId(null)}>
      {/* Top Header & Submodule Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Tasks & Operations Hub
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              Drag & Drop Enabled
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Drag cards across columns or use the 1-click move button to transition task status
          </p>
        </div>

        {/* Top 3 Tabs: All Tasks | All Requests | All Issues */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-3 py-1.5 rounded font-medium transition ${
              activeTab === "tasks"
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-3 py-1.5 rounded font-medium transition ${
              activeTab === "requests"
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
            }`}
          >
            All Requests
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={`px-3 py-1.5 rounded font-medium transition ${
              activeTab === "issues"
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
            }`}
          >
            All Issues
          </button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Total Tasks</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">
            {totalTasks}
          </div>
          <span className="text-[10px] text-zinc-400">Across all active sites</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Completed</span>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {completedCount}
          </div>
          <span className="text-[10px] text-zinc-400">Audited & verified</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Pending</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-100">
            {pendingCount}
          </div>
          <span className="text-[10px] text-zinc-400">Active on board</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-2xs">
          <span className="text-xs text-zinc-500 font-medium">Overdue</span>
          <div className="mt-1 text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
            {overdueCount}
          </div>
          <span className="text-[10px] text-zinc-400">Requires follow-up</span>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1 overflow-x-auto text-xs border-b border-zinc-200 dark:border-zinc-800 pb-2">
          {(["All", "Task", "Snags", "Hindrance", "Followup"] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-md transition font-medium text-xs ${
                categoryFilter === cat
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tasks, client, project code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 5-Column Drag & Drop Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 items-start overflow-x-auto min-w-[950px]">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const isHovered = activeDropCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`rounded-lg p-2.5 min-h-[540px] flex flex-col transition-all duration-150 border ${
                isHovered
                  ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 ring-2 ring-zinc-900/20 shadow-md"
                  : "bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-2.5">
                <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                  {col.title}
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  {colTasks.length}
                </span>
              </div>

              {/* Visual Drop Target Highlight when dragging */}
              {draggedTaskId && isHovered && (
                <div className="mb-2 p-2 rounded border border-dashed border-zinc-900 dark:border-zinc-100 bg-zinc-200/60 dark:bg-zinc-800/80 text-center text-[10px] font-medium text-zinc-900 dark:text-zinc-100 animate-pulse">
                  Drop to set status: {col.title}
                </div>
              )}

              {/* Tasks List Container */}
              <div
                className={`space-y-2.5 flex-1 ${
                  draggedTaskId ? "pointer-events-none" : ""
                }`}
              >
                {colTasks.length === 0 ? (
                  <div className="h-32 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-md flex flex-col items-center justify-center text-[11px] text-zinc-400 gap-1 bg-white/40 dark:bg-zinc-900/20">
                    <span>Drop task here</span>
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const isBeingDragged = draggedTaskId === task.id;
                    const isMenuOpen = activeMenuTaskId === task.id;

                    return (
                      <div
                        key={task.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        className={`group relative bg-white dark:bg-zinc-900 border rounded-lg p-3 shadow-2xs space-y-2 transition-all cursor-grab active:cursor-grabbing select-none pointer-events-auto ${
                          isBeingDragged
                            ? "opacity-30 border-dashed border-zinc-900 dark:border-zinc-100 scale-95"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                        }`}
                      >
                        {/* Top Bar: Handle, Title, Overdue Tag, & Quick Move Action Menu */}
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-start gap-1.5 flex-1 min-w-0">
                            <div className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-grab">
                              <GripVertical className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                            </div>
                            <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                              {task.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {task.isOverdue && task.status !== "completed" && (
                              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 font-medium">
                                Overdue
                              </span>
                            )}

                            {/* 1-Click Quick Move Menu Button */}
                            <div className="relative">
                              <button
                                type="button"
                                title="Move to stage"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuTaskId(isMenuOpen ? null : task.id);
                                }}
                                className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                              >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Move Dropdown */}
                              {isMenuOpen && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-6 z-50 w-36 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg py-1 text-xs animate-in fade-in zoom-in-95 duration-100"
                                >
                                  <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                                    Move to status
                                  </div>
                                  {columns.map((c) => (
                                    <button
                                      key={c.id}
                                      type="button"
                                      disabled={task.status === c.id}
                                      onClick={() => moveTaskToStatus(task.id, c.id)}
                                      className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition ${
                                        task.status === c.id
                                          ? "text-zinc-400 bg-zinc-50 dark:bg-zinc-900 cursor-default font-medium"
                                          : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                      }`}
                                    >
                                      <span>{c.title}</span>
                                      {task.status === c.id && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Project Code & Client (No native link drag interference) */}
                        <div className="text-[11px] pl-5 flex items-center gap-1.5">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {task.clientName}
                          </span>
                          <Link
                            href={`/projects/${task.projectCode}`}
                            draggable={false}
                            className="font-mono text-[10px] px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                          >
                            {task.projectCode}
                          </Link>
                        </div>

                        {/* Meta Grid: Client & Assignee */}
                        <div className="grid grid-cols-2 gap-1 text-[10px] text-zinc-500 pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
                          <div>
                            <span className="text-zinc-400 block">Client</span>
                            <span className="truncate block font-medium text-zinc-700 dark:text-zinc-300">
                              {task.clientName}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Assignee</span>
                            <span className="truncate block font-medium text-zinc-700 dark:text-zinc-300">
                              {task.assigneeName}
                            </span>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-1 text-[10px] text-zinc-400 font-mono">
                          <div>
                            <span>Created: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{task.createdDate}</span>
                          </div>
                          <div>
                            <span>Due: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{task.dueDate}</span>
                          </div>
                        </div>

                        {/* Footer: Timer & Comments */}
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            <span>{task.timeLogged}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                            <MessageSquare className="w-3 h-3" />
                            <span>{task.commentsCount}</span>
                          </div>
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
    </div>
  );
}
