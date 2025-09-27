import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ServiceDistributionProps {
  data: any[];
}

const ServiceDistribution: React.FC<ServiceDistributionProps> = ({ data }) => {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-white">Service Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                border: '1px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '8px',
                backdropFilter: 'blur(8px)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-300 truncate">{entry.name} ({entry.value}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDistribution;