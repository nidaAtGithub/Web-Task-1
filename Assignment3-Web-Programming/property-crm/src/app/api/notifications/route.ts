import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import Activity from "@/models/Activity";
import { requireAuth } from "@/lib/middleware/auth";

// This endpoint supports polling for real-time updates
// Frontend polls every 10-15 seconds to get latest notifications
export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();

    const since = req.nextUrl.searchParams.get("since");
    const sinceDate = since ? new Date(since) : new Date(Date.now() - 30000); // last 30s default

    const query: any = { createdAt: { $gt: sinceDate } };

    // Agents only see activities on their leads
    if (session!.user.role === "agent") {
      const myLeadIds = await Lead.find({ assignedTo: session!.user.id }).distinct("_id");
      query.lead = { $in: myLeadIds };
    }

    const recentActivities = await Activity.find(query)
      .populate("lead", "name priority status")
      .populate("performedBy", "name")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({
      notifications: recentActivities,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Notifications error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
