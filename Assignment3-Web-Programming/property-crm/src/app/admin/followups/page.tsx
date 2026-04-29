"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock, Calendar, RefreshCw, MessageCircle } from "lucide-react";
import axios from "axios";
import { formatDate, formatWhatsAppUrl, getPriorityColor, getStatusColor, timeAgo } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils/helpers";

export default function AdminFollowUpsPage() {
  const [data, setData] = useState<any>({ overdueFollowUps: [], staleLeads: [], upcomingFollowUps: [] });
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get("/api/followups");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  function LeadRow({ lead }: { lead: any }) {
    return (
      <div className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-white text-sm">{lead.name}</p>
            <span className={cn("badge text-xs", getPriorityColor(lead.priority))}>{lead.priority}</span>
            <span className={cn("badge text-xs", getStatusColor(lead.status))}>{lead.status}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {lead.propertyInterest} · {lead.budget}M PKR
            {lead.assignedTo && <> · Agent: <span className="text-slate-400">{lead.assignedTo.name}</span></>}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          {lead.followUpDate && (
            <span className="text-xs text-slate-400">{formatDate(lead.followUpDate)}</span>
          )}
          {!lead.followUpDate && (
            <span className="text-xs text-slate-500">Last active {timeAgo(lead.lastActivityAt || lead.updatedAt)}</span>
          )}
          <a
            href={formatWhatsAppUrl(lead.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-lg text-xs font-medium transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  function Section({ title, icon, leads, emptyMsg, color }: {
    title: string; icon: React.ReactNode; leads: any[]; emptyMsg: string; color: string;
  }) {
    return (
      <div className="card overflow-hidden">
        <div className={cn("flex items-center justify-between px-5 py-4 border-b border-slate-700/50", color)}>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="font-semibold text-white text-sm">{title}</h2>
          </div>
          <span className="text-xs font-semibold bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-full">
            {leads.length}
          </span>
        </div>
        <div className="divide-y divide-slate-800/60">
          {leads.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">{emptyMsg}</p>
          ) : (
            leads.map((lead) => <LeadRow key={lead._id} lead={lead} />)
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Follow-up Tracker
          </h1>
          <p className="text-slate-400 text-sm mt-1">Monitor overdue and stale leads</p>
        </div>
        <button onClick={fetchData} className="btn-secondary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="card h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-6">
          <Section
            title="Overdue Follow-ups"
            icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
            leads={data.overdueFollowUps}
            emptyMsg="No overdue follow-ups 🎉"
            color="border-l-2 border-l-red-500/60"
          />
          <Section
            title="Upcoming Follow-ups (Next 3 Days)"
            icon={<Calendar className="w-4 h-4 text-blue-400" />}
            leads={data.upcomingFollowUps}
            emptyMsg="No upcoming follow-ups scheduled"
            color="border-l-2 border-l-blue-500/60"
          />
          <Section
            title="Stale Leads (No activity for 7+ days)"
            icon={<Clock className="w-4 h-4 text-amber-400" />}
            leads={data.staleLeads}
            emptyMsg="All leads are active 👍"
            color="border-l-2 border-l-amber-500/60"
          />
        </div>
      )}
    </div>
  );
}
