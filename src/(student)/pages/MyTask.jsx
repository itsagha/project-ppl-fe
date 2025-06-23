// Revisi penuh MyTask.jsx dengan dukungan soal essay
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getData, postData, updateData } from '@/api/axios';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

export default function MyTask({ endPointParams }) {
  const navigate = useNavigate();
  const { post } = useLocation().state || {};
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [exerciseAnswerID, setExerciseAnswerID] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setStudentID(userData.student_id);
    }
  }, []);

  const fetchExerciseAnswerID = async () => {
    try {
      const response1 = await getData(`${endPointParams}?material_id=${post.id}`);
      const exercise = response1[0];
      setExerciseID(exercise.id);

      const response = await getData(`${endPointParams}-answers?exercise_id=${exercise.id}&student_id=${studentID}`);

      if (Array.isArray(response) && response.length > 0) {
        setExerciseAnswerID(response[0].id);
        setSelectedAnswers(response[0].answers || {});
        setAnsweredQuestions(Object.keys(response[0].answers || {}).map(key => parseInt(key)));
      } else {
        const newAnswer = await postData(`${endPointParams}-answers`, {
          exercise_id: exercise.id,
          student_id: studentID,
          answers: {},
        });
        setExerciseAnswerID(newAnswer.id);
      }
    } catch (err) {
      console.error("Failed fetching or creating exercise answer", err);
    }
  };

  const fetchAllQuestions = async () => {
    let number = 1;
    let fetched = [];
    let stop = false;

    while (!stop) {
      try {
        const response = await getData(`${endPointParams}/student?material_id=${post.id}&number=${number}`);
        if (!response || response.length === 0) break;

        const content = response[0].content;
        const isEssay = !!content[`${number}_essay`];
        const questionText = isEssay ? content[`${number}_essay`] : content[number];
        const options = isEssay ? null : {
          A: content[`${number}_a`] || '',
          B: content[`${number}_b`] || '',
          C: content[`${number}_c`] || '',
          D: content[`${number}_d`] || '',
        };

        if (!questionText) break;

        fetched.push({
          number,
          title: response[0].title,
          question: questionText,
          options,
          imageBase64: content[`${number}_pict`] || null,
          isEssay,
        });
        number++;
      } catch (err) {
        console.error("Error fetching question number", number, err);
        stop = true;
      }
    }

    setQuestions(fetched);
    setCurrentQuestionNumber(1);
  };

  useEffect(() => {
    if (post?.id && studentID) {
      fetchExerciseAnswerID();
      fetchAllQuestions();
    }
  }, [post?.id, studentID]);

  const handleAnswer = async (number, value) => {
    const updated = {
      ...selectedAnswers,
      [number]: typeof value === 'string' ? value : value.toLowerCase(),
    };
    setSelectedAnswers(updated);
    if (!answeredQuestions.includes(number)) setAnsweredQuestions(prev => [...prev, number]);
    try {
      await updateData(`${endPointParams}-answers?id=${exerciseAnswerID}`, {
        exercise_id: exerciseID,
        student_id: studentID,
        answers: updated,
      });
    } catch (err) {
      console.error("Failed updating answer", err);
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      await postData(`${endPointParams}/calculate-grade`, {
        exercise_id: exerciseID,
        student_id: studentID,
      });
      setShowConfirmModal(false);
      navigate(-1);
    } catch (err) {
      console.error("Failed to submit grade calculation", err);
    }
  };

  const currentQuestion = questions[currentQuestionNumber - 1];
  if (!currentQuestion) return <p className="ml-[22rem] mr-24 my-16 text-gray-400">Loading questions...</p>;

  return (
    <div className="flex gap-8 ml-[22rem] mr-24 my-16">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">{currentQuestion.title}</h1>
        <div className="shadow-xl border border-primary rounded-2xl p-6 mb-4">
          <h2 className="font-semibold text-lg mb-2">Question {currentQuestion.number}</h2>
          {currentQuestion.imageBase64 && (
            <div className="mb-4">
              <img
                src={currentQuestion.imageBase64}
                alt={`Question ${currentQuestion.number}`}
                className="w-full max-w-xs h-auto rounded-sm"
              />
            </div>
          )}
          <p className="mb-4">{currentQuestion.question}</p>
          {currentQuestion.isEssay ? (
            <textarea
              className="w-full h-40 border rounded-lg p-2"
              placeholder="Your answer here..."
              value={selectedAnswers[currentQuestion.number] || ''}
              onChange={(e) => handleAnswer(currentQuestion.number, e.target.value)}
            />
          ) : (
            <div className="space-y-3">
              {Object.entries(currentQuestion.options).map(([opt, val]) => {
                const selected = selectedAnswers[currentQuestion.number]?.toLowerCase() === opt.toLowerCase();
                return (
                  <div
                    key={opt}
                    onClick={() => handleAnswer(currentQuestion.number, opt)}
                    className={`p-2 border rounded-lg cursor-pointer transition duration-300
                      ${selected ? 'bg-blue-100 border-primary' : 'hover:bg-blue-100 hover:border-primary'}`}
                  >
                    <strong>{opt}.</strong> {val}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Button
          className="border border-success text-success hoverAnimation3"
          onClick={() => setShowConfirmModal(true)}
        >Submit</Button>
      </div>

      <div className="w-40">
        <h2 className="text-lg font-semibold mb-4">Question List</h2>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((q) => (
            <button
              key={q.number}
              onClick={() => setCurrentQuestionNumber(q.number)}
              className={`rounded-lg p-2 text-sm font-bold border transition duration-300
                ${currentQuestionNumber === q.number ? 'bg-primary text-white' : ''}
                ${answeredQuestions.includes(q.number) ? 'border-success' : 'border-gray-400'}`}
            >{q.number}</button>
          ))}
        </div>
      </div>

      {showConfirmModal && (
        <Modal
          title="Confirmation of Assignment Submission"
          fields={[{ customComponent: <p>Are you sure you want to hand over your exercise?</p> }]}
          children="Submit"
          className="border-success text-success hoverAnimation3"
          onSubmit={handleSubmitAnswer}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}