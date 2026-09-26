"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Moon,
  Sun,
  Bell,
  Command,
  ChevronDown,
  Settings,
  Clock,
  LogOut,
  ExternalLink,
  Globe,
  Menu,
  PanelLeft,
  CheckCircle2,

  AlertCircle,
  FolderKanban,
  Users,
  CheckSquare,
  FileSpreadsheet,
  Building2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initialProjects } from "@/data/mockData";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";

interface TopNavProps {
  onOpenNewProject?: () => void;
  onToggleMobileMenu?: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  projectCode: string;
  type: "approval" | "delay" | "dispatch" | "finance";
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "Client Approved 3D Visuals",
    desc: "Dr. Radhika Sen signed off Master Bedroom concept renders in Client Portal.",
    time: "12m ago",
    projectCode: "P-438",
    type: "approval",
    unread: true,
  },
  {
    id: "n-2",
    title: "On-Site AC Pressure Test Required",
    desc: "Daikin VRV lines must be tested before Gyproc false ceiling framing closes.",
    time: "45m ago",
    projectCode: "P-619",
    type: "delay",
    unread: true,
  },
  {
    id: "n-3",
    title: "Vendor Material Dispatched",
    desc: "Saint Gobain 12mm fluted glass panels en route to site. PO-8821.",
    time: "2h ago",
    projectCode: "P-330",
    type: "dispatch",
    unread: true,
  },
  {
    id: "n-4",
    title: "Site Expense Request Pending",
    desc: "Supervisor Amit Verma requested ₹1.45L for Italian marble polishing diamond pads.",
    time: "4h ago",
    projectCode: "P-619",
    type: "finance",
    unread: false,
  },
];

const navigationShortcuts = [
  { label: "Dashboard Overview", href: "/dashboard", icon: Building2 },
  { label: "Projects Portfolio", href: "/projects", icon: FolderKanban },
  { label: "CRM & Leads", href: "/crm", icon: Users },
  { label: "All Tasks & Snags", href: "/tasks", icon: CheckSquare },
  { label: "BOQ & Quotations", href: "/quotes", icon: FileSpreadsheet },
];

