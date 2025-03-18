import React from 'react';
import Button from '@/components/Button';

export default function UpcomingExam({ isUpcomingExam=true }) {

  const examData = [
    { name: 'Biology', class: '12th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '12th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '10th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '11th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '10th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '11th Grade', date: '1PM-3PM, May 12th 2025' },
    { name: 'Biology', class: '11th Grade', date: '1PM-3PM, May 12th 2025' }
  ];

  if (isUpcomingExam) {
    return (
      <div className="w-full p-10 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
        <div className="mx-auto max-h-[26rem] overflow-y-auto pr-2 scrollbar-thin">
          <ul>
            {examData.map((subject, index) => (
              <li key={index} className="mb-2 py-2 border-b border-gray-300">
                <div className='flex justify-between'>
                  <p className="font-semibold">{subject.name}</p>
                  <p className="text-sm text-gray-500">{subject.date}</p>
                </div>
                <p className="text-sm text-gray-600 text-ellipsis max-w-72">{subject.class}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className='w-2/5 p-10 rounded-2xl shadow-2xl flex justify-center items-center'>
        <h1 className='text-gray-400'>There's no upcoming exam.</h1>
      </div>
    )
  }
}
