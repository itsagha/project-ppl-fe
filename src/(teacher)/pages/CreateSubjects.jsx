import React, { useState, useEffect } from 'react';
import TextEditor from '../components/TextEditor';
import Button from '@/components/Button';
import { getData, postData } from '@/api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateSubjects({ endPointParams, grade }) {
  const endPointClasses = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CLASSES_URL;
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState('');
  const [newSubject, setNewSubject] = useState({ title: "", description: "" });
  const [teacherID, setTeacherID] = useState("");
  const [classID, setClassID] = useState("");
  const [error, setError] = useState("");

  // dapetin teacher id
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setTeacherID(userData.teacher_id);
      } catch (error) {
        console.error("Error Parsing userData", error);
      }
    }
  }, []);

  // fetch class id
  useEffect(() => {
    if (!grade || !teacherID) return;
    const fetchClassID = async () => {
      try {
        const response = await getData(`${endPointClasses}/class-id?grade=${grade}&teacher_id=${teacherID}`);
        const class_id = response?.class_id;
        if (class_id) {
          setClassID(class_id);
        } else {
          console.warn("Class ID not found");
        }
      } catch (error) {
        console.error("Failed to fetch Class ID");
      }
    };
    fetchClassID();
  }, [teacherID, grade]);

  // handling submit prevent datanya kosong
  const handleSubmit = async () => {
    if (!newSubject.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!newSubject.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!editorContent.trim()) {
      setError("Content is required.");
      return;
    }

    const payload = {
      ...newSubject,
      content: editorContent,
      teacher_id: teacherID,
      class_id: classID,
    };

    try {
      await postData(endPointParams, payload);
      alert("Successfully added a new subject!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to Add New Subject", error);
    }
  };

  return (
    <div className='ml-[22rem] mr-24 mt-16'>
      <h1 className='font-bold text-3xl mb-2'>Create New Subject</h1>
      {error && <div className="text-danger mb-4">{error}</div>} {/* Error message */}
        <div className='flex justify-between gap-4 mb-4'> {/* container title & description */}
          {/* Subject Title */}
          <div className='p-6 shadow-xl rounded-2xl w-full'>
            <h3 className='text-lg font-semibold mb-2'>Subject Title</h3>
            <input
              className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder="Enter subject title..."
              value={newSubject.title}
              onChange={(e) =>
                setNewSubject({ ...newSubject, title: e.target.value })
              }
            />
          </div>

          {/* Subject Description */}
          <div className='p-6 shadow-xl rounded-2xl w-full'>
            <h3 className='text-lg font-semibold mb-2'>Short Subject Description</h3>
            <input
              className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder="Enter subject description..."
              value={newSubject.description}
              onChange={(e) =>
                setNewSubject({ ...newSubject, description: e.target.value })
              }
            />
          </div>
        </div>
      <div className='p-6 shadow-xl rounded-2xl mb-10'>
        <h3 className='text-lg font-semibold mb-2'>Subject Content</h3>
        <TextEditor onChange={(html) => setEditorContent(html)} />
      </div>

      <Button
        onClick={handleSubmit}
        className="border border-success text-success hoverAnimation3 mb-8"
      >
        Submit
      </Button>
    </div>
  );
}