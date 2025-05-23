import React from 'react'

export default function ProgressStats({ props }) {
  return (
    <div className='rounded-xl shadow-2xl p-10 w-full'>
      <h2 className='font-bold text-xl mb-4'>Progress Status</h2>
      <div className='flex justify-between gap-10'>
        {/* Subject Progress */}
        <div className='bg-sky-500 p-4 rounded-xl text-white w-full'>
          <div className='flex justify-start gap-2 items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2.5em"
              height="2.5em"
              {...props}
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M12 21V7m4 5l2 2l4-4"></path>
                <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4a4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3a3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"></path>
              </g>
            </svg>
            <div className='flex flex-col'>
              <p className='font-bold'>4 Subjects completed</p>
              <p>out of 23</p>
            </div>
          </div>
        </div>

        {/* Task Progress */}
        <div className='bg-blue-500 p-4 rounded-xl text-white w-full'>
          <div className='flex justify-start gap-2 items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2.5em"
              height="2.5em"
              {...props}
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="m18 5l-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"></path>
                <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506zM8 18h1"></path>
              </g>
            </svg>
            <div className='flex flex-col'>
              <p className='font-bold'>8 Tasks completed</p>
              <p>out of 10</p>
            </div>
          </div>
        </div>

        {/* Exam Progress */}
        <div className='bg-indigo-500 p-4 rounded-xl text-white w-full'>
          <div className='flex justify-start gap-2 items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2.5em"
              height="2.5em"
              {...props}
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <rect width="8" height="4" x="8" y="2" rx="1"></rect>
                <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5M16 4h2a2 2 0 0 1 1.73 1M8 18h1"></path>
                <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
              </g>
            </svg>
            <div className='flex flex-col'>
              <p className='font-bold'>2 Exams completed</p>
              <p>out of 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
