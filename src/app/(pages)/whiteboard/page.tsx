"use-client";

import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const page = () => {
  return (
    <>
      <ProtectedRoute>
        <div>Whiteboard</div>
      </ProtectedRoute>
    </>
  );
};

export default page;