export function TopNav({ onOpenNewProject, onToggleMobileMenu }: TopNavProps) {
  const router = useRouter();
  const { user, role, switchRole, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { toggleSidebar, isCollapsed } = useSidebar();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isCommandOpen) {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen]);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => commandInputRef.current?.focus(), 50);
    }
  }, [isCommandOpen]);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredSearchProjects = initialProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="h-14 border-b border-border bg-background/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
        {/* Left Area: Mobile Menu, Sidebar Toggle, & Search Trigger */}
        <div className="flex items-center gap-2 flex-1 max-w-sm sm:max-w-md">
          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 -ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer shrink-0"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop Sidebar Collapse Toggle (shadcn-admin feature) */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar width"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer shrink-0"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          {/* Shadcn Admin Command Search Trigger Button */}
          <button
            type="button"
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between bg-muted/60 hover:bg-muted/90 border border-input rounded-md px-3 py-1.5 text-xs text-muted-foreground transition cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Search studio, projects, BOQs...</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border shrink-0 shadow-2xs">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right Controls Area: Actions, Notifications, Theme, & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Primary Action Button: New Project */}
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-1.5 bg-primary hover:opacity-90 text-primary-foreground px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Project</span>
          </button>

          {/* Theme Toggle Button (shadcn-admin style) */}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Notifications Bell with Popover */}
          <div className="relative" ref={notifMenuRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Notifications"
              title="Studio Notifications"
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-primary ring-2 ring-background absolute top-1.5 right-1.5" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotifOpen && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-10 w-[calc(100vw-1rem)] max-w-sm sm:w-96 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-100 overflow-hidden">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-foreground">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-border">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 text-xs transition flex gap-2.5 ${
                        item.unread ? "bg-accent/40" : "hover:bg-accent/20"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.type === "approval" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : item.type === "delay" ? (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-foreground truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-mono text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                            {item.projectCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-border bg-muted/40 text-center">
                  <Link
                    href="/tasks"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-[11px] text-muted-foreground hover:text-foreground font-medium"
                  >
                    View All Field Activity →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative pl-1 border-l border-border" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 border border-border text-foreground font-bold text-xs flex items-center justify-center shrink-0">
                {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : "BK")}
              </div>

              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {user?.name || "User"}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight font-mono">
                  {user?.roleTitle || ""}
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </button>

            {/* Profile Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-11 w-64 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100 text-xs">
                <div className="px-3.5 py-2.5 border-b border-border">
                  <div className="font-semibold text-foreground text-xs">{user?.name || "User"}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{user?.email || ""}</div>
                  <div className="mt-1.5">
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border font-semibold">
                      {user?.roleTitle || ""}
                    </span>
                  </div>
                </div>

                <div className="py-1 border-b border-border">
                  <Link
                    href="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-3.5 py-2 flex items-center gap-2 text-foreground hover:bg-accent transition"
                  >
                    <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Studio Settings</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-3.5 py-2 flex items-center justify-between text-foreground hover:bg-accent transition"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Public Studio Website</span>
                    </div>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </Link>
                </div>

                {/* Instant Role Switcher */}
                <div className="py-2 px-3.5 border-b border-border">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block mb-1.5">
                    Switch Active Role
                  </span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => {
                        switchRole("studio_admin");
                        setIsUserMenuOpen(false);
                        router.push("/dashboard");
                      }}
                      className={`p-1.5 rounded-md text-left border cursor-pointer ${
                        role === "studio_admin"
                          ? "bg-primary text-primary-foreground font-bold border-transparent"
                          : "border-border hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      Studio Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchRole("architect");
                        setIsUserMenuOpen(false);
                        router.push("/dashboard");
                      }}
                      className={`p-1.5 rounded-md text-left border cursor-pointer ${
                        role === "architect"
                          ? "bg-primary text-primary-foreground font-bold border-transparent"
                          : "border-border hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      Architect
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchRole("contractor");
                        setIsUserMenuOpen(false);
                        router.push("/orders");
                      }}
                      className={`p-1.5 rounded-md text-left border cursor-pointer col-span-2 ${
                        role === "contractor"
                          ? "bg-primary text-primary-foreground font-bold border-transparent"
                          : "border-border hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      Contractor
                    </button>
                  </div>
                </div>


                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full px-3.5 py-2 flex items-center gap-2 text-destructive hover:bg-destructive/10 transition text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Full Shadcn Admin Command Search Dialog (Ctrl+K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsCommandOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-popover text-popover-foreground border border-border rounded-xl shadow-2xl z-10 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={commandInputRef}
                type="text"
                placeholder="Type a command or search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-3">
              {/* Quick Navigation Links */}
              <div>
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Navigation
                </div>
                <div className="space-y-0.5">
                  {navigationShortcuts.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          setIsCommandOpen(false);
                          router.push(item.href);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs hover:bg-accent text-foreground transition text-left cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Projects Search Results */}
              <div>
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Matching Projects ({filteredSearchProjects.length})
                </div>
                <div className="space-y-0.5">
                  {filteredSearchProjects.length === 0 ? (
                    <div className="p-4 text-center text-xs text-muted-foreground">
                      No matching projects found
                    </div>
                  ) : (
                    filteredSearchProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setIsCommandOpen(false);
                          router.push(`/projects/${p.code}`);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-accent transition text-left cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-semibold text-foreground">
                              {p.code}
                            </span>
                            <span className="font-medium text-foreground">{p.name}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {p.clientName} • {p.city}
                          </span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase bg-muted text-muted-foreground border border-border">
                          {p.stage}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-border bg-muted/30 px-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>Press ESC to close</span>
              <span>Basekraft OS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
