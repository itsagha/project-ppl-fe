// file buat isi materi dan material group discussion
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@/components/Button';
import dayjs from 'dayjs';
import Modal from '@/components/Modal';
import SimpleDropdown from '@/components/SimpleDropdown';
import PaginationButton from '@/components/PaginationButton';
import { getData, updateData, postData, deleteData } from '@/api/axios';

export default function MyDetailSubject({ endPointParams, props }) {
  const endPointDiscussionsMaterial = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_DISCUSSIONS_MATERIAL_URL;
  const endPointStudents = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_STUDENT_URL;

  const { post, classID } = useLocation().state || {};

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showReplies, setShowReplies] = useState({}); // toggle reply per post
  const [newReply, setNewReply] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [addData, setAddData] = useState({ topic:"", description:"" });
  const [editData, setEditData] = useState({ topic:"", description:"" });
  const [error, setError] = useState("");

  // dapetin student id sama nama student
  useEffect(() =>{
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setStudentID(userData.student_id);
        setStudentName(userData.display_name);
      } catch (error) {
        console.error("Error parsing User Data", error);
      }
    }
  })

  // fetch materi by classID
  const fetchMaterialByClassID = async () => {
    try {
      await getData(endPointParams + `/from-class?id=` + classID);
    } catch (error) {
      console.error("Failed to fetch material detail", error);
    }
    fetchMaterialByClassID();
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // fetch material discussions
  const fetchMaterialDiscuss = async () => {
    try {
      const response = await getData(`${endPointDiscussionsMaterial}?id=${post.id}`, currentPage);
      const discussions = response.discussions || [];

      // ambil nama murid dari student ID
      const enrichedDiscussions = await Promise.all(
        discussions.map(async (discussion) => {
          try {
            const studentDetail = await getData(`${endPointStudents}/details?id=${discussion.student_id}`);
            return { ...discussion, student_name: studentDetail.name }; // ambil nama muridnya
          } catch (error) {
            console.error(`Failed to fetch student ID ${discussion.student_id}`, error);
            return {
              ...discussion,
              student_name: "Unknown Student",
            };
          }
        })
      );
      setPosts(enrichedDiscussions);
      setTotalPages(response?.meta?.totalpages || 1);
    } catch (error) {
      console.error("Failed to fetch material discussions", error);
      setError("Error fetching material discussions, please try again later.");
    }
  };

  // add question
  const handleAddQuestion = async () => {
    try {
      const newQuestion = await postData(endPointDiscussionsMaterial, {
        topic: addData.topic,
        description: addData.description,
        replies: null,
        student_id: studentID,
        material_id: post.id,
      });
  
      setShowAddModal(false);
      setAddData({ topic: "", description: "" });
      await fetchMaterialDiscuss();
    } catch (error) {
      console.error("Failed to add question", error);
    }
  };

  // edit quest
  const handleEditQuestion = async () => {
    try {
      const response = await updateData(`${endPointDiscussionsMaterial}?id=${selectedQuestion.id}`,
        {
          topic:editData.topic,
          description: editData.description,
          student_id: studentID,
          material_id: post.id,
        });
      console.log(response)
      setShowEditModal(false);
      await fetchMaterialDiscuss();
    } catch (error) {
      console.error("Failed to edit question", error);
    }
  }

  // del quest
  const handleDeleteQuestion = async () => {
    try {
      await deleteData(`${endPointDiscussionsMaterial}?id=${selectedQuestion.id}`);
      setShowDeleteModal(false);
      await fetchMaterialDiscuss();
    } catch (error) {
      console.error("Failed to delete the selected question", error);
    }
  }

  // Add comment
  const handleAddComment = async (postId) => {
    try {
      await updateData(endPointParams + `/reply?id=${postId}`, {
        replies: newReply[postId],
        student_name: studentName,
        student_id: studentID,
      });
  
      // kosongin input buat post itu doang
      setNewReply(prev => ({
        ...prev,
        [postId]: '',
      }));
  
      await fetchMaterialDiscuss();
    } catch (error) {
      console.error("Failed to comment", error);
    }
  };

  const toggleReply = (id) => {
    setShowReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchMaterialDiscuss();
  }, [currentPage, endPointParams]);

  if (error) return <p className="text-red-500 ml-[22rem] mr-24 my-16">{error}</p>;

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      <h1 className='font-bold text-3xl'>{post.title}</h1>
      <div className='rounded-2xl shadow-2xl p-6 my-8 border border-primary'>
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      {/* Tombol scroll ke atas */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-2 border border-primary text-primary hoverAnimation z-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            {...props}
          >
            <path
              fill="currentColor"
              d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0"
            ></path>
          </svg>
        </button>
      </div>

      {/* Material Discussions */}
      <div className='flex justify-between'>
        <h1 className='font-bold text-3xl'>Material Discussions</h1>
        <Button
          className='text-primary border border-primary hoverAnimation'
          onClick={() => setShowAddModal(true)}
        >
          Ask a Question
        </Button>
      </div>

      <div className='my-8'>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">There are no discussion for this material yet, be the first one to start the discussion by click "Ask a Question" button.</p>
        ) : (
          posts.map((postLoop) => (
            <div key={postLoop.id} className='shadow-lg rounded-2xl p-6 text-black border border-primary w-full mb-6'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <div className='flex justify-start gap-2 items-center'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                      width="1em"
                      height="1em"
                      {...props}
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="7" cy="5.5" r="2.5"></circle>
                        <path d="M2.73 11.9a5 5 0 0 1 8.54 0"></path>
                        <circle cx="7" cy="7" r="6.5"></circle>
                      </g>
                    </svg>
                    <h2>{postLoop.student_name}</h2>
                  </div>
                  <h2 className="text-lg font-bold">{postLoop.topic}</h2>
                </div>
                {postLoop.student_id === studentID && (
                  <SimpleDropdown 
                    fields={[
                      {
                        label: 'Edit',
                        onClick: () => {
                          setSelectedQuestion(postLoop);
                          setEditData({
                            topic: postLoop.topic,
                            description: postLoop.description,
                          });
                          setShowEditModal(true);
                        }
                      },
                      {
                        label: 'Delete',
                        onClick: () => {
                          setSelectedQuestion(postLoop);
                          setShowDeleteModal(true);
                        }
                      },
                    ]}
                  />
                )}
              </div>
              <p className='text-justify min-h-16'>{postLoop.description}</p>
              
              {/* button show komenan */}
              <button
                className="mt-4 text-blue-500 underline-hover text-sm cursor-pointer"
                onClick={() => toggleReply(postLoop.id)}
              >
                {showReplies[postLoop.id] ? 'Hide replies' : 'Show replies'}
              </button>

              {/* komenan dari murid lain */}
              {showReplies[postLoop.id] && (
                <div className="mt-4 text-sm max-h-52 overflow-y-auto scrollbar-thin">
                  {postLoop.replies && postLoop.replies.length > 0 ? (
                    postLoop.replies.map((reply) => (
                      <div key={reply.id} className="mb-2 bg-gray-100 rounded-lg p-4">
                        <div className='flex justify-between'>
                          <p className='font-bold'>{reply.name}</p>
                          <p className='text-xs text-gray-500 mt-1'>
                            {dayjs(reply.time).format('hA. MMMM D, YYYY')}
                          </p>
                        </div>
                        <p className='text-justify'>{reply.reply}</p>
                      </div>
                    ))
                  ) : (
                    <p className='italic bg-gray-100 rounded-lg p-4 text-gray-500'>No one added a comment yet.</p>
                  )}
                </div>
              )}

              {/* Text area & button send buat komen di postLoop */}
              <div className="relative w-full mt-2">
                <input 
                  type="text"
                  value={newReply[postLoop.id] || ''} 
                  onChange={(e) => setNewReply({ ...newReply, [postLoop.id]: e.target.value })}
                  className="border border-gray-300 w-full rounded-lg py-2 pr-20 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write an Answer"
                />
                <button 
                  onClick={() => handleAddComment(postLoop.id)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-primary mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="1em"
                    height="1em"
                    {...props}
                  >
                    <path
                      fill="currentColor"
                      d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1l111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6c8.2 0 16.3-2.1 23.6-6.2c12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9M192 464v-64.6l36.6 15.1zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6L48 288L464 48z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* button paginaion */}
      <PaginationButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Add new topic modal */}
      {showAddModal && (
        <Modal
          title="What topic would you like to discuss?"
          fields={[
            {
              label: "Topic",
              value: addData.topic,
              onChange: (e) => setAddData({ ...addData, topic: e.target.value })
            },
            {
              label: 'Describe your question',
              value: addData.description,
              onChange: (e) => setAddData({ ...addData, description: e.target.value })
            }
          ]}
          children='Submit'
          className="border-success text-success hoverAnimation3"
          onSubmit={handleAddQuestion}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Delete question modal */}
      {showDeleteModal && (
        <Modal 
          title= "Confirm Question Deletion"
          fields={[
            {
              customComponent: (
                <p>Are you sure you want to delete this question?</p>
              )
            }
          ]}
          children="Delete"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleDeleteQuestion}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {/* Edit question modal */}
      {showEditModal && (
        <Modal
          title= "Edit Question Detail"
          fields= {[
            {
              label: "Topic",
              value: editData.topic,
              onChange: (e) => setEditData({ ...editData, topic: e.target.value }),
            },
            {
              label: "Description",
              value: editData.description,
              onChange: (e) => setEditData({ ...editData, description: e.target.value }),
            }
          ]}
          children="Save Changes"
          className="border-success text-success hoverAnimation3"
          onSubmit={handleEditQuestion}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}