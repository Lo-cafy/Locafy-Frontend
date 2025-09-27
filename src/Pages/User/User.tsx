// layouts/DashboardLayout.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import BottomBar from '../../Components/BottomBar'; // 👈 import BottomBar

interface UserLayoutProps {
  initialPage?: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ initialPage = 'profile' }) => {
  const [activePage, setActivePage] = useState(initialPage);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Sidebar - only on desktop */}
      <div className="hidden md:flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 border-black min-h-screen bg-gray-100 mt-5 ml-5 mr-5 rounded-t-4xl overflow-auto">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden min-h-screen">
        <main className="flex-1 bg-gray-200 p-3  overflow-auto">
          {renderPage()}
        </main>
        {/* BottomBar only for phones */}
        <BottomBar activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default UserLayout;
