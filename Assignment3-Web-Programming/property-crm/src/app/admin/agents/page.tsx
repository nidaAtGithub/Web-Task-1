"use client";

import { useEffect, useState } from "react";
import { Plus, Users, Mail, Phone, User, X, AlertCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/Toaster";
import { formatDate } from "@/lib/utils/helpers";

export default function AgentsPage() {
  const { toast } = useToast();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // ← track which agent is being deleted

  async function fetchAgents() {
    setLoading(true);
    try {
      const res = await axios.get("/api/agents");
      setAgents(res.data.agents);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAgents(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post("/api/agents", form);
      toast("success", "Agent created successfully");
      setForm({ name: "", email: "", password: "", phone: "" });
      setShowForm(false);
      fetchAgents();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create agent");
    } finally {
      setSubmitting(false);
    }
  }

  // 🆕 Delete agent handler
  async function handleDelete(agentId: string, agentName: string) {
    if (!window.confirm(`Are you sure you want to delete agent "${agentName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(agentId);
    try {
      await axios.delete(`/api/agents/${agentId}`);
      toast("success", `Agent "${agentName}" deleted successfully`);
      fetchAgents();
    } catch (err: any) {
      toast("error", err.response?.data?.error || "Failed to delete agent");
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Agents
          </h1>
          <p className="text-slate-400 text-sm mt-1">{agents.length} agents registered</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Agent
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : agents.length === 0 ? (
        <div className="card p-12 text-center">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No agents yet</p>
          <button onClick={() => setShowForm(true)} className="btn-primary mt-4">
            Add First Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent._id} className="card p-5 hover:border-slate-600/60 transition-all relative">
              {/* 🆕 Delete button */}
              <button
                onClick={() => handleDelete(agent._id, agent.name)}
                disabled={deletingId === agent._id}
                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
                title="Delete agent"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-300 font-bold text-lg shrink-0">
                  {agent.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${agent.isActive ? "bg-green-500/10 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                    {agent.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {agent.email}
                </div>
                {agent.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {agent.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5" />
                  Joined {formatDate(agent.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Agent Modal (unchanged) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
              <h2 className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Add New Agent
              </h2>
              <button onClick={() => { setShowForm(false); setError(""); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-3 py-2.5 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ahmed Khan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="ahmed@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="03001234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}