"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Collaborative Whiteboard</h1>
      <h2>
        {session && session.user
          ? `Hello ${session.user.name}`
          : "Sign in to continue"}
      </h2>
      <Link href={status === "authenticated" ? "/dashboard" : "/login"}>
        Go to dashboard
      </Link>
    </>
  );
}
