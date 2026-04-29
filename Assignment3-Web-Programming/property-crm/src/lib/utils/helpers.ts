import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isPast, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBudget(millions: number): string {
  if (millions >= 100) return `${(millions / 100).toFixed(1)} Cr`;
  return `${millions}M PKR`;
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd MMM yyyy");
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatWhatsAppUrl(phone: string): string {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, "");
  
  // Handle Pakistani numbers
  if (cleaned.startsWith("0")) {
    cleaned = "92" + cleaned.slice(1);
  } else if (!cleaned.startsWith("92") && cleaned.length === 10) {
    cleaned = "92" + cleaned;
  }
  
  return `https://wa.me/${cleaned}`;
}

export function isOverdue(date: string | Date): boolean {
  return isPast(new Date(date));
}

export function isStale(lastActivityAt: string | Date, days: number = 7): boolean {
  const diff = differenceInDays(new Date(), new Date(lastActivityAt));
  return diff >= days;
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    High: "text-red-400 bg-red-400/10 border-red-400/20",
    Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Low: "text-green-400 bg-green-400/10 border-green-400/20",
  };
  return map[priority] || "text-slate-400 bg-slate-400/10";
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    New: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Contacted: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "In Progress": "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Negotiation: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    "Closed Won": "text-green-400 bg-green-400/10 border-green-400/20",
    "Closed Lost": "text-slate-400 bg-slate-400/10 border-slate-400/20",
  };
  return map[status] || "text-slate-400 bg-slate-400/10";
}

export function getActivityIcon(action: string): string {
  const map: Record<string, string> = {
    lead_created: "✨",
    lead_updated: "✏️",
    status_changed: "🔄",
    lead_assigned: "👤",
    lead_reassigned: "🔀",
    notes_updated: "📝",
    follow_up_set: "📅",
    priority_changed: "⚡",
  };
  return map[action] || "📌";
}
