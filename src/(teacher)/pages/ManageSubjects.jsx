import React from 'react';
import Button from '@/components/Button';
import SimpleDropdown from '@/components/SimpleDropdown';
import { Link } from 'react-router-dom';

export default function ManageSubjects() {
  const subjects = [
    { id: 1, title: 'Judul Materi 1', desc: 'lorem ipsum dolor sit amet' },
    { id: 2, title: 'Judul Materi 2', desc: 'lorem ipsum dolor sit amet' },
    { id: 3, title: 'Judul Materi 3', desc: 'lorem ipsum dolor sit amet' },
    { id: 4, title: 'Judul Materi 4', desc: 'lorem ipsum dolor sit amet' },
    { id: 5, title: 'Judul Materi 5', desc: 'lorem ipsum dolor sit amet' },
    { id: 6, title: 'Judul Materi 6', desc: 'lorem ipsum dolor sit amet' },
  ];

  return (
    <div className='ml-[22rem] mr-24 mt-16'> {/* Main Container */}
      <div className='flex justify-between'> {/* Container title & dropdown */}
        <h1 className='font-bold text-3xl'>Biology</h1>
        <Link to='/CreateSubjects'>
          <Button className="flex justify-center gap-2 items-center text-primary border border-primary hoverAnimation">
            Create Subject
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 7v6m-8 6.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M9 10h6"
              ></path>
            </svg>
          </Button>
        </Link>
      </div>

      {/* Container Classes Card element */}
      <div className='grid grid-cols-3 gap-10 my-8'>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='shadow-2xl rounded-2xl p-6 bg-cyan-500 text-white'
          >
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-bold'>{subject.title}</h2>
              <SimpleDropdown
                fields={[
                  { label: 'Edit Subject' },
                  { label: 'Delete Subject' },
                ]}
              />
            </div>
            <p className='text-justify text-sm min-h-16'>{subject.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
