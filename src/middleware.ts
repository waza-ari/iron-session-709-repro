import { getSession, sessionOptions } from "@/lib/auth";
import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getSession();

  // Check if the user is logged in, if not, redirect to login
  if (!session.isLoggedIn) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url) + "?next=" + req.nextUrl.pathname
    );
  }

  // Check if the access token has expired
  if (
    !session.valid_until ||
    session.valid_until < Math.round(Date.now() / 1000)
  ) {
    // Here we would actually refresh if the AT using RT or similar, for simplicity we just change the AT
    console.log("Access token expired, refreshing...");

    if (req.nextUrl.pathname === "/protected/nextjs") {
      // Native NextJS Cookie Test
      const res = NextResponse.next();
      res.cookies.set("NEXTJS_TEST", "CHANGED_VALUE");
      return res;
    } else {
      // Set new AT in iron-session
      const res = NextResponse.next();
      session.access_token = "CHANGED_VALUE";
      session.valid_until = Math.round(Date.now() / 1000) + 5; // 5 seconds
      await session.save();
      return res;
    }
  }
}

export const config = {
  matcher: ["/(protected.*)"],
};
