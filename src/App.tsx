import React, { useState, useCallback, useEffect } from 'react';
import CryptoSelector from './components/CryptoSelector';
import IntervalSelector from './components/IntervalSelector';
import Chart from './components/Chart';
import { useWebSocket } from './hooks/useWebSocket';
import { ICandle, IChartData } from './types';
import cryptoBackground from './assets/crypto-image/pic3.jpg'

const App: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [chartData, setChartData] = useState<IChartData>({
    ethusdt: [],
    bnbusdt: [],
    dotusdt: []
  });

  // Handle new WebSocket data (new candle data)
  const handleNewCandle = useCallback((data: any) => {
    const candle = {
      open: parseFloat(data.k.o),
      high: parseFloat(data.k.h),
      low: parseFloat(data.k.l),
      close: parseFloat(data.k.c),
      volume: parseFloat(data.k.v),
      closeTime: data.k.T,
    };

    // Update chart data and keep only the last 50 candles
    setChartData((prevData) => ({
      ...prevData,
      [selectedSymbol]: [...prevData[selectedSymbol], candle].slice(-50),
    }));
  }, [selectedSymbol]);

  // Initialize WebSocket connection using the selected symbol and interval
  useWebSocket(selectedSymbol, selectedInterval, handleNewCandle);

  // Optional: Persist chart data in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('chartData');
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chartData', JSON.stringify(chartData));
  }, [chartData]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex flex-col items-center justify-center" style={{ backgroundImage:  `url(${cryptoBackground})` }}>

      <h1 className="text-4xl font-bold mb-8 text-center text-white">Binance Market Data</h1>
      
      <div className="flex space-x-4 mb-6">
        <CryptoSelector selectedSymbol={selectedSymbol} onChange={setSelectedSymbol} />
        <IntervalSelector selectedInterval={selectedInterval} onChange={setSelectedInterval} />
      </div>
      
      <div className="w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
        <Chart data={chartData[selectedSymbol]} />
      </div>
    </div>
  );
};

export default App;
