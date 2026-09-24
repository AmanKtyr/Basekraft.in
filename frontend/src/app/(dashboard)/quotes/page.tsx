"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Plus,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Building2,
  Check,
  Search,
  Calendar,
  Filter,
  MoreVertical,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Trash2,
  IndianRupee,
  Layers,
  Sparkles,
} from "lucide-react";
import { initialProjects } from "@/data/mockData";
import { ProjectSector } from "@/types";
import { QuotationLetterheadModal } from "@/components/quotes/QuotationLetterheadModal";
import { operationsApi } from "@/utils/api";


export interface BOQLineItem {
  id: string;
  roomOrZone: string;
  category: string;
  description: string;
  qty: number;
  uom: string;
  unitRate: number;
  gstPercent: number;
  marginPercent: number;
}

export interface QuoteProposal {
  id: string;
  code: string; // e.g. "P-438/Q-101-V2"
  projectId: string;
  projectCode: string;
  projectName: string;
  clientName: string;
  sector: ProjectSector;
  status: "Approved" | "Client Review" | "Draft";
  createdDate: string;
  lastUpdated: string;
  approvedBy?: string;
  total: number;
  items: BOQLineItem[];
}

const defaultQuotes: QuoteProposal[] = [
  {
    id: "q-1",
    code: "P-438/Q-101-V2",
    projectId: "proj-1",
    projectCode: "P-438",
    projectName: "Oberoi Forest Villa",
    clientName: "Dr. Radhika Sen",
    sector: "Interior Design & Turnkey",
    status: "Approved",
    createdDate: "19 Sept 2026",
    lastUpdated: "09/19/2026, 03:16:37 PM",
    approvedBy: "Ar. Aman Katyar",
    total: 1700874.21,
    items: [
      {
        id: "item-1",
        roomOrZone: "Living & Dining",
        category: "Carpentry & Paneling",
        description: "Full height fluted charcoal louvers with concealed LED aluminum profile",
        qty: 320,
        uom: "SqFt",
        unitRate: 1450,
        gstPercent: 18,
        marginPercent: 22,
      },
      {
        id: "item-2",
        roomOrZone: "Living & Dining",
        category: "Civil & Masonry",
        description: "Italian Statuario marble dry cladding with epoxy grout & diamond polish",
        qty: 480,
        uom: "SqFt",
        unitRate: 1850,
        gstPercent: 18,
        marginPercent: 20,
      },
      {
        id: "item-3",
        roomOrZone: "Master Suite",
        category: "Modular Millwork",
        description: "Floor to ceiling tinted glass wardrobe with Hafele sensor lighting & aluminum profile frame",
        qty: 180,
        uom: "SqFt",
        unitRate: 2600,
        gstPercent: 18,
        marginPercent: 25,
      },
    ],
  },
  {
    id: "q-2",
    code: "P-619/Q-101-V1",
    projectId: "proj-2",
    projectCode: "P-619",
    projectName: "The Skydeck Penthouse",
    clientName: "Vikramaditya Singhania",
    sector: "Solar Energy & Rooftop EPC",
    status: "Client Review",
    createdDate: "18 Sept 2026",
    lastUpdated: "09/18/2026, 06:45:10 PM",
    approvedBy: "—",
    total: 850000.0,
    items: [
      {
        id: "item-4",
        roomOrZone: "Penthouse Terrace",
        category: "Solar EPC",
        description: "15 kW Tier-1 Mono PERC Bifacial Solar PV System with HDG Module Mounting Structure",
        qty: 15,
        uom: "kW",
        unitRate: 42000,
        gstPercent: 12,
        marginPercent: 18,
      },
      {
        id: "item-5",
        roomOrZone: "Electrical Room",
        category: "Electrical",
        description: "15 kVA 3-Phase Grid-Tied Inverter with Net-Metering bidirectional panel & lightning arrestor",
        qty: 1,
        uom: "Lot",
        unitRate: 220000,
        gstPercent: 12,
        marginPercent: 15,
      },
    ],
  },
  {
    id: "q-3",
    code: "P-593/Q-101",
    projectId: "proj-3",
    projectCode: "P-593",
    projectName: "Mittal Luxury Residence",
    clientName: "Harsha Sharma",
    sector: "Modular Furniture & Manufacturing",
    status: "Draft",
    createdDate: "19 Sept 2026",
    lastUpdated: "09/19/2026, 02:54:54 PM",
    approvedBy: "—",
    total: 685000.0,
    items: [
      {
        id: "item-6",
        roomOrZone: "Modular Kitchen",
        category: "Millwork",
        description: "German tandem box soft-close drawers with anti-fingerprint acrylic shutter finish",
        qty: 1,
        uom: "Set",
        unitRate: 450000,
        gstPercent: 18,
        marginPercent: 25,
      },
      {
        id: "item-7",
        roomOrZone: "Modular Kitchen",
        category: "Countertop",
        description: "15mm Quartz seamless countertop with waterfall edge & sink cutout",
        qty: 65,
        uom: "Rft",
        unitRate: 3600,
        gstPercent: 18,
        marginPercent: 20,
      },
    ],
  },
  {
    id: "q-4",
    code: "P-617/Q-101",
    projectId: "proj-4",
    projectCode: "P-617",
    projectName: "Vibha Corporate Studio",
    clientName: "Vibha Ahuja",
    sector: "Real Estate & Civil Contracting",
    status: "Draft",
    createdDate: "19 Sept 2026",
    lastUpdated: "09/19/2026, 02:41:30 PM",
    approvedBy: "—",
    total: 1240000.0,
    items: [
      {
        id: "item-8",
        roomOrZone: "Façade & Civil",
        category: "Civil Structure",
        description: "RCC Column reinforcement strengthening & cantilever balcony waterproofing",
        qty: 1,
        uom: "LumpSum",
        unitRate: 1240000,
        gstPercent: 18,
        marginPercent: 18,
      },
    ],
  },
];

