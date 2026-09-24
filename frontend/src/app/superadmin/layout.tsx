"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  CreditCard,
  LifeBuoy,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  Search,
  Bell,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Layers,
  Database,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  // Ping backend API status
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/plans/")
      .then((res) => {
        if (res.ok) setBackendOnline(true);
      })
      .catch(() => {
        setBackendOnline(false);
      });
  }, []);

  const navItems = [
    {
      label: "Command Center",
      href: "/superadmin",
      icon: LayoutDashboard,
      badge: "HQ",
    },
    {
      label: "Company Tenants",
      href: "/superadmin/companies",
      icon: Building2,
      badge: null,
    },
    {
      label: "Subscription Plans",
      href: "/superadmin/plans",
      icon: CreditCard,
      badge: "3 Tiers",
    },
    {
      label: "Platform Support",
      href: "/superadmin/support",
      icon: LifeBuoy,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0 select-none">
        {/* Workspace Brand Header */}
        <div className="h-16 px-5 border-b border-border flex items-center justify-between">
          <Link href="/superadmin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
              BK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-foreground">
                  Basekraft
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">
                Superadmin Orchestrator
              </p>
            </div>
          </Link>
        </div>

        {/* Backend Connectivity Status Pill */}
        <div className="px-4 py-2.5 mx-3 my-3 rounded-lg border border-border bg-muted/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="font-mono text-[11px] text-muted-foreground">
              DRF API :8000
            </span>
          </div>
          <span
            className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
              backendOnline
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600"
            }`}
          >
            {backendOnline ? "Online" : "Connecting"}
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Platform Core
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/superadmin"
                ? pathname === "/superadmin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition group ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="px-3 pt-6 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Quick Portals
          </div>
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition group"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              <span>Studio App Preview</span>
            </div>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-60" />
          </Link>
          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition group"
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              <span>Django Admin Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-60" />
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border space-y-2">
          {/* User Profile Card */}
          <div className="p-2 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                {user.avatar || "PS"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">
                  {user.name || "Platform Superadmin"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate font-mono">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Switcher Toggle */}
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="text-[11px] text-muted-foreground">Appearance</span>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
              title="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Mobile Top Header */}
        <header className="h-16 md:hidden px-4 border-b border-border bg-card flex items-center justify-between sticky top-0 z-30">
          <Link href="/superadmin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
              BK
            </div>
            <span className="font-bold text-sm">Basekraft Superadmin</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border text-muted-foreground"
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-border text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card p-4 space-y-2 z-20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  pathname === item.href ? "bg-accent font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{user.email}</span>
              <button
                onClick={logout}
                className="text-xs text-destructive flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
