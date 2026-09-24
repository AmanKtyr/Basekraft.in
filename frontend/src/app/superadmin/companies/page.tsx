"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  X,
  Filter,
  RefreshCw,
  HardDrive,
  Users,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  AlertTriangle,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  companiesApi,
  plansApi,
  CompanyItem,
  PlanItem,
  CompanyCreatePayload,
  IndustryType,
  INDUSTRY_OPTIONS,
} from "@/utils/api";

function CompaniesManagementContent() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeCompany, setActiveCompany] = useState<CompanyItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // New Company Form State
  const [formData, setFormData] = useState<CompanyCreatePayload>({
    name: "",
    industry: "INTERIOR_DESIGN",
    city: "Gurugram",
    country: "India",
    address: "",
    phone: "",
    email: "",
    plan_id: null,
    status: "ACTIVE",
    lead_architect: "",
    admin_first_name: "",
    admin_last_name: "",
    admin_email: "",
    admin_password: "",
    admin_role_title: "Managing Director / Principal",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [compData, plansData] = await Promise.all([
        companiesApi.list({
          search: searchQuery,
          status: selectedStatus === "ALL" ? undefined : selectedStatus,
        }),
        plansApi.list(),
      ]);
      setCompanies(compData);
      setPlans(plansData);
      if (plansData.length > 0 && !formData.plan_id) {
        setFormData((prev) => ({ ...prev, plan_id: plansData[0].id }));
      }
    } catch (err: unknown) {
      console.warn("Error fetching companies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedStatus]);

  // Open Add modal if url contains ?action=new
  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  // 1. CREATE COMPANY WITH ADMIN
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      await companiesApi.create(formData);
      showToast(`Company "${formData.name}" and administrator account provisioned successfully!`);
      setIsAddModalOpen(false);
      // Reset form
      setFormData({
        name: "",
        industry: "INTERIOR_DESIGN",
        city: "Gurugram",
        country: "India",
        address: "",
        phone: "",
        email: "",
        plan_id: plans[0]?.id || null,
        status: "ACTIVE",
        lead_architect: "",
        admin_first_name: "",
        admin_last_name: "",
        admin_email: "",
        admin_password: "",
        admin_role_title: "Managing Director / Principal",
      });
      loadData();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to create company");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. UPDATE COMPANY
  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCompany) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      await companiesApi.update(activeCompany.id, {
        name: activeCompany.name,
        industry: activeCompany.industry,
        city: activeCompany.city,
        country: activeCompany.country,
        address: activeCompany.address,
        phone: activeCompany.phone,
        email: activeCompany.email,
        status: activeCompany.status,
        lead_architect: activeCompany.lead_architect,
        plan_id: activeCompany.plan_id,
      });
      showToast(`Company "${activeCompany.name}" updated successfully.`);
      setIsEditModalOpen(false);
      setActiveCompany(null);
      loadData();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to update company");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. DELETE COMPANY
  const handleDeleteCompany = async () => {
    if (!activeCompany) return;
    setIsSubmitting(true);
    try {
      await companiesApi.delete(activeCompany.id);
      showToast(`Company "${activeCompany.name}" deleted.`);
      setIsDeleteModalOpen(false);
      setActiveCompany(null);
      loadData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete company");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered companies based on industry filter tab
  const displayedCompanies = companies.filter((c) => {
    if (selectedIndustry === "ALL") return true;
    return c.industry === selectedIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Enterprise Company Tenants
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Provision, monitor, edit, and organize companies across Turnkey Interiors, Solar EPC, Modular Manufacturing, and Civil Construction.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError(null);
            setIsAddModalOpen(true);
          }}
          className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Company</span>
        </button>
      </div>

      {/* Industry Sector Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border/50 text-xs">
        <span className="text-[11px] font-mono font-semibold uppercase text-muted-foreground shrink-0 mr-1">
          Sector:
        </span>
        <button
          onClick={() => setSelectedIndustry("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
            selectedIndustry === "ALL"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          All Sectors ({companies.length})
        </button>
        {INDUSTRY_OPTIONS.map((ind) => {
          const count = companies.filter((c) => c.industry === ind.key).length;
          return (
            <button
              key={ind.key}
              onClick={() => setSelectedIndustry(ind.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedIndustry === ind.key
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {ind.badge} ({count})
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "ACTIVE", "TRIAL", "SUSPENDED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedStatus === st
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {st === "ALL" ? "All Statuses" : st}
            </button>
          ))}
          <button
            onClick={loadData}
            title="Refresh list"
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Companies Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider font-mono border-b border-border">
              <tr>
                <th className="px-5 py-3 font-semibold">Company / Enterprise</th>
                <th className="px-4 py-3 font-semibold">Business Sector</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Subscription Plan</th>
                <th className="px-4 py-3 font-semibold">Lead Director</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Storage</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                    <span>Loading company tenants from DRF database...</span>
                  </td>
                </tr>
              ) : displayedCompanies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">
                    No companies found matching your query or selected sector.
                  </td>
                </tr>
              ) : (
                displayedCompanies.map((co) => (
                  <tr key={co.id} className="hover:bg-accent/30 transition">
                    {/* Company Name & Slug */}
                    <td className="px-5 py-3.5 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {co.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-foreground font-semibold truncate">{co.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            /{co.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Business Sector Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          co.industry === "SOLAR_EPC"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : co.industry === "MODULAR_FURNITURE"
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                            : co.industry === "CIVIL_CONSTRUCTION"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            co.industry === "SOLAR_EPC"
                              ? "bg-amber-500"
                              : co.industry === "MODULAR_FURNITURE"
                              ? "bg-purple-500"
                              : co.industry === "CIVIL_CONSTRUCTION"
                              ? "bg-blue-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        {co.industry_display || (co.industry === "SOLAR_EPC" ? "Solar Energy EPC" : co.industry === "MODULAR_FURNITURE" ? "Modular Factory" : co.industry === "CIVIL_CONSTRUCTION" ? "Civil Construction" : "Turnkey Fit-out")}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{co.city}, {co.country}</span>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted font-medium text-foreground">
                        {co.plan_details?.name || "Standard Plan"}
                      </span>
                    </td>

                    {/* Lead Director */}
                    <td className="px-4 py-3.5 text-foreground font-medium">
                      {co.lead_architect || "Not specified"}
                    </td>

                    {/* Status Pill */}
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

                    {/* Storage */}
                    <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
                      {co.storage_used_gb} GB
                    </td>

                    {/* Action Buttons: Edit & Delete */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setActiveCompany(co);
                            setFormError(null);
                            setIsEditModalOpen(true);
                          }}
                          title="Edit company"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setActiveCompany(co);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete company"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: ADD COMPANY & INITIAL ADMIN PROVISIONING               */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 my-8">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Provision New Company Tenant
                </h3>
                <p className="text-xs text-muted-foreground">
                  Supports Turnkey Fit-out, Solar EPC, Modular Manufacturing, and Civil Construction.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Section 1: Business Sector & Industry */}
              <div className="space-y-3">
                <div className="text-[11px] font-semibold text-primary uppercase tracking-wider font-mono">
                  1. Organization & Industry Sector
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>Business Sector & Industry *</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value as IndustryType })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-xs font-medium text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {INDUSTRY_OPTIONS.find((o) => o.key === formData.industry)?.description}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Company / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Solar Energy Systems"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Subscription Plan
                    </label>
                    <select
                      value={formData.plan_id || ""}
                      onChange={(e) => setFormData({ ...formData, plan_id: e.target.value || null })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Account Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="TRIAL">TRIAL</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Managing Director / Project Head
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sameer Kapoor"
                    value={formData.lead_architect}
                    onChange={(e) => setFormData({ ...formData, lead_architect: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Initial Admin Account */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="text-[11px] font-semibold text-primary uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>2. Initial Administrator Account</span>
                  <span className="text-[10px] text-muted-foreground font-normal">Instant sign-in access</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sameer"
                      value={formData.admin_first_name}
                      onChange={(e) => setFormData({ ...formData, admin_first_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kapoor"
                      value={formData.admin_last_name}
                      onChange={(e) => setFormData({ ...formData, admin_last_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Admin Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sameer@apexsolar.in"
                    value={formData.admin_email}
                    onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Initial Password * (min 8 chars)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Create temporary secure password"
                    value={formData.admin_password}
                    onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Provisioning...</span>
                    </>
                  ) : (
                    <span>Provision Company Tenant</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: EDIT COMPANY DETAILS                                  */}
      {/* ============================================================== */}
      {isEditModalOpen && activeCompany && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 my-8">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Update Company Profile
                </h3>
                <p className="text-xs text-muted-foreground">
                  Modify business sector, tier, status, or company leadership.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={activeCompany.name}
                  onChange={(e) => setActiveCompany({ ...activeCompany, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span>Business Sector & Industry *</span>
                </label>
                <select
                  value={activeCompany.industry}
                  onChange={(e) =>
                    setActiveCompany({
                      ...activeCompany,
                      industry: e.target.value as IndustryType,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-xs font-medium text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={activeCompany.city}
                    onChange={(e) => setActiveCompany({ ...activeCompany, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={activeCompany.country}
                    onChange={(e) => setActiveCompany({ ...activeCompany, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={activeCompany.plan_id || activeCompany.plan_details?.id || ""}
                    onChange={(e) => setActiveCompany({ ...activeCompany, plan_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Status
                  </label>
                  <select
                    value={activeCompany.status}
                    onChange={(e) =>
                      setActiveCompany({
                        ...activeCompany,
                        status: e.target.value as "ACTIVE" | "TRIAL" | "SUSPENDED",
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="TRIAL">TRIAL</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Managing Director / Head
                </label>
                <input
                  type="text"
                  value={activeCompany.lead_architect}
                  onChange={(e) => setActiveCompany({ ...activeCompany, lead_architect: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: DELETE CONFIRMATION                                   */}
      {/* ============================================================== */}
      {isDeleteModalOpen && activeCompany && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  Delete Company Tenant?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-foreground">{activeCompany.name}</strong>? All associated
                  user accounts, projects, and cloud files will be purged. This action cannot be undone.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCompany}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Deleting..." : "Permanently Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SuperAdminCompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          <span>Loading companies...</span>
        </div>
      }
    >
      <CompaniesManagementContent />
    </Suspense>
  );
}
