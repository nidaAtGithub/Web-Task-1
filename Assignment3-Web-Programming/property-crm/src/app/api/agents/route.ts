import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/models/User";
import { requireAdmin } from "@/lib/middleware/auth";
import { validateBody, signupSchema } from "@/lib/middleware/validation";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Only admin can delete agents
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const { id } = params;

    // Prevent admin from deleting themselves (optional safety check)
    const agent = await User.findById(id);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (agent.role !== "agent") {
      return NextResponse.json({ error: "Can only delete agents" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Agent deleted successfully" });
  } catch (err) {
    console.error("DELETE agent error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const agents = await User.find({ role: "agent" })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ agents });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();
    const { data, error: valError } = validateBody(signupSchema, body);
    if (valError) return valError;

    await connectDB();

    const existing = await User.findOne({ email: data!.email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const agent = await User.create({ ...data!, role: "agent" });
    const agentObj = agent.toObject();
    delete (agentObj as any).password;

    return NextResponse.json({ agent: agentObj }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
