import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '../../ui/sidebar';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../../ui/dropdown-menu';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  MoreHorizontal,
  Wrench,
  User,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { key: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { key: '/admin/users', label: 'Users', icon: Users, badge: '2.4k' },
    { key: '/admin/services', label: 'Services', icon: Briefcase, badge: null },
    { key: '/admin/bookings', label: 'Bookings', icon: Calendar, badge: '12' },
    { key: '/admin/reports', label: 'Analytics', icon: BarChart3, badge: null },
    { key: '/admin/settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <Sidebar className="border-r border-gray-700 bg-gray-800/50 backdrop-blur-xl">
          <SidebarHeader className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
              </div>
              <div>
                <span className="font-bold text-lg text-white">ServiceHub</span>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.key)}
                    isActive={location.pathname === item.key}
                    className={`w-full justify-start group transition-all duration-200 hover:bg-white/10 ${
                      location.pathname === item.key 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-2 border-blue-400 text-white' 
                        : 'text-gray-300'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-colors ${
                      location.pathname === item.key ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto text-xs bg-blue-500/20 text-blue-300 border-blue-400/30">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50 backdrop-blur-sm border border-gray-600">
              <div className="relative">
                <Avatar className="w-9 h-9 border-2 border-gray-600 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-400">{user?.email || 'admin@servicehub.com'}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white hover:bg-white/10">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border border-gray-700">
                  <DropdownMenuItem onClick={() => navigate('/admin/settings')} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-gray-400 hover:text-white" />
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                  <Input 
                    placeholder="Search users, services, bookings..." 
                    className="pl-10 w-96 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" className="relative bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-200">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
                
                <Button variant="outline" size="icon" className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-200">
                  <RefreshCw className="w-4 h-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-gray-600 hover:border-blue-400 transition-all duration-200">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user?.name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-gray-800 border border-gray-700">
                    <DropdownMenuItem onClick={() => navigate('/admin/settings')} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin/settings')} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto bg-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;