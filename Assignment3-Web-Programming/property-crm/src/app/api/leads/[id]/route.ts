import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import Activity from "@/models/Activity";
import User from "@/models/User";
import { requireAuth } from "@/lib/middleware/auth";
import { validateBody, updateLeadSchema, assignLeadSchema } from "@/lib/middleware/validation";
import { getRateLimiter } from "@/lib/middleware/rateLimit";
import { sendLeadAssignedEmail } from "@/lib/utils/email";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();

    const lead = await Lead.findById(params.id)
      .populate("assignedTo", "name email phone")
      .lean();

    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Agent can only view their assigned lead
    if (
      session!.user.role === "agent" &&
      lead.assignedTo?.toString() !== session!.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ lead });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const limiter = getRateLimiter(session!.user.role);
  const limited = limiter(req, `lead-update:${session!.user.id}`);
  if (limited) return limited;

  try {
    const body = await req.json();
    await connectDB();

    const existingLead = await Lead.findById(params.id);
    if (!existingLead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Agent can only update their assigned leads
    if (
      session!.user.role === "agent" &&
      existingLead.assignedTo?.toString() !== session!.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Handle assignment separately
    if (body.assignedTo !== undefined && session!.user.role !== "admin") {
      return NextResponse.json({ error: "Only admin can assign leads" }, { status: 403 });
    }

    const { data, error: valError } = validateBody(updateLeadSchema, body);
    if (valError) return valError;

    const updates: any = { ...data!, lastActivityAt: new Date() };

    // Track activities
    const activities = [];

    if (data!.status && data!.status !== existingLead.status) {
      activities.push({
        lead: params.id,
        performedBy: session!.user.id,
        action: "status_changed",
        description: `Status changed from ${existingLead.status} to ${data!.status}`,
        oldValue: existingLead.status,
        newValue: data!.status,
      });
    }

    if (data!.notes !== undefined && data!.notes !== existingLead.notes) {
      activities.push({
        lead: params.id,
        performedBy: session!.user.id,
        action: "notes_updated",
        description: "Notes updated",
      });
    }

    if (data!.followUpDate !== undefined) {
      activities.push({
        lead: params.id,
        performedBy: session!.user.id,
        action: "follow_up_set",
        description: `Follow-up date set to ${data!.followUpDate}`,
        newValue: data!.followUpDate?.toString(),
      });
    }

    if (data!.assignedTo !== undefined) {
      const isReassign = existingLead.assignedTo !== null;
      activities.push({
        lead: params.id,
        performedBy: session!.user.id,
        action: isReassign ? "lead_reassigned" : "lead_assigned",
        description: isReassign ? "Lead reassigned to a different agent" : "Lead assigned to agent",
        newValue: data!.assignedTo?.toString(),
      });

      // Send assignment email
      if (data!.assignedTo) {
        const agent = await User.findById(data!.assignedTo);
        if (agent) {
          sendLeadAssignedEmail({
            agentEmail: agent.email,
            agentName: agent.name,
            leadName: existingLead.name,
            leadPhone: existingLead.phone,
            propertyInterest: existingLead.propertyInterest,
            budget: existingLead.budget,
            priority: existingLead.priority,
          }).catch(console.error);
        }
      }
    }

    const updated = await Lead.findByIdAndUpdate(params.id, updates, { new: true, runValidators: true })
      .populate("assignedTo", "name email");

    if (activities.length > 0) {
      await Activity.insertMany(activities);
    }

    return NextResponse.json({ lead: updated });
  } catch (err) {
    console.error("PATCH lead error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { error, session } = await requireAuth();
  if (error) return error;

  // Only admin can delete
  if (session!.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const lead = await Lead.findByIdAndDelete(params.id);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Clean up activities
    await Activity.deleteMany({ lead: params.id });

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
