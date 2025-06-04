import React from 'react';
import { Typography, Tooltip, Box, useTheme } from '@mui/material';

const computeCorrelation = (x, y) => {
  const n = Math.min(x.length, y.length);
  if (n === 0) return 0;

  const meanX = x.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const meanY = y.slice(0, n).reduce((a, b) => a + b, 0) / n;

  const cov = x.slice(0, n).reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0) / (n - 1);
  const stdX = Math.sqrt(x.slice(0, n).reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) / (n - 1));
  const stdY = Math.sqrt(y.slice(0, n).reduce((sum, yi) => sum + (yi - meanY) ** 2, 0) / (n - 1));

  return cov / (stdX * stdY);
};

const CorrelationHeatmap = ({ data, symbols }) => {
  const tickers = Object.keys(data);
  const matrix = tickers.map(row => tickers.map(col => computeCorrelation(data[row], data[col])));

  const getColor = (val) => {
    const hue = (val + 1) * 120; // from red (-1) to green (+1)
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th></th>
            {tickers.map(t => (
              <th key={t} style={{ padding: '4px', textAlign: 'center' }}>{symbols[t]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickers.map((row, i) => (
            <tr key={row}>
              <th style={{ padding: '4px', textAlign: 'center' }}>{symbols[row]}</th>
              {tickers.map((col, j) => {
                const val = matrix[i][j];
                const prices = data[row];
                const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
                const std = Math.sqrt(prices.reduce((a, b) => a + (b - avg) ** 2, 0) / prices.length);

                return (
                  <td
                    key={col}
                    style={{
                      backgroundColor: getColor(val),
                      width: 50,
                      height: 50,
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}
                  >
                    <Tooltip
                      title={
                        `Corr: ${val.toFixed(2)}\nAvg: ${avg.toFixed(2)}\nStd: ${std.toFixed(2)}`
                      }
                      arrow
                    >
                      <span>{val.toFixed(2)}</span>
                    </Tooltip>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default CorrelationHeatmap;
