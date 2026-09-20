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
  User,
  Settings,
  Users,
  Clock,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Laptop,
  Menu,
  Crown,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initialProjects } from "@/data/mockData";
import { useAuth, UserRole } from "@/context/AuthContext";

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

export function TopNav({ onOpenNewProject, onToggleMobileMenu }: TopNavProps) {
  const router = useRouter();
  const { user, role, switchRole, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = searchContainerRef.current?.querySelector("input");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Filtered projects for search
  const filteredSearchProjects = initialProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left Area: Mobile Menu Toggle + Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm md:max-w-md">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Open mobile navigation menu"
          className="lg:hidden p-1.5 -ml-1 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input with Dynamic Results Dropdown */}
        <div className="relative flex-1" ref={searchContainerRef}>
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects, clients, BOQs..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md pl-8 sm:pl-9 pr-8 sm:pr-14 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
            />
            <div className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 pointer-events-none">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>

          {/* Live Search Quick-Jump Dropdown */}
          {isSearchFocused && searchQuery.length > 0 && (
            <div className="absolute left-0 top-11 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-900">
                Matching Projects ({filteredSearchProjects.length})
              </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {filteredSearchProjects.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-400">
                  No matching projects found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredSearchProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                      router.push(`/projects/${p.code}`);
                    }}
                    className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                          {p.code}
                        </span>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {p.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400">
                        {p.clientName} • {p.city}
                      </span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {p.stage}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Right Controls Area: Actions, Notifications, & User Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Primary Action Button: New Project */}
        <button
          onClick={onOpenNewProject}
          className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Project</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-1.5 sm:p-2 rounded-md text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Bell with Flyout Drawer */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notifications"
            title="Studio Notifications"
            className="relative p-1.5 sm:p-2 rounded-md text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-zinc-100 ring-2 ring-white dark:ring-zinc-950 absolute top-1.5 right-1.5" />
            )}
          </button>

          {/* Notifications Drawer */}
          {isNotifOpen && (
            <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-10 w-[calc(100vw-1rem)] max-w-sm sm:w-96 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-100 overflow-hidden">
              <div className="p-3 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-900">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 text-xs transition flex gap-2.5 ${
                      item.unread
                        ? "bg-zinc-50/70 dark:bg-zinc-900/40"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900/20"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === "approval" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : item.type === "delay" ? (
                        <AlertCircle className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                      ) : (
                        <Clock className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {item.projectCode}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 text-center">
                <Link
                  href="/tasks"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 font-medium"
                >
                  View All Field Activity →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE & DROPDOWN MENU */}
        <div className="relative pl-1 border-l border-zinc-200 dark:border-zinc-800" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            {/* User Avatar Circle */}
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold text-xs flex items-center justify-center shrink-0">
              {user.avatar || user.name.slice(0, 2).toUpperCase()}
            </div>

            {/* Name and Designation */}
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                {user.name}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                {user.roleTitle}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {/* User Profile Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-11 w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100 text-xs">
              {/* Account Info Header */}
              <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-900">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                  {user.name}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  {user.email}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold">
                    {user.roleTitle}
                  </span>
                </div>
              </div>

              {/* Master Superadmin Link (if superadmin) */}
              <div className="py-1 border-b border-zinc-100 dark:border-zinc-900">
                <Link
                  href="/superadmin"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3.5 py-2 flex items-center justify-between text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Superadmin Portal</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </Link>

                <Link
                  href="/"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3.5 py-2 flex items-center justify-between text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Public Studio Website</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </Link>
              </div>

              {/* Quick Role Switcher */}
              <div className="py-2 px-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-1.5">
                  Quick Switch Role
                </span>
                <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      switchRole("superadmin");
                      setIsUserMenuOpen(false);
                      router.push("/superadmin");
                    }}
                    className={`p-1 rounded text-left border ${
                      role === "superadmin"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold border-transparent"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Superadmin
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchRole("studio_admin");
                      setIsUserMenuOpen(false);
                      router.push("/dashboard");
                    }}
                    className={`p-1 rounded text-left border ${
                      role === "studio_admin"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold border-transparent"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
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
                    className={`p-1 rounded text-left border ${
                      role === "architect"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold border-transparent"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Architect
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchRole("client");
                      setIsUserMenuOpen(false);
                      router.push("/client-portal/P-619");
                    }}
                    className={`p-1 rounded text-left border ${
                      role === "client"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold border-transparent"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Client Portal
                  </button>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3.5 py-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Studio Settings & Masters</span>
                </Link>

                <Link
                  href="/team"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3.5 py-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                >
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Team Directory & Roles</span>
                </Link>

                <Link
                  href="/timesheets"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3.5 py-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
                >
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>My Billable Timesheets</span>
                </Link>
              </div>

              {/* Theme Toggle within Menu */}
              <div className="border-t border-zinc-100 dark:border-zinc-900 py-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full text-left px-3.5 py-2 flex items-center justify-between text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {isDark ? <Sun className="w-3.5 h-3.5 text-zinc-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>Theme: {isDark ? "Dark Mode" : "Light Mode"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">Toggle</span>
                </button>
              </div>

              {/* Sign Out */}
              <div className="border-t border-zinc-100 dark:border-zinc-900 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3.5 py-2 flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition font-medium cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Sign out to Login Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
