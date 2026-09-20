"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  UserCheck,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  ChevronRight,
  TrendingUp,
  X,
  Layers,
  Users,
  CheckSquare,
  Compass,
} from "lucide-react";
import { LeadItem, ClientDirectoryItem, LeadStage } from "@/types";
import { LEAD_STAGES, initialLeads, initialClients } from "@/data/crmData";

export default function CRMPage() {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [clients, setClients] = useState<ClientDirectoryItem[]>(initialClients);
  const [activeTab, setActiveTab] = useState<"kanban" | "directory" | "consultations">("kanban");
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");

  // Modals
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<LeadItem | null>(null);
  const [convertingLead, setConvertingLead] = useState<LeadItem | null>(null);
  const [convertSuccessMsg, setConvertSuccessMsg] = useState<string | null>(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    city: "Mumbai",
    propertyType: "Residential 3BHK" as LeadItem["propertyType"],
    carpetAreaSqFt: 2500,
    estimatedBudget: 5000000,
    stage: "new_inquiry" as LeadStage,
    leadSource: "Instagram / Social" as LeadItem["leadSource"],
    assignedDesigner: "Ananya Deshmukh",
    notes: "",
    siteVisitDate: "",
  });

  // Convert to Project Form State
  const [convertForm, setConvertForm] = useState({
    projectName: "",
    projectCode: "P-702",
    pmName: "Rohan Malhotra",
    targetHandover: "2027-03-31",
  });

  // Currency Formatter
  const formatINR = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // KPIs
  const totalPipelineValue = useMemo(() => {
    return leads
      .filter((l) => l.stage !== "dropped" && l.stage !== "won")
      .reduce((sum, l) => sum + l.estimatedBudget, 0);
  }, [leads]);

  const activeInquiriesCount = useMemo(() => {
    return leads.filter((l) => l.stage !== "dropped" && l.stage !== "won").length;
  }, [leads]);

  const negotiationValue = useMemo(() => {
    return leads
      .filter((l) => l.stage === "negotiation")
      .reduce((sum, l) => sum + l.estimatedBudget, 0);
  }, [leads]);

  const wonLeadsValue = useMemo(() => {
    return leads
      .filter((l) => l.stage === "won")
      .reduce((sum, l) => sum + l.estimatedBudget, 0);
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.leadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.propertyType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = sourceFilter === "all" || lead.leadSource === sourceFilter;
      const matchesProperty = propertyFilter === "all" || lead.propertyType === propertyFilter;

      return matchesSearch && matchesSource && matchesProperty;
    });
  }, [leads, searchQuery, sourceFilter, propertyFilter]);

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      return (
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.companyName && c.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.primaryProjectCode && c.primaryProjectCode.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [clients, searchQuery]);

  // Handle stage movement
  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    if (selectedLeadForDetail?.id === leadId) {
      setSelectedLeadForDetail((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
  };

  // Handle New Lead Submit
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.clientName || !newLeadForm.clientPhone) return;

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      leadNumber: `LD-2026-${String(leads.length + 91).padStart(3, "0")}`,
      clientName: newLeadForm.clientName,
      clientPhone: newLeadForm.clientPhone,
      clientEmail: newLeadForm.clientEmail,
      city: newLeadForm.city,
      propertyType: newLeadForm.propertyType,
      carpetAreaSqFt: Number(newLeadForm.carpetAreaSqFt),
      estimatedBudget: Number(newLeadForm.estimatedBudget),
      stage: newLeadForm.stage,
      leadSource: newLeadForm.leadSource,
      assignedDesigner: newLeadForm.assignedDesigner,
      notes: newLeadForm.notes || "Initial inquiry logged via Studio CRM.",
      siteVisitDate: newLeadForm.siteVisitDate,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLeads([newLead, ...leads]);

    // Also add to prospective clients directory if not existing
    setClients((prev) => [
      {
        id: `client-${Date.now()}`,
        clientName: newLeadForm.clientName,
        clientPhone: newLeadForm.clientPhone,
        clientEmail: newLeadForm.clientEmail,
        city: newLeadForm.city,
        activeProjectsCount: 0,
        lifetimeValue: Number(newLeadForm.estimatedBudget),
        status: "Prospect",
        leadSource: newLeadForm.leadSource,
        clientSince: "Today",
        lastInteraction: "Inquiry logged into CRM",
      },
      ...prev,
    ]);

    setIsNewLeadOpen(false);
    // Reset Form
    setNewLeadForm({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      city: "Mumbai",
      propertyType: "Residential 3BHK",
      carpetAreaSqFt: 2500,
      estimatedBudget: 5000000,
      stage: "new_inquiry",
      leadSource: "Instagram / Social",
      assignedDesigner: "Ananya Deshmukh",
      notes: "",
      siteVisitDate: "",
    });
  };

  // Convert Lead to Official Project
  const handleConvertLeadToProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingLead) return;

    const projCode = convertForm.projectCode;

    // Update Lead to Won & link project
    setLeads((prev) =>
      prev.map((l) =>
        l.id === convertingLead.id
          ? { ...l, stage: "won", convertedProjectCode: projCode }
          : l
      )
    );

    // Update Client directory to Active with portalCode
    setClients((prev) =>
      prev.map((c) =>
        c.clientName.toLowerCase() === convertingLead.clientName.toLowerCase()
          ? {
              ...c,
              status: "Active",
              activeProjectsCount: 1,
              primaryProjectCode: projCode,
              portalCode: projCode,
              lastInteraction: `Converted to project ${projCode} (Handover: ${convertForm.targetHandover})`,
            }
          : c
      )
    );

    setConvertSuccessMsg(`Lead successfully converted to Studio Project [${projCode} — ${convertForm.projectName}]!`);
    setConvertingLead(null);
    setTimeout(() => setConvertSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950">
              <UserCheck className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Studio CRM & Client Pipeline
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Lead qualification, site surveys, client lifetime directory & live portal access
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tab Switcher */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
            <button
              id="crm-tab-kanban"
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                activeTab === "kanban"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Leads Pipeline</span>
            </button>
            <button
              id="crm-tab-directory"
              onClick={() => setActiveTab("directory")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                activeTab === "directory"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Client Rolodex</span>
            </button>
            <button
              id="crm-tab-consultations"
              onClick={() => setActiveTab("consultations")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                activeTab === "consultations"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Site Visits</span>
            </button>
          </div>

          {/* "+ New Lead" Button */}
          <button
            id="btn-add-lead-modal"
            onClick={() => setIsNewLeadOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3.5 py-1.5 rounded-md text-xs font-medium transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Lead / Inquiry</span>
          </button>
        </div>
      </div>

      {/* Success Alert Banner if converted */}
      {convertSuccessMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-md text-xs font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{convertSuccessMsg}</span>
          </div>
          <Link
            href="/projects"
            className="underline text-[11px] font-semibold hover:text-emerald-800 dark:hover:text-emerald-300"
          >
            View in Projects Portfolio →
          </Link>
        </div>
      )}

      {/* KPI Banners */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Active Pipeline Value</div>
          <div className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mt-1 font-mono tracking-tight">
            {formatINR(totalPipelineValue)}
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            Across {activeInquiriesCount} active studio leads
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">In Negotiation / Closing</div>
          <div className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mt-1 font-mono tracking-tight">
            {formatINR(negotiationValue)}
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">High probability proposals</div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Won / Converted</div>
          <div className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mt-1 font-mono tracking-tight">
            {formatINR(wonLeadsValue)}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
            100% Transitioned to OS Projects
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Studio Client Rolodex</div>
          <div className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mt-1 font-mono tracking-tight">
            {clients.length} Clients
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
            <ExternalLink className="w-2.5 h-2.5" />
            Live Client Portal enabled
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="crm-search-input"
            type="text"
            placeholder={
              activeTab === "directory"
                ? "Search clients, company or project..."
                : "Search leads by client, city or number..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {activeTab === "kanban" && (
            <>
              {/* Source Filter */}
              <select
                id="crm-source-filter"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
              >
                <option value="all">All Sources</option>
                <option value="Instagram / Social">Instagram / Social</option>
                <option value="Referral">Referral</option>
                <option value="Architect Network">Architect Network</option>
                <option value="Website Inbound">Website Inbound</option>
                <option value="Walk-in">Walk-in</option>
              </select>

              {/* Property Type Filter */}
              <select
                id="crm-property-filter"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
              >
                <option value="all">All Property Types</option>
                <option value="Residential 3BHK">Residential 3BHK</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Retail Boutique">Retail Boutique</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </>
          )}

          {(searchQuery || sourceFilter !== "all" || propertyFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSourceFilter("all");
                setPropertyFilter("all");
              }}
              className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline px-2 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: KANBAN PIPELINE VIEW */}
      {/* ========================================================= */}
      {activeTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3.5 items-start">
          {LEAD_STAGES.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.stage === col.id);
            const colTotalBudget = colLeads.reduce((sum, l) => sum + l.estimatedBudget, 0);

            return (
              <div
                key={col.id}
                className="bg-zinc-100/70 dark:bg-zinc-900/60 rounded-lg p-2.5 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col min-h-[480px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-2.5 px-1">
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <span>{col.label}</span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {colLeads.length}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      {formatINR(colTotalBudget)}
                    </div>
                  </div>
                </div>

                {/* Lead Cards in Column */}
                <div className="space-y-2.5 flex-1">
                  {colLeads.length === 0 ? (
                    <div className="h-24 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-md flex items-center justify-center text-[11px] text-zinc-400">
                      No leads in stage
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition space-y-2.5 group cursor-pointer"
                        onClick={() => setSelectedLeadForDetail(lead)}
                      >
                        {/* Top: Lead Code & Source Tag */}
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[10px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                            {lead.leadNumber}
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            {lead.leadSource}
                          </span>
                        </div>

                        {/* Client Name & Property Info */}
                        <div>
                          <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-900 dark:group-hover:text-white">
                            {lead.clientName}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-zinc-400" />
                            <span>{lead.propertyType}</span>
                            <span>•</span>
                            <span className="font-mono">{lead.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            <span>{lead.city}</span>
                          </div>
                        </div>

                        {/* Budget & Assignee */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                          <div>
                            <div className="text-[9px] text-zinc-400 uppercase font-mono">Budget</div>
                            <div className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100">
                              {formatINR(lead.estimatedBudget)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] text-zinc-400 uppercase font-mono">Designer</div>
                            <div className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                              {lead.assignedDesigner}
                            </div>
                          </div>
                        </div>

                        {/* Scheduled Site Visit or Next Followup Tag */}
                        {lead.siteVisitDate && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1 flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            <span>Site Visit: {lead.siteVisitDate}</span>
                          </div>
                        )}

                        {lead.convertedProjectCode && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1 flex items-center justify-between text-[10px] text-emerald-700 dark:text-emerald-400">
                            <span className="font-medium">OS Project: {lead.convertedProjectCode}</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          </div>
                        )}

                        {/* Interactive Footer Actions */}
                        <div
                          className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            {/* WhatsApp Button */}
                            <a
                              href={`https://wa.me/${lead.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hello ${lead.clientName}, this is from the Architectural Design Studio regarding your interior project inquiry (${lead.propertyType} in ${lead.city}). Would you like to review preliminary moodboards or schedule site measurements?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 rounded text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            {/* Phone Call */}
                            <a
                              href={`tel:${lead.clientPhone}`}
                              title="Call Client"
                              className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Quick Stage Mover or Convert Button */}
                          <div className="flex items-center gap-1">
                            {lead.stage !== "won" ? (
                              <select
                                value={lead.stage}
                                onChange={(e) => handleMoveStage(lead.id, e.target.value as LeadStage)}
                                className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                              >
                                <option value="new_inquiry">1. Inquiry</option>
                                <option value="site_consultation">2. Site Visit</option>
                                <option value="concept_pitch">3. Pitch</option>
                                <option value="negotiation">4. Negotiate</option>
                                <option value="won">5. Won</option>
                              </select>
                            ) : (
                              <span className="text-[10px] font-mono text-emerald-600 font-bold px-1 py-0.5">
                                Won Deal
                              </span>
                            )}

                            {/* Convert to Project Action */}
                            {!lead.convertedProjectCode && (lead.stage === "won" || lead.stage === "negotiation") && (
                              <button
                                onClick={() => {
                                  setConvertingLead(lead);
                                  setConvertForm({
                                    projectName: `${lead.clientName} - ${lead.propertyType}`,
                                    projectCode: `P-${Math.floor(100 + Math.random() * 900)}`,
                                    pmName: "Rohan Malhotra",
                                    targetHandover: "2027-03-15",
                                  });
                                }}
                                className="text-[10px] bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium px-2 py-0.5 rounded hover:opacity-90 transition cursor-pointer"
                              >
                                Convert
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: CLIENT DIRECTORY / ROLODEX VIEW */}
      {/* ========================================================= */}
      {activeTab === "directory" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xs">
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Architectural Client Directory ({filteredClients.length})
              </h2>
            </div>
            <div className="text-[11px] text-zinc-400">
              Direct access to live Client Portals & WhatsApp
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-500 font-mono text-[11px]">
                  <th className="py-2.5 px-4 font-medium">Client / Entity</th>
                  <th className="py-2.5 px-4 font-medium">Contact Details</th>
                  <th className="py-2.5 px-4 font-medium">City & Source</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                  <th className="py-2.5 px-4 font-medium text-right">Lifetime Value (INR)</th>
                  <th className="py-2.5 px-4 font-medium">Active Project</th>
                  <th className="py-2.5 px-4 font-medium text-right">Client Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition group"
                  >
                    {/* Client Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">{client.clientName}</div>
                      {client.companyName && (
                        <div className="text-[11px] text-zinc-500">{client.companyName}</div>
                      )}
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        Client since: {client.clientSince}
                      </div>
                    </td>

                    {/* Contact details with WhatsApp */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                        <span className="font-mono text-[11px]">{client.clientPhone}</span>
                        <a
                          href={`https://wa.me/${client.clientPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open WhatsApp"
                          className="p-1 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      {client.clientEmail && (
                        <div className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[180px]">
                          {client.clientEmail}
                        </div>
                      )}
                    </td>

                    {/* City & Source */}
                    <td className="py-3 px-4">
                      <div className="text-zinc-800 dark:text-zinc-200 font-medium">{client.city}</div>
                      <div className="text-[10px] text-zinc-400 uppercase font-mono mt-0.5">
                        {client.leadSource}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          client.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : client.status === "Prospect"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>

                    {/* LTV */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-zinc-950 dark:text-zinc-100">
                      {formatINR(client.lifetimeValue)}
                    </td>

                    {/* Active Project Code */}
                    <td className="py-3 px-4">
                      {client.primaryProjectCode ? (
                        <Link
                          href="/projects"
                          className="font-mono text-xs font-semibold underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-500"
                        >
                          {client.primaryProjectCode}
                        </Link>
                      ) : (
                        <span className="text-zinc-400 text-[11px] italic">In Lead Pipeline</span>
                      )}
                    </td>

                    {/* Launch Live Client Portal Link */}
                    <td className="py-3 px-4 text-right">
                      {client.portalCode ? (
                        <Link
                          href={`/client-portal/${client.portalCode}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-[11px] font-medium px-2.5 py-1 rounded transition"
                        >
                          <span>Open Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            // Find corresponding lead or prompt to convert
                            const matchedLead = leads.find(
                              (l) => l.clientName.toLowerCase() === client.clientName.toLowerCase()
                            );
                            if (matchedLead) {
                              setConvertingLead(matchedLead);
                              setConvertForm({
                                projectName: `${client.clientName} Residence`,
                                projectCode: `P-${Math.floor(100 + Math.random() * 900)}`,
                                pmName: "Rohan Malhotra",
                                targetHandover: "2027-03-31",
                              });
                            }
                          }}
                          className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline cursor-pointer"
                        >
                          Initialize Portal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: SITE CONSULTATIONS & CALENDAR VIEW */}
      {/* ========================================================= */}
      {activeTab === "consultations" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads
              .filter((l) => l.siteVisitDate || l.stage === "site_consultation")
              .map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {lead.clientName}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          Site Visit Date:{" "}
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                            {lead.siteVisitDate || "Scheduled this week"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {lead.leadNumber}
                    </span>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded text-xs space-y-1.5 text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Property:</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {lead.propertyType} ({lead.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Location:</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{lead.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Lead Architect:</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {lead.assignedDesigner}
                      </span>
                    </div>
                    <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-700/50 text-[11px] leading-relaxed">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Survey Notes: </span>
                      {lead.notes}
                    </div>
                  </div>

                  {/* Actions for site visit */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      Est. Budget: {formatINR(lead.estimatedBudget)}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${lead.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${lead.clientName}, confirming our upcoming architectural site survey for your ${lead.propertyType} in ${lead.city}. Our design team will carry laser meters and finish sample swatches.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded transition"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Send WhatsApp Reminder</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: + NEW LEAD / CLIENT INQUIRY */}
      {/* ========================================================= */}
      {isNewLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-xl w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  New Architectural Lead / Client Inquiry
                </h2>
              </div>
              <button
                onClick={() => setIsNewLeadOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Vikramaditya Singhania"
                    value={newLeadForm.clientName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientName: e.target.value })}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Client Phone (WhatsApp) *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. +91 98200 44210"
                    value={newLeadForm.clientPhone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientPhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@domain.com"
                    value={newLeadForm.clientEmail}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientEmail: e.target.value })}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    City / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai / Alibaug"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Property Type
                  </label>
                  <select
                    value={newLeadForm.propertyType}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        propertyType: e.target.value as LeadItem["propertyType"],
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  >
                    <option value="Residential 3BHK">Residential 3BHK</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Retail Boutique">Retail Boutique</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="F&B / Hospitality">F&B / Hospitality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Carpet Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.carpetAreaSqFt}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, carpetAreaSqFt: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Est. Budget (INR ₹)
                  </label>
                  <input
                    type="number"
                    step="100000"
                    value={newLeadForm.estimatedBudget}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, estimatedBudget: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Lead Source
                  </label>
                  <select
                    value={newLeadForm.leadSource}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        leadSource: e.target.value as LeadItem["leadSource"],
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  >
                    <option value="Instagram / Social">Instagram / Social</option>
                    <option value="Referral">Referral</option>
                    <option value="Architect Network">Architect Network</option>
                    <option value="Website Inbound">Website Inbound</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Assigned Architect
                  </label>
                  <select
                    value={newLeadForm.assignedDesigner}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, assignedDesigner: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  >
                    <option value="Ananya Deshmukh">Ananya Deshmukh</option>
                    <option value="Meera Nair">Meera Nair</option>
                    <option value="Rohan Malhotra">Rohan Malhotra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Site Visit Date
                  </label>
                  <input
                    type="date"
                    value={newLeadForm.siteVisitDate}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, siteVisitDate: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Design Brief / Client Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Bare shell 4BHK. Client loves Nordic minimalism with Italian marble and concealed magnetic track lights..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded leading-relaxed focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewLeadOpen(false)}
                  className="px-3.5 py-1.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-4 py-1.5 rounded font-medium hover:opacity-90 transition cursor-pointer shadow-xs"
                >
                  Create & Ingest Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CONVERT LEAD TO PROJECT */}
      {/* ========================================================= */}
      {convertingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Convert Lead to Studio Project
                </h2>
              </div>
              <button
                onClick={() => setConvertingLead(null)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConvertLeadToProject} className="mt-4 space-y-3.5 text-xs">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="text-[11px] text-zinc-500 font-mono">{convertingLead.leadNumber}</div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100">{convertingLead.clientName}</div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  {formatINR(convertingLead.estimatedBudget)} • {convertingLead.propertyType}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Official Project Name
                </label>
                <input
                  type="text"
                  required
                  value={convertForm.projectName}
                  onChange={(e) => setConvertForm({ ...convertForm, projectName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Assigned Project Code
                  </label>
                  <input
                    type="text"
                    required
                    value={convertForm.projectCode}
                    onChange={(e) => setConvertForm({ ...convertForm, projectCode: e.target.value })}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Project Manager
                  </label>
                  <select
                    value={convertForm.pmName}
                    onChange={(e) => setConvertForm({ ...convertForm, pmName: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  >
                    <option value="Rohan Malhotra">Rohan Malhotra</option>
                    <option value="Karan Johar">Karan Johar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Handover Date
                </label>
                <input
                  type="date"
                  required
                  value={convertForm.targetHandover}
                  onChange={(e) => setConvertForm({ ...convertForm, targetHandover: e.target.value })}
                  className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                />
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Converting will mark this lead as <strong>Contract Won</strong>, activate their client account, and generate live <strong>Client Portal credentials</strong> (`/client-portal/${convertForm.projectCode}`).
              </p>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setConvertingLead(null)}
                  className="px-3.5 py-1.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded font-medium transition cursor-pointer shadow-xs"
                >
                  Confirm & Launch Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: LEAD DETAIL & ACTIVITY DRAWER */}
      {/* ========================================================= */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="text-[10px] font-mono text-zinc-500">{selectedLeadForDetail.leadNumber}</div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {selectedLeadForDetail.clientName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/40 rounded border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-400 text-[10px] uppercase font-mono block">Estimated Budget</span>
                <span className="font-bold text-sm font-mono text-zinc-900 dark:text-zinc-100">
                  {formatINR(selectedLeadForDetail.estimatedBudget)}
                </span>
              </div>
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/40 rounded border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-400 text-[10px] uppercase font-mono block">Carpet Area</span>
                <span className="font-bold text-sm font-mono text-zinc-900 dark:text-zinc-100">
                  {selectedLeadForDetail.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Property Type:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedLeadForDetail.propertyType}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Location:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedLeadForDetail.city}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Source:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedLeadForDetail.leadSource}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Assigned Designer:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedLeadForDetail.assignedDesigner}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Current Stage:</span>
                <select
                  value={selectedLeadForDetail.stage}
                  onChange={(e) => handleMoveStage(selectedLeadForDetail.id, e.target.value as LeadStage)}
                  className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-0.5"
                >
                  <option value="new_inquiry">1. New Inquiry</option>
                  <option value="site_consultation">2. Site Visit & Measure</option>
                  <option value="concept_pitch">3. Concept & Estimate</option>
                  <option value="negotiation">4. Negotiation</option>
                  <option value="won">5. Contract Won</option>
                  <option value="dropped">Dropped / Lost</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Design Brief & Client Notes:</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                {selectedLeadForDetail.notes}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <a
                href={`https://wa.me/${selectedLeadForDetail.clientPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
