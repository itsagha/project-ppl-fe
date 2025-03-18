import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SidebarTeacher({ ...props }) {
  const [teacherName, setTeacherName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    console.log("Fetched userData from localStorage:", storedUserData);
    
    if (storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            console.log("Parsed userData:", userData);
            setTeacherName(userData.display_name || "Guest");
        } catch (error) {
            console.error("Error parsing userData:", error);
        }
    } else {
        console.warn("No user data found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Anda Telah Logout");
    navigate('/');
  }

  return (
    // Main container sidebar
    <div className='fixed top-0 left-0 h-screen shadow-2xl text-black bg-white p-6 flex flex-col justify-between overflow-y-auto'>
      {/* Welcoming Text */}
      <div className='flex justify-start text-xl font-bold gap-2 my-10'>
        <img src="logoLg.png" alt="" className='w-7'/>
        Learnify - Teacher
      </div>
      {/* Garis item */}
      <p className='h-0.5 w-full bg-primary rounded-xl mb-10'></p>

      <ul className='flex-grow'>
        {/* button dashboard teacher */}
        <li className='duration-500 ease-in-out hover:text-primary font-bold mb-4'>
          <Link to="/DashboardTeacher" className='flex items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <path
                fill="currentColor"
                d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z">
              </path>
            </svg>
            <span className='ml-2'>Dashboard</span>
          </Link>
        </li>

        {/* Button manage subjects */}
        <li className='duration-500 ease-in-out hover:text-primary font-bold mb-4'>
          <Link to="/ManageSubjects" className='flex items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              width="1em"
              height="1em"
              {...props}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.5 13.54H3a1.5 1.5 0 0 1 0-3h8.5a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H3A1.5 1.5 0 0 0 1.5 2v10m10-1.46v3">
              </path>
            </svg>
            <span className='ml-2'>Manage Subjects</span>
          </Link>
        </li>

        {/* Button manage task & exam */}
        <li className='duration-500 ease-in-out hover:text-primary font-bold mb-4'>
          <Link to="/ManageTasksExam" className='flex items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M10 11h8m-8 3h4m-4-6h8m2 14H8.4C5.42 22 3 19.58 3 16.6V5m5.4-2h11.2A2.4 2.4 0 0 1 22 5.4v11.2a2.4 2.4 0 0 1-2.4 2.4H8.4A2.4 2.4 0 0 1 6 16.6V5.4A2.4 2.4 0 0 1 8.4 3">
              </path>
            </svg>
            <span className='ml-2'>Manage Tasks & Exams</span>
          </Link>
        </li>
      </ul>

      {/* Button Logout */}
      <div 
        className='flex items-center justify-start gap-2 duration-500 ease-in-out hover:text-danger font-bold max-w-fit mb-20 cursor-pointer' 
        onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          {...props}
        >
          <g className="logout-outline">
            <g
              fill="currentColor"
              fillRule="evenodd"
              className="Vector"
              clipRule="evenodd"
            >
              <path d="M3 7a5 5 0 0 1 5-5h5a1 1 0 1 1 0 2H8a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h5a1 1 0 1 1 0 2H8a5 5 0 0 1-5-5z"></path>
              <path d="M14.47 7.316a1 1 0 0 1 1.414-.046l4.8 4.5a1 1 0 0 1 0 1.46l-4.8 4.5a1 1 0 1 1-1.368-1.46l2.955-2.77H8a1 1 0 1 1 0-2h9.471l-2.955-2.77a1 1 0 0 1-.046-1.414"></path>
            </g>
          </g>
        </svg>
        <button className='cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}
