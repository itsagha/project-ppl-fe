import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '@/components/Dropdown';
import SimpleDropdown from '@/components/SimpleDropdown';

export default function ManageTaskExam({props}) {
  const navigate = useNavigate();

  const createFields = [
    {
      value: 'task',
      label: 'Task',
      onClick: () => navigate('/create-task'),
    },
    {
      value: 'exam',
      label: 'Exam',
      onClick: () => navigate('/create-exam'),
    },
  ];

  const assignments = [
    { id: 1, title: 'Test assignment 1', dueDate: '20 June, 2024' },
    { id: 2, title: 'Test assignment 2', dueDate: '25 June, 2024' },
    { id: 3, title: 'Test assignment 3', dueDate: '30 June, 2024' },
  ];

  return (
    <div className='ml-[22rem] mr-24 mt-16'>
      <div className='flex justify-between items-center'>  {/* Container dropdown create & Link */}
        <div className='flex gap-20 font-semibold'>
          <Link to="#" className='underline-hover'>Stream</Link>
          <Link to="#" className='underline-hover'>Classwork</Link>
          <Link to="#" className='underline-hover'>People</Link>
        </div>
        <Dropdown
          fields={createFields}
          buttonContent="Create"
          className="gap-2"
        />
      </div>

      {/* Banner */}
      <div
        className=" my-10 rounded-2xl w-full aspect-[6.1/1]"
        style={{
          backgroundImage: 'url(Banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* container */}
      <div className='flex justify-between gap-8'>
        {/* upcoming task & exam */}
        <div className='p-6 rounded-2xl shadow-2xl max-h-40 min-w-xs border border-indigo-500'>
          <h3 className='font-semibold mb-2'>Upcoming Task & Exams</h3>
          <ul className='text-sm'>
            <li>Task 1</li>
            <li>Task 2</li>
          </ul>
        </div>

        {/* Assignment */}
        <div className='flex flex-col w-full gap-8'>
          {assignments.map((assignment) => (
            <div key={assignment.id} className='flex justify-start w-full rounded-2xl shadow-xl p-6 border border-indigo-500'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="2.5em"
                height="2.5em"
                {...props}
              >
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M10 11h8m-8 3h4m-4-6h8m2 14H8.4C5.42 22 3 19.58 3 16.6V5m5.4-2h11.2A2.4 2.4 0 0 1 22 5.4v11.2a2.4 2.4 0 0 1-2.4 2.4H8.4A2.4 2.4 0 0 1 6 16.6V5.4A2.4 2.4 0 0 1 8.4 3"></path>
              </svg>
              <div className='flex flex-col ml-4 w-full'>
                <div className='flex justify-between items-start'>
                  <h3 className='font-semibold'>You've posted a new assignment: {assignment.title}</h3>
                  <SimpleDropdown
                    fields={[
                      { label: 'Edit' },
                      { label: 'Delete' },
                    ]}
                  />
                </div>
                <p className='text-sm text-gray-500'>Due: {assignment.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}