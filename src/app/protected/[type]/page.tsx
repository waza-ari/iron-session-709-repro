import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Protected({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const session = await getSession();

  const cookieValue = (await cookies()).get("NEXTJS_TEST")?.value;

  return (
    <div>
      <div className="flex justify-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/protected/nextjs">NextJS Cookie</Link>
        <Link href="/protected/ironsession">Iron-Session</Link>
      </div>
      <h1>Protected</h1>
      <p>
        {cookieValue && "Cookie value: "}
        {(await params).type === "nextjs" ? cookieValue : session.access_token}
      </p>
    </div>
  );
}
