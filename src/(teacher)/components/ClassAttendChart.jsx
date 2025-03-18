import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const attendanceData = {
  10: { present: 80, absent: 20 },
  11: { present: 75, absent: 25 },
  12: { present: 64, absent: 36 },
};

export default function ClassAttendChart() {
  const [selectedClass, setSelectedClass] = useState(10);

  const data = {
    labels: ["Attended", "Absent"],
    datasets: [
      {
        data: [
          attendanceData[selectedClass].present,
          attendanceData[selectedClass].absent,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#2586c7", "#d94b6b"],
      },
    ],
  };

  const options = {
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }

  return (
    <div className="rounded-2xl shadow-2xl p-10 w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">
        Students Attendance Today
      </h1>
      <Doughnut data={data} options={options} />
      <div className="mt-4 flex justify-center gap-3">
        {[10, 11, 12].map((grade) => (
          <button
            key={grade}
            className={`px-4 py-2 rounded-lg text-primary cursor-pointer border border-primary hoverAnimation ${
              selectedClass === grade
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            onClick={() => setSelectedClass(grade)}
          >
            {grade}th Grade
          </button>
        ))}
      </div>
    </div>
  );
}