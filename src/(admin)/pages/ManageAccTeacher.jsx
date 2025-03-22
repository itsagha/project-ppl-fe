import React, { useEffect, useState } from 'react';
import { getData, deleteData, updateData, postData } from '@/api/axios';
import Button from '@/components/Button';
import SearchBox from '@/components/SearchBox';
import PaginationButton from '@/components/PaginationButton';

export default function ManageAccStudent({ endPointParams, ...props }) {
  const [posts, setPosts] = useState([]);
  const [placeHolderText] = useState("Search Teacher Accounts by NIP or Name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeacher, setselectedTeacher] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchData, setSearchData] = useState({ name: "", nip: "" });
  const [addData, setAddData] = useState({ name: "", nip: "", specialization: "", status:"" });
  const [editData, setEditData] = useState({ name: "", nip: "", specialization: "", status:"" });
  const [isAscending, setIsAscending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(endPointParams, currentPage);
        setPosts(response.students || []);
        setTotalPages(response?.meta?.totalPage || 1);
      } catch (error) {
        console.error("Gagal mengambil data", error);
      }
    };
    fetchData();
  }, [currentPage, endPointParams]);

  // handling filter, sort, & search
  const handleFetchData = async () => {
    try {
      let queryParams = [];
  
      if (specialization) {
        queryParams.push(`specialization=${specialization}`);
      }
  
      if (searchData.name) {
        queryParams.push(`search=${searchData.name}`);
      }
  
      if (searchData.nip) {
        queryParams.push(`searchNIP=${searchData.nip}`);
      }
  
      if (typeof isAscending === 'boolean') {
        queryParams.push(`sortByNIP=${isAscending}`);
      }
  
      const finalEndpoint = `${endPointParams}?${queryParams.join('&')}`;
      const data = await getData(finalEndpoint);
      setPosts(data.students || []);
      setTotalPages(data?.meta?.totalPage || 1);
    } catch (error) {
      console.error("Failed to Fetch Data", error);
      alert("Failed to Fetch Data");
    }
  };

  const handleDelete = async () => {
    if (!selectedTeacher) return;
    try {
      await deleteData(endPointParams + `?id=${selectedTeacher.id}`);
      setPosts(posts.filter((post) => post.id !== selectedTeacher.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to Deleting Data:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateData(endPointParams + `?id=${selectedTeacher.id}`, editData);
      setPosts(posts.map(post => (post.id === selectedTeacher.id ? { ...post, ...editData } : post)));
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to Updating Data:", error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      if (!addData.name || !addData.nip || !addData.status || !addData.specialization) {
        alert("Semua field harus diisi.");
        return;
      }
      const newTeacher = await postData(endPointParams, addData); // Kirim formData ke API
      setPosts([...posts, newTeacher]);
      setShowAddModal(false);
      setAddData({ name: '', nip: '', status: '', specialization: '' });
      handleFetchData();
      alert("Teacher Added Successfully");
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [specialization, searchData.name, searchData.nip, isAscending]);

  return (
    <div className='ml-[22rem] mr-24 mt-16 mb-10'>
      <div className='flex justify-between items-end mb-6'>
        <div className='flex flex-col gap-2 min-w-md'>
          <h1 className="text-3xl font-bold">Teacher Accounts</h1>
          <SearchBox //search box
            onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
            onSearch={handleFetchData}
            placeHolder={placeHolderText}
          />
        </div>
        <div className='flex justify-end gap-2'> {/* container button add, sort, & dropdown filter */}

          {/* button dropdown filter */}
          <div className='relative inline-block'>
            <Button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 border border-primary text-primary hoverAnimation" type="button">
              Apply Filter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 12 12"
                  width="1.2em"
                  height="1.2em"
                  {...props}
                >
                  <path fill="currentColor" fillRule="evenodd" d="M2.15 4.15a.5.5 0 0 1 .707 0l3.15 3.15l3.15-3.15a.5.5 0 0 1 .707.707l-3.5 3.5a.5.5 0 0 1-.707 0l-3.5-3.5a.5.5 0 0 1 0-.707z" clipRule="evenodd"></path>
                </svg>
            </Button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md">
                <ul className="py-2 text-sm text-gray-700">
                  {["Geografi", "Biologi", "Matematika", "Sosiologi", "Fisika", "Kimia", "Sejarah", "IT"].map((specializationOption) => (
                    <li key={specializationOption}>
                      <button
                        onClick={() => {
                          setSpecialization(specializationOption);
                          handleFetchData(specializationOption);
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {specializationOption}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* button sort */}
          <Button
            onClick={() => {
              setIsAscending(!isAscending);
              handleFetchData();
            }}
            className="flex items-center gap-2 border border-primary text-primary text-sm hoverAnimation"
          >
            Sort by NIP 
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

          {/* button add Teacher */}
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 border border-success text-success text-sm hoverAnimation3"
          >
            Add New Teacher
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
      {/* main container tabelnya */}
      <div className="overflow-x-auto p-10 rounded-2xl shadow-xl border border-secondary">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr>
              <th className="border-y px-4 py-2 text-start border-gray-400">Name</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">NIP</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">Specialization</th>
              <th className="border-y px-4 py-2 text-start border-gray-400">Status</th>
              <th className='border-y px-4 py-2 text-start border-gray-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="text-start">
                <td className="border-y px-4 py-2 border-gray-300 font-semibold">{post.name}</td>
                <td className="border-y px-4 py-2 border-gray-300">{post.nip}</td>
                <td className="border-y px-4 py-2 border-gray-300">{post.specialization}</td>
                <td className="border-y px-4 py-2 border-gray-300">{post.status}</td>
                <td className="border-y px-4 py-2 border-gray-300">
                  <div className='flex justify-start items-center gap-4'> {/* container button */}
                    {/* button edit */}
                    <button onClick={() => { 
                      setselectedTeacher(post); 
                      setEditData(post); 
                      setShowEditModal(true); 
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        className='duration-500 ease-in-out hover:text-orange-300 cursor-pointer'
                        {...props}
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"
                        ></path>
                      </svg>
                    </button>
                    {/* button delete */}
                    <button onClick={() => { 
                      setselectedTeacher(post); 
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
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
                        ></path>
                      </svg>
                    </button>
                  </div>
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

      {/* modal confirm delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 animate-fade-in-scale">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h1 className='font-bold text-xl mb-4'>Confirm Data Deletion</h1>
            <p>r u sure u wanna delete {selectedTeacher?.name}?</p>
            <div className="flex gap-2 mt-4 text-sm">
              <Button className="border border-danger text-danger rounded-lg cursor-pointer hoverAnimation2" onClick={handleDelete}>Yes</Button>
              <Button className="border border-primary text-primary rounded-lg cursor-pointer hoverAnimation" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* modal edit data */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 animate-fade-in-scale">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Teacher Information</h2>
            <div className='text-sm'>
              <label className="block">
                <span>Name:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={editData.name} 
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>NIP:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={editData.nip} 
                  onChange={(e) => setEditData({ ...editData, nip: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>Status:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={editData.status} 
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>specialization:</span>
                <input type="text" name="specialization" className="w-full p-2 border rounded-lg" value={editData.specialization}
                  onChange={(e) => setEditData({ ...editData, specialization: e.target.value })} />
              </label>
              <div className="flex gap-2 mt-4 text-sm">
                <Button className="border border-success text-success rounded-lg cursor-pointer hoverAnimation3" onClick={handleEditSubmit}>Save</Button>
                <Button className="border border-gray-500 text-gray-500 rounded-lg cursor-pointer hoverAnimation4" onClick={() => setShowEditModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal tambah data */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 animate-fade-in-scale">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>
              <div className='text-sm'>
              <label className="block">
                <span>Name:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={addData.name} 
                  onChange={(e) => setAddData({ ...addData, name: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>NIP:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={addData.nip} 
                  onChange={(e) => setAddData({ ...addData, nip: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>Status:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={addData.status} 
                  onChange={(e) => setAddData({ ...addData, status: e.target.value })} />
              </label>
              <label className="block mt-2">
                <span>specialization:</span>
                <input type="text" className="w-full p-2 border rounded-lg" value={addData.specialization}
                  onChange={(e) => setAddData({ ...addData, specialization: e.target.value })} />
              </label>
              <div className="flex gap-2 mt-4 text-sm">
                <Button className="border border-success text-success rounded-lg cursor-pointer hoverAnimation3" onClick={handleAddSubmit}>Add Teacher</Button>
                <Button className="border border-gray-500 text-gray-500 rounded-lg cursor-pointer hoverAnimation4" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}