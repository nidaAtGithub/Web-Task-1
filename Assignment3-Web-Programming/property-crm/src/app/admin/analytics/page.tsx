"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { StatsCard } from "@/components/ui/StatsCard";
import { Building2, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { formatBudget } from "@/lib/utils/helpers";

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

export default function AnalyticsPage() {
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
    axios.get("/api/analytics").then((res) => setData(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">System-wide performance insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Leads" value={data.summary.totalLeads} icon={<Building2 className="w-5 h-5" />} color="blue" />
        <StatsCard title="Active Agents" value={data.summary.activeAgents} icon={<Users className="w-5 h-5" />} color="purple" />
        <StatsCard title="High Priority" value={data.summary.highPriorityLeads} icon={<AlertTriangle className="w-5 h-5" />} color="red" />
        <StatsCard title="Unassigned Leads" value={data.summary.unassignedLeads} icon={<TrendingUp className="w-5 h-5" />} color="amber" />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-white text-sm mb-5">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.statusDistribution} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="status" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.statusDistribution.map((entry: any) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || "#475569"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-white text-sm mb-5">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data.priorityDistribution}
                dataKey="count"
                nameKey="priority"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={3}
              >
                {data.priorityDistribution.map((entry: any) => (
                  <Cell key={entry.priority} fill={PRIORITY_COLORS[entry.priority] || "#475569"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
              <Legend formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "13px" }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card p-6">
        <h3 className="font-semibold text-white text-sm mb-5">Monthly Lead Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
            <Line type="monotone" dataKey="count" stroke="#6471f1" strokeWidth={2.5} dot={{ fill: "#6471f1", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Agent Performance */}
      <div className="card p-6">
        <h3 className="font-semibold text-white text-sm mb-5">Agent Performance</h3>
        {data.agentPerformance.length === 0 ? (
          <p className="text-slate-500 text-sm">No assigned leads yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data.agentPerformance.slice(0, 8)}
              layout="vertical"
              barSize={16}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="agentName"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
              <Legend formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>} />
              <Bar dataKey="totalLeads" name="Total" fill="#6471f1" radius={[0, 4, 4, 0]} />
              <Bar dataKey="closedWon" name="Closed Won" fill="#22c55e" radius={[0, 4, 4, 0]} />
              <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}