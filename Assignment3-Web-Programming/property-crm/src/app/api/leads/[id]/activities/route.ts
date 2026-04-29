import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Activity from "@/models/Activity";
import Lead from "@/models/Lead";
import { requireAuth } from "@/lib/middleware/auth";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();

    const lead = await Lead.findById(params.id);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Agent can only view activities of their assigned leads
    if (
      session!.user.role === "agent" &&
      lead.assignedTo?.toString() !== session!.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const activities = await Activity.find({ lead: params.id })
      .populate("performedBy", "name role")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ activities });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
