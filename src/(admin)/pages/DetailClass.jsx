import { deleteDataWithBody, getData, postData } from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '@/components/Modal';
import SearchBox from '@/components/SearchBox';
import Button from '@/components/Button';
import PaginationButton from '@/components/PaginationButton';
import Select from 'react-select';

export default function DetailClass({ endPointParams, ...props }) {
  const endPointStudents = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_STUDENT_URL;
  const { id } = useParams();
  const [isAscending, setIsAscending] = useState(false);
  const [searchData, setSearchData] = useState({ name: "", nis: "" });
  const [placeHolderText] = useState("Search Student in This Class by NIS or Name");
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addData, setAddData] = useState(false);
  const [studentList, setStudentList] = useState([]);

  // handle fetch pagination
  const fetchClassDetails = async () => {
    try {
      const response = await getData(endPointParams + `/details?page=${currentPage}&id=${id}`);
      setStudents(response.classes.students || []);
      setClassInfo(response.classes);
      setTotalPages(response.meta.totalPage);
    } catch (error) {
      console.error("Failed to fetch class details:", error);
      alert("Failed to fetch class details");
    }
  };

  // Handle fetch nama student u/ Dropdown
  const fetchAllStudents = async () => {
    try {
      let allStudents = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
        const response = await getData(endPointStudents + `?page=${currentPage}&id=${id}`);
        allStudents = [...allStudents, ...(response.students || [])];
        totalPages = response.meta.totalPage || 1;
        currentPage++;
      }
      setStudentList(allStudents);
    } catch (error) {
      console.error("Failed to fetch all students:", error);
    }
  };

  // handle general
  const handleFetchData = async () => {
    try {
      let queryParams = [];
  
      if (searchData.name) {
        queryParams.push(`search=${searchData.name}`);
      }
  
      if (searchData.nis) {
        queryParams.push(`searchNIS=${searchData.nis}`);
      }
  
      if (typeof isAscending === 'boolean') {
        queryParams.push(`sortByNIS=${isAscending}`);
      }

      if (id) {
        queryParams.push(`id=${id}`);
      }

  
      const finalEndpoint = `${endPointStudents}?${queryParams.join('&')}`;
      const data = await getData(finalEndpoint);
      setStudents(data.students || []);
      setTotalPages(data?.meta?.totalPage || 1);
    } catch (error) {
      console.error("Failed to Fetch Data", error);
      alert("Failed to Fetch Data");
    }
  };

  //handle unassign student
  const handleUnassign = async () => {
    if (!selectedStudent) return;
    try {
      await deleteDataWithBody(endPointParams + `/unassign-students`, {
        id: parseInt(id),
        student_id: [selectedStudent.id]
      });
      setShowDeleteModal(false);
      fetchClassDetails();
    } catch (error) {
      console.error("Failed to unassign student:", error);
      alert("Failed to unassign student");
    }
  }

  // Handle Assign New Student
  const handleAssign = async () => {
    if (addData.student_ids.length === 0) {
      alert("Choose at least one student.");
      return;
    }
  
    // Cek kalo ada murid yang udah kedaftar
    const existingStudents = addData.student_ids.filter((id) =>
      students.some((s) => s.id === id)
    );
    if (existingStudents.length > 0) {
      alert("There are students who have already been added. Remove from selection first.");
      return;
    }

    const formattedData = {
      id: parseInt(id, 10),
      student_id: addData.student_ids,
    };
  
    try {
      await postData(endPointParams + `/assign-students`, formattedData);
      setShowAddModal(false);
      setAddData({ student_ids: [] });
      fetchClassDetails();
    } catch (error) {
      console.error("Failed to assign students:", error);
      alert("Failed to assign students");
    }
  };
  
  useEffect(() => {
    fetchClassDetails();
    fetchAllStudents();
  }, [id, currentPage]);

  useEffect(() => {
    handleFetchData();
  }, [searchData.name, searchData.nis, isAscending]);

  return (
    <div className='ml-[22rem] mr-24 mt-16'>
      <div className='flex justify-between items-end mb-6'>
        <div className='flex flex-col gap-2 min-w-md'>
          <h1 className="text-3xl font-bold flex justify-start items-end gap-2">{classInfo.name} Class 
            <span className='text-base font-normal'> - {classInfo.teacher_name}</span>
          </h1>
          <SearchBox // Search Box
              onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
              onSearch={handleFetchData}
              placeHolder={placeHolderText}
            />
        </div>
        <div className='flex justify-end gap-2'>  {/* button container add, filter, sort */}
          <Button
            onClick={() => {
              setIsAscending(!isAscending)
              handleFetchData();
            }}
            className="flex items-center gap-2 border border-primary text-primary text-sm hoverAnimation"
          >
            Sort by NIS 
            {isAscending ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.41z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                <path d="M9 16.17l-4.59-4.58L3 13l6 6 12-12-1.41-1.41z"/>
              </svg>
            )}
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 border border-success text-success text-sm hoverAnimation3"
          >
            Assign New Student
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              {...props}
            >
              <path fill="currentColor" fillRule="evenodd" d="M10 3.25C7.904 3.25 6.171 4.91 6.171 7S7.904 10.75 10 10.75S13.829 9.09 13.829 7S12.096 3.25 10 3.25M7.671 7c0-1.224 1.024-2.25 2.329-2.25S12.329 5.776 12.329 7S11.305 9.25 10 9.25S7.671 8.224 7.671 7" clipRule="evenodd"></path>
              <path fill="currentColor" d="M7.087 12.86c.064-.018.202-.011.384.106c.512.332 1.4.77 2.529.77s2.017-.438 2.53-.77c.18-.117.319-.124.383-.107q.215.06.428.128l.985.315a.75.75 0 0 0 .457-1.428l-.984-.316q-.243-.077-.488-.145c-.612-.168-1.193.033-1.596.294c-.37.24-.974.529-1.715.529c-.74 0-1.345-.29-1.715-.53c-.403-.26-.984-.461-1.596-.293q-.245.068-.488.145l-.984.316a3.77 3.77 0 0 0-2.429 2.342c-.075.22-.107.432-.125.604l-.389 3.673c-.16 1.177.493 2.388 1.781 2.687c1.199.278 3.127.57 5.945.57a.75.75 0 1 0 0-1.5c-2.714 0-4.528-.28-5.605-.53c-.427-.1-.708-.503-.634-1.03l.002-.013l.391-3.7c.014-.124.03-.208.052-.271a2.27 2.27 0 0 1 1.468-1.404l.985-.315q.213-.068.428-.128M18 14.25a.75.75 0 0 1 .75.75v2.25H21a.75.75 0 0 1 0 1.5h-2.25V21a.75.75 0 0 1-1.5 0v-2.25H15a.75.75 0 0 1 0-1.5h2.25V15a.75.75 0 0 1 .75-.75"></path>
            </svg>
          </Button>
        </div>
      </div>

      {/* Table Students */}
      <div className='overflow-x-auto p-10 rounded-2xl shadow-xl border border-secondary mb-8'>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="border-b">
              <th className="border-y px-4 py-2 text-start border-gray-400">Name</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">NIS</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">Grade</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">Status</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border-y px-4 py-2 border-gray-300 font-semibold">{student.name}</td>
                <td className="border-y px-4 py-2 border-gray-300">{student.nis}</td>
                <td className="border-y px-4 py-2 border-gray-300">{student.grade}</td>
                <td className="border-y px-4 py-2 border-gray-300">{student.status}</td>
                <td className="border-y px-4 py-2 border-gray-300">
                  {/* button delete */}
                  <button onClick={() => { 
                    setSelectedStudent(student); 
                    setShowDeleteModal(true); 
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      className='duration-500 ease-in-out hover:text-danger cursor-pointer'
                      {...props}
                    >
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Assign new Student modal */}
      {showAddModal && (
        <Modal
          title="Assign New Students to This Class"
          fields={[
            {
              label: "Assign Students",
              customComponent: (
                <Select
                  isMulti
                  options={studentList.map((student) => ({
                    label: student.name,
                    value: student.id,
                  }))}
                  onChange={(selectedOptions) =>
                    setAddData({ ...addData, student_ids: selectedOptions.map((opt) => opt.value) })
                  }
                  className="w-full"
                />
              ),
            }
          ]}
          children="Assign"
          className="border-success text-success hoverAnimation3 max-w-96"
          onSubmit={handleAssign}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Unassign Student Modal */}
      {showDeleteModal && (
        <Modal 
          title="Confirm "
          fields={[
            {
              customComponent: (
                <p>Are you sure you want to unassign {selectedStudent.name} from {classInfo.name} class?</p>
              ),
            },
          ]}
          children="Unassign Student"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleUnassign}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}