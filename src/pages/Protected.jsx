import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";

export default function ProtectedPage() {
  const accessToken = localStorage.getItem("access_token");

  return accessToken ? (
    <Outlet /> // If user is logged in, show the protected page
  ) : (
    <Navigate to="/landing-page" /> // If user is not logged in, redirect to login page
  );
}
