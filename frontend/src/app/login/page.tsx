"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  Globe,
  Briefcase,
  HardHat,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

import { useAuth, UserRole } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, login, quickLogin } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("admin@basekraft.in");
  const [password, setPassword] = useState("StudioAdmin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("studio_admin");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if already authenticated
  React.useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      if (user.role === "superadmin") {
        router.replace("/superadmin");
      } else if (user.role === "contractor") {
        router.replace("/orders");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const roleOptions: {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    email: string;
    defaultPassword: string;
    targetRoute: string;
  }[] = [
    {
      role: "superadmin",
      title: "Global Superadmin",
      description: "Platform command center: Manage SaaS tenants, assign plans, provision company admins",
      icon: ShieldCheck,
      badge: "Superadmin",
      email: "superadmin@basekraft.in",
      defaultPassword: "SuperAdmin@123",
      targetRoute: "/superadmin",
    },
    {
      role: "studio_admin",
      title: "Studio Admin / Principal",
      description: "Full studio practice OS: Turnkey projects, dynamic BOQ matrix, CRM & financials",
      icon: Briefcase,
      badge: "Studio Owner",
      email: "admin@basekraft.in",
      defaultPassword: "StudioAdmin@123",
      targetRoute: "/dashboard",
    },
    {
      role: "architect",
      title: "Project Architect",
      description: "CAD drawings, site checkpoint snags, task checklists & billable timesheets",
      icon: HardHat,
      badge: "Field Ops",
      email: "riya.kapoor@basekraft.in",
      defaultPassword: "Architect@123",
      targetRoute: "/dashboard",
    },
    {
      role: "contractor",
      title: "Vendor / Subcontractor",
      description: "Material purchase orders, dispatch status, invoices & payment disbursements",
      icon: Building2,
      badge: "Supplier",
      email: "vikram.mep@apexbuild.com",
      defaultPassword: "Contractor@123",
      targetRoute: "/orders",
    },
  ];

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await login(email, password, selectedRole);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please verify your credentials or server status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const opt = roleOptions.find((o) => o.role === role);
    if (opt) {
      setEmail(opt.email);
      setPassword(opt.defaultPassword);
    }
  };

  const handleOneClickLogin = async (role: UserRole) => {
    setIsLoading(true);
    setErrorMessage("");
    const opt = roleOptions.find((o) => o.role === role);
    try {
      if (opt) {
        await login(opt.email, opt.defaultPassword, role);
      } else {
        await quickLogin(role);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Authentication failed. Check your network or credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-primary selection:text-primary-foreground">
      {/* Top Header Bar */}
      <header className="px-4 sm:px-8 py-3.5 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-xs shadow-xs">
            BK
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-foreground block">
              BASEKRAFT
            </span>
            <span className="text-[10px] text-muted-foreground font-mono block">
              Architectural Studio OS
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent border border-border transition cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent border border-border transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public Website</span>
          </Link>
        </div>
      </header>

      {/* Main Split Authentication Screen (Shadcn Admin signature layout) */}
      <main className="flex-1 flex">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-57px)]">
          {/* Left Hero Column (lg: 6 cols) - Dark Architectural Feature Showcase */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-zinc-950 text-zinc-100 p-10 xl:p-14 flex-col justify-between relative overflow-hidden border-r border-zinc-800">
            {/* Subtle Architectural Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-zinc-800/20 blur-3xl pointer-events-none" />

            {/* Top Brand Quote */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Next-Gen Architectural Studio Operating System</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Precision Turnkey Fit-Outs, Parametric BOQs & Site Supervision.
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                Connect your studio architects, on-site project engineers, and procurement vendors in a unified architectural workspace.
              </p>
            </div>

            {/* Middle Feature Highlights Cards */}
            <div className="relative z-10 grid grid-cols-3 gap-3 my-8">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                <FileSpreadsheet className="w-4 h-4 text-zinc-400" />
                <p className="text-xs font-semibold text-white">Dynamic BOQ</p>
                <p className="text-[10px] text-zinc-400">Rate-analysis & auto item breakdown</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <p className="text-xs font-semibold text-white">Site Checkpoints</p>
                <p className="text-[10px] text-zinc-400">Daily snag logs & milestone sign-offs</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <p className="text-xs font-semibold text-white">Procurement</p>
                <p className="text-[10px] text-zinc-400">Purchase orders & contractor ledger</p>
              </div>
            </div>

            {/* Bottom Testimonial */}
            <div className="relative z-10 border-t border-zinc-800/80 pt-6 space-y-2">
              <p className="text-xs italic text-zinc-300 leading-relaxed">
                &ldquo;Basekraft completely unified our workflow across design and turnkey execution. Our team manages on-site inspections and vendor work orders directly from their phones.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-7 h-7 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center">
                  AT
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Aman Tyagi</p>
                  <p className="text-[10px] text-zinc-400 font-mono">Principal Architect, Basekraft Studio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (lg: 6 cols) - Clean Shadcn Card */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center p-4 sm:p-8 lg:p-10 bg-background">
            <div className="w-full max-w-md space-y-6">
              {/* Card Header */}
              <div className="space-y-1.5 text-center sm:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Sign in to your account
                </h2>
                <p className="text-xs text-muted-foreground">
                  Enter your credentials below, or click any demo role for 1-click access.
                </p>
              </div>

              {/* Instant 1-Click Role Switcher Badges */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Quick Demo Personas</span>
                  <span className="font-mono text-[10px] text-emerald-500 font-normal">Ready to test</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roleOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedRole === opt.role;

                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => handleRoleSelect(opt.role)}
                        className={`p-2.5 rounded-lg border text-left transition flex sm:flex-col items-center sm:items-start gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-accent text-accent-foreground border-primary font-medium shadow-xs"
                            : "bg-card text-card-foreground border-border hover:bg-accent/50"
                        }`}
                      >
                        <div className={`p-1.5 rounded-md shrink-0 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate leading-tight">
                            {opt.badge}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate font-mono">
                            {opt.role}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>


              {errorMessage && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* The Login Form */}
              <form onSubmit={handleManualLogin} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@studio.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-input bg-background text-foreground shadow-2xs focus:outline-none focus:ring-1 focus:ring-ring transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-foreground">
                      Password
                    </label>
                    <span className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-input bg-background text-foreground shadow-2xs focus:outline-none focus:ring-1 focus:ring-ring transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-input text-primary focus:ring-ring w-3.5 h-3.5"
                    />
                    <span className="text-xs text-muted-foreground">Remember this device</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleOneClickLogin(selectedRole)}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    1-Click Fast In →
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In with Email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Card Footer Security & Terms */}
              <div className="pt-4 border-t border-border text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit Encrypted Multi-Tenant Session</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  By clicking Sign In, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-foreground">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
