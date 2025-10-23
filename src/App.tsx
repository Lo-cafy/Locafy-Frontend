
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "@/Pages/LandingPage";
import UserLayout from "./Pages/Provider/User";
import AllServicesPage from "./Pages/Services/allServices";
import AdminLayout from "@/Pages/Admin/AdminLayout";
import Dashboard from "@/Pages/Admin/Dashboard";
import Users from "@/Pages/Admin/Users";
import Services from "@/Pages/Admin/Services";
import Reports from "@/Pages/Admin/Reports";
import Settings from "@/Pages/Admin/Settings";
import Bookings from "@/Pages/Admin/Bookings";
import Chat from "@/Pages/Admin/Chat";
import Complaints from "@/Pages/Admin/Complaints";
import ServiceDetailPage from "./Pages/Services/Servicedetail";
import BookingPage from "./Pages/Services/Booking";
import { UrlVerification } from "./Auth/UrlVerification";
  import { ToastContainer } from 'react-toastify';
import RoleGuard from "@/Auth/RoleGuard";
import SuperAdminLayout from "@/Pages/SuperAdmin/SuperAdminLayout";
import SuperAdminDashboard from "@/Pages/SuperAdmin/Dashboard";
import Tenants from "@/Pages/SuperAdmin/Tenants";
import UsersRoles from "@/Pages/SuperAdmin/UsersRoles";
import AuditLogs from "@/Pages/SuperAdmin/AuditLogs";
import SystemSettings from "@/Pages/SuperAdmin/SystemSettings";
import SuperAdminChat from "@/Pages/SuperAdmin/SuperAdminChat";
import ComplaintsReport from "@/Pages/SuperAdmin/ComplaintsReport";
import TrackBooking from "@/Pages/Services/TrackBooking.tsx";
import MyBookingsPage from "@/Pages/Services/MyBookings";
import { useAuthStore } from "@/store/authStore";

function App() {
  const { isLoggedIn, hydrateFromStorage } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrateFromStorage();
    setHydrated(true);
  }, [hydrateFromStorage]);

  if (!hydrated) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/superadmindashboard" element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="/superadmin" element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="/super-admin-dashboard" element={<Navigate to="/super-admin/dashboard" replace />} />

        <Route path="/" element={isLoggedIn ? <Navigate to="/provider" replace /> : <Home />} />
        {/* Provider Routes */}
        <Route
          path="/provider/*"
          element={
            <RoleGuard requiredRoles={["provider", "customer"]} fallback="/">
              <UserLayout />
            </RoleGuard>
          }
        />
        {/* Backward compatibility redirect from /user to /provider */}
        <Route path="/user/*" element={<Navigate to="/provider" replace />} />
        {/* Customer Routes - Protected */}
        <Route path="/all-services" element={
          <RoleGuard requiredRoles={["customer"]} fallback="/">
            <AllServicesPage />
          </RoleGuard>
        } />
        <Route path="/my-bookings" element={
          <RoleGuard requiredRoles={["customer"]} fallback="/">
            <MyBookingsPage />
          </RoleGuard>
        } />
        <Route path="/services/:id" element={
          <RoleGuard requiredRoles={["customer"]} fallback="/">
            <ServiceDetailPage />
          </RoleGuard>
        } />
        <Route path="/services/:id/booking" element={
          <RoleGuard requiredRoles={["customer"]} fallback="/">
            <BookingPage />
          </RoleGuard>
        } />
          <Route path="/track-booking/:bookingId" element={<TrackBooking />} />
           <Route path="/finalize-registration" element={<UrlVerification/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="chat" element={<Chat />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Super Admin Routes (full access) */}
        <Route
          path="/super-admin"
          element={
            <RoleGuard requiredRoles={["superadmin"]} fallback="/">
              <SuperAdminLayout />
            </RoleGuard>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<UsersRoles />} />
          <Route path="chat" element={<SuperAdminChat />} />
          <Route path="complaints" element={<ComplaintsReport />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="system-settings" element={<SystemSettings />} />
        </Route>

        {/* Super Admin Test Routes (unguarded, for QA only) */}
        <Route path="/super-admin-test" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<UsersRoles />} />
          <Route path="chat" element={<SuperAdminChat />} />
          <Route path="complaints" element={<ComplaintsReport />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="system-settings" element={<SystemSettings />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;


