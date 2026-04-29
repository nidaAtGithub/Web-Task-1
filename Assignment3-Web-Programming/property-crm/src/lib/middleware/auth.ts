import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      session: null,
    };
  }
  return { error: null, session };
}

export async function requireAdmin() {
  const { error, session } = await requireAuth();
  if (error) return { error, session: null };
  if (session!.user.role !== "admin") {
    return {
      error: NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 }),
      session: null,
    };
  }
  return { error: null, session };
}
