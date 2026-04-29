"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Building2, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";
import { LeadCard } from "@/components/leads/LeadCard";
import { LeadForm } from "@/components/leads/LeadForm";
import { ActivityTimeline } from "@/components/leads/ActivityTimeline";
import { useToast } from "@/components/ui/Toaster";

export default function AgentDashboard() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [followUps, setFollowUps] = useState<any>({ overdueFollowUps: [], upcomingFollowUps: [], staleLeads: [] });
  const [loading, setLoading] = useState(true);
  const [editLead, setEditLead] = useState<any>(null);
  const [timelineLead, setTimelineLead] = useState<any>(null);

  async function fetchData() {
    try {
      const [leadsRes, fuRes] = await Promise.all([
        axios.get("/api/leads?limit=6"),
        axios.get("/api/followups"),
      ]);
      setLeads(leadsRes.data.leads);
      setFollowUps(fuRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  // Real-time polling
  useEffect(() => {
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: leads.length,
    active: leads.filter((l) => !["Closed Won", "Closed Lost"].includes(l.status)).length,
    overdue: followUps.overdueFollowUps.length,
    closedWon: leads.filter((l) => l.status === "Closed Won").length,
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Welcome, {session?.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">Here's your lead overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="My Leads" value={stats.total} icon={<Building2 className="w-5 h-5" />} color="blue" />
        <StatsCard title="Active" value={stats.active} icon={<Clock className="w-5 h-5" />} color="purple" />
        <StatsCard title="Overdue" value={stats.overdue} icon={<AlertTriangle className="w-5 h-5" />} color="red" />
        <StatsCard title="Closed Won" value={stats.closedWon} icon={<CheckCircle className="w-5 h-5" />} color="green" />
      </div>

      {/* Alerts */}
      {followUps.overdueFollowUps.length > 0 && (
        <div className="card border-l-2 border-l-red-500/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="font-semibold text-white text-sm">
              Overdue Follow-ups ({followUps.overdueFollowUps.length})
            </h3>
          </div>
          <div className="space-y-2">
            {followUps.overdueFollowUps.slice(0, 3).map((lead: any) => (
              <div key={lead._id} className="flex items-center justify-between bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                <div>
                  <span className="text-sm text-white font-medium">{lead.name}</span>
                  <span className="text-xs text-slate-400 ml-2">· {lead.propertyInterest}</span>
                </div>
                <span className="text-xs text-red-400 font-medium">
                  Due: {new Date(lead.followUpDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {followUps.upcomingFollowUps.length > 0 && (
        <div className="card border-l-2 border-l-blue-500/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white text-sm">
              Upcoming Follow-ups ({followUps.upcomingFollowUps.length})
            </h3>
          </div>
          <div className="space-y-2">
            {followUps.upcomingFollowUps.slice(0, 3).map((lead: any) => (
              <div key={lead._id} className="flex items-center justify-between bg-blue-500/5 border border-blue-500/10 rounded-lg px-3 py-2">
                <div>
                  <span className="text-sm text-white font-medium">{lead.name}</span>
                  <span className="text-xs text-slate-400 ml-2">· {lead.propertyInterest}</span>
                </div>
                <span className="text-xs text-blue-400 font-medium">
                  {new Date(lead.followUpDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent leads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white text-sm">My Recent Leads</h2>
          <a href="/agent/leads" className="text-primary-400 hover:text-primary-300 text-xs font-medium">
            View all →
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="card h-48 animate-pulse" />)}
          </div>
        ) : leads.length === 0 ? (
          <div className="card p-10 text-center">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No leads assigned to you yet</p>
            <p className="text-slate-600 text-xs mt-1">Contact your admin to get leads assigned</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                isAdmin={false}
                onEdit={(l) => setEditLead(l)}
                onViewTimeline={setTimelineLead}
              />
            ))}
          </div>
        )}
      </div>

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

      {timelineLead && (
        <ActivityTimeline lead={timelineLead} onClose={() => setTimelineLead(null)} />
      )}
    </div>
  );
}
