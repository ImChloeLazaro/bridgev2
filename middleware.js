import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/app/utils/amplifyServerUtils";

const protectedRoutes = [
  "/user/",
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

async function middleware(request) {
  const response = NextResponse.next();

  // ## Preconnect to required origins to establish early connections to important third-party origins e.g. Google or AWS
  response.headers.append(
    "Link",
    "<https://cognito-idp.ap-southeast-1.amazonaws.com>; rel=dns-prefetch;"
  );
  response.headers.append(
    "Link",
    "<https://cognito-identity.ap-southeast-1.amazonaws.com>; rel=dns-prefetch;"
  );
  response.headers.append(
    "Link",
    "<https://lh3.googleusercontent.com>; rel=preconnect;"
  );
  response.headers.append(
    "Link",
    "<https://oni3aoa6mf.execute-api.ap-southeast-1.amazonaws.com>; rel=preconnect;"
  );
  response.headers.append(
    "Link",
    "<https://bridgebucket150517-dev.s3.ap-southeast-1.amazonaws.com>; rel=preconnect;"
  );

  const isAuthenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  // ### Redirect already authenticated user to home page
  if (isAuthenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user/", request.nextUrl));
  }

  // ### Redirect unauthorized access to sign in page
  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

const config = {
  matcher: ["/((?api|_next/static|_next/image|favicon.ico).*)"],
};

export { middleware, config };
