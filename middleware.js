import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/app/utils/amplifyServerUtils";

async function middleware(request) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        // console.log("SESSION",session)
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (authenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }
}

const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)"],
};

export { middleware, config };
