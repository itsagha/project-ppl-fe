import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { deleteData, getData, postData, updateData } from '@/api/axios';
import dayjs from 'dayjs';
import SimpleDropdown from '@/components/SimpleDropdown';
import Modal from '@/components/Modal';
import PaginationButton from '@/components/PaginationButton';
import { displayName } from 'react-quill';
dayjs.locale('id');

export default function GroupDiscussions({ endPointParams, props }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showReplies, setShowReplies] = useState({}); // toggle reply per post
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [addData, setAddData] = useState({ topic:"", description:"" });
  const [editData, setEditData] = useState({ topic:"", description:"" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // dapetin student id sama nama student
  useEffect(() =>{
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setStudentID(userData.student_id);
        console.log(userData);
        setStudentName(userData.display_name);
      } catch (error) {
        console.error("Error parsing User Data", error);
      }
    }
  })

  // fetch group discussions
  const fetchGroupDiscuss = async () => {
    try {
      const response = await getData(endPointParams, currentPage);
      const discussions = response.discussions || [];
  
      // ambil nama murid dari student_id
      const enrichedDiscussions = await Promise.all(
        discussions.map(async (discussion) => {
          try {
            const studentDetail = await getData(`https://api.learnify-ppl.site/api/v1/students/details?id=${discussion.student_id}`);
            return {
              ...discussion,
              student_name: studentDetail.name, // ambil nama muridnya
            };
          } catch (error) {
            console.error(`Gagal fetch student ID ${discussion.student_id}`, error);
            return {
              ...discussion,
              student_name: "Unknown Student",
            };
          }
        })
      );
  
      setPosts(enrichedDiscussions);
      setTotalPages(response?.meta?.totalPage || 1);
    } catch (error) {
      console.error("Failed to fetch group discussions", error);
    }
  };

  // Add quest
  const handleAddQuestion = async () => {
    try {
      const newQuestion = await postData(endPointParams, {
        topic: addData.topic,
        description: addData.description,
        replies: null,
        student_id: studentID,
      });
  
      setShowAddModal(false);
      setAddData({ topic: "", description: "" });
      await fetchGroupDiscuss();
    } catch (error) {
      console.error("Failed to add question", error);
    }
  };

  // edit quest
  const handleEditQuestion = async () => {
    try {
        await updateData(endPointParams + `?id=${selectedQuestion.id}`, 
          {
            topic: editData.topic,
            description: editData.description,
            replies: null,
            student_id: studentID,
          });
      setShowEditModal(false);
      await fetchGroupDiscuss();
    } catch (error) {
      console.error("Failed to edit the selected question", error);
    }
  }

  // Del quest
  const handleDeleteQuestion = async () => {
    try {
      await deleteData(endPointParams + `?id=${selectedQuestion.id}`);
      setShowDeleteModal(false);
      await fetchGroupDiscuss();
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
  
      await fetchGroupDiscuss();
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
    fetchGroupDiscuss();
  }, [currentPage, endPointParams]);

  return (
    <div className='ml-[22rem] mr-24 my-16'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-3xl'>Group Discussions</h1>
        <Button 
          className="text-primary border border-primary hoverAnimation"
          onClick={() => setShowAddModal(true)}  
        >
          Ask a Question
        </Button>
      </div>

      <div className='my-8'>
        {posts.map((post) => (
          <div key={post.id} className='shadow-lg rounded-2xl p-6 text-black border border-primary w-full mb-6'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg'>{post.student_name}</h2>
                <h2 className='font-bold'>{post.topic}</h2>
              </div>
              {post.student_id === studentID && (
                <SimpleDropdown 
                  fields={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        setSelectedQuestion(post);
                        setEditData({
                          topic: post.topic,
                          description: post.description,
                        });
                        setShowEditModal(true);
                      }
                    },
                    {
                      label: 'Delete',
                      onClick: () => {
                        setSelectedQuestion(post);
                        setShowDeleteModal(true);
                      }
                    },
                  ]}
                />
              )}
            </div>
            <p className='text-justify min-h-16'>{post.description}</p>
            
            {/* button show komenan */}
            <button
              className="mt-4 text-blue-500 underline-hover text-sm cursor-pointer"
              onClick={() => toggleReply(post.id)}
            >
              {showReplies[post.id] ? 'Hide replies' : 'Show replies'}
            </button>

            {/* komenan dari murid lain */}
            {showReplies[post.id] && (
              <div className="mt-4 text-sm max-h-52 overflow-y-auto scrollbar-thin">
                {post.replies && post.replies.length > 0 ? (
                  post.replies.map((reply) => (
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

            {/* Text area & button send buat komen di post */}
            <div className="relative w-full mt-2">
              <input 
                type="text"
                value={newReply[post.id] || ''} 
                onChange={(e) => setNewReply({ ...newReply, [post.id]: e.target.value })}
                className="border border-gray-300 w-full rounded-lg py-2 pr-20 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write an Answer"
              />
              <button 
                onClick={() => handleAddComment(post.id)}
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
        ))}
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
  );
}