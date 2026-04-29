import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/models/User";
import { validateBody, signupSchema } from "@/lib/middleware/validation";
import { authRateLimiter } from "@/lib/middleware/rateLimit";

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limited = authRateLimiter(req, `signup:${ip}`);
  if (limited) return limited;

  try {
    const body = await req.json();
    const { data, error } = validateBody(signupSchema, body);
    if (error) return error;

    await connectDB();

    const existing = await User.findOne({ email: data!.email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // First user becomes admin
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : (data!.role || "agent");

    const user = await User.create({
      name: data!.name,
      email: data!.email,
      password: data!.password,
      phone: data!.phone,
      role,
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
