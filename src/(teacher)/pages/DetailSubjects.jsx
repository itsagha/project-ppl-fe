import React from 'react';
import Button from '@/components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DetailSubjects() {
  const navigate = useNavigate();
  const { post, classID, teacherID } = useLocation().state || {};

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-3xl'>{post.title}</h1>
        <div className='flex justify-end gap-2'>
          <Button
            className="text-primary border border-primary hoverAnimation"
            onClick={() => navigate('/PreviewExercise', { state: {post} })}
          >
            Preview, edit, or delete the exercise from this subject
          </Button>
          <Button 
            className="text-success border border-success hoverAnimation3"
            onClick={() => navigate('/CreateExercise', { state: {post, teacherID} })}
          >
            Create an exercise for this subject
          </Button>
        </div>
      </div>
      <div className='rounded-2xl shadow-2xl p-6 my-8 border border-primary'>
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}