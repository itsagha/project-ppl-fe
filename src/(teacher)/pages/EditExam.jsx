import { getData, updateData } from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/Button';

export default function EditExam({ endPointParams }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { classID, teacherID, examID } = location.state || {}; // ambil class ID

  const [title , setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // fetch soal2
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getData(`${endPointParams}?class_id=${classID}`);
        const exam = response[0];
        setTitle(exam.title);

        const content = exam.content;
        const parsedQuestions = [];
        let index = 1;

        setStartTime(exam.start_time?.substring(11, 16) || '');
        setEndTime(exam.end_time?.substring(11, 16) || '');

        while (content[index] || content[`${index}_essay`]) {
          const isEssay = !!content[`${index}_essay`];
          const base = {
            type: isEssay ? 'essay' : 'multiple',
            question: content[`${index}_essay`] || content[index],
            image: content[`${index}_pict`] || null,
          };

          if (!isEssay) {
            base.choices = {
              A: content[`${index}_a`] || '',
              B: content[`${index}_b`] || '',
              C: content[`${index}_c`] || '',
              D: content[`${index}_d`] || '',
            };
            base.correctAnswer = ['a', 'b', 'c', 'd'].indexOf((content[`${index}_answer`] || '').toLowerCase()).toString();
          }

          parsedQuestions.push(base);
          index++;
        }

        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Failed to fetch exam data", error);
      }
    };
    fetchExam();
  }, [classID, endPointParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;

    // Reset jika ganti type
    if (field === 'type' && value === 'essay') {
      newQuestions[index].choices = undefined;
      newQuestions[index].correctAnswer = '';
    } else if (field === 'type' && value === 'multiple') {
      newQuestions[index].choices = { A: '', B: '', C: '', D: '' };
      newQuestions[index].correctAnswer = '';
    }

    setQuestions(newQuestions);
  };

  const handleChoiceChange = (index, option, value) => {
    const newQuestions = [...questions];
    newQuestions[index].choices[option] = value;
    setQuestions(newQuestions);
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newQuestions = [...questions];
      newQuestions[index].image = reader.result;
      setQuestions(newQuestions);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'multiple',
        question: '',
        choices: { A: '', B: '', C: '', D: '' },
        correctAnswer: '',
        image: null,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = {};
    questions.forEach((q, i) => {
      const idx = i + 1;

      if (q.type === 'essay') {
        content[`${idx}_essay`] = q.question;
      } else {
        content[idx] = q.question;
        content[`${idx}_a`] = q.choices.A;
        content[`${idx}_b`] = q.choices.B;
        content[`${idx}_c`] = q.choices.C;
        content[`${idx}_d`] = q.choices.D;
        content[`${idx}_answer`] = ['a', 'b', 'c', 'd'][parseInt(q.correctAnswer)];
      }

      if (q.image) content[`${idx}_pict`] = q.image;
    });

    const todayDate = new Date().toISOString().split('T')[0];
    const formattedStart = `${todayDate}T${startTime}:00+07:00`;
    const formattedEnd = `${todayDate}T${endTime}:00+07:00`;

    const updatedExam = {
      title,
      total_marks: 100,
      class_id: classID,
      teacher_id: teacherID,
      start_time: formattedStart,
      end_time: formattedEnd,
      content,
    };

    try {
      await updateData(`${endPointParams}?id=${examID}`, updatedExam);
      alert('Successfully updated exercise');
      navigate(-1);
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert('Failed to update exercise');
    }
  };

  return (
    <div className="ml-[22rem] mr-24 my-16">
      <h1 className="text-3xl font-bold mb-8">Edit Exercise for {title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="shadow-xl rounded-2xl p-6 border border-primary">
          {/* input judul */}
          <label className="block font-semibold mb-1">Exercise Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* input start time */}
          <label className="block font-semibold my-1">Start Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          {/* input end time */}
          <label className="block font-semibold my-1">End Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="shadow-xl rounded-2xl p-6 border border-primary">
            <h2 className="font-semibold text-lg mb-2">Question {index + 1}</h2>

            <label className="block font-semibold mb-1">Question Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              value={q.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="essay">Essay</option>
            </select>

            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              placeholder="Write your question here"
              required
            />

            <div className="mb-4 mt-2">
              <label className="block font-semibold mb-1">Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
              {q.image && (
                <img src={q.image} alt={`Preview ${index + 1}`} className="mt-2 w-32 h-auto rounded-sm" />
              )}
            </div>

            {q.type === 'multiple' && (
              <>
                <label className="block font-semibold mt-4 mb-1">Answer options</label>
                {['A', 'B', 'C', 'D'].map((option) => (
                  <input
                    key={option}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                    value={q.choices[option]}
                    onChange={(e) => handleChoiceChange(index, option, e.target.value)}
                    placeholder={`Option ${option}`}
                    required
                  />
                ))}

                <label className="block font-semibold mb-1">Correct answer</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                  required
                >
                  <option value="" disabled>Choose the correct answer</option>
                  <option value="0">Option A</option>
                  <option value="1">Option B</option>
                  <option value="2">Option C</option>
                  <option value="3">Option D</option>
                </select>
              </>
            )}

            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="text-red-600 hover:underline text-sm cursor-pointer mt-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handleAddQuestion}
            className="text-primary border border-primary hoverAnimation"
          >
            Add another question
          </Button>
          <Button type="submit" className="text-success border border-success hoverAnimation3">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
