import { NavLink } from "react-router-dom";
import { LayoutGrid, Users, Building2, Wrench, FileText, Settings, MessageSquare, AlertTriangle } from "lucide-react";

export default function SuperAdminSidebar() {
  const linkBase = "text-gray-300 hover:text-white flex items-center gap-3 px-4 py-2 rounded-md";
  const activeBase = "bg-gray-800 text-white";

  return (
    <div className="h-full flex flex-col">
      {/* Brand header is handled by SuperAdminLayout; avoid duplicating it here */}
      <nav className="p-4 space-y-1">
        <NavLink to="dashboard" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <LayoutGrid className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="tenants" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <Building2 className="w-5 h-5" />
          <span>Tenants</span>
        </NavLink>
        <NavLink to="users" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <Users className="w-5 h-5" />
          <span>Users & Roles</span>
        </NavLink>
        <NavLink to="services" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <Wrench className="w-5 h-5" />
          <span>Services</span>
        </NavLink>
        <NavLink to="chat" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <MessageSquare className="w-5 h-5" />
          <span>Admin Chat</span>
        </NavLink>
        <NavLink to="complaints" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <AlertTriangle className="w-5 h-5" />
          <span>Complaints Report</span>
        </NavLink>
        <NavLink to="audit-logs" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <FileText className="w-5 h-5" />
          <span>Audit Logs</span>
        </NavLink>
        <NavLink to="system-settings" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : ""}`}>
          <Settings className="w-5 h-5" />
          <span>System Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}
