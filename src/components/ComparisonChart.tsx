import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  flsmAddresses: number;
  vlsmAddresses: number;
  totalAddresses: number;
}

export function ComparisonChart({
  flsmAddresses,
  vlsmAddresses,
  totalAddresses,
}: ComparisonChartProps) {
  const data = [
    {
      name: 'FLSM',
      used: flsmAddresses,
      unused: Math.max(0, totalAddresses - flsmAddresses),
    },
    {
      name: 'VLSM',
      used: vlsmAddresses,
      unused: Math.max(0, totalAddresses - vlsmAddresses),
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
          <XAxis dataKey="name" stroke="currentColor" opacity={0.5} />
          <YAxis stroke="currentColor" opacity={0.5} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Legend />
          <Bar dataKey="used" stackId="a" fill="#3b82f6" name="Addresses Used" />
          <Bar dataKey="unused" stackId="a" fill="#e5e7eb" name="Addresses Unused" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
