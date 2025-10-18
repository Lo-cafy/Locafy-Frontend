import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function SuperAdminDashboard() {
  const revenueData = [
    { m: "Jan", v: 18 },
    { m: "Feb", v: 22 },
    { m: "Mar", v: 30 },
    { m: "Apr", v: 26 },
    { m: "May", v: 35 },
    { m: "Jun", v: 42 },
  ];
  const usersData = [
    { m: "Jan", a: 5200 },
    { m: "Feb", a: 5600 },
    { m: "Mar", a: 6100 },
    { m: "Apr", a: 6900 },
    { m: "May", a: 7700 },
    { m: "Jun", a: 8421 },
  ];
  const tenantsData = [
    { n: "Acme", c: 142 },
    { n: "Globex", c: 91 },
    { n: "Umbrella", c: 64 },
    { n: "Stark", c: 118 },
  ];
  const featureSplit = [
    { name: "Enabled", value: 19 },
    { name: "Disabled", value: 8 },
  ];
  const colors = ["#059669", "#f59e0b", "#3b82f6", "#ef4444"]; 
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/10 border-white/10"><div className="text-gray-400 text-sm">Total Tenants</div><div className="text-2xl font-bold">12</div></Card>
        <Card className="p-4 bg-white/10 border-white/10"><div className="text-gray-400 text-sm">Active Users</div><div className="text-2xl font-bold">8,421</div></Card>
        <Card className="p-4 bg-white/10 border-white/10"><div className="text-gray-400 text-sm">Feature Flags</div><div className="text-2xl font-bold">27</div></Card>
        <Card className="p-4 bg-white/10 border-white/10"><div className="text-gray-400 text-sm">Incidents</div><div className="text-2xl font-bold">0 <Badge className="ml-2">Healthy</Badge></div></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 bg-white/10 border-white/10">
          <div className="mb-2 text-gray-200 font-semibold">Revenue (last 6 months)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="m" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e5e7eb" }} />
                <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4 bg-white/10 border-white/10">
          <div className="mb-2 text-gray-200 font-semibold">Active Users</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usersData} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="au" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="m" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e5e7eb" }} />
                <Area type="monotone" dataKey="a" stroke="#3b82f6" fill="url(#au)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4 bg-white/10 border-white/10">
          <div className="mb-2 text-gray-200 font-semibold">Users by Tenant</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantsData} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="n" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e5e7eb" }} />
                <Bar dataKey="c" radius={[6, 6, 0, 0]}>
                  {tenantsData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4 bg-white/10 border-white/10">
          <div className="mb-2 text-gray-200 font-semibold">Feature Flags Split</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e5e7eb" }} />
                <Legend />
                <Pie data={featureSplit} dataKey="value" nameKey="name" outerRadius={90} label>
                  {featureSplit.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
