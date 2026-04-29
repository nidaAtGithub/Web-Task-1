"use client";

import { useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, Edit2, Trash2,
  Calendar, Clock, User, ChevronRight, AlertTriangle
} from "lucide-react";
import { formatBudget, formatDate, getPriorityColor, getStatusColor, formatWhatsAppUrl, isOverdue, isStale, timeAgo } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils/helpers";

interface LeadCardProps {
  lead: any;
  isAdmin?: boolean;
  onEdit?: (lead: any) => void;
  onDelete?: (id: string) => void;
  onViewTimeline?: (lead: any) => void;
}

export function LeadCard({ lead, isAdmin, onEdit, onDelete, onViewTimeline }: LeadCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const overdueFollowUp = lead.followUpDate && isOverdue(lead.followUpDate);
  const stale = isStale(lead.lastActivityAt || lead.updatedAt);

  return (
    <div className={cn(
      "card p-5 hover:border-slate-600/70 transition-all duration-200 group",
      lead.priority === "High" && "border-l-2 border-l-red-500/60",
      lead.priority === "Medium" && "border-l-2 border-l-amber-500/60",
      lead.priority === "Low" && "border-l-2 border-l-green-500/60",
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm truncate">{lead.name}</h3>
            {stale && (
              <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                <AlertTriangle className="w-3 h-3" />
                Stale
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{lead.propertyInterest}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={cn("badge text-xs", getPriorityColor(lead.priority))}>
            {lead.priority}
          </span>
          <span className={cn("badge text-xs", getStatusColor(lead.status))}>
            {lead.status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Phone className="w-3.5 h-3.5 text-slate-500" />
          {lead.phone}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mail className="w-3.5 h-3.5 text-slate-500" />
          {lead.email}
        </div>
        {lead.location && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            {lead.location}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Budget:</span>
          <span className="text-primary-300 font-semibold">{formatBudget(lead.budget)}</span>
          <span className="ml-auto text-slate-500">Score: {lead.score}</span>
        </div>
      </div>

      {/* Assigned agent */}
      {isAdmin && lead.assignedTo && (
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 bg-slate-800/60 rounded-lg px-3 py-2">
          <User className="w-3.5 h-3.5 text-slate-500" />
          Assigned to <span className="text-slate-300 font-medium">{lead.assignedTo.name}</span>
        </div>
      )}

      {/* Follow-up */}
      {lead.followUpDate && (
        <div className={cn(
          "flex items-center gap-2 text-xs rounded-lg px-3 py-2 mb-3",
          overdueFollowUp
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : "bg-slate-800/60 text-slate-400"
        )}>
          <Calendar className="w-3.5 h-3.5" />
          Follow-up: {formatDate(lead.followUpDate)}
          {overdueFollowUp && " (Overdue)"}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-1.5">
          {/* WhatsApp */}
          <a
            href={formatWhatsAppUrl(lead.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-lg text-xs font-medium transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          {onViewTimeline && (
            <button
              onClick={() => onViewTimeline(lead)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              Timeline
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(lead)}
              className="p-1.5 text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
          {isAdmin && onDelete && (
            confirmDelete ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onDelete(lead._id)}
                  className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-slate-600">Source: {lead.source}</span>
        <span className="text-xs text-slate-600">{timeAgo(lead.createdAt)}</span>
      </div>
    </div>
  );
}
