import { getData } from '@/api/axios';
import React, { useEffect, useState } from 'react';
import PaginationButton from '@/components/PaginationButton';
import { useNavigate } from 'react-router-dom';

export default function MyClasses({ endPointParams, props }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentID, setStudentID] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // dapetin student id
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setStudentID(userData.student_id);
      } catch (error) {
        console.error("error Parsing user data", error);
      }
    }
  }, []);

  // Fetch kelas
  useEffect(() => {
    const fetchData = async () => {
      if (!studentID) return;
  
      try {
        const response = await getData(`${endPointParams}/assigned?id=${studentID}`);
        setPosts(response.classes || []);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [studentID, currentPage,endPointParams]);
   
  if (loading) return <p className='text-gray-400 ml-[22rem] mr-24 my-16'>Loading...</p>;

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      <h1 className='font-bold text-3xl'>My Classes</h1>
      {/* parent container classes cards element */}
      <div className='grid grid-cols-3 gap-10 my-8'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='shadow-2xl rounded-2xl p-6 bg-cyan-500 text-white transition duration-500 hover:scale-103 cursor-pointer'
            onClick={() => navigate(`/MyDetailClasses/${post.id}`, { state: { className: post.name } })}
          >
            <h2 className='text-lg font-bold'>{post.name}</h2>
            <p className='text-justify text-sm  h-16'>{post.description}</p>
            <div className='flex justify-start items-center gap-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="1.4em"
                height="1.4em"
                {...props}
              >
                <path fill="currentColor" d="M56 84a12 12 0 0 1 12-12h120a12 12 0 0 1 12 12v88a12 12 0 0 1-24 0V96H68a12 12 0 0 1-12-12m180-28v144a20 20 0 0 1-20 20h-66.74a12 12 0 0 1-11.4-8.26a36 36 0 0 0-67.74 0A12 12 0 0 1 58.74 220H40a20 20 0 0 1-20-20V56a20 20 0 0 1 20-20h176a20 20 0 0 1 20 20M104 164a16 16 0 1 0-16-16a16 16 0 0 0 16 16M212 60H44v136h6.92a60.2 60.2 0 0 1 21.76-23.16a40 40 0 1 1 62.64 0A60.2 60.2 0 0 1 157.08 196H212Z"></path>
              </svg>
              <h3 className='text-justify text-sm'>{post.teacher_name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination button */}
      <PaginationButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}
