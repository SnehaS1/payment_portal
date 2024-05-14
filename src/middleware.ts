import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const isLoggedInPath =
    path === "/employees" ||
    path === "/employees/create" ||
    path === "/salary" ||
    path === "/payment-history";

  const token = request.cookies.get("token")?.value || "";

  if (!token && isLoggedInPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/employees", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/employees",
    "/login",
    "/salary",
    "/employees/create",
    "/payment-history",
  ],
};