export function NewQuoteModal({
  isOpen,
  onClose,
  onAddQuote,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddQuote: (quote: QuoteProposal) => void;
}) {
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [sector, setSector] = useState<ProjectSector>("Interior Design & Turnkey");
  const [versionTag, setVersionTag] = useState("V1");
  const [scopeName, setScopeName] = useState("Full Turnkey Execution Phase 1");
  const [lineItems, setLineItems] = useState<BOQLineItem[]>([
    {
      id: "new-1",
      roomOrZone: "Primary Zone",
      category: "Fit-out & Execution",
      description: "Standard turnkey specification package with client sign-off",
      qty: 1,
      uom: "LumpSum",
      unitRate: 750000,
      gstPercent: 18,
      marginPercent: 20,
    },
  ]);

  if (!isOpen) return null;

  const handleAddRow = () => {
    const newRow: BOQLineItem = {
      id: `row-${Date.now()}`,
      roomOrZone: "Zone / Room",
      category: "Carpentry / Civil",
      description: "New custom line item specification",
      qty: 100,
      uom: "SqFt",
      unitRate: 1200,
      gstPercent: 18,
      marginPercent: 20,
    };
    setLineItems([...lineItems, newRow]);
  };

  const handleRemoveRow = (idx: number) => {
    setLineItems(lineItems.filter((_, i) => i !== idx));
  };

  const handleUpdateRow = (idx: number, field: keyof BOQLineItem, value: any) => {
    const updated = [...lineItems];
    updated[idx] = { ...updated[idx], [field]: value };
    setLineItems(updated);
  };

  const totalBeforeTax = lineItems.reduce((acc, row) => acc + (Number(row.qty) * Number(row.unitRate)), 0);
  const totalGst = lineItems.reduce(
    (acc, row) => acc + (Number(row.qty) * Number(row.unitRate) * (Number(row.gstPercent) / 100)),
    0
  );
  const grandTotal = totalBeforeTax + totalGst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: QuoteProposal = {
      id: `q-${Date.now()}`,
      code: `${selectedProject.code}/Q-${Math.floor(100 + Math.random() * 900)}-${versionTag}`,
      projectId: selectedProject.id,
      projectCode: selectedProject.code,
      projectName: selectedProject.name,
      clientName: selectedProject.clientName,
      sector,
      status: "Draft",
      createdDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      lastUpdated: new Date().toLocaleString(),
      approvedBy: "—",
      total: grandTotal,
      items: lineItems,
    };
    onAddQuote(newQuote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-zinc-500" />
              <span>Create New BOQ Proposal Quote</span>
            </h2>
            <p className="text-xs text-zinc-500">
              Generate room-wise itemized commercial quotation with GST and margin breakdown
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 text-xs overflow-y-auto flex-1">
          {/* Top Project & Sector Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100">Select Project *</label>
              <select
                value={selectedProject.code}
                onChange={(e) => {
                  const found = initialProjects.find((p) => p.code === e.target.value);
                  if (found) setSelectedProject(found);
                }}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                {initialProjects.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} — {p.name} ({p.clientName})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100">Business Sector *</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as ProjectSector)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="Interior Design & Turnkey">Interior Design & Turnkey</option>
                <option value="Solar Energy & Rooftop EPC">Solar Energy & Rooftop EPC</option>
                <option value="Modular Furniture & Manufacturing">Modular Furniture & Manufacturing</option>
                <option value="Real Estate & Civil Contracting">Real Estate & Civil Contracting</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100">Version Tag</label>
              <input
                type="text"
                value={versionTag}
                onChange={(e) => setVersionTag(e.target.value)}
                placeholder="e.g. V1, V2"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Quote Scope / Package Title</label>
            <input
              type="text"
              required
              value={scopeName}
              onChange={(e) => setScopeName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          {/* Line Items Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100">
                Itemized Scope & Rate Schedule ({lineItems.length} Items)
              </label>
              <button
                type="button"
                onClick={handleAddRow}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item Row
              </button>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto bg-zinc-50/50 dark:bg-zinc-950/50">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                  <tr>
                    <th className="p-2.5">Room / Zone</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 min-w-[200px]">Description</th>
                    <th className="p-2.5 w-16">Qty</th>
                    <th className="p-2.5 w-20">Unit</th>
                    <th className="p-2.5 w-24">Rate (₹)</th>
                    <th className="p-2.5 w-20">GST %</th>
                    <th className="p-2.5 w-20">Margin %</th>
                    <th className="p-2.5 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {lineItems.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.roomOrZone}
                          onChange={(e) => handleUpdateRow(idx, "roomOrZone", e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.category}
                          onChange={(e) => handleUpdateRow(idx, "category", e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => handleUpdateRow(idx, "description", e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) => handleUpdateRow(idx, "qty", Number(e.target.value))}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={row.uom}
                          onChange={(e) => handleUpdateRow(idx, "uom", e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1 py-1 text-zinc-900 dark:text-zinc-100"
                        >
                          <option value="SqFt">SqFt</option>
                          <option value="Rft">Rft</option>
                          <option value="kW">kW</option>
                          <option value="Nos">Nos</option>
                          <option value="Set">Set</option>
                          <option value="Lot">Lot</option>
                          <option value="LumpSum">LumpSum</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.unitRate}
                          onChange={(e) => handleUpdateRow(idx, "unitRate", Number(e.target.value))}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.gstPercent}
                          onChange={(e) => handleUpdateRow(idx, "gstPercent", Number(e.target.value))}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-1 font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.marginPercent}
                          onChange={(e) => handleUpdateRow(idx, "marginPercent", Number(e.target.value))}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-1 font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </td>
                      <td className="p-2 text-center">
                        {lineItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(idx)}
                            className="text-zinc-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Calculation Summary */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 font-sans block">Base Net Total:</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                ₹{totalBeforeTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 font-sans block">Total GST (12% / 18%):</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                ₹{totalGst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 font-sans block">Gross Commercial Proposal:</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                ₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold hover:opacity-90 transition shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Create Quote</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteProposal[]>(defaultQuotes);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>("q-1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    operationsApi.quotes.list().then((backendQuotes) => {
      if (backendQuotes && backendQuotes.length > 0) {
        const mapped: QuoteProposal[] = backendQuotes.map((bq) => ({
          id: bq.id,
          code: bq.quote_number,
          projectId: bq.project || "proj-1",
          projectCode: "PRJ-BK",
          projectName: bq.project_name || "The Camellias Penthouse",
          clientName: bq.client_name,
          sector: "Interior Design & Turnkey" as ProjectSector,
          status: (bq.status === 'APPROVED' ? 'Approved' : bq.status === 'SENT' ? 'Client Review' : 'Draft') as any,
          createdDate: bq.created_at ? new Date(bq.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "24 Sep 2026",
          lastUpdated: "Recently synced",
          approvedBy: bq.status === 'APPROVED' ? "Aman Sharma" : "—",
          total: Number(bq.total_amount) || 14250000,
          items: [
            {
              id: `item-${bq.id}-1`,
              roomOrZone: "Living & Master Zone",
              category: "Architectural Fitout",
              description: bq.title,
              qty: 1,
              uom: "LumpSum",
              unitRate: Number(bq.total_amount) || 14250000,
              gstPercent: 18,
              marginPercent: Number(bq.margin_pct) || 22,
            }
          ],
        }));

        setQuotes((prev) => {
          const codes = new Set(prev.map(p => p.code));
          const novel = mapped.filter(m => !codes.has(m.code));
          return [...novel, ...prev];
        });
      }
    }).catch(err => console.warn("Failed fetching live quotes:", err));
  }, []);

  // Letterhead Proposal Modal State
  const [selectedQuoteForLetterhead, setSelectedQuoteForLetterhead] = useState<QuoteProposal | null>(null);
  const [isLetterheadModalOpen, setIsLetterheadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddQuote = (newQ: QuoteProposal) => {
    setQuotes((prev) => [newQ, ...prev]);
    setExpandedQuoteId(newQ.id);
    showToast(`Quotation ${newQ.code} created successfully!`);

    operationsApi.quotes.create({
      quote_number: newQ.code,
      title: newQ.projectName,
      client_name: newQ.clientName,
      total_amount: newQ.total,
      margin_pct: 22.5,
      status: 'DRAFT',
    }).catch(e => console.warn("Sync quote to backend failed:", e));
  };


  const toggleExpand = (id: string) => {
    setExpandedQuoteId(expandedQuoteId === id ? null : id);
  };

  const handleOpenLetterhead = (q: QuoteProposal) => {
    setSelectedQuoteForLetterhead(q);
    setIsLetterheadModalOpen(true);
  };

  const handleStatusChange = (quoteId: string, newStatus: "Approved" | "Client Review" | "Draft") => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          return {
            ...q,
            status: newStatus,
            approvedBy: newStatus === "Approved" ? "Ar. Aman Katyar" : "—",
            lastUpdated: new Date().toLocaleString(),
          };
        }
        return q;
      })
    );
    showToast(`Quotation status updated to "${newStatus}"`);
  };

  const handleDuplicateQuote = (quote: QuoteProposal) => {
    const versionMatch = quote.code.match(/-V(\d+)$/i);
    const nextVersion = versionMatch ? `V${parseInt(versionMatch[1], 10) + 1}` : "V2";
    const baseCode = quote.code.replace(/-V\d+$/i, "");
    const newCode = `${baseCode}-${nextVersion}`;
    const newQuote: QuoteProposal = {
      ...quote,
      id: `q-${Date.now()}`,
      code: newCode,
      status: "Draft",
      createdDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      lastUpdated: new Date().toLocaleString(),
      approvedBy: "—",
    };
    setQuotes((prev) => [newQuote, ...prev]);
    setExpandedQuoteId(newQuote.id);
    showToast(`Revision duplicated: ${newCode}`);
  };

  const handleDeleteQuote = (quoteId: string, quoteCode: string) => {
    if (typeof window !== "undefined" && window.confirm(`Permanently remove quote proposal "${quoteCode}"?`)) {
      setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
      if (expandedQuoteId === quoteId) setExpandedQuoteId(null);
      showToast(`Quote ${quoteCode} deleted.`);
    }
  };

  const handleShareWhatsApp = (q: QuoteProposal) => {
    const totalFormatted = formatCurrency(q.total);
    const text = encodeURIComponent(
      `*Official Quotation Proposal — Basekraft Architectural Studio*\n\n` +
      `*Quote Ref:* ${q.code}\n` +
      `*Project:* ${q.projectName} (${q.projectCode})\n` +
      `*Client:* ${q.clientName}\n` +
      `*Total Value:* ${totalFormatted} (Incl. GST)\n` +
      `*Scope:* ${q.items.length} itemized BOQ specifications\n\n` +
      `View your official PDF proposal here:\n` +
      `http://localhost:3000/quotes`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopyProposalSummary = (q: QuoteProposal) => {
    const summary = `Quotation ${q.code} | Project: ${q.projectName} (${q.projectCode}) | Client: ${q.clientName} | Amount: ${formatCurrency(q.total)}`;
    navigator.clipboard.writeText(summary);
    showToast("Proposal summary copied to clipboard!");
  };

  const handleExportQuotesCSV = () => {
    const headers = ["Quote Code", "Project", "Client", "Sector", "Status", "Created Date", "Total (INR)"];
    const rows = filteredQuotes.map((q) => [
      q.code,
      `"${q.projectName}"`,
      `"${q.clientName}"`,
      `"${q.sector}"`,
      q.status,
      q.createdDate,
      q.total.toFixed(2),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Basekraft_Quotes_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Quotes exported to CSV file.");
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchProject =
        selectedProjectFilter === "all" || q.projectCode === selectedProjectFilter;
      const matchQuery =
        searchQuery === "" ||
        q.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchProject && matchQuery;
    });
  }, [quotes, selectedProjectFilter, searchQuery]);

  // Aggregate Metrics (Matching ProjectStudio)
  const approvedQuotesTotal = quotes
    .filter((q) => q.status === "Approved")
    .reduce((acc, q) => acc + q.total, 0);
  const paymentsReceivedTotal = 8250000;
  const pendingPaymentsTotal = approvedQuotesTotal - paymentsReceivedTotal;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Action Row (Matching ProjectStudio reference) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            All Quotes & BOQ Proposals
          </h1>
          <p className="text-xs text-zinc-500">
            Itemized room-wise bill of quantities, margins, versioning, and client sign-off records
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Project Selector Dropdown */}
          <select
            value={selectedProjectFilter}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
          >
            <option value="all">Select Project (All)</option>
            {initialProjects.map((p) => (
              <option key={p.code} value={p.code}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md pl-8 pr-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
            />
          </div>

          {/* New Quote Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-semibold transition shadow-xs cursor-pointer active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Quote</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-xs">
          <span className="text-xs text-zinc-500 font-medium">Approved Quotes Total</span>
          <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1">
            {formatCurrency(approvedQuotesTotal)}
          </div>
          <span className="text-[10px] text-zinc-400 mt-0.5 block">Client signed & active proposals</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-xs">
          <span className="text-xs text-zinc-500 font-medium">Payments Received</span>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(paymentsReceivedTotal)}
          </div>
          <span className="text-[10px] text-zinc-400 mt-0.5 block">Cleared in escrow & studio bank</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-xs">
          <span className="text-xs text-zinc-500 font-medium">Pending Payments</span>
          <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1">
            {formatCurrency(pendingPaymentsTotal)}
          </div>
          <span className="text-[10px] text-zinc-400 mt-0.5 block">Milestone invoices awaiting clearance</span>
        </div>
      </div>

      {/* Quote Cards List (ProjectStudio Card & Accordion Style) */}
      <div className="space-y-3">
        {filteredQuotes.map((q) => {
          const isExpanded = expandedQuoteId === q.id;
          return (
            <div
              key={q.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xs overflow-hidden transition hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              {/* Card Header Top Row */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-4 cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition space-y-3"
              >
                {/* Top Code, Tags, & Quick Actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                      {q.code}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Quote
                    </span>

                    {/* Project & Client Pill */}
                    <div className="flex items-center gap-1 px-2.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                      <Briefcase className="w-3 h-3" />
                      <span>{q.clientName} ({q.projectName})</span>
                    </div>

                    {/* Interactive Status Selector Dropdown */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative inline-block"
                    >
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase cursor-pointer border outline-none appearance-none pr-4 ${
                          q.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-950/40"
                            : q.status === "Client Review"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-950/40"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700"
                        }`}
                        title="Click to update quote status"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Client Review">Client Review</option>
                        <option value="Approved">Approved</option>
                      </select>
                      <ChevronDown className="w-2.5 h-2.5 absolute right-1 top-1.5 pointer-events-none text-zinc-500" />
                    </div>

                    {/* Items count badge */}
                    <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-medium">
                      {q.items.length} Items
                    </span>
                  </div>

                  {/* Header Right Quick Action Buttons */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5"
                  >
                    {/* Duplicate / Clone Quote */}
                    <button
                      type="button"
                      onClick={() => handleDuplicateQuote(q)}
                      className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer"
                      title="Duplicate Quote (Create Revision)"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Quote */}
                    <button
                      type="button"
                      onClick={() => handleDeleteQuote(q.id, q.code)}
                      className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-950/50 text-zinc-400 hover:text-red-600 transition cursor-pointer"
                      title="Delete Quote"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Expand Chevron */}
                    <div
                      onClick={() => toggleExpand(q.id)}
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 pl-1"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Bottom Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Created on</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-medium">{q.createdDate}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Total value</span>
                    <span className="text-sm font-bold font-mono text-zinc-950 dark:text-zinc-50">
                      {formatCurrency(q.total)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Approved by</span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{q.approvedBy || "—"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Last Updated</span>
                    <span className="text-zinc-500 text-[11px] font-mono">{q.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Accordion Expanded Line Items */}
              {isExpanded && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Itemized BOQ Bill of Quantities ({q.items.length} specifications)</span>
                    </h4>
                    <div className="flex items-center flex-wrap gap-2">
                      {/* Export PDF Proposal Button - Opens Letterhead Modal */}
                      <button
                        type="button"
                        onClick={() => handleOpenLetterhead(q)}
                        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded transition shadow-xs cursor-pointer active:scale-98"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export PDF Proposal</span>
                      </button>

                      {/* Link to Full Project BOQ Editor */}
                      <Link
                        href={`/projects/${q.projectCode}?tab=boq`}
                        className="text-[11px] font-medium px-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-xs"
                      >
                        Open BOQ Matrix
                      </Link>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-900">
                    <table className="w-full text-xs text-left min-w-[680px]">
                      <thead className="bg-zinc-100 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-[11px]">
                        <tr>
                          <th className="p-2.5">Room / Zone</th>
                          <th className="p-2.5">Category</th>
                          <th className="p-2.5">Item Description</th>
                          <th className="p-2.5 text-right">Qty</th>
                          <th className="p-2.5">Unit</th>
                          <th className="p-2.5 text-right">Rate</th>
                          <th className="p-2.5 text-right">GST</th>
                          <th className="p-2.5 text-right">Line Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
                        {q.items.map((item) => {
                          const itemTotal = item.qty * item.unitRate;
                          const itemGst = itemTotal * (item.gstPercent / 100);
                          return (
                            <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                              <td className="p-2.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                                {item.roomOrZone}
                              </td>
                              <td className="p-2.5 font-sans text-zinc-500">
                                {item.category}
                              </td>
                              <td className="p-2.5 font-sans text-zinc-700 dark:text-zinc-300">
                                {item.description}
                              </td>
                              <td className="p-2.5 text-right font-bold">{item.qty}</td>
                              <td className="p-2.5 font-sans text-zinc-500">{item.uom}</td>
                              <td className="p-2.5 text-right">₹{item.unitRate.toLocaleString("en-IN")}</td>
                              <td className="p-2.5 text-right text-zinc-500">{item.gstPercent}%</td>
                              <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">
                                ₹{(itemTotal + itemGst).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Quick Card Action Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] pt-1 text-zinc-500 gap-2">
                    <div className="flex items-center gap-3">
                      <span>Sector: <strong className="text-zinc-800 dark:text-zinc-200">{q.sector}</strong></span>
                      <span>Target Margin: <strong className="text-emerald-600">20.5%</strong></span>
                      <span>Items: <strong className="text-zinc-800 dark:text-zinc-200">{q.items.length}</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCopyProposalSummary(q)}
                        className="hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Copy Summary
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareWhatsApp(q)}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <Share2 className="w-3 h-3" /> Share with Client (WhatsApp)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <NewQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddQuote={handleAddQuote}
      />

      {/* Official Architectural Letterhead Proposal Modal */}
      <QuotationLetterheadModal
        quote={selectedQuoteForLetterhead}
        isOpen={isLetterheadModalOpen}
        onClose={() => setIsLetterheadModalOpen(false)}
      />
    </div>
  );
}
