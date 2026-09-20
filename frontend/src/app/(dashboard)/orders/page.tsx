"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Package, Truck, CheckCircle2, Clock, X } from "lucide-react";
import { mockOrders, initialProjects } from "@/data/mockData";
import { OrderItem } from "@/types";

export function NewOrderModal({
  isOpen,
  onClose,
  onAddOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (order: OrderItem) => void;
}) {
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [vendorName, setVendorName] = useState("Saint Gobain Architectural Glass");
  const [itemCategory, setItemCategory] = useState("Glazing & Glass Partitions");
  const [amount, setAmount] = useState("240000");
  const [advancePaid, setAdvancePaid] = useState("100000");
  const [expectedDelivery, setExpectedDelivery] = useState("2026-10-15");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `PO-${Math.floor(8800 + Math.random() * 1000)}`,
      projectCode: selectedProject.code,
      projectName: selectedProject.name,
      vendorName,
      itemCategory,
      amount: Number(amount) || 0,
      paidAmount: Number(advancePaid) || 0,
      status: "Approved",
      expectedDelivery,
    };
    onAddOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Create Vendor Purchase Order (PO)
            </h2>
            <p className="text-xs text-zinc-500">
              Issue procurement order tied directly to project BOQ line items
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Select Project *</label>
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
                  {p.code} - {p.name} ({p.clientName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Vendor / Supplier Name *</label>
              <input
                type="text"
                required
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Material Category *</label>
              <input
                type="text"
                required
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">PO Total Amount (₹) *</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300">Advance Paid (₹)</label>
              <input
                type="number"
                value={advancePaid}
                onChange={(e) => setAdvancePaid(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-zinc-700 dark:text-zinc-300">Target Delivery Date</label>
            <input
              type="date"
              value={expectedDelivery}
              onChange={(e) => setExpectedDelivery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

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
              className="px-4 py-2 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium hover:opacity-90 transition shadow-xs"
            >
              Issue Purchase Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700";
      case "Dispatched":
        return "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-400";
      case "Delivered":
        return "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950 font-semibold";
      default:
        return "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800";
    }
  };

  const handleAddOrder = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Procurement & Purchase Orders (PO)
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              All Orders
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Vendor purchase orders, line-item material dispatches, and on-site delivery verification
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs cursor-pointer active:scale-98"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Purchase Order</span>
        </button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 font-mono text-[11px]">
              <th className="py-3 px-4">PO Number</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Vendor & Category</th>
              <th className="py-3 px-4 font-sans">PO Amount</th>
              <th className="py-3 px-4 font-sans">Paid / Balance</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Delivery Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  {ord.orderNumber}
                </td>
                <td className="py-3.5 px-4">
                  <Link href={`/projects/${ord.projectCode}`} className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline block">
                    {ord.projectName}
                  </Link>
                  <span className="font-mono text-[11px] text-zinc-500">{ord.projectCode}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 block">{ord.vendorName}</span>
                  <span className="text-[11px] text-zinc-500 font-mono">{ord.itemCategory}</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 dark:text-zinc-100">
                  {formatCurrency(ord.amount)}
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-300">
                  <span>{formatCurrency(ord.paidAmount)}</span>
                  <span className="text-zinc-400 text-[10px] block">Bal: {formatCurrency(ord.amount - ord.paidAmount)}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono border ${getStatusBadge(ord.status)}`}>
                    {ord.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">{ord.expectedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddOrder={handleAddOrder}
      />
    </div>
  );
}
