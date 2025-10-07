// src/Pages/User/User.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import Services from './Services';
import Bookings from './Bookings';
import BottomBar from '../../Components/BottomBar';

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
      case 'services':
        return <Services />;
      case 'bookings':
        return <Bookings />;
      case 'settings':
        return <Settings />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

  
      <main className="flex-1 transition-all duration-300 md:ml-20 peer-hover:md:ml-64">
        
       
        <div className="md:hidden">
          <div className="p-4 pb-20"> 
            {renderPage()}
          </div>
          <BottomBar activePage={activePage} setActivePage={setActivePage} />
        </div>

        
        <div className="hidden md:block">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;