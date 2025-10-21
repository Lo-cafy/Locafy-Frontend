import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface RoleGuardProps {
  children: ReactNode;
  requiredRoles: Array<"customer" | "user" | "provider" | "admin" | "superadmin">;
  fallback?: string; // path to redirect
}

export default function RoleGuard({ children, requiredRoles, fallback = "/" }: RoleGuardProps) {
  const { user, isLoggedIn, hydrateFromStorage } = useAuthStore();
  const location = useLocation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrateFromStorage();
    setHydrated(true);
  }, [hydrateFromStorage]);

  if (!hydrated) {
    return <></>;
  }

  // If localStorage indicates a logged-in session but the store hasn't updated yet, wait instead of redirecting
  const storageLoggedIn = (typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true");
  const storageUser = (typeof window !== "undefined" && localStorage.getItem("User"));
  if (!isLoggedIn || !user) {
    if (storageLoggedIn && storageUser) {
      return <></>;
    }
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  const normalizeRole = (r: unknown): "customer" | "user" | "provider" | "admin" | "superadmin" => {
    const v = typeof r === "string" ? r.toLowerCase() : "customer";
    if (v === "customer") return "customer";
    if (v === "user") return "user";
    if (v === "provider") return "provider";
    if (v === "admin") return "admin";
    if (v === "superadmin" || v === "super-admin") return "superadmin";
    return "customer"; // Default to customer for safety
  };

  const effectiveRole = normalizeRole(user.role);
  if (requiredRoles.includes(effectiveRole)) {
    return <>{children}</>;
  }

  return <Navigate to={fallback} replace />;
}
