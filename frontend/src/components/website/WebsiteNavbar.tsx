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
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Price", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed left-0 top-0 w-full z-50 transition-all duration-300 bg-[#030014]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Identity - Strictly single-line and non-shrinking */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 whitespace-nowrap">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6e25ed] via-[#a073ee] to-[#c084fc] text-white flex items-center justify-center font-extrabold text-sm tracking-wider shadow-[0_0_20px_rgba(160,115,238,0.5)] transition group-hover:scale-105 shrink-0">
            BK
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-purple-200 transition whitespace-nowrap">
              Basekraft
            </span>
            <span className="text-xs font-semibold text-purple-400 whitespace-nowrap">.com</span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Always single-line, whitespace-nowrap, auto-scaling */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/[0.03] px-2.5 xl:px-3.5 py-1.5 rounded-full border border-white/[0.06] shrink-0">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname === "/website"
                : pathname?.startsWith(link.href) || pathname?.startsWith(`/website${link.href}`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
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

        {/* Dual Actions: Client Portal + Studio OS Button - Strictly single-line, non-wrapping */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0 whitespace-nowrap">
          <Link
            href="/client-portal/P-619"
            target="_blank"
            className="text-xs xl:text-sm font-medium text-zinc-300 hover:text-white transition flex items-center gap-1.5 px-2 py-1.5 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Client Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </Link>

          <Link
            href="/login"
            className="hero-button-gradient py-2 xl:py-2.5 px-4 xl:px-5 rounded-full text-xs xl:text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 shadow-[0_4px_20px_rgba(110,37,237,0.45)] flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Studio OS</span>
            <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition cursor-pointer border border-white/[0.08] shrink-0"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer with Smooth Slide & Blur Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#07041a]/95 backdrop-blur-2xl px-5 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
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
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between whitespace-nowrap ${
                    isActive
                      ? "nav-gradient text-white font-bold"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <Link
              href="/client-portal/P-619"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              className="button-border-gradient w-full text-center px-4 py-3 text-xs font-semibold rounded-xl text-zinc-200 hover:text-white flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Preview Live Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hero-button-gradient w-full text-center px-4 py-3 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Launch Studio OS Platform</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
