import { IronSession, SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const defaultSession: SessionData = {
  isLoggedIn: false,
  access_token: undefined,
  valid_until: undefined,
};

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_COOKIE_PASSWORD,
  cookieName: process.env.AUTH_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 60 * 60 * 24 * 7, // 1 week
};

export async function getSession(): Promise<IronSession<SessionData>> {
  let session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.access_token = defaultSession.access_token;
    session.valid_until = defaultSession.valid_until;
  }
  return session;
}
