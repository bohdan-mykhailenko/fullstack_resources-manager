import { Navigate } from "@tanstack/react-router";

import { AdminVerificationForm } from "@/components/features/forms";
import { useIsAdmin, useIsAuthenticated } from "@/store";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <AdminVerificationForm />;
  }

  return <div>Hello admin!</div>;
};
