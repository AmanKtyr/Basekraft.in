"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  HardDrive,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { companiesApi, CompanyItem, SaaSMetrics } from "@/utils/api";

export default function SuperAdminDashboard() {
  const [metrics, setMetrics] = useState<SaaSMetrics>({
    total_companies: 4,
    active_companies: 3,
    trial_companies: 1,
    suspended_companies: 0,
    total_platform_users: 9,
    total_storage_used_gb: 1153.15,
  });
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const [metricsData, companiesData] = await Promise.all([
        companiesApi.metrics().catch(() => null),
        companiesApi.list().catch(() => []),
      ]);

      if (metricsData) {
        setMetrics(metricsData);
      }
      if (companiesData && companiesData.length > 0) {
        setCompanies(companiesData);
      }
    } catch (err) {
      console.warn("Could not fetch live dashboard metrics:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              SaaS Command Center
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live DRF API
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Global orchestrator overview: Manage architectural tenants, plans, and provisioned team access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={isRefreshing}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            title="Refresh metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>
          <Link
            href="/superadmin/companies?action=new"
            className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Studio Tenant</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Companies */}
        <div className="p-5 rounded-xl border border-border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Studios</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight">{metrics.total_companies}</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>{metrics.active_companies} Active / {metrics.trial_companies} Trial</span>
            </p>
          </div>
        </div>

        {/* Card 2: Platform Users */}
        <div className="p-5 rounded-xl border border-border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Platform Members</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight">{metrics.total_platform_users}</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Architects, Admins & Contractors
            </p>
          </div>
        </div>

        {/* Card 3: Storage Consumed */}
        <div className="p-5 rounded-xl border border-border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Cloud Storage Used</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight">
              {Number(metrics.total_storage_used_gb).toFixed(1)}{" "}
              <span className="text-sm font-normal text-muted-foreground font-mono">GB</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Drawings, CAD vaults & BIM assets
            </p>
          </div>
        </div>

        {/* Card 4: Active Subscriptions */}
        <div className="p-5 rounded-xl border border-border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Annual Recurring Tier</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight">3 Plans</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Solo, Studio Pro & Enterprise
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Tenants List & Quick Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Tenants (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-xs">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Registered Studio Tenants
              </h2>
              <p className="text-xs text-muted-foreground">
                Multi-tenant architectural studios configured in Basekraft OS
              </p>
            </div>
            <Link
              href="/superadmin/companies"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider font-mono border-b border-border">
                <tr>
                  <th className="px-5 py-3 font-semibold">Studio / Tenant</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Storage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {companies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                      No companies found or connecting to API...
                    </td>
                  </tr>
                ) : (
                  companies.slice(0, 6).map((co) => (
                    <tr key={co.id} className="hover:bg-accent/30 transition">
                      <td className="px-5 py-3.5 font-medium">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {co.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground truncate font-semibold">{co.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono truncate">
                              /{co.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {co.city}, {co.country}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted font-medium text-foreground">
                          {co.plan_details?.name || "Standard Plan"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            co.status === "ACTIVE"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : co.status === "TRIAL"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : "bg-destructive/10 text-destructive border border-destructive/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              co.status === "ACTIVE"
                                ? "bg-emerald-500"
                                : co.status === "TRIAL"
                                ? "bg-amber-500"
                                : "bg-destructive"
                            }`}
                          />
                          {co.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-[11px] text-muted-foreground">
                        {co.storage_used_gb} GB
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Platform Quick Info & Plan Distribution (1 col) */}
        <div className="space-y-6">
          {/* Quick Info Box */}
          <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Superadmin Security Scope
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You are authenticated with platform orchestrator privileges. You can provision company
              tenants, set custom storage caps, and reset credentials for any studio administrator.
            </p>

            <div className="pt-2 border-t border-border space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Database Engine</span>
                <span className="font-mono text-foreground font-medium">SQLite3 (Dev / Scalable to Postgres)</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Auth Framework</span>
                <span className="font-mono text-foreground font-medium">SimpleJWT 5.5.1</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>API Protocol</span>
                <span className="font-mono text-foreground font-medium">REST JSON /api/v1/</span>
              </div>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Management Shortcuts
            </h3>
            <div className="space-y-2">
              <Link
                href="/superadmin/companies"
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/20 hover:bg-accent/50 transition text-xs font-medium text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>View All Studios & Add New</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>

              <Link
                href="/superadmin/plans"
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/20 hover:bg-accent/50 transition text-xs font-medium text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Configure SaaS Subscription Tiers</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>

              <Link
                href="/superadmin/support"
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/20 hover:bg-accent/50 transition text-xs font-medium text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Platform Health & Support Log</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
