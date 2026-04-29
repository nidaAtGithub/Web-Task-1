import { z } from "zod";
import { NextResponse } from "next/server";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["admin", "agent"]).optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Valid phone number required"),
  propertyInterest: z.enum([
    "Residential Plot",
    "Commercial Plot",
    "House",
    "Apartment",
    "Farm House",
    "Shop",
    "Office",
    "Warehouse",
  ]),
  location: z.string().optional(),
  budget: z.number().positive("Budget must be positive"),
  status: z
    .enum(["New", "Contacted", "In Progress", "Negotiation", "Closed Won", "Closed Lost"])
    .optional(),
  notes: z.string().optional(),
  source: z.enum(["Facebook Ads", "Walk-in", "Website", "Referral", "Other"]).optional(),
  assignedTo: z.string().optional().nullable(),
  followUpDate: z.string().datetime().optional().nullable(),
});

export const updateLeadSchema = leadSchema.partial();

export const assignLeadSchema = z.object({
  agentId: z.string().min(1, "Agent ID is required"),
});

export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): { data: T; error: null } | { data: null; error: NextResponse } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return {
      data: null,
      error: NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      ),
    };
  }
  return { data: result.data, error: null };
}
