"use client";

import React, { useState } from "react";
import { CheckSquare, Square, Plus, CheckCircle2, Clock, Calendar } from "lucide-react";
import { Checkpoint } from "@/types";

interface ChecklistTrackerProps {
  checkpoints: Checkpoint[];
  onToggleCheckpoint?: (id: string) => void;
}

export function ChecklistTracker({ checkpoints: initialCheckpoints }: ChecklistTrackerProps) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(initialCheckpoints);
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState<Checkpoint["category"]>("Finishes");

  const completedCount = checkpoints.filter((c) => c.isCompleted).length;
  const progress = Math.round((completedCount / (checkpoints.length || 1)) * 100);

  const toggleCheckpoint = (id: string) => {
    setCheckpoints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isCompleted: !c.isCompleted } : c))
    );
  };

  const handleAddCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newItem: Checkpoint = {
      id: `c-${Date.now()}`,
      label: newLabel.trim(),
      isCompleted: false,
      category: newCategory,
      dueDate: "2026-10-15",
    };

    setCheckpoints((prev) => [...prev, newItem]);
    setNewLabel("");
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4">
      {/* Header with Metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Turnkey Checkpoints & Stage Gate
            </h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {completedCount} of {checkpoints.length} completed
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Strict quality audits required before moving to the next execution milestone
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-950 dark:bg-zinc-100 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100">
            {progress}%
          </span>
        </div>
      </div>

      {/* Checkpoint Item List */}
      <div className="space-y-2">
        {checkpoints.map((c) => (
          <div
            key={c.id}
            onClick={() => toggleCheckpoint(c.id)}
            className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition ${
              c.isCompleted
                ? "bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 line-through"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {c.isCompleted ? (
                <CheckSquare className="w-4 h-4 text-zinc-900 dark:text-zinc-100 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
              <span className="text-xs font-medium">{c.label}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {c.category}
              </span>
              {c.dueDate && (
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {c.dueDate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inline Quick Add Form */}
      <form onSubmit={handleAddCheckpoint} className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="Add a new custom checkpoint (e.g. Verify marble sealant, CP fitting pressure test)..."
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as any)}
          className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
        >
          <option value="Civil">Civil</option>
          <option value="Design">Design</option>
          <option value="Electrical">Electrical</option>
          <option value="Finishes">Finishes</option>
          <option value="Legal">Legal</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}
