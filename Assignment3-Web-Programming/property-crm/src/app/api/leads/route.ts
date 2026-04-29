import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import Activity from "@/models/Activity";
import User from "@/models/User";
import { requireAuth } from "@/lib/middleware/auth";
import { validateBody, leadSchema } from "@/lib/middleware/validation";
import { getRateLimiter } from "@/lib/middleware/rateLimit";
import { sendNewLeadEmail, sendLeadAssignedEmail } from "@/lib/utils/email";

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const limiter = getRateLimiter(session!.user.role);
  const limited = limiter(req, `leads:${session!.user.id}`);
  if (limited) return limited;

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query: any = {};

    if (session!.user.role === "agent") {
      query.assignedTo = session!.user.id;
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const limiter = getRateLimiter(session!.user.role);
  const limited = limiter(req, `leads:${session!.user.id}`);
  if (limited) return limited;

  try {
    const body = await req.json();
    const { data, error: valError } = validateBody(leadSchema, body);
    if (valError) return valError;

    await connectDB();

    const lead = await Lead.create(data!);

    // Record activity
    await Activity.create({
      lead: lead._id,
      performedBy: session!.user.id,
      action: "lead_created",
      description: `Lead created for ${lead.name}`,
      newValue: lead.status,
    });

    // Fetch ALL admins from DB to notify them
    const admins = await User.find({ role: "admin", isActive: true }).select("email name").lean();

    // Send email to each admin
    admins.forEach((admin) => {
      sendNewLeadEmail({
        adminEmail: admin.email,   // ← taken from DB
        adminName: admin.name,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        propertyInterest: lead.propertyInterest,
        budget: lead.budget,
        priority: lead.priority,
        source: lead.source,
      }).catch(console.error);
    });

    const populated = await lead.populate("assignedTo", "name email");

    // Send email to the assigned agent (if any)
    if (lead.assignedTo) {
      const agent = await User.findById(lead.assignedTo).select("email name").lean();
      if (agent) {
        sendLeadAssignedEmail({
          agentEmail: agent.email,
          agentName: agent.name,
          leadName: lead.name,
          leadPhone: lead.phone,
          propertyInterest: lead.propertyInterest,
          budget: lead.budget,
          priority: lead.priority,
        }).catch(console.error);
      }
    }
    return NextResponse.json({ lead: populated }, { status: 201 });
  } catch (err) {
    console.error("POST lead error:", err);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}