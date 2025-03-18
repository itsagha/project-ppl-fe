import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SubmissionProgress() {
  const data = {
    labels: ["February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "10th Grade",
        data: [43, 49, 55, 37, 85, 90],
        borderColor: "oklch(0.606 0.25 292.717)",
        backgroundColor: "oklch(0.811 0.111 293.571)",
        tension: 0.4,
      },
      {
        label: "11th Grade",
        data: [89, 76, 36, 29, 44, 67],
        borderColor: "oklch(0.715 0.143 215.221)",
        backgroundColor: "oklch(0.865 0.127 207.078)",
        tension: 0.4,
      },
      {
        label: "12th Grade",
        data: [30, 25, 81, 60, 75, 39],
        borderColor: "oklch(0.623 0.214 259.815)",
        backgroundColor: "oklch(0.809 0.105 251.813)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
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
      <h1 className="text-xl font-bold mb-4">Submission Progress</h1>
      <div className="max-w-7xl mx-auto h-[18rem]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
