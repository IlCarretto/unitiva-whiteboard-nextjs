"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { data: session, status: loading } = useSession();
  const { push } = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    push("/login");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
