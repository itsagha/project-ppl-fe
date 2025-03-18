import React from 'react';
import ClassesCard from '../components/ClassesCard';
import Button from '@/components/Button';

export default function ManageClass({ props }) {
  const endPointClasses = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CLASSES_URL;

  return (
    <div className='ml-[22rem] mr-24 my-16'> {/* Main Container */}
      <div className='flex justify-between mb-2'>
        <h1 className='font-bold text-3xl'>Manage Classes</h1>
        <h1 className='bg-cyan-500 text-white p-2 rounded-lg'>10th Grade</h1>
      </div>
      <h1>Natural Science</h1>
      <ClassesCard endPointParams={endPointClasses} />
      <Button className="text-success border border-success hoverAnimation3 flex items-center gap-2">
        Add Class
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width="1.2em"
          height="1.2em"
          {...props}
        >
          <path
            fill="currentColor"
            d="M230.91 124a8 8 0 0 1-2.91 10.91l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 36 121.09l92 53.65l92-53.65a8 8 0 0 1 10.91 2.91M24 80a8 8 0 0 1 4-6.91l96-56a8 8 0 0 1 8.06 0l96 56a8 8 0 0 1 0 13.82l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 24 80m23.88 0L128 126.74L208.12 80L128 33.26ZM232 192h-16v-16a8 8 0 0 0-16 0v16h-16a8 8 0 0 0 0 16h16v16a8 8 0 0 0 16 0v-16h16a8 8 0 0 0 0-16m-92 23.76l-12 7l-92-53.67a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l16-9.33a8 8 0 1 0-8.06-13.82">
          </path>
        </svg>
      </Button>
    </div>
  )
}
