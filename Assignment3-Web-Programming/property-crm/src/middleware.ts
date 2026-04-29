import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin trying to access agent routes
    if (path.startsWith("/agent") && token?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Agent trying to access admin routes
    if (path.startsWith("/admin") && token?.role === "agent") {
      return NextResponse.redirect(new URL("/agent", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*"],
};
