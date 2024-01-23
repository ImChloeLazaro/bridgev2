import { NextResponse } from "next/server";

const protectedRoutes = [
  "/user",
  "/user/dashboard",
  "/user/profile",
  "/user/cms",
  "/user/empower",
  "/tl",
  "/tl/cms",
  "/tl/team",
  "/tl/schedule",
  "/tl/appraisals",
  "/admin",
  "/admin/team",
  "/admin/clients",
  "/admin/appraisals",
  "/admin/roles",
  "/admin/help_desk",
  "/hr",
  "/hr/pre_employment",
  "/hr/onboarding",
  "/hr/endorse",
  "/hr/employees",
  "/hr/benefits",
  "/hr/leaves",
  "/hr/offboarding",
];
const isAuthenticated = true;
const isSignedIn = true;

// ### Private routes
export function middleware(request, response) {
  // ### Redirect already authenticated user but not signed in
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  // ### Redirect unauthorized access to sign in page
  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// ### Public routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/onboarding"],
};
