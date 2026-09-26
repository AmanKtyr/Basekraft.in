"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  UserCheck,
  CheckSquare,
  FileSpreadsheet,
  ShoppingCart,
  IndianRupee,
  Clock,
  WalletCards,
  Users,
  Settings,
  ExternalLink,
  Package,
  Globe,
  X,
  ChevronsUpDown,
  Building2,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { themeConfig } from "@/config/theme";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "General",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
        badge: "5",
      },
      {
        label: "CRM & Leads",
        href: "/crm",
        icon: UserCheck,
        badge: "4",
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
        badge: "93",
      },
    ],
  },
  {
    title: "Execution & Commercials",
    items: [
      {
        label: "BOQ & Quotes",
        href: "/quotes",
        icon: FileSpreadsheet,
      },
      {
        label: "Procurement Orders",
        href: "/orders",
        icon: ShoppingCart,
        badge: "4",
      },
      {
        label: "Payment Requests",
        href: "/payments",
        icon: WalletCards,
        badge: "1",
      },
      {
        label: "Finances & Ledger",
        href: "/finances",
        icon: IndianRupee,
      },
    ],
  },
  {
    title: "Studio Masters",
    items: [
      {
        label: "Materials Master",
        href: "/materials",
        icon: Package,
      },
      {
        label: "Timesheets",
        href: "/timesheets",
        icon: Clock,
      },
      {
        label: "Team Directory",
        href: "/team",
        icon: Users,
      },
      {
        label: "Studio Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { isCollapsed } = useSidebar();
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);

  // If mobile, we always treat as expanded
  const collapsed = isMobile ? false : isCollapsed;

  return (
    <aside
      className={`h-screen flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out select-none shrink-0 ${
        isMobile
          ? "w-full"
          : collapsed
          ? "w-[68px]"
          : "w-64"
      }`}
    >
      {/* Workspace / Organization Switcher Header */}
      <div className="p-3 border-b border-sidebar-border">
        {collapsed ? (
          <div className="flex flex-col items-center justify-center py-1">
            <Link
              href="/dashboard"
              title={`${themeConfig.brand.name} Studio`}
              className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs tracking-wider shadow-xs hover:opacity-90 transition"
            >
              BK
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-sidebar-accent transition text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-xs">
                  BK
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-sidebar-foreground truncate block">
                      {themeConfig.brand.name} Studio
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground truncate block font-mono">
                    Studio Practice OS
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-sidebar-foreground transition" />
            </button>

            {isMobile && (
              <button
                onClick={onClose}
                className="absolute right-1 top-2.5 p-1 rounded-md text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Quick Workspace Switcher Menu */}
            {isWorkspaceDropdownOpen && !collapsed && (
              <div className="absolute top-12 left-0 right-0 z-50 bg-popover border border-border rounded-lg shadow-lg p-1.5 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Active Workspaces
                </div>
                <div className="p-2 rounded-md bg-accent/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span className="font-medium text-popover-foreground">Basekraft Gurugram</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-mono">Current</span>
                </div>
                <div className="p-2 rounded-md hover:bg-accent/40 flex items-center justify-between text-xs text-muted-foreground transition cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Atelier Nine Dubai</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">Studio</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Sections */}

      <nav className="flex-1 px-2.5 py-3 space-y-4 overflow-y-auto overflow-x-hidden">
        {navSections.map((section, idx) => (
          <div key={section.title} className="space-y-1">
            {!collapsed ? (
              <p className="px-2.5 text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                {section.title}
              </p>
            ) : idx > 0 ? (
              <div className="h-px bg-sidebar-border mx-2 my-2" />
            ) : null}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    title={collapsed ? item.label : undefined}
                    className={`group flex items-center rounded-lg text-xs font-medium transition-all ${
                      collapsed
                        ? "justify-center p-2.5 relative"
                        : "justify-between px-2.5 py-2"
                    } ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <div className={`flex items-center min-w-0 ${collapsed ? "justify-center" : "gap-2.5"}`}>
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-sidebar-foreground"
                            : "text-muted-foreground group-hover:text-sidebar-foreground"
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md shrink-0 border ${
                          isActive
                            ? "bg-background text-foreground border-sidebar-border"
                            : "bg-sidebar-accent text-muted-foreground border-sidebar-border"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {collapsed && item.badge && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Quick External Links (Public Web) */}
      {!collapsed && (
        <div className="p-2.5 border-t border-sidebar-border space-y-1.5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-xs transition shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span className="font-medium">Public Studio Web</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>
        </div>
      )}


      {/* User Profile Card at Sidebar Bottom */}
      <div className="p-2 border-t border-sidebar-border bg-sidebar">
        {collapsed ? (
          <div className="flex justify-center py-1">
            <Link
              href="/settings"
              title={`${user?.name || "User"} (${user?.roleTitle || ""})`}
              className="w-9 h-9 rounded-full bg-primary/10 border border-border text-foreground flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-ring transition"
            >
              {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : "BK")}
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-sidebar-accent transition">
            <Link href="/settings" onClick={onClose} className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-border text-foreground flex items-center justify-center font-bold text-xs shrink-0">
                {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : "BK")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-sidebar-foreground truncate leading-tight">
                  {user?.name || "User"}
                </p>
                <p className="text-[11px] text-muted-foreground truncate font-mono">
                  {user?.email || ""}
                </p>
              </div>
            </Link>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
