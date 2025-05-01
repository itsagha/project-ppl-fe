import { getData } from '@/api/axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function DetailSubjects({ endPointParams }) {
  const { post, classID } = useLocation().state || {};

  const fetchMaterialByClassID = async () => {
    try {
      await getData(endPointParams + `/from-class?id=` + classID);
    } catch (error) {
      console.error("Failed to fetch material detail", error);
    }
    fetchMaterialByClassID();
  }

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      <h1 className='font-bold text-3xl'>{post.title}</h1>
      <div className='rounded-2xl shadow-2xl p-6 my-8 border border-primary'>
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
