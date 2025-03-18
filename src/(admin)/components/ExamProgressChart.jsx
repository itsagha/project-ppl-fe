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

const ExamProgressChart = () => {
  const data = {
    labels: ['10th Grade', '11th Grade', '12th Grade'],
    datasets: [
      {
        label: 'Have worked on the exam',
        data: [50, 130, 180],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: "haven't done the exam",
        data: [170, 150, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 0,
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
          text: 'Students Amount',
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
      <h1 className="text-xl font-bold mb-4">Exam Progression</h1>
      <div className="max-w-7xl mx-auto h-[14rem]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExamProgressChart;