import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import RoomPage from "./page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
