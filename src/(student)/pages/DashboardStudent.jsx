import React, { useState, useEffect } from 'react';
import ProgressStats from '../components/ProgressStats';

export default function StudentPage({ props }) {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            setStudentName(userData.display_name || "Guest");
        } catch (error) {
            console.error("Error parsing Teacher Data:", error);
        }
    } else {
        console.warn("No user data found in localStorage.");
    }
  }, []);

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      {/* Title Page yang ada di atas */}
      <div
        className="my-16 rounded-2xl py-16 px-10"
        style={{ background: 'linear-gradient(to right, #0077B3, #73C2FB)' }}
      >
        {/* Tulisan Dashboard */}
        <span className="relative text-3xl font-bold text-white flex justify-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.15em"
            height="1.15em"
            {...props}
          >
            <path
              fill="currentColor"
              d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z">
            </path>
          </svg>
            Dashboard
        </span>
      </div>
      <div className='bg-primary w-fit px-10 py-2 rounded-xl shadow-2xl'> {/* container welcoming text */}
        <h1 className='text-white'>Welcome again, {studentName}!</h1>
      </div>

      <div className='mt-6 mb-12 gap-10'>
        <ProgressStats />
      </div>
    </div>
  )
}
