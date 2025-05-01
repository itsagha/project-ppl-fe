import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData, updateData } from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Modal from '@/components/modal';
import Dropdown from '@/components/dropdown';
import SimpleDropdown from '@/components/SimpleDropdown';
import PaginationButton from '@/components/PaginationButton';

export default function ManageClass({ endPointParams, grade, ...props }) {
  const endPointTeachers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_TEACHER_URL;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]= useState(1);
  const [addData, setAddData] = useState({ name: "", description: "", teacher_id: "", grade: "" });
  const [editData, setEditData] = useState({ name: "", description: "", teacher_id: "", grade: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // fetch data kelas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(endPointParams, currentPage);
        // Filter pake grade yg sesuai
        const filteredClasses = (response.classes || []).filter(cls => cls.grade === grade);
        setPosts(filteredClasses);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Failed to Get Classes Data", error);
        alert("Failed to Get Classes Data");
      }
    };
    fetchData();
  }, [currentPage, endPointParams, grade]);  

  // fetch API semua nama guru buat dropdown
  const fetchAllTeachers = async () => {
    try {
      let allTeachers = [];
      let currentPage = 1;
      let totalPages = 1;
  
      while (currentPage <= totalPages) {
        const response = await getData(`${endPointTeachers}?page=${currentPage}`);
        allTeachers = [...allTeachers, ...(response.students || [])];
        totalPages = response.meta?.totalPage || 1;
        currentPage++;
      }
  
      setTeacherList(allTeachers);
    } catch (error) {
      console.error("Failed to fetch all teachers", error);
    }
  };
  // lanjutan Fetch API nama guru
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getData(endPointTeachers);
        setTeacherList(response.students || []);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      }
    };
    fetchTeachers();
  }, []);
  // ini juga
  useEffect(() => {
    fetchAllTeachers();
  }, []);

  // handling add new class
  const handleAddClass = async () => {
    const formattedData = {
      ...addData,
      grade: grade,
      teacher_id: parseInt(addData.teacher_id, 10),
    };
  
    try {
      if (!addData.name || !addData.description || !addData.grade || !addData.teacher_id) {
        alert("Semua field harus diisi.");
        return;
      }
      const newClass = await postData(endPointParams, formattedData);
      const teacher = teacherList.find(t => t.id === formattedData.teacher_id);
  
      const newClassWithTeacherName = {
        ...newClass,
        teacher_name: teacher ? teacher.name : "Unknown",
      };
  
      setPosts([...posts, newClassWithTeacherName]);
      setShowAddModal(false);
      setAddData({ name: "", description: "", teacher_id: "", grade: "" });
    } catch (error) {
      console.error("Failed to Add New Class", error);
      alert("Failed to Add New Class");
    }
  };

  // Handling edit class
  const handleEditClass = async () => {
    const formattedData = {
      ...editData,
      grade: grade,
      teacher_id: parseInt(editData.teacher_id, 10),
    };
    const selectedTeacher = teacherList.find(teacher => teacher.id === formattedData.teacher_id);
    try {
      await updateData(endPointParams + `?id=${selectedClass.id}`, formattedData, editData);
      setPosts(posts.map(post =>
        post.id === selectedClass.id
          ? { ...post, ...editData, teacher_name: selectedTeacher?.name || post.teacher_name } : post
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to Edit Class Data", error);
      alert("Failed to Edit Class Data");
    }
  };

  // Handling delete class
  const handleDeleteClass = async () => {
    if (!selectedClass) return;
    try {
      await deleteData(endPointParams + `?id=${selectedClass.id}`);
      setPosts(posts.filter((post) => post.id !== selectedClass.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to Delete Class", error);
      alert("Failed to Delete Class");
    }
  }

  return (
    <div className='ml-[22rem] mr-24 my-16'> {/* Main Container */}
      <div className='flex justify-between mb-2'>
        <h1 className='font-bold text-3xl'>Manage Classes</h1>
        <h1 className='bg-indigo-500 text-white p-2 rounded-lg'>{grade}th Grade</h1>
      </div>
      <h1>Natural Science</h1>
      <div className="grid grid-cols-3 gap-10 my-8">
        {/* Classes Cards Element */}
        {posts.map((post) => (
            <div key={post.id} className="shadow-2xl rounded-2xl p-6 bg-cyan-500 text-white flex flex-col gap-1.5">
              <div className='flex justify-between'>
                <h2 className="text-lg font-bold">{post.name}</h2>
                {/* Dropdown delete & edit */}
                <SimpleDropdown
                  fields={[
                    {
                      label: 'Edit Class',
                      onClick: () => {
                        setSelectedClass(post);
                        setEditData({
                          name: post.name,
                          description: post.description,
                          teacher_id: post.teacher_id,
                          grade: post.grade,
                        });
                        setShowEditModal(true);
                      }
                    },
                    {
                      label: 'Delete Class',
                      onClick: () => {
                        setSelectedClass(post);
                        setShowDeleteModal(true);
                      }
                    }
                  ]}
                  className="z-50"
                />
              </div>
              <p className='text-justify text-sm min-h-16'>{post.description}</p>
              <button className='text-sm w-fit cursor-pointer flex justify-center items-center gap-1 rounded-lg underline' onClick={() => navigate(`/class/${post.id}`)}>
                Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    {...props}
                  >
                    <path fill="currentColor" d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0"></path>
                    <path fill="currentColor" d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01"></path>
                  </svg>
              </button>
              <div className='flex justify-between'>
                <div className="flex justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="1em"
                    height="1em"
                    {...props}
                  >
                    <path fill="currentColor" d="M16 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0m13.5-1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M22 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m-17 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0M6.5 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m2.151 20.505A3 3 0 0 1 4 22v-6.5a.5.5 0 0 1 .5-.5h4.031a4 4 0 0 1 .846-2H4.5A2.5 2.5 0 0 0 2 15.5V22a5 5 0 0 0 7.327 4.427a7.5 7.5 0 0 1-.676-1.922m14.022 1.922A5 5 0 0 0 30 22v-6.5a2.5 2.5 0 0 0-2.5-2.5h-4.877a4 4 0 0 1 .846 2H27.5a.5.5 0 0 1 .5.5V22a3 3 0 0 1-4.651 2.505a7.5 7.5 0 0 1-.676 1.922M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5zm-.5 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V23a4 4 0 0 1-8 0z"></path>
                  </svg>
                    <span className='text-sm'>35</span>
                </div>
                <span className='text-sm'>{post.teacher_name}</span>
              </div>
            </div>
        ))}
      </div>
      
      {/* Main container pagination & button add class */}
      <div className='flex justify-between items-center mt-8'>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="text-success border border-success hoverAnimation3 flex items-center gap-2"
        >
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
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <div></div> {/* div biar ngepas */} 
      </div>

      {/* Add New Class Modal */}
      {showAddModal && (
        <Modal
          title="Add New Class"
          fields={[
            {
              label: "Class Name",
              value: addData.name,
              onChange: (e) => setAddData({ ...addData, name: e.target.value }),
            },
            {
              label: "Description",
              value: addData.description,
              onChange: (e) => setAddData({ ...addData, description: e.target.value }),
            },
            {
              label: "Grade",
              value: addData.grade,
              type: "number",
              onChange: (e) => setAddData({ ...addData, grade: e.target.value }),
            },
            {
              label: "Assign Teacher",
              customComponent: (
                <Dropdown
                  fields={teacherList.map((teacher) => ({
                    label: teacher.name,
                    value: teacher.id,
                  }))}
                  onSelect={(value) => setAddData({ ...addData, teacher_id: value })}
                  buttonLabel="Select a Teacher"
                  className="w-full"
                />
              ),
            },
          ]}
          children="Add"
          className="border-success text-success hoverAnimation3"
          onSubmit={handleAddClass}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Class Modal */}
      {showEditModal && (
        <Modal
          title ="Edit Class Detail"
          fields={[
            {
              label: "Class Name",
              value: editData.name,
              onChange: (e) => setEditData({ ...editData, name: e.target.value }),
            },
            {
              label: "Description",
              value: editData.description,
              onChange: (e) => setEditData({ ...editData, description: e.target.value }),
            },
            {
              label: "Grade",
              value: editData.grade,
              type: "number",
              onChange: (e) => setEditData({ ...editData, grade: e.target.value }),
            },
            {
              label: "Assign Teacher",
              customComponent: (
                <Dropdown
                  fields={teacherList.map((teacher) => ({
                    label: teacher.name,
                    value: teacher.id,
                  }))}
                  onSelect={(value) => setEditData({ ...editData, teacher_id: value })}
                  buttonLabel="Select a Teacher"
                  className="w-full"
                />
              ),
            },
          ]}
          children="Save Changes"
          className="border-success text-success hoverAnimation3"
          onSubmit={handleEditClass}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Class Modal */}
      {showDeleteModal && (
        <Modal 
          title="Confirm Class Deletion"
          fields={[
            {
              customComponent: (
                <p>Are you sure you want to delete {selectedClass.name} class?</p>
              ),
            },
          ]}
          children="Delete"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleDeleteClass}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}