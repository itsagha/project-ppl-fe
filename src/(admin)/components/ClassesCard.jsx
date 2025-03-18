import React, { useEffect, useState } from 'react';
import { getData } from '@/api/axios';

export default function ClassesCard({ endPointParams, ...props }) {
  const endPointTeachers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_TEACHER_URL;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]= useState(1);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(endPointParams, currentPage);
        setPosts(response.classes || []);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Failed to Get Classes Data", error);
        alert("Failed to Get Classes Data");
      }
    };
    fetchData();
  }, [currentPage, endPointParams]);  

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getData(endPointTeachers);
      setTeachers(response.students);
    };
    fetchTeachers();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-20 gap-y-10 my-8">
        {posts.map((post) => (
          <div key={post.id} className="shadow-2xl rounded-2xl p-6 border border-secondary flex flex-col gap-2 transition-transform transform hover:scale-105 duration-500">
            <h2 className="text-lg font-bold">{post.name}</h2>
            <p className='text-justify text-sm'>{post.description}</p>
            <div className='flex justify-between'>
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="1em"
                  height="1em"
                  {...props}
                >
                  <path
                    fill="currentColor"
                    d="M16 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0m13.5-1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M22 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m-17 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0M6.5 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m2.151 20.505A3 3 0 0 1 4 22v-6.5a.5.5 0 0 1 .5-.5h4.031a4 4 0 0 1 .846-2H4.5A2.5 2.5 0 0 0 2 15.5V22a5 5 0 0 0 7.327 4.427a7.5 7.5 0 0 1-.676-1.922m14.022 1.922A5 5 0 0 0 30 22v-6.5a2.5 2.5 0 0 0-2.5-2.5h-4.877a4 4 0 0 1 .846 2H27.5a.5.5 0 0 1 .5.5V22a3 3 0 0 1-4.651 2.505a7.5 7.5 0 0 1-.676 1.922M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5zm-.5 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V23a4 4 0 0 1-8 0z">
                  </path>
                </svg>
                  20
              </div>
              {post.teacher_name}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Button container */}      
      <div className="flex gap-2 mt-8 justify-center items-center">
        {/* Tombol Previous */}      
        <button
          className="p-2 cursor-pointer flex items-center justify-center rounded-full border border-gray-600 bg-white disabled:opacity-50 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
          >
            <path
              fill="currentColor"
              d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42">
            </path>
          </svg>
        </button>
    
        {/* Logic nampilin halaman */}
        {totalPages > 5 && currentPage > 3 && (
          <button
            className="py-2 px-3.5 text-xs flex items-center justify-center rounded-full border border-gray-600 bg-white "
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        )}
        {totalPages > 5 && currentPage > 3 && <span className="text-gray-600">...</span>}
    
        {Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((page) => {
          if (totalPages <= 5) return true; // Kalo halaman ≤ 5, nampilin semua
          if (currentPage <= 3) return page <= 5; // kalo di halaman awal, nampilin 1-5
          if (currentPage >= totalPages - 2) return page >= totalPages - 4; // kalo di akhir, nampilin 5 terakhir
          return Math.abs(currentPage - page) <= 2; // nampilin halaman sekitar halaman aktif
        })
        .map((page) => (
          <button
            key={page}
            className={`py-2 px-3.5 text-xs cursor-pointer flex items-center justify-center rounded-full border border-gray-600 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500 ${
              currentPage === page ? "bg-sky-500 text-white border-sky-500" : "bg-white"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
  
        {totalPages > 5 && currentPage < totalPages - 2 && <span className="text-gray-600">...</span>}
  
        {totalPages > 5 && currentPage < totalPages - 2 && (
        <button
          className="py-2 px-3.5 text-xs flex items-center justify-center rounded-full border border-gray-600 bg-white"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
          </button>
        )}
  
        {/* Tombol Next */}
        <button
          className="p-2 cursor-pointer flex items-center justify-center rounded-full border border-gray-600 bg-white disabled:opacity-50 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
          >
            <path
              fill="currentColor"
              d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42">
            </path>
          </svg>
        </button>
      </div>
    </>
  )
}