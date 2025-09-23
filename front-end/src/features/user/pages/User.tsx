import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "@/Components/Layout/Sidebar";
import Dashboard from "./Dashboard";  
import Profile from "./Profile";  
import Settings from "./Settings";  
import { Bookings } from "@/features/booking/pages/Bookings";
import { ProtectedRoute } from "@/Components/auth/ProtectedRoute";
import { useLocation } from "react-router-dom"; 

function UserLayout() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activePage={currentPath} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default UserLayout;