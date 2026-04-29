"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Filter, RefreshCw, SlidersHorizontal } from "lucide-react";
import axios from "axios";
import { LeadCard } from "@/components/leads/LeadCard";
import { LeadForm } from "@/components/leads/LeadForm";
import { ActivityTimeline } from "@/components/leads/ActivityTimeline";
import { useToast } from "@/components/ui/Toaster";

const statuses = ["", "New", "Contacted", "In Progress", "Negotiation", "Closed Won", "Closed Lost"];
const priorities = ["", "High", "Medium", "Low"];

export default function AdminLeadsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);
  const [timelineLead, setTimelineLead] = useState<any>(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [searchInput, setSearchInput] = useState("");

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "12" });
      if (filters.status) params.set("status", filters.status);
      if (filters.priority) params.set("priority", filters.priority);
      if (filters.search) params.set("search", filters.search);

      const res = await axios.get(`/api/leads?${params}`);
      setLeads(res.data.leads);
      setPagination(res.data.pagination);
    } catch {
      toast("error", "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Polling for real-time updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => fetchLeads(pagination.page), 15000);
    return () => clearInterval(interval);
  }, [fetchLeads, pagination.page]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setFilters({ ...filters, search: searchInput });
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/api/leads/${id}`);
      toast("success", "Lead deleted");
      fetchLeads();
    } catch {
      toast("error", "Failed to delete lead");
    }
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Lead Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {pagination.total} total leads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fetchLeads()} className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => { setEditLead(null); setShowForm(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-48">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              className="input-field pl-9 py-2"
              placeholder="Search name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-secondary py-2">Search</button>
        </form>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <select
            className="input-field py-2 text-sm min-w-32"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            {statuses.slice(1).map((s) => <option key={s}>{s}</option>)}
          </select>

          <select
            className="input-field py-2 text-sm min-w-32"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">All Priorities</option>
            {priorities.slice(1).map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-5 h-64 animate-pulse">
              <div className="h-4 bg-slate-700 rounded mb-3 w-2/3" />
              <div className="h-3 bg-slate-800 rounded mb-2 w-full" />
              <div className="h-3 bg-slate-800 rounded mb-2 w-3/4" />
            </div>
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500">No leads found</p>
          <button
            onClick={() => { setEditLead(null); setShowForm(true); }}
            className="btn-primary mt-4"
          >
            Add First Lead
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              isAdmin
              onEdit={(l) => { setEditLead(l); setShowForm(true); }}
              onDelete={handleDelete}
              onViewTimeline={setTimelineLead}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {[...Array(pagination.pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => fetchLeads(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                pagination.page === i + 1
                  ? "bg-primary-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <LeadForm
          lead={editLead}
          isAdmin
          onClose={() => { setShowForm(false); setEditLead(null); }}
          onSuccess={() => {
            fetchLeads();
            toast("success", editLead ? "Lead updated!" : "Lead created!");
          }}
        />
      )}

      {timelineLead && (
        <ActivityTimeline lead={timelineLead} onClose={() => setTimelineLead(null)} />
      )}
    </div>
  );
}
