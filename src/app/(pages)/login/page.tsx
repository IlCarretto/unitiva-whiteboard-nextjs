"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { status: authenticated } = useSession();

  useEffect(() => {
    if (authenticated) {
      redirect("/whiteboard");
    }
  }, [authenticated]);

  if (authenticated) {
    return null;
  } else {
    return <div>Login</div>;
  }
};

export default Login;
