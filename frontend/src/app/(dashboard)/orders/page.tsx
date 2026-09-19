"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { mockOrders } from "@/data/mockData";
import { OrderItem } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);

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
        <button className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-3 py-1.5 rounded-md text-xs font-medium transition shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>New Purchase Order</span>
        </button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
        <table className="w-full text-left text-xs">
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
  );
}
