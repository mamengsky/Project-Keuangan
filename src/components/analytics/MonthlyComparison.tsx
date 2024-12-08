import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface MonthlyData {
  month: string;
  deposits: number;
  withdrawals: number;
}

interface MonthlyComparisonProps {
  data: MonthlyData[];
}

export const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-base font-semibold mb-4">Perbandingan Bulanan</h2>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(value as number)}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '0.375rem'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: 12, paddingTop: '1rem' }}
          />
          <Bar 
            dataKey="deposits" 
            name="Pemasukan" 
            fill="#4CAF50"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="withdrawals" 
            name="Pengeluaran" 
            fill="#f44336"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);