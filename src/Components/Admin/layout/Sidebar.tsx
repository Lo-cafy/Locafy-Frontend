import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, Users, Settings, Calendar, BarChart, 
  Package, AlignJustify, MessageSquare, AlertTriangle
} from 'lucide-react';

interface NavItemData {
  id: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

interface AdminSidebarProps {
  onItemClick?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItemData[] = [
    { id: '/admin/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: '/admin/users', icon: Users, label: 'Users', badge: '2.4k' },
    { id: '/admin/services', icon: AlignJustify, label: 'Services' },
    { id: '/admin/bookings', icon: Calendar, label: 'Bookings', badge: '12' },
    { id: '/admin/chat', icon: MessageSquare, label: 'Chat', badge: '4' },
    { id: '/admin/complaints', icon: AlertTriangle, label: 'Complaints', badge: '23' },
    { id: '/admin/reports', icon: BarChart, label: 'Analytics' },
    { id: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header/Logo */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500 mr-3 text-white">
          <Package className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-white">ServiceHub</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs uppercase text-gray-500 font-semibold mb-2 ml-3">Admin Dashboard</p>
{navItems.map((item) => {
 const isActive = location.pathname.startsWith(item.id) || (item.id === '/admin/dashboard' && location.pathname === '/admin');

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-indigo-500 text-white font-semibold shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-indigo-400' : 'bg-gray-600'
                } text-white`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;