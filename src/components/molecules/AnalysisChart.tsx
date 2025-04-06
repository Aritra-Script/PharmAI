import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function AnalysisChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  const data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [400, 300, 600, 200, 700],
        borderColor: 'rgb(37, 99, 235)', // Tailwind blue-600
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
