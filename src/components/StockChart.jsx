import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return <div>No data to display</div>;

  const avg = data.reduce((acc, point) => acc + point.price, 0) / data.length;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip
          formatter={(value) => `$${value.toFixed(2)}`}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <ReferenceLine y={avg} label="Average" stroke="red" strokeDasharray="3 3" />
        <Line type="monotone" dataKey="price" stroke="#1976d2" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
