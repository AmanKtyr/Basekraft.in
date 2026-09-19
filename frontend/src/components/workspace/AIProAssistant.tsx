"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, User, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export function AIProAssistant({ projectCode = "P-619" }: { projectCode?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: `Hello Ar. Aman! I am analyzing ${projectCode} (The Skydeck Penthouse). 

Key AI Insight:
• Veneer delivery from Silvassa is scheduled for Sept 25.
• False ceiling grid is complete.
• Would you like me to draft the client milestone update or check contractor billing?`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response tailored to turnkey interiors
    setTimeout(() => {
      let reply = "";
      if (text.toLowerCase().includes("delay") || text.toLowerCase().includes("risk")) {
        reply = `Risk Assessment for ${projectCode}:
1. Critical Path: Daikin VRV AC pressure testing must finish before closing false ceiling gypsum boards.
2. Recommendation: Alert MEP contractor to complete nitrogen holding test by Monday to prevent a 4-day handover slip.`;
      } else if (text.toLowerCase().includes("boq") || text.toLowerCase().includes("cost")) {
        reply = `BOQ Analysis:
• Total Estimated: ₹85.00 Lakhs
• Current Committed: ₹42.50 Lakhs (50%)
• Margin Variance: 2.1% higher efficiency on marble slab wastage due to optimized CAD waterjet cutting layout.`;
      } else {
        reply = `Client Update Generated:
"Dear Mr. Singhania, we have completed the Italian Statuario marble laying and gypsum framing at Skydeck Penthouse. Custom veneer fabrication begins this Thursday. Attached are site photos for your sign-off."`;
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col h-[520px] shadow-xs">
      {/* Header */}
      <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">AI Studio Copilot</h4>
            <p className="text-[10px] text-zinc-500 font-mono">Trained on Turnkey Execution</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          Online
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1.5">
        <button
          onClick={() => handleSend("Detect schedule risks & delay")}
          className="text-[10px] bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 transition flex items-center gap-1"
        >
          <Zap className="w-2.5 h-2.5" /> Schedule Risks
        </button>
        <button
          onClick={() => handleSend("Audit BOQ & margin variance")}
          className="text-[10px] bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 transition"
        >
          BOQ Audit
        </button>
        <button
          onClick={() => handleSend("Draft WhatsApp client update")}
          className="text-[10px] bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 transition"
        >
          WhatsApp Draft
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-lg p-3 text-xs leading-relaxed whitespace-pre-line ${
                m.sender === "user"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">{m.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask AI anything about this project..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900"
        />
        <button
          onClick={() => handleSend()}
          className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 p-2 rounded-md hover:opacity-90 transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
