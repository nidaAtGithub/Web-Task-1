"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock, Calendar, RefreshCw, MessageCircle, Edit2 } from "lucide-react";
import axios from "axios";
import { LeadForm } from "@/components/leads/LeadForm";
import { useToast } from "@/components/ui/Toaster";
import { formatDate, formatWhatsAppUrl, getPriorityColor, getStatusColor, timeAgo, cn } from "@/lib/utils/helpers";

export default function AgentFollowUpsPage() {
  const { toast } = useToast();
  const [data, setData] = useState<any>({ overdueFollowUps: [], staleLeads: [], upcomingFollowUps: [] });
  const [loading, setLoading] = useState(true);
  const [editLead, setEditLead] = useState<any>(null);

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
      <div className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-white text-sm">{lead.name}</p>
            <span className={cn("badge text-xs", getPriorityColor(lead.priority))}>{lead.priority}</span>
            <span className={cn("badge text-xs", getStatusColor(lead.status))}>{lead.status}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {lead.propertyInterest} · {lead.budget}M PKR · {lead.phone}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lead.followUpDate && (
            <span className="text-xs text-slate-400 hidden sm:block">{formatDate(lead.followUpDate)}</span>
          )}
          {!lead.followUpDate && lead.lastActivityAt && (
            <span className="text-xs text-slate-500 hidden sm:block">
              Active {timeAgo(lead.lastActivityAt)}
            </span>
          )}
          <button
            onClick={() => setEditLead(lead)}
            className="p-1.5 text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
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

  function Section({ title, icon, leads, emptyMsg, accentClass }: {
    title: string; icon: React.ReactNode; leads: any[]; emptyMsg: string; accentClass: string;
  }) {
    return (
      <div className={cn("card overflow-hidden border-l-2", accentClass)}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
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
            Follow-ups
          </h1>
          <p className="text-slate-400 text-sm mt-1">Track your overdue and upcoming follow-ups</p>
        </div>
        <button onClick={fetchData} className="btn-secondary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="card h-40 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-6">
          <Section
            title="Overdue Follow-ups"
            icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
            leads={data.overdueFollowUps}
            emptyMsg="No overdue follow-ups! 🎉"
            accentClass="border-l-red-500/60"
          />
          <Section
            title="Upcoming Follow-ups (Next 3 Days)"
            icon={<Calendar className="w-4 h-4 text-blue-400" />}
            leads={data.upcomingFollowUps}
            emptyMsg="No upcoming follow-ups scheduled"
            accentClass="border-l-blue-500/60"
          />
          <Section
            title="Stale Leads (No activity 7+ days)"
            icon={<Clock className="w-4 h-4 text-amber-400" />}
            leads={data.staleLeads}
            emptyMsg="All your leads are active 👍"
            accentClass="border-l-amber-500/60"
          />
        </div>
      )}

      {editLead && (
        <LeadForm
          lead={editLead}
          isAdmin={false}
          onClose={() => setEditLead(null)}
          onSuccess={() => {
            fetchData();
            toast("success", "Lead updated!");
          }}
        />
      )}
    </div>
  );
}
