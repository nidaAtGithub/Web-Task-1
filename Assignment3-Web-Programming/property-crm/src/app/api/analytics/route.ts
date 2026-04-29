import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import User from "@/models/User";
import { requireAdmin } from "@/lib/middleware/auth";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const [
      totalLeads,
      statusDistribution,
      priorityDistribution,
      agentPerformance,
      recentLeads,
      monthlyTrend,
    ] = await Promise.all([
      Lead.countDocuments(),

      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { status: "$_id", count: 1, _id: 0 } },
      ]),

      Lead.aggregate([
        { $group: { _id: "$priority", count: { $sum: 1 } } },
        { $project: { priority: "$_id", count: 1, _id: 0 } },
      ]),

      Lead.aggregate([
        {
          $group: {
            _id: "$assignedTo",
            totalLeads: { $sum: 1 },
            closedWon: {
              $sum: { $cond: [{ $eq: ["$status", "Closed Won"] }, 1, 0] },
            },
            closedLost: {
              $sum: { $cond: [{ $eq: ["$status", "Closed Lost"] }, 1, 0] },
            },
            inProgress: {
              $sum: {
                $cond: [
                  { $in: ["$status", ["Contacted", "In Progress", "Negotiation"]] },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "agent",
          },
        },
        { $unwind: { path: "$agent", preserveNullAndEmptyArrays: false } },
        {
          $project: {
            agentName: "$agent.name",
            agentEmail: "$agent.email",
            totalLeads: 1,
            closedWon: 1,
            closedLost: 1,
            inProgress: 1,
            conversionRate: {
              $cond: [
                { $eq: ["$totalLeads", 0] },
                0,
                {
                  $round: [
                    { $multiply: [{ $divide: ["$closedWon", "$totalLeads"] }, 100] },
                    1,
                  ],
                },
              ],
            },
          },
        },
        { $sort: { totalLeads: -1 } },
      ]),

      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("assignedTo", "name")
        .lean(),

      Lead.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 6 },
        {
          $project: {
            _id: 0,
            month: {
              $concat: [
                {
                  $arrayElemAt: [
                    ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    "$_id.month",
                  ],
                },
                " ",
                { $toString: "$_id.year" },
              ],
            },
            count: 1,
          },
        },
      ]),
    ]);

    const unassignedLeads = await Lead.countDocuments({ assignedTo: null });
    const highPriorityLeads = await Lead.countDocuments({ priority: "High" });
    const agents = await User.countDocuments({ role: "agent", isActive: true });

    return NextResponse.json({
      summary: {
        totalLeads,
        unassignedLeads,
        highPriorityLeads,
        activeAgents: agents,
      },
      statusDistribution,
      priorityDistribution,
      agentPerformance,
      recentLeads,
      monthlyTrend,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}