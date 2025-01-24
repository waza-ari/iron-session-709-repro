import { getSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Mock Login function, will do no checks, simply mark the user as logged in
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const next = searchParams.get("next");

  const session = await getSession();
  session.isLoggedIn = true;
  session.access_token = "INITIAL_VALUE";
  session.valid_until = Math.round(Date.now() / 1000) + 5; // 5 seconds
  await session.save();

  // Also, we set another cookie to check normal NextJS behaviour
  const cookieStore = await cookies();
  cookieStore.set("NEXTJS_TEST", "INITIAL_VALUE");

  return Response.redirect(`${process.env.PUBLIC_URL}${next}`);
}
