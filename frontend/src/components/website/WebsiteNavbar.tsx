"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  LogIn,
  ArrowUpRight,
} from "lucide-react";

export function WebsiteNavbar({
  onOpenConsultation,
}: {
  onOpenConsultation?: () => void;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "OS Features", href: "/features" },
    { label: "Portfolio Works", href: "/portfolio" },
    { label: "Pricing & Plans", href: "/pricing" },
    { label: "Studio Philosophy", href: "/about" },
  ];

  return (
    <header className="fixed left-0 top-0 w-full z-50 transition-all duration-300 bg-[#030014]/75 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6e25ed] via-[#a073ee] to-[#c084fc] text-white flex items-center justify-center font-extrabold text-sm tracking-wider shadow-[0_0_20px_rgba(160,115,238,0.5)] transition group-hover:scale-105">
            BK
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-200 transition">
              Basekraft
            </span>
            <span className="text-xs font-semibold text-purple-400">.com</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname === "/website"
                : pathname?.startsWith(link.href) || pathname?.startsWith(`/website${link.href}`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                  isActive
                    ? "nav-gradient text-white font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Dual Actions: Client Portal + Studio OS Button */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/client-portal/P-619"
            target="_blank"
            className="text-sm font-medium text-zinc-300 hover:text-white transition flex items-center gap-1.5 px-2 py-1"
          >
            <span>Client Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>

          <Link
            href="/login"
            className="hero-button-gradient py-2.5 px-5 rounded-full text-sm font-semibold text-white transition duration-200 hover:opacity-85 shadow-[0_4px_20px_rgba(110,37,237,0.45)] flex items-center gap-2"
          >
            <span>Studio OS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-zinc-300 hover:bg-white/[0.08] cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0c0a18]/95 backdrop-blur-2xl px-4 py-5 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/" || pathname === "/website"
                  : pathname?.startsWith(link.href) || pathname?.startsWith(`/website${link.href}`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "nav-gradient text-white font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
            <Link
              href="/client-portal/P-619"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              className="button-border-gradient w-full text-center px-3.5 py-2.5 text-xs font-medium rounded-lg text-zinc-300 flex items-center justify-center gap-2"
            >
              <span>Client Live Portal Preview</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hero-button-gradient w-full text-center px-4 py-2.5 text-xs font-bold text-white rounded-lg flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login to Studio OS Platform →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
