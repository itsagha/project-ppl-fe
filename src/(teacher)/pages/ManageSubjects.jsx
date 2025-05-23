import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import SimpleDropdown from '@/components/SimpleDropdown';
import PaginationButton from '@/components/PaginationButton';
import Modal from '@/components/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { getData, deleteData } from '@/api/axios';

export default function ManageSubjects({ endPointParams, grade, props }) {
  const endPointClasses = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CLASSES_URL;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [teacherID, setTeacherID] = useState("");
  const [classID, setClassID] = useState("");

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

  // fetch buat dapetin class id
  useEffect(() => {
    if (!teacherID || !grade) return;
  
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
        console.error("Failed to fetch class ID", error);
      }
    };
  
    fetchClassID();
  }, [teacherID]);

  // dapet class id, fetch materials
  useEffect(() => {
    if (!classID) return;
  
    const fetchMaterials = async () => {
      try {
        const response = await getData(`${endPointParams}/from-class?id=${classID}`);
        setPosts(response.materials || []);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Failed to fetch materials", error);
      }
    };
  
    fetchMaterials();
  }, [classID, currentPage, endPointParams]);

  // Handling Delete Subject
  const handleDeleteSubject = async () => {
    if (!selectedSubject) return
    try {
      await deleteData(endPointParams + `?id=${selectedSubject.id}`);
      setPosts(posts.filter((post) => post.id !== selectedSubject.id));
      setShowDeleteModal(false);
      } catch (error) {
        console.error("Failed to Delete Subject", error);
      }
  }

  return (
    <div className='ml-[22rem] mr-24 mt-16'> {/* Main Container */}
      <div className='flex justify-between'> {/* Container title & dropdown */}
        <h1 className='font-bold text-3xl'>Manage Subjects</h1>
        <div className='bg-indigo-500 text-white p-2 rounded-lg'>{grade}th grade</div>
      </div>
      {/* Container Material Cards element */}
      <div className='grid grid-cols-3 gap-10 my-8'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='shadow-2xl rounded-2xl p-6 bg-cyan-500 text-white'
          >
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-bold'>{post.title}</h2>
              <SimpleDropdown
                fields={[
                  { 
                    label: 'Edit Subject', 
                    onClick: () => {
                      navigate('/EditSubjects', { state: { post, teacherID, classID } });
                    }
                  },
                  { 
                    label: 'Delete Subject', 
                    onClick: () => {
                      setSelectedSubject(post);
                      setShowDeleteModal(true);
                    }
                  },
                ]}
              />
            </div>
            <p className='text-justify text-sm min-h-16'>{post.description}</p>
            <button
              className="text-sm flex justify-start items-center gap-0.5 group relative overflow-hidden w-fit cursor-pointer"
              onClick={() => {
                navigate('/DetailSubjects', { state: { post, classID } });
              }}
            >
              <span className="relative z-10 mb-1">Preview this subject</span>
              <span
                className="absolute bottom-0 left-0 w-full rounded-2xl h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-in-out origin-left"
              />
            </button>

          </div>
        ))}
      </div>

      {/* Pagination Button */}
      <div className='flex justify-between items-center'>
        <Link to={`/CreateSubjects${grade}`}>
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

        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <div></div>
      </div>

      {/* Delete Materials Modal */}
      {showDeleteModal && (
        <Modal
          title="Confirm Subject Deletion"
          fields={[
            {
              customComponent: (
                <p>Are you sure you want to delete this {selectedSubject.name} subject?</p>
              ),
            },
          ]}
          children="Delete"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleDeleteSubject}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
