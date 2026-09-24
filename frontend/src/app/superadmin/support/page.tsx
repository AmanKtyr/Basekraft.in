"use client";

import React, { useState } from "react";
import {
  LifeBuoy,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Server,
  Database,
  Cpu,
  ShieldCheck,
  Mail,
  MessageSquare,
  Search,
  Filter,
} from "lucide-react";

interface TicketItem {
  id: string;
  studioName: string;
  contactEmail: string;
  subject: string;
  category: "Billing" | "Storage" | "BOQ Engine" | "Account Access";
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
}

export default function SuperAdminSupportPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: "TICK-4091",
      studioName: "Atelier Nine Architecture",
      contactEmail: "tariq@atelier9.com",
      subject: "Requesting storage quota increase for Dubai d3 commercial BIM files",
      category: "Storage",
      priority: "HIGH",
      status: "OPEN",
      createdAt: "Today at 02:40 PM",
    },
    {
      id: "TICK-4088",
      studioName: "Varma & Associates Turnkey Interiors",
      contactEmail: "kavita@varma.in",
      subject: "Assistance configuring GST invoice format for Mumbai residential project",
      category: "Billing",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      createdAt: "Yesterday at 06:15 PM",
    },
    {
      id: "TICK-4075",
      studioName: "Studio Forma International",
      contactEmail: "eleanor@studioforma.co.uk",
      subject: "Revit model sync integration query with Autodesk Construction Cloud",
      category: "BOQ Engine",
      priority: "LOW",
      status: "RESOLVED",
      createdAt: "Sep 22, 2026",
    },
  ]);

  const toggleTicketStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus =
            t.status === "OPEN"
              ? "IN_PROGRESS"
              : t.status === "IN_PROGRESS"
              ? "RESOLVED"
              : "OPEN";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Platform Support & SLA Monitoring
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor infrastructure uptime, respond to tenant queries, and manage enterprise tickets.
          </p>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted-foreground font-mono">DRF API Backend</span>
            <div className="text-sm font-bold text-foreground mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Operational (100%)</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Port 8000 Healthy</p>
          </div>
          <Server className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted-foreground font-mono">Database Cluster</span>
            <div className="text-sm font-bold text-foreground mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Normal Latency (3ms)</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Zero Migration Drift</p>
          </div>
          <Database className="w-5 h-5 text-blue-500" />
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted-foreground font-mono">SimpleJWT Auth Token</span>
            <div className="text-sm font-bold text-foreground mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Active Encryption</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">HS256 Standard Keys</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-purple-500" />
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted-foreground font-mono">Active Inquiries</span>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {tickets.filter((t) => t.status !== "RESOLVED").length} Pending
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Avg SLA Response: 45m</p>
          </div>
          <LifeBuoy className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      {/* Support Tickets Queue */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Tenant Support Tickets
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct inquiries from registered studio principals and BIM coordinators.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider font-mono border-b border-border">
              <tr>
                <th className="px-5 py-3 font-semibold">Ticket ID</th>
                <th className="px-4 py-3 font-semibold">Studio Tenant</th>
                <th className="px-4 py-3 font-semibold">Inquiry Subject</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-accent/30 transition">
                  <td className="px-5 py-3.5 font-mono text-muted-foreground font-semibold">
                    {t.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-foreground">{t.studioName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{t.contactEmail}</p>
                  </td>
                  <td className="px-4 py-3.5 max-w-sm">
                    <p className="text-foreground font-medium truncate">{t.subject}</p>
                    <p className="text-[10px] text-muted-foreground">{t.createdAt}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        t.priority === "HIGH"
                          ? "bg-destructive/10 text-destructive"
                          : t.priority === "MEDIUM"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        t.status === "RESOLVED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : t.status === "IN_PROGRESS"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggleTicketStatus(t.id)}
                      className="text-xs text-primary hover:underline font-medium cursor-pointer"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
