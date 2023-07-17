"use client";

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Sign In</button>;
};

export default SignInButton;
