import React, { useEffect, useState } from 'react';
import { fetchStocksList, fetchStockHistory } from '../services/api';
import StockChart from '../components/StockChart';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Paper,
  Box,
  ThemeProvider,
  createTheme
} from '@mui/material';

// 🌙 Dark Theme Setup
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

const StockPage = () => {
  const [stocks, setStocks] = useState({});
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [minutes, setMinutes] = useState(60);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    fetchStocksList().then(data => setStocks(data.stocks || {}));
  }, []);

  useEffect(() => {
    if (selectedTicker && minutes) {
      fetchStockHistory(selectedTicker, minutes).then(data => setPriceData(data.prices || []));
    }
  }, [selectedTicker, minutes]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ marginTop: 4 }}>
        <Paper elevation={4} sx={{ padding: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom>
            📊 Stock Price Chart
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <FormControl fullWidth>
              <InputLabel>Select Stock</InputLabel>
              <Select
                value={selectedTicker}
                onChange={(e) => setSelectedTicker(e.target.value)}
                label="Select Stock"
              >
                {Object.entries(stocks).map(([name, symbol]) => (
                  <MenuItem key={symbol} value={symbol}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Last N Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              fullWidth
            />
          </Box>

          {priceData.length > 0 ? (
            <StockChart data={priceData} />
          ) : (
            <Typography color="textSecondary" align="center" mt={4}>
              No data to display. Please select a stock and time range.
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StockPage;
