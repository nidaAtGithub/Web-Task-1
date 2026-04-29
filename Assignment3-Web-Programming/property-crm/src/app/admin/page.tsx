"use client";

import { useEffect, useState } from "react";
import { Building2, Users, TrendingUp, AlertTriangle, Star, BarChart2 } from "lucide-react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { StatsCard } from "@/components/ui/StatsCard";
import { formatBudget, formatDate } from "@/lib/utils/helpers";

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  Contacted: "#8b5cf6",
  "In Progress": "#f59e0b",
  Negotiation: "#f97316",
  "Closed Won": "#22c55e",
  "Closed Lost": "#64748b",
};

const PRIORITY_COLORS: Record<string, string> = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

export default function AdminDashboard() {
  const [data, setData] = useState<any>({
    summary: { totalLeads: 0, activeAgents: 0, highPriorityLeads: 0, unassignedLeads: 0 },
    statusDistribution: [],
    priorityDistribution: [],
    agentPerformance: [],
    recentLeads: [],
    monthlyTrend: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/analytics")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Admin Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Overview of your CRM system performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Leads"
          value={data.summary.totalLeads}
          icon={<Building2 className="w-5 h-5" />}
          color="blue"
        />
        <StatsCard
          title="Active Agents"
          value={data.summary.activeAgents}
          icon={<Users className="w-5 h-5" />}
          color="purple"
        />
        <StatsCard
          title="High Priority"
          value={data.summary.highPriorityLeads}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
        />
        <StatsCard
          title="Unassigned"
          value={data.summary.unassignedLeads}
          icon={<Star className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status distribution */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4 text-sm">Lead Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data.statusDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
              >
                {data.statusDistribution.map((entry: any) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || "#475569"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority distribution */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4 text-sm">Lead Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data.priorityDistribution}
                dataKey="count"
                nameKey="priority"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
              >
                {data.priorityDistribution.map((entry: any) => (
                  <Cell key={entry.priority} fill={PRIORITY_COLORS[entry.priority] || "#475569"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trend */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4 text-sm">Monthly Lead Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
              <Line type="monotone" dataKey="count" stroke="#6471f1" strokeWidth={2} dot={{ fill: "#6471f1" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="card">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="font-semibold text-white text-sm">Agent Performance Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">In Progress</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Closed Won</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Closed Lost</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {data.agentPerformance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-8">No agent data available</td>
                </tr>
              ) : (
                data.agentPerformance.map((agent: any) => (
                  <tr key={agent._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{agent.agentName}</p>
                        <p className="text-xs text-slate-500">{agent.agentEmail}</p>
                      </div>
                    </td>
                    <td className="text-center px-4 py-4 text-slate-300">{agent.totalLeads}</td>
                    <td className="text-center px-4 py-4">
                      <span className="text-amber-400">{agent.inProgress}</span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-green-400">{agent.closedWon}</span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-red-400">{agent.closedLost}</span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${agent.conversionRate}%` }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs">{agent.conversionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="card">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="font-semibold text-white text-sm">Recent Leads</h3>
        </div>
        <div className="divide-y divide-slate-800/60">
          {data.recentLeads.map((lead: any) => (
            <div key={lead._id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/20 transition-colors">
              <div>
                <p className="font-medium text-white text-sm">{lead.name}</p>
                <p className="text-xs text-slate-500">{lead.propertyInterest} · {lead.source}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary-300 text-sm font-semibold">{formatBudget(lead.budget)}</span>
                <span className={`badge text-xs ${lead.priority === "High" ? "text-red-400 bg-red-400/10 border-red-400/20" : lead.priority === "Medium" ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-green-400 bg-green-400/10 border-green-400/20"}`}>
                  {lead.priority}
                </span>
                <span className="text-xs text-slate-500">{formatDate(lead.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}