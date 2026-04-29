"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2, LayoutDashboard, Users, BarChart3,
  Calendar, LogOut, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/helpers";
import { NotificationBell } from "@/components/ui/NotificationBell";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "All Leads", icon: Building2 },
  { href: "/admin/agents", label: "Agents", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/followups", label: "Follow-ups", icon: Calendar },
];

const agentNav: NavItem[] = [
  { href: "/agent", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agent/leads", label: "My Leads", icon: Building2 },
  { href: "/agent/followups", label: "Follow-ups", icon: Calendar },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdmin = session?.user?.role === "admin";
  const navItems = isAdmin ? adminNav : agentNav;

  return (
    <aside className="w-64 min-h-screen bg-slate-900/80 border-r border-slate-700/50 flex flex-col backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600/30 border border-primary-500/40 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-400" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-display)" }}>
              Property CRM
            </p>
            <p className="text-xs text-slate-500 capitalize">{session?.user?.role || "..."} Panel</p>
          </div>
          <NotificationBell />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && item.href !== "/agent" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary-600/20 text-primary-300 border border-primary-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary-400" : "text-slate-500 group-hover:text-slate-300")} />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-primary-600/30 rounded-full flex items-center justify-center text-primary-300 font-bold text-sm">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{session?.user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
