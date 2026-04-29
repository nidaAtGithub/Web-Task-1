"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import axios from "axios";
import { getActivityIcon, timeAgo } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils/helpers";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const lastTimestamp = useRef<string>(new Date().toISOString());

  useEffect(() => {
    async function poll() {
      try {
        const res = await axios.get(`/api/notifications?since=${lastTimestamp.current}`);
        if (res.data.notifications.length > 0) {
          setNotifications((prev) => [...res.data.notifications, ...prev].slice(0, 30));
          setUnread((prev) => prev + res.data.notifications.length);
        }
        lastTimestamp.current = res.data.timestamp;
      } catch {}
    }

    poll();
    const interval = setInterval(poll, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); if (open) setUnread(0); }}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 card shadow-2xl z-50 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
            <h3 className="font-semibold text-white text-sm">Notifications</h3>
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">No recent notifications</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="px-4 py-3 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-start gap-2">
                    <span className="text-base mt-0.5">{getActivityIcon(n.action)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 font-medium leading-snug">{n.description}</p>
                      {n.lead && (
                        <p className="text-xs text-slate-500 mt-0.5">Lead: {n.lead.name}</p>
                      )}
                      <p className="text-xs text-slate-600 mt-0.5">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
