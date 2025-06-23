import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function SidebarStudent({props}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdownAssignment, setShowDropdownAssignment] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Succesfully logout");
    navigate('/');  
  }

  const toggleDropdownAssigment = () => {
    setShowDropdownAssignment(!showDropdownAssignment);
  }

  return (
    <div className='fixed top-0 left-0 h-screen shadow-2xl text-black bg-white p-6 flex flex-col justify-between overflow-y-auto'>
      {/* Welcoming text */}
      <div className='flex justify-start text-xl font-bold gap-2 my-10'>
        <img src="/logoLg.png" alt="Logo" className='w-7'/>
        Learnify - Student
      </div>
      {/* garis biru */}
      <p className='h-0.5 w-full bg-primary rounded-xl mb-10'></p>

      <ul className='flex-grow'>
        {/* button dashboard teacher */}
        <li className={`px-2 py-1.5 duration-500 ease-in-out mb-4 rounded-lg ${location.pathname === '/DashboardStudent' ? 'text-white bg-primary rounded-lg' : ''}`}>
          <Link to="/DashboardStudent" className='flex items-center'>
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

        {/* Button my subjects */}
        <li className={`px-2 py-1.5 duration-500 ease-in-out mb-4 rounded-lg ${location.pathname === '/MyClasses' || location.pathname === '/MyDetailClasses' ? 'text-white bg-primary rounded-lg' : ''}`}>
          <Link to="/MyClasses" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M2 16V4a2 2 0 0 1 2-2h11"></path><path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12m-4-6H4a2 2 0 1 0 0 4h1"></path>
              </g>
            </svg>
            <span className='ml-2'>Classes</span>
          </Link>
        </li>

        {/* Button my task & exam */}
        <li className='cursor-pointer max-w-fit mb-2'>
          <div className='px-2 py-1.5 flex items-center justify-start' onClick={toggleDropdownAssigment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <g fill="none" fillRule="evenodd">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="currentColor"
                  d="M12 4a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2M9.354 3c.705-.622 1.632-1 2.646-1s1.94.378 2.646 1H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.126 5H6v15h12V5h-2.126q.124.481.126 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6q.002-.519.126-1M8 11a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1">
                </path>
              </g>
            </svg>
            <span className='mx-2'>Tasks & Exams</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className={`transform duration-300 ${showDropdownAssignment ? "rotate-180" : ""}`}
            >
              <path
                fill="currentColor"
                d="M12 15.172l4.95-4.95a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 1.414-1.414z"
              />
            </svg>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDropdownAssignment ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className='ml-6 mt-2 text-gray-700 max-w-fit'>
              <span className='font-normal'>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/MyClassesTask' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/MyClassesTask">Tasks</Link>
                </li>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/MyClassesExam' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/MyClassesExam">Exams</Link>
                </li>
              </span>
            </ul>
          </div>
        </li>

        {/* Button Group discussion */}
        <li className={`px-2 py-1.5 duration-500 ease-in-out mb-4 rounded-lg ${location.pathname === '/GroupDiscussions' ? 'text-white bg-primary rounded-lg' : ''}`}>
          <Link to="/GroupDiscussions" className='flex items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <g className="chatbubbles-outline">
                <g
                  fill="currentColor"
                  fillRule="evenodd"
                  className="Vector"
                  clipRule="evenodd"
                >
                  <path d="M16.094 15.581a.8.8 0 0 0-.529-.022a6.4 6.4 0 0 1-2.039.248c-3.289-.131-5.857-2.71-5.736-5.76s2.886-5.417 6.175-5.287c3.29.13 5.857 2.71 5.736 5.76c-.022.566-.375 1.441-.685 2.115a1.97 1.97 0 0 0-.149 1.225l.439 2.093a.562.562 0 0 1-.763.634zM5.792 9.967c-.17 4.294 3.407 7.67 7.655 7.838a8.4 8.4 0 0 0 2.268-.218l2.068.85c1.901.782 3.902-.883 3.48-2.895l-.433-2.066l.002-.004c.17-.368.364-.82.524-1.28c.146-.42.32-1.006.344-1.593c.17-4.293-3.407-7.668-7.656-7.837S5.962 5.674 5.792 9.967"></path>
                  <path d="M5.395 13.053a1 1 0 0 1-.448 1.341c-.177.089-.398.334-.573.802a3.6 3.6 0 0 0-.22 1.318c.002.047.027.184.107.42c.074.216.172.452.27.668c.196.435.268.936.167 1.435l-.062.302l.543-.228a1.55 1.55 0 0 1 1.044-.052c.322.096.67.142 1.033.128a3.08 3.08 0 0 0 2.192-1.02a1 1 0 1 1 1.498 1.325a5.08 5.08 0 0 1-3.611 1.693a5.2 5.2 0 0 1-1.532-.167l-1.465.616c-1.026.43-2.117-.464-1.894-1.555l.294-1.442a.35.35 0 0 0-.03-.212a10 10 0 0 1-.34-.846c-.096-.28-.199-.641-.212-.985a5.6 5.6 0 0 1 .345-2.1c.258-.687.729-1.477 1.552-1.889a1 1 0 0 1 1.342.448"></path>
                </g>
              </g>
            </svg>
            <span className='ml-2'>Group Discussions</span>
          </Link>
        </li>
      </ul>

      {/* Button Logout */}
      <div 
        className='flex items-center justify-start gap-2 duration-500 ease-in-out hover:text-danger max-w-fit mb-20 cursor-pointer' 
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
