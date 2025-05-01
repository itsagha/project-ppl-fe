import React, { useState, useEffect } from 'react';
import AvgClassPerformChart from '../components/AvgClassPerformChart';
import SubProgressChart from '../components/SubProgressChart';
import ClassAttendChart from '../components/ClassAttendChart';
import UpcomingExam from '../components/UpcomingExam';
import Quotes from '../components/Quotes';

export default function DashboardTeacher(props) {
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    console.log("Fetched userData from localStorage:", storedUserData);
    
    if (storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            console.log("Parsed userData:", userData);
            setTeacherName(userData.display_name || "Teacher");
            console.log(userData)
        } catch (error) {
            console.error("Error parsing Teacher Data:", error);
        }
    } else {
        console.warn("No user data found in localStorage.");
    }
  }, []);

  return (
    // Main container
    <div className='ml-[22rem] mr-24 my-16'>
      {/* Title Page */}
      <div
        className="my-16 rounded-2xl py-16 px-10"
        style={{ background: 'linear-gradient(to right, #0077B3, #73C2FB)' }}
      >
        {/* overlay warna item */}
        {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}
        {/* tulisan dashboard */}
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
        <h1 className='text-white'>Welcome again, {teacherName}!</h1>
      </div>
      <div className='flex justify-between mt-6 mb-12 gap-10'> {/* Main Container avg class & Submission Progress*/}
        <AvgClassPerformChart />
        <SubProgressChart />
      </div>

      <div className='flex justify-between mt-6 mb-12 gap-10'> {/* Main Container student attendance & upcoming exam*/}
        <ClassAttendChart />
        <Quotes />
        <UpcomingExam />
      </div>
    </div>
  )
}
