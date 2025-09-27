import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Settings,
  Wrench
} from 'lucide-react';

interface AdminSidebarProps {
  onItemClick?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { key: '/admin/users', label: 'Users', icon: Users, badge: '2.4k' },
    { key: '/admin/services', label: 'Services', icon: Briefcase, badge: null },
    { key: '/admin/bookings', label: 'Bookings', icon: Calendar, badge: '12' },
    { key: '/admin/reports', label: 'Analytics', icon: BarChart3, badge: null },
    { key: '/admin/settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full glass">
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">ServiceHub</span>
            <p className="text-xs text-gray-600">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 py-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.key)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                location.pathname === item.key 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-l-2 border-blue-400 text-gray-900' 
                  : 'text-gray-700 hover:bg-white/40'
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                location.pathname === item.key ? 'text-blue-500' : 'text-gray-500'
              }`} />
              <span className="flex-1 text-left text-sm">{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto text-xs bg-blue-500/10 text-blue-600 border-blue-400/30">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;