import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // Paths that require authentication
  const isDashboardPath = request.nextUrl.pathname.startsWith("/self-dashboard");
  const isApiPath = request.nextUrl.pathname.startsWith("/api/projects") || 
                   request.nextUrl.pathname.startsWith("/api/blogs") || 
                   request.nextUrl.pathname.startsWith("/api/experiences");

  // Allow login page access
  if (request.nextUrl.pathname === "/self-dashboard/login") {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/self-dashboard", request.url));
      } catch (e) {
        // Token invalid, stay on login page
      }
    }
    return NextResponse.next();
  }

  // Protect dashboard and mutation APIs
  if (isDashboardPath || (isApiPath && request.method !== "GET")) {
    if (!token) {
      if (isApiPath) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/self-dashboard/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      if (isApiPath) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/self-dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/self-dashboard/:path*", "/api/:path*"],
};
