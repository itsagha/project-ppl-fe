import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import Button from '@/components/Button';
import { updateData } from '@/api/axios';

export default function EditSubjects({ endPointParams }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({ title: '', description: '', content: '', });
  const { post, teacherID, classID } = location.state || {};

  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (post) {
      setEditData({
        title: post.title,
        description: post.description,
        content: post.content,
      });
      setEditorContent(post.content || '');
    }
  }, [post]);

  const handleSubmit = async () => {
    if (!editData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!editData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!editorContent.trim()) {
      setError("Content is required.");
      return;
    }

    const payload = {
      title: editData.title,
      description: editData.description,
      content: editorContent,
      teacher_id: teacherID,
      class_id: classID,
    };
    try {
      await updateData(endPointParams + `?id=${post.id}`, payload);
      alert("Successfully updated your subject!");
      navigate(-1);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <div className='ml-[22rem] mr-24 mt-16'>
      <h1 className='font-bold text-3xl mb-2'>Edit Subject</h1>
      {error && <div className="text-danger mb-4 underline">{error}</div>} {/* Error message */}
      <div className='flex justify-between gap-4 mb-4'>
        <div className='p-6 shadow-xl rounded-2xl w-full'>
          <h3 className='text-lg font-semibold mb-2'>Subject Title</h3>
          <input
            className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        </div>

        <div className='p-6 shadow-xl rounded-2xl w-full'>
          <h3 className='text-lg font-semibold mb-2'>Short Subject Description</h3>
          <input
            className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className='p-6 shadow-xl rounded-2xl mb-10'>
        <h3 className='text-lg font-semibold mb-2'>Subject Content</h3>
        {editData.content && (
          <TextEditor
            defaultValue={editData.content}
            onChange={(html) => setEditorContent(html)}
          />
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className='border border-success text-success hoverAnimation3 mb-8'
      >
        Save Changes
      </Button>
    </div>
  );
}