import React from "react";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";

export const metadata = {
  title: "Basekraft — International Architectural Studio OS & Turnkey Fit-outs",
  description:
    "An international architectural practice and turnkey studio operating system. Precision BOQs, private live client portals, parametric material catalogs, and end-to-end site execution.",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-950">
      <WebsiteNavbar />
      <main className="flex-1 w-full">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
