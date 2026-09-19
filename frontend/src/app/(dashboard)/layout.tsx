"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { Project } from "@/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const handleAddProject = (project: Project) => {
    // In our client-side demo state or via API
    console.log("New project created:", project);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Sleek Minimal Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav onOpenNewProject={() => setIsNewProjectModalOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-50/40 dark:bg-zinc-950">
          {children}
        </main>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
