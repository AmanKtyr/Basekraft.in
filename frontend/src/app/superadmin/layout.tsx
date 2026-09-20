import React from "react";

export const metadata = {
  title: "Basekraft Superadmin Orchestrator — Multi-Tenant Management",
  description: "Master administrative control console for studio tenants, licensing, and telemetry.",
};

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-white selection:text-zinc-950">
      {children}
    </div>
  );
}
