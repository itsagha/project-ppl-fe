import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteData, getData } from '@/api/axios';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

export default function PreviewExercise({ endPointParams }) {
  const location = useLocation();
  const { post } = location.state || {};
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exerciseID, setExerciseID] = useState('');

  const fetchPreviewExercise = async () => {
    try {
      const response = await getData(`${endPointParams}?material_id=${post.id}&number=0`);
      
      if (Array.isArray(response) && response.length > 0) {
        setExercises(response);
        setExerciseID(response[0].id);
      } else {
        setExercises([]);
        setExerciseID(null);
      }
  
    } catch (error) {
      console.error('Error fetching exercise preview', error);
      setError('Failed fetching exercise preview');
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseDelete = async () => {
    try {
      await deleteData (endPointParams + "?id=" + exerciseID);
      alert("Successfully deleted exercise");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting exercise", error);
      alert("Error deleting exercise");
    }
  }

  useEffect(() => {
    if (post?.id) fetchPreviewExercise();
  }, [post]);

  if (loading) return <p className="ml-[22rem] mr-24 my-16 text-gray-400">Loading...</p>;
  if (error) return <p className="ml-[22rem] mr-24 my-16 text-red-500">{error}</p>;
  if (!exercises?.length) {
    return <p className="ml-[22rem] mr-24 my-16 text-gray-500">Oops! It seems you haven't created exercise for this subject yet.</p>;
  }

  return (
    <div className="ml-[22rem] mr-24 my-16">
      {exercises.map((exercise, idx) => (
        <div key={idx} className="mb-4">
          <h1 className="text-3xl font-bold mb-8">{exercise.title}</h1>
          {Object.entries(exercise.content)
          .filter(([key]) => /^\d+(_essay)?$/.test(key))
          .map(([key, value]) => {
            const number = key.split('_')[0];
            const isEssay = key.endsWith('_essay');
            const imageBase64 = exercise.content[`${number}_pict`] || null;

            const pilihan = isEssay
              ? {}
              : ['a', 'b', 'c', 'd'].reduce((acc, opt) => {
                  const choiceKey = `${number}_${opt}`;
                  if (exercise.content[choiceKey]) {
                    acc[opt.toUpperCase()] = exercise.content[choiceKey];
                  }
                  return acc;
                }, {});

            const correctAnswer = isEssay ? null : exercise.content[`${number}_answer`]?.toUpperCase();

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
          onClick={() => navigate('/EditExercise', { state: { post } })}
        >
          Edit
        </Button>
      </div>

      {showDeleteModal && (
        <Modal
          title="Confirm Exercise Deletion"
          fields={[{
            customComponent: <p>Are you sure you want to delete this exercise?</p>,
          }]}
          children="Delete"
          className="border-danger text-danger hoverAnimation2"
          onSubmit={handleExerciseDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

    </div>
  );
}