// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user/*" element={<UserLayout />} />
        <Route path="/all-services" element={<AllServicesPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

