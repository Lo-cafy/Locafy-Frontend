import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '@/Components/Layout/Sidebar';
import BottomBar from '@/Components/Layout/BottomBar';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="hidden md:flex">
        <Sidebar activePage={currentPath} />
        <main className="flex-1 border-black min-h-screen bg-gray-100 mt-5 ml-5 mr-5 rounded-t-4xl overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden min-h-screen">
        <main className="flex-1 bg-gray-200 p-3 overflow-auto pb-24">
          <Routes>
            <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomBar activePage={currentPath} />
      </div>
    </div>
  );
};

export default DashboardLayout;