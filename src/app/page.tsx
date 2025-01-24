import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/protected/nextjs">NextJS Cookie</Link>
        <Link href="/protected/ironsession">Iron-Session</Link>
      </div>
      <h1>Home</h1>
    </div>
  );
}
