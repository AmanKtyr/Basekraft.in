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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddProject = (project: Project) => {
    // In our client-side demo state or via API
    console.log("New project created:", project);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Desktop Sidebar (visible on lg+) */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay and Panel (visible when open on mobile/tablet) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu overlay"
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-zinc-950 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-8 bg-zinc-50/40 dark:bg-zinc-950">
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
