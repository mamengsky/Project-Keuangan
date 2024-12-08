import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { Download } from 'lucide-react';

interface MonthlyData {
  month: string;
  deposits: number;
  withdrawals: number;
}

interface MonthlyComparisonProps {
  data: MonthlyData[];
}

export const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ data }) => {
  const handleDownload = () => {
    const chartElement = document.querySelector('.monthly-chart-container svg');
    if (!chartElement) return;

    const svgData = new XMLSerializer().serializeToString(chartElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'monthly-comparison.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate percentages
  const enrichedData = data.map(month => {
    const total = month.deposits + month.withdrawals;
    return {
      ...month,
      depositPercentage: total ? ((month.deposits / total) * 100).toFixed(1) : '0',
      withdrawalPercentage: total ? ((month.withdrawals / total) * 100).toFixed(1) : '0'
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold mb-1 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between gap-3 text-sm">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium">
              {formatCurrency(entry.value)}
              {entry.name === 'Pemasukan' && 
                ` (${enrichedData.find(d => d.month === label)?.depositPercentage}%)`}
              {entry.name === 'Pengeluaran' && 
                ` (${enrichedData.find(d => d.month === label)?.withdrawalPercentage}%)`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Perbandingan Bulanan</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
      </div>
      <div className="h-[240px] monthly-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={enrichedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 10, paddingTop: '0.5rem' }}
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
};