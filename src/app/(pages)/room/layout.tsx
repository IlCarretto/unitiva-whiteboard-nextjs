import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { ToolbarProvider } from "@/app/components/Toolbar/ToolbarContext";
import { ColorPickerProvider } from "@/app/components/ColorPicker/ColorPickerContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ToolbarProvider>
        <ColorPickerProvider>{children}</ColorPickerProvider>
      </ToolbarProvider>
    </ProtectedRoute>
  );
}
