"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { formatDateTime, getActivityIcon, timeAgo } from "@/lib/utils/helpers";

interface TimelineProps {
  lead: any;
  onClose: () => void;
}

export function ActivityTimeline({ lead, onClose }: TimelineProps) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/leads/${lead._id}/activities`)
      .then((res) => setActivities(res.data.activities))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lead._id]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
          <div>
            <h2 className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Activity Timeline
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{lead.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="text-center text-slate-500 py-8">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-slate-500 py-8">No activities recorded yet</div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700/50" />
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div key={activity._id} className="relative flex gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-base shrink-0">
                      {getActivityIcon(activity.action)}
                    </div>
                    <div className="flex-1 min-w-0 bg-slate-800/40 rounded-xl p-3 border border-slate-700/30">
                      <p className="text-sm text-slate-200 font-medium">{activity.description}</p>
                      {(activity.oldValue || activity.newValue) && (
                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                          {activity.oldValue && (
                            <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded">
                              {activity.oldValue}
                            </span>
                          )}
                          {activity.oldValue && activity.newValue && (
                            <span className="text-slate-600">→</span>
                          )}
                          {activity.newValue && (
                            <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                              {activity.newValue}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-slate-500">
                          By{" "}
                          <span className="text-slate-400">
                            {activity.performedBy?.name || "System"}
                          </span>
                        </p>
                        <p className="text-xs text-slate-600" title={formatDateTime(activity.createdAt)}>
                          {timeAgo(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
