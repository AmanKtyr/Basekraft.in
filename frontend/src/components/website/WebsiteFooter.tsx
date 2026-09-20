import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function WebsiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030014] text-zinc-300 transition relative overflow-hidden">
      {/* Upper Footer: Studio Locations & Quick Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1 & 2: Brand Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-700 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-md shadow-purple-900/30">
                BK
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                BASEKRAFT ARCHITECTURAL OS
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              An international design-build software platform and architectural practice. Unifying commercial BOQ precision, live client portals, parametric material masters, and turnkey execution.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                OS v2.4 Live
              </span>
              <span>•</span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 3: Main Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Price
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
              Studio Platform
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Studio OS Multi-Login
                </Link>
              </li>
              <li>
                <Link href="/client-portal/P-619" target="_blank" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Client Live Portal</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Book Practice Discovery
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Commercial Studio Tiers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Global Studios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
              Global Studio Hubs
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div>
                <span className="font-semibold text-zinc-200 block">Gurugram (HQ)</span>
                <span className="text-[11px] text-zinc-400">DLF Cyber City, Tower B, Level 8</span>
              </div>
              <div>
                <span className="font-semibold text-zinc-200 block">Mumbai</span>
                <span className="text-[11px] text-zinc-400">Worli Sea Face, Lower Parel</span>
              </div>
              <div>
                <span className="font-semibold text-zinc-200 block">Bengaluru</span>
                <span className="text-[11px] text-zinc-400">Outer Ring Road, Indiranagar</span>
              </div>
              <div>
                <span className="font-semibold text-zinc-200 block">International</span>
                <span className="text-[11px] text-zinc-400">Dubai One Central • London Mayfair</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/[0.08] py-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Basekraft Infra Private Limited. Architectural Studio OS. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/pricing" className="hover:text-white transition">
              Pricing Plans
            </Link>
            <Link href="/about" className="hover:text-white transition">
              Consultation Brief
            </Link>
            <Link href="/login" className="text-purple-300 hover:text-white font-semibold transition">
              Sign In / Studio OS →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
