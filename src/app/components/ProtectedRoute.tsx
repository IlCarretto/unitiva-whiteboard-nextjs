"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") {
    return <div>..Loading</div>;
  }

  if (!session && status === "unauthenticated") {
    push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
