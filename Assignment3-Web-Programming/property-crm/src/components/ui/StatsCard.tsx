import { cn } from "@/lib/utils/helpers";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: "blue" | "green" | "amber" | "red" | "purple";
  className?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    icon: "bg-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    icon: "bg-green-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    icon: "bg-amber-500/20",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    icon: "bg-red-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    icon: "bg-purple-500/20",
  },
};

export function StatsCard({ title, value, icon, trend, color = "blue", className }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className={cn("card p-6", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
          <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {value}
          </p>
          {trend && (
            <p className="text-xs text-slate-500 mt-1">
              <span className={trend.value >= 0 ? "text-green-400" : "text-red-400"}>
                {trend.value >= 0 ? "+" : ""}{trend.value}%
              </span>{" "}
              {trend.label}
            </p>
          )}
        </div>
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", colors.icon)}>
          <span className={colors.text}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
