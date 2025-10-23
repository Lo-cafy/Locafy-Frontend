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
import UserProfile from "@/Pages/Services/UserProfile";
import { useAuthStore } from "@/store/authStore";
import GuestGuard from "@/Auth/GuestGuard";

function App() {
  const { hydrateFromStorage } = useAuthStore();
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
      
        {/* Landing Page - Only accessible to non-logged-in users */}
        <Route path="/" element={
          <GuestGuard>
            <Home />
          </GuestGuard>
        } />
        {/* Provider Routes */}
        <Route path="/provider/*" element={<UserLayout />} />
        {/* Backward compatibility redirect from /user to /provider */}
        <Route path="/user/*" element={<Navigate to="/provider" replace />} />
        {/* Customer Routes - No Protection */}
        <Route path="/all-services" element={<AllServicesPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/services/:id/booking" element={<BookingPage />} />
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

        {/* Super Admin Routes - No Protection */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
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