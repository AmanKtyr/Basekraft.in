"use client";

import React from "react";
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
  Sparkles,
  ExternalLink,
  Package,
  Globe,
  Crown,
  X,
} from "lucide-react";
import { themeConfig } from "@/config/theme";
import { useAuth } from "@/context/AuthContext";

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
    title: "Main Platform",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Projects Portfolio",
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
        label: "All Tasks",
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
        label: "BOQ & Quotations",
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
        label: "Timesheets & Hours",
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
  const { user, role } = useAuth();

  return (
    <aside
      className={
        isMobile
          ? "w-full h-full flex flex-col bg-white dark:bg-zinc-950 select-none"
          : "w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col h-screen select-none shrink-0"
      }
    >
      {/* Workspace Brand Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-zinc-950 dark:bg-zinc-100 rounded flex items-center justify-center text-white dark:text-zinc-950 font-bold text-xs tracking-wider">
            BK
          </div>
          <div>
            <span className="font-semibold tracking-tight text-sm text-zinc-900 dark:text-zinc-100 block leading-tight">
              {themeConfig.brand.name}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono block">
              Architectural OS
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            {role === "superadmin" ? "SUPERADMIN" : "PRO"}
          </span>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Superadmin Quick Access Banner */}
      {role === "superadmin" && (
        <div className="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20">
          <Link
            href="/superadmin"
            onClick={onClose}
            className="flex items-center justify-between p-1.5 rounded text-xs font-semibold text-amber-500 hover:bg-amber-500/20 transition"
          >
            <div className="flex items-center gap-2">
              <Crown className="w-3.5 h-3.5" />
              <span>Superadmin Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>
        </div>
      )}

      {/* Main Direct Navigation - Clean & 100% Clickable */}
      <nav className="flex-1 px-3 space-y-4 overflow-y-auto pt-1">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-2.5 text-[10px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
              {section.title}
            </p>
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
                    className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive
                            ? "text-white dark:text-zinc-950"
                            : "text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-500"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                          isActive
                            ? "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Client Portal & Public Studio Website Links */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
        <Link
          href="/client-portal/P-619"
          onClick={onClose}
          className="flex items-center justify-between p-2 rounded-md bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-xs transition"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Client Portal</span>
          </div>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </Link>
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-between p-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs transition shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-medium">Public Studio Web</span>
          </div>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </Link>
      </div>
    </aside>
  );
}
