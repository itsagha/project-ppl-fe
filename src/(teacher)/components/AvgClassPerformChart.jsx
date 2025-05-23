import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AvgClassPerformance = () => {
  const data = {
    labels: ['10th Grade', '11th Grade', '12th Grade'],
    datasets: [
      {
        label: 'Classes Performance',
        data: [22, 78, 59], // tugas terkumpul, berurut dari kls 10 ke 12
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Classes',
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  };

  return (
    <div className='rounded-2xl shadow-2xl p-10 w-full'>
      <h1 className="text-xl font-bold mb-4">Average Classes Performance</h1>
      <div className="max-w-7xl mx-auto h-[18rem]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AvgClassPerformance;