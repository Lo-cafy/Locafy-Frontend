// src/Components/Admin/Reports/UserMetricsChart.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface UserMetricsChartProps {
  data: any[];
}

const UserMetricsChart: React.FC<UserMetricsChartProps> = ({ data }) => {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white text-lg sm:text-xl">User Metrics</CardTitle>
        <CardDescription className="text-gray-400">User growth and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                labelStyle={{ color: '#fff', marginBottom: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar 
                dataKey="newUsers" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                name="New Users"
              />
              <Bar 
                dataKey="activeUsers" 
                fill="#60a5fa" 
                radius={[4, 4, 0, 0]}
                name="Active Users"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMetricsChart;