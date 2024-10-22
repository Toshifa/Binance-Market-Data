import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: { closeTime: number; close: number }[];  // Example type for chart data
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  // Memoize the chart data to avoid unnecessary re-renders
  const chartData = useMemo(() => {
    return {
      labels: data.map((candle) => new Date(candle.closeTime).toLocaleTimeString()),
      datasets: [
        {
          label: 'Price',
          data: data.map((candle) => candle.close),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  }, [data]); // Only recalculate chartData when `data` changes

  return <Line data={chartData} />;
};

export default Chart;
