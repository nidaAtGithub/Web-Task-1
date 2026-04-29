"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

interface Agent {
  _id: string;
  name: string;
  email: string;
}

interface LeadFormProps {
  lead?: any;
  onClose: () => void;
  onSuccess: () => void;
  isAdmin?: boolean;
}

const statusOptions = ["New", "Contacted", "In Progress", "Negotiation", "Closed Won", "Closed Lost"];
const propertyOptions = ["Residential Plot", "Commercial Plot", "House", "Apartment", "Farm House", "Shop", "Office", "Warehouse"];
const sourceOptions = ["Facebook Ads", "Walk-in", "Website", "Referral", "Other"];

export function LeadForm({ lead, onClose, onSuccess, isAdmin = false }: LeadFormProps) {
  const isEdit = !!lead;
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    propertyInterest: lead?.propertyInterest || "Residential Plot",
    location: lead?.location || "",
    budget: lead?.budget || "",
    status: lead?.status || "New",
    source: lead?.source || "Other",
    notes: lead?.notes || "",
    assignedTo: lead?.assignedTo?._id || lead?.assignedTo || "",
    followUpDate: lead?.followUpDate ? new Date(lead.followUpDate).toISOString().split("T")[0] : "",
  });

  useEffect(() => {
    if (isAdmin) {
      axios.get("/api/agents").then((res) => setAgents(res.data.agents)).catch(() => {});
    }
  }, [isAdmin]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload: any = {
      ...form,
      budget: parseFloat(form.budget as string),
      assignedTo: form.assignedTo || null,
      followUpDate: form.followUpDate ? new Date(form.followUpDate).toISOString() : null,
    };

    try {
      if (isEdit) {
        await axios.patch(`/api/leads/${lead._id}`, payload);
      } else {
        await axios.post("/api/leads", payload);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {isEdit ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Client Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Muhammad Ali"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Phone *</label>
              <input
                type="tel"
                className="input-field"
                placeholder="03001234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              className="input-field"
              placeholder="client@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Property Interest *</label>
              <select
                className="input-field"
                value={form.propertyInterest}
                onChange={(e) => setForm({ ...form, propertyInterest: e.target.value })}
              >
                {propertyOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Budget (Millions PKR) *</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 15"
                step="0.1"
                min="0"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Source</label>
              <select
                className="input-field"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                {sourceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="DHA Phase 6, Lahore"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          {isEdit && (
            <div>
              <label className="label">Status</label>
              <select
                className="input-field"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {statusOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}

          {isAdmin && (
            <div>
              <label className="label">Assign to Agent</label>
              <select
                className="input-field"
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              >
                <option value="">Unassigned</option>
                {agents.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name} — {a.email}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="label">Follow-up Date</label>
            <input
              type="date"
              className="input-field"
              value={form.followUpDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Notes</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Lead" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
