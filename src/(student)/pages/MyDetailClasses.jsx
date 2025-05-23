import { getData } from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import PaginationButton from '@/components/PaginationButton';

export default function MyDetailClasses({ endPointParams, props }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { className } = location.state || {}; //ambil className dari state yg udah dikirim MyClasses

  // Fetch Materials
  useEffect(() => {
    const fetchMaterials = async () => {
      if (!id) return;

      try {
        const response = await getData(`${endPointParams}/from-class?id=${id}`);
        setPosts(response.materials || []);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Error fetching materials", error);
        setError("Error fetching materials");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [id, currentPage, endPointParams]);

  if (loading) return <p className='text-gray-400 ml-[22rem] mr-24 my-16'>Loading...</p>;
  if (error) return <p className="text-red-500 ml-[22rem] mr-24 my-16">{error}</p>;

  return (
    // Parent Container
    <div className='ml-[22rem] mr-24 my-16'>
      <h1 className='font-bold text-3xl flex justify-start gap-2 items-center'>
        My Classes 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          {...props}
        >
          <path
            fill="currentColor"
            d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42"
          ></path>
        </svg> 
        {className}
      </h1>

      {/* material cards element parent container */}
      <div className='grid grid-cols-3 gap-10 my-8'>
        {posts.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center pt-72 text-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="8em"
              height="8em"
              className="mb-4"
              {...props}
            >
              <g fill="none" fillRule="evenodd">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="currentColor"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 9c1.267 0 2.427.473 3.308 1.25a1 1 0 1 1-1.324 1.5A3 3 0 0 0 12 15c-.761 0-1.455.282-1.984.75a1 1 0 1 1-1.323-1.5A5 5 0 0 1 12 13M8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                ></path>
              </g>
            </svg>
            <p>Oops! It seems your teacher hasn't uploaded the materials or subjects.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className='shadow-2xl rounded-2xl p-6 bg-cyan-500 text-white transition duration-500 hover:scale-103 cursor-pointer'
              onClick={() => navigate(`/MyDetailSubject/${post.id}`, { state: { post, classID: post.class_id } })}
            >
              <h2 className='text-lg font-bold'>{post.title}</h2>
              <p className='text-justify text-sm h-16'>{post.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Button */}
      {posts.length > 0 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  )
}
