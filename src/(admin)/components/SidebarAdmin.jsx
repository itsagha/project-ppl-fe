import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function SidebarAdmin(props) {
  const [showDropdownClass, setShowDropdownClass] = useState(false);
  const [showDropdownAccount, setShowDropdownAccount] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Anda Telah Logout");
    navigate("/");
  }

  const toggleDropdownClass = () => {
    setShowDropdownClass(!showDropdownClass);
  };

  const toggleDropdownAccount = () => {
    setShowDropdownAccount(!showDropdownAccount);
  }

  return (
    // Main Container sidebar
    <div className='fixed top-0 left-0 h-screen shadow-2xl text-black bg-white p-6 flex flex-col justify-between overflow-y-auto'>
      {/* Welcoming text */}
      <div className='flex justify-start gap-2 my-10'>
        <img src="/logoLg.png" alt="" className='w-7'/>
        <h1 className='text-xl font-bold'>Learnify - Admin</h1>
      </div>
      {/* garis item */}
      <div className='h-0.5 w-full bg-primary rounded-full mb-10'></div>

      <ul className='flex-grow'>
        {/* button dashboard admin */}
        <li className={`px-2 py-1.5 duration-500 ease-in-out mb-2 rounded-lg ${location.pathname === '/DashboardAdmin' ? 'text-white bg-primary rounded-lg' : ''}`}>
          <Link to="/DashboardAdmin" className='flex items-center'>
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

        {/* button dropdown manage class */}
        <li className='cursor-pointer mb-2 max-w-fit'>
          <div className='px-2 py-1.5 flex items-center justify-start' onClick={toggleDropdownClass}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <path
                fill="currentColor"
                d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72L5.18 9L12 5.28zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73z">
              </path>
            </svg>
            <span className='mx-2'>Manage Class</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className={`transform duration-300 ${showDropdownClass ? "rotate-180" : ""}`}
            >
              <path
                fill="currentColor"
                d="M12 15.172l4.95-4.95a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 1.414-1.414z"
              />
            </svg>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDropdownClass ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className='ml-6 mt-2 text-gray-700 max-w-fit'>
              <span className='font-normal'>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/ManageClass10' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/ManageClass10">10th Grade</Link>
                </li>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/ManageClass11' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/ManageClass11">11th Grade</Link>
                </li>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/ManageClass12' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/ManageClass12">12th Grade</Link>
                </li>
              </span>
            </ul>
          </div>
        </li>


        {/* button dropdown manage account */}
        <li className='cursor-pointer max-w-fit mb-2'>
          <div className='px-2 py-1.5 flex items-center justify-start' onClick={toggleDropdownAccount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              {...props}
            >
              <path
                fill="currentColor"
                d="M8.737 5.15a2.643 2.643 0 1 0 .111 3.881A3.75 3.75 0 0 0 12 10.751a3.75 3.75 0 0 0 3.152-1.718a2.643 2.643 0 1 0 .111-3.881A3.75 3.75 0 0 0 12 3.25a3.75 3.75 0 0 0-3.263 1.9M9.75 7a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0m-1.412-.81a3.76 3.76 0 0 0 .052 1.829a1.642 1.642 0 0 1-3.033-.876a1.643 1.643 0 0 1 2.98-.954m7.272 1.829a3.75 3.75 0 0 0 .052-1.83a1.643 1.643 0 1 1-.052 1.83M4.951 10.297c.347-.092.675.022.901.186c.09.065.214.145.365.218a.5.5 0 0 1-.435.9a3.4 3.4 0 0 1-.517-.308a.2.2 0 0 0-.053-.027l-.007-.001a7 7 0 0 0-.401.12l-.686.224a1.63 1.63 0 0 0-1.066 1.114l-.283 2.049c-.056.403.157.705.46.777q.335.082.813.16a.5.5 0 1 1-.16.988a12 12 0 0 1-.884-.175c-.895-.213-1.333-1.07-1.22-1.887l.292-2.106l.006-.027a2.62 2.62 0 0 1 1.73-1.843l.685-.225q.23-.075.46-.137m14.229 0a1.07 1.07 0 0 0-.9.186c-.09.065-.214.145-.365.218a.5.5 0 0 0 .435.9a3.4 3.4 0 0 0 .517-.308a.2.2 0 0 1 .053-.027l.007-.001q.203.053.401.12l.686.224c.526.173.925.594 1.066 1.114l.283 2.049c.056.403-.156.705-.46.777a11 11 0 0 1-.813.16a.5.5 0 1 0 .16.988q.512-.085.884-.175c.895-.213 1.333-1.07 1.22-1.887l-.292-2.106l-.006-.027a2.62 2.62 0 0 0-1.73-1.843l-.685-.225a9 9 0 0 0-.46-.137"
              ></path>
              <path
                fill="currentColor"
                d="M13.653 11.712c.396-.263.973-.47 1.583-.297q.24.067.477.145l.959.315a3.72 3.72 0 0 1 2.454 2.616l.01.04l.409 2.95c.161 1.164-.463 2.393-1.744 2.698c-1.17.279-3.053.571-5.8.571c-2.75 0-4.631-.292-5.802-.57c-1.281-.306-1.905-1.535-1.744-2.698l.408-2.95l.01-.04a3.72 3.72 0 0 1 2.455-2.617l.96-.315q.237-.077.476-.146c.61-.172 1.188.035 1.583.298c.36.238.942.524 1.653.524s1.294-.286 1.653-.524m1.175 1.146c-.048-.014-.171-.012-.345.103c-.502.333-1.373.775-2.483.775s-1.981-.442-2.482-.775c-.175-.115-.298-.117-.346-.103q-.21.06-.416.127l-.96.315a2.23 2.23 0 0 0-1.459 1.523l-.396 2.864c-.075.544.21.939.606 1.033c1.047.25 2.811.53 5.453.53s4.407-.28 5.453-.53c.396-.094.681-.489.606-1.033l-.396-2.864a2.23 2.23 0 0 0-1.46-1.523l-.958-.315a10 10 0 0 0-.417-.127">
              </path>
            </svg>
            <span className='mx-2'>Manage Account</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className={`transform duration-300 ${showDropdownAccount ? "rotate-180" : ""}`}
            >
              <path
                fill="currentColor"
                d="M12 15.172l4.95-4.95a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 1.414-1.414z"
              />
            </svg>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDropdownAccount ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className='ml-6 mt-2 text-gray-700 max-w-fit'>
              <span className='font-normal'>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/ManageAccStudent' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/ManageAccStudent">Student Accounts</Link>
                </li>
                <li className={`px-2 py-1 duration-500 ease-in-out mb-0.5 rounded-lg ${location.pathname === '/ManageAccTeacher' ? 'text-white bg-primary rounded-lg' : ''}`}>
                  <Link to="/ManageAccTeacher">Teacher Accounts</Link>
                </li>
              </span>
            </ul>
          </div>
        </li>
      </ul>

      {/* button Logout */}
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
  );
}