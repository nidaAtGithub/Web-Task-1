import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const query: any = {
      status: { $nin: ["Closed Won", "Closed Lost"] },
    };

    if (session!.user.role === "agent") {
      query.assignedTo = session!.user.id;
    }

    const [overdueFollowUps, staleLeads, upcomingFollowUps] = await Promise.all([
      // Overdue follow-ups
      Lead.find({
        ...query,
        followUpDate: { $lt: now, $ne: null },
      })
        .populate("assignedTo", "name email")
        .sort({ followUpDate: 1 })
        .lean(),

      // Stale leads (no activity for 7 days)
      Lead.find({
        ...query,
        lastActivityAt: { $lt: sevenDaysAgo },
        followUpDate: null,
      })
        .populate("assignedTo", "name email")
        .sort({ lastActivityAt: 1 })
        .lean(),

      // Upcoming follow-ups (next 3 days)
      Lead.find({
        ...query,
        followUpDate: {
          $gte: now,
          $lt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        },
      })
        .populate("assignedTo", "name email")
        .sort({ followUpDate: 1 })
        .lean(),
    ]);

    return NextResponse.json({
      overdueFollowUps,
      staleLeads,
      upcomingFollowUps,
    });
  } catch (err) {
    console.error("Follow-ups error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
