import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { Download } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface PurposeData {
  name: string;
  value: number;
}

interface PurposeDistributionProps {
  data: PurposeData[];
}

export const PurposeDistribution: React.FC<PurposeDistributionProps> = ({ data }) => {
  const handleDownload = () => {
    const chartElement = document.querySelector('.purpose-chart-container svg');
    if (!chartElement) return;

    const svgData = new XMLSerializer().serializeToString(chartElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'purpose-distribution.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate total and percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const enrichedData = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload[0]) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold mb-1 text-sm">{data.name}</p>
        <p className="text-xs">Amount: {formatCurrency(data.value)}</p>
        <p className="text-xs">Percentage: {data.percentage}%</p>
      </div>
    );
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Distribusi Keperluan</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
      </div>
      <div className="h-[240px] purpose-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Pie
              data={enrichedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {enrichedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 10 }}
              formatter={(value, entry: any) => {
                const item = enrichedData.find(d => d.name === value);
                return `${value} (${item?.percentage}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};