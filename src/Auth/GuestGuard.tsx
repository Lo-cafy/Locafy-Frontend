import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

interface GuestGuardProps {
  children: ReactNode;
}

/**
 * GuestGuard - Protects routes that should only be accessible to non-logged-in users
 * If user is logged in, redirects them to their role-specific dashboard
 */
export default function GuestGuard({ children }: GuestGuardProps) {
  const { user, isLoggedIn } = useAuthStore();

  // If user is logged in, redirect to their appropriate dashboard
  if (isLoggedIn && user) {
    const userRole = (user.role || "customer").toLowerCase();
    
    switch(userRole) {
      case "customer":
        return <Navigate to="/all-services" replace />;
      case "provider":
        return <Navigate to="/provider" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      case "superadmin":
      case "super_admin":
        return <Navigate to="/superadmin" replace />;
      default:
        return <Navigate to="/all-services" replace />;
    }
  }

  // User is not logged in, show the landing page
  return <>{children}</>;
}
