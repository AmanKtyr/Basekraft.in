"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  CheckCircle2,
  Users,
  HardDrive,
  Edit2,
  X,
  RefreshCw,
  Plus,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { plansApi, PlanItem } from "@/utils/api";

export default function SuperAdminPlansPage() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadPlans = async () => {
    setIsLoading(true);
    try {
      const data = await plansApi.list();
      setPlans(data);
    } catch (err) {
      console.warn("Error loading plans:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlan) return;
    setIsSubmitting(true);

    try {
      await plansApi.update(activePlan.id, {
        name: activePlan.name,
        price_monthly_inr: activePlan.price_monthly_inr,
        price_annual_inr: activePlan.price_annual_inr,
        max_seats: activePlan.max_seats,
        storage_gb: activePlan.storage_gb,
        description: activePlan.description,
      });
      showToast(`Plan "${activePlan.name}" updated successfully.`);
      setIsEditModalOpen(false);
      loadPlans();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to update plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            SaaS Subscription Tiers
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure architectural subscription packages, user seat ceilings, and cloud storage quotas.
          </p>
        </div>

        <button
          onClick={loadPlans}
          className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer flex items-center gap-1.5 text-xs font-medium self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Plans</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 p-12 text-center text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-xs">Loading subscription plans from DRF...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="col-span-3 p-12 text-center text-muted-foreground">
            No plans configured.
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
                    {plan.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {plan.companies_count || 0} active tenants
                    </span>
                    <button
                      onClick={() => {
                        setActivePlan(plan);
                        setIsEditModalOpen(true);
                      }}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 min-h-[36px] line-clamp-2">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="my-5 pb-5 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground">
                      ₹{Number(plan.price_monthly_inr).toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground">/month</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    ₹{Number(plan.price_annual_inr).toLocaleString("en-IN")} billed annually
                  </p>
                </div>

                {/* Limits */}
                <div className="grid grid-cols-2 gap-2 mb-5 text-xs">
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px]">Seat Limit</span>
                    </div>
                    <span className="font-bold text-foreground text-sm font-mono">
                      {plan.max_seats} Users
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <HardDrive className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[11px]">Cloud Vault</span>
                    </div>
                    <span className="font-bold text-foreground text-sm font-mono">
                      {plan.storage_gb} GB
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase font-mono">
                    Included Features
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {plan.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-6 mt-6 border-t border-border">
                <button
                  onClick={() => {
                    setActivePlan(plan);
                    setIsEditModalOpen(true);
                  }}
                  className="w-full py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent hover:text-foreground transition cursor-pointer"
                >
                  Adjust Tier Pricing & Limits
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Plan Modal */}
      {isEditModalOpen && activePlan && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Edit {activePlan.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Update subscription tier pricing and storage parameters.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdatePlan} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Plan Display Name
                </label>
                <input
                  type="text"
                  required
                  value={activePlan.name}
                  onChange={(e) => setActivePlan({ ...activePlan, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Monthly Price (INR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={activePlan.price_monthly_inr}
                    onChange={(e) =>
                      setActivePlan({ ...activePlan, price_monthly_inr: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Annual Price (INR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={activePlan.price_annual_inr}
                    onChange={(e) =>
                      setActivePlan({ ...activePlan, price_annual_inr: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Maximum Seats
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={activePlan.max_seats}
                    onChange={(e) =>
                      setActivePlan({ ...activePlan, max_seats: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Storage Quota (GB)
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    value={activePlan.storage_gb}
                    onChange={(e) =>
                      setActivePlan({ ...activePlan, storage_gb: parseInt(e.target.value) || 10 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={activePlan.description}
                  onChange={(e) =>
                    setActivePlan({ ...activePlan, description: e.target.value })
                  }
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
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
