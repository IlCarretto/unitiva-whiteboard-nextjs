import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Collaborative Whiteboard</h1>
      <h2>Sign in to continue</h2>
      <Link href="/whiteboard">Go to whiteboard</Link>
    </>
  );
}
