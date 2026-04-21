"use server";

import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// -------------------- SIGNUP --------------------
export async function signup(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    redirect("/login");
  } catch (error) {
    // If it's a redirect, rethrow it
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Signup error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

// -------------------- LOGIN --------------------
export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    const cookieStore = await cookies();
    cookieStore.set("user", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    redirect("/dashboard");
  } catch (error) {
    // If it's a redirect, rethrow it
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Login error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

// -------------------- LOGOUT --------------------
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  redirect("/login");
}