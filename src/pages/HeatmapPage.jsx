import React, { useEffect, useState } from 'react';
import { fetchStocksList, fetchStockHistory } from '../services/api';
import CorrelationHeatmap from '../components/CorrelationHeatmap';
import { Container, Typography, TextField } from '@mui/material';

const HeatmapPage = () => {
  const [stocks, setStocks] = useState({});
  const [minutes, setMinutes] = useState(60);
  const [pricesMap, setPricesMap] = useState({});

  useEffect(() => {
    fetchStocksList().then(data => setStocks(data.stocks));
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const newMap = {};
      for (const [name, symbol] of Object.entries(stocks)) {
        const res = await fetchStockHistory(symbol, minutes);
        if (res.prices?.length) {
          newMap[symbol] = res.prices.map(p => p.price);
        }
      }
      setPricesMap(newMap);
    };

    if (Object.keys(stocks).length) fetchAll();
  }, [stocks, minutes]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Stock Correlation Heatmap</Typography>

      <TextField
        label="Last N Minutes"
        type="number"
        fullWidth
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <CorrelationHeatmap
        data={pricesMap}
        symbols={Object.entries(stocks).reduce((acc, [name, sym]) => ({ ...acc, [sym]: name }), {})}
      />
    </Container>
  );
};

export default HeatmapPage;
