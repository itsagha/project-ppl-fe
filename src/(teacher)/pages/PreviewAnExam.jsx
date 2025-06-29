import { deleteData, getData } from '@/api/axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

export default function PreviewAnExam({ endPointParams }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { classID, teacherID } = location.state || {};

  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [examID, setExamID] = useState('');

  // fetch preview soal2
  const fetchPreviewExams = async () => {
    try {
      const response = await getData(`${endPointParams}?class_id=${classID}`);
      if (Array.isArray(response) && response.length > 0) {
        setExams(response);
        setExamID(response[0].id);
      } else {
        setExams([]);
        setExamID(null);
      }
    } catch (error) {
      console.error('Error fetching exams preview:', error);
      setError('Failed to fetch exams preview.');
    } finally {
      setLoading(false);
    }
  }

  const handleExamDelete = async () => {
    try {
      await deleteData(endPointParams + "?id=" + examID);
      alert("Succesfully deleted exam");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting exam", error);
      alert("error deleting exam");
    }
  }

  // panggil function fetchPreviewExams 
  useEffect(() => {
    if (classID) {
      fetchPreviewExams();
    }
  }, [classID]);

  if (loading) return <p className="ml-[22rem] mr-24 my-16 text-gray-400">Loading...</p>;
  if (error) return <p className="ml-[22rem] mr-24 my-16 text-red-500">{error}</p>;
  if (!exams?.length) {
    return <p className="ml-[22rem] mr-24 my-16 text-gray-500">Oops! It seems you haven't created exam for this class yet.</p>;
  }

  return (
    <div className="ml-[22rem] mr-24 my-16">
      {exams.map((exam, idx) => (
        <div key={idx} className="mb-4">
          <h1 className="text-3xl font-bold mb-8">{exam.title}</h1>
          {/* tanggal dan waktu */}
          <p className="text-gray-500 mb-6 text-sm">
            Date: {exam.start_time?.substring(0, 10)}<br />
            Time: {exam.start_time?.substring(11, 16)} - {exam.end_time?.substring(11, 16)} WIB
          </p>
          {Object.entries(exam.content)
          .filter(([key]) => /^\d+(_essay)?$/.test(key))
          .map(([key, value]) => {
            const number = key.split('_')[0];
            const isEssay = key.endsWith('_essay');
            const imageBase64 = exam.content[`${number}_pict`] || null;

            const pilihan = isEssay
              ? {}
              : ['a', 'b', 'c', 'd'].reduce((acc, opt) => {
                  const choiceKey = `${number}_${opt}`;
                  if (exam.content[choiceKey]) {
                    acc[opt.toUpperCase()] = exam.content[choiceKey];
                  }
                  return acc;
                }, {});

            const correctAnswer = isEssay ? null : exam.content[`${number}_answer`]?.toUpperCase();

            return (
              <div
                key={key}
                className="shadow-xl rounded-2xl p-6 border border-primary mb-6"
              >
                <h2 className="font-semibold text-lg mb-2">Question {number}</h2>

                {imageBase64 && (
                  <div className="mb-4">
                    <img
                      src={imageBase64}
                      alt={`Question ${number} illustration`}
                      className="w-full max-w-xs h-auto rounded-sm"
                    />
                  </div>
                )}

                <p className="mb-4">{value}</p>

                {isEssay ? (
                  <p className="text-sm text-gray-500 italic">This is an essay question. The answer will be reviewed automatically.</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(pilihan).map(([opt, text]) => (
                      <div
                        key={opt}
                        className={`px-4 py-2 rounded-lg border ${
                          correctAnswer === opt
                            ? 'bg-green-50 border-success'
                            : 'border-gray-300'
                        }`}
                      >
                        <strong>{opt}.</strong> {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div className='flex gap-2 justify-start mt-6'>
        <Button
          className="text-danger border border-danger hoverAnimation2 h-fit"
          onClick={setShowDeleteModal}
        >
          Delete
        </Button>
        <Button
          className="text-orange-300 border border-orange-300 hoverAnimation5 h-fit"
          onClick={() => navigate('/EditExam', { state: { classID, teacherID, examID } })}
        >
          Edit
        </Button>
      </div>

      {showDeleteModal && (
        <Modal
          title="Confirm Exam Deletion"
          fields={[{
            customComponent: <p>Are you sure you want to delete this exam?</p>,
          }]}
          children="Delete"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleExamDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

    </div>
  )
}