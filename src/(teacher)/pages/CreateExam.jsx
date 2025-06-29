import { getData, postData } from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

export default function CreateExam({ endPointParams }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { classID, teacherID } = location.state || {}; // ambil class ID
  const [title, setTitle] = useState('');
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const today = new Date().toISOString().split('T')[0]; // '2025-06-29'
  const timezoneOffset = '+07:00';
  const formattedStart = `${today}T${startTime}:00${timezoneOffset}`;
  const formattedEnd = `${today}T${endTime}:00${timezoneOffset}`;
  const [questions, setQuestions] = useState ([
    { type: 'multiple',question: '', image: null, choices: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
  ]);

  // ngecek udah ada exam apa belom
  useEffect(() => {
    const checkExistingExam = async () => {
      try {
        const res = await getData(`${endPointParams}?class_id=${classID}`);
        if (res && res.length > 0) {
          setAlreadyExists(true);
        }
      } catch (error) {
        console.error("Error checking existing exercise:", error);
      }
    }

    checkExistingExam();
  }, [endPointParams, classID]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };  

  const handleChoiceChange = (index, option, value) => {
    const newQuestions = [...questions];
    newQuestions[index].choices[option] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'multiple', question: '', choices: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
    ]);
  };

  // upload gambar
  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newQuestions = [...questions];
      newQuestions[index].image = {
        name: file.name,
        base64: reader.result,
      };
      setQuestions(newQuestions);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = {};

    questions.forEach((q, i) => {
      const number = (i + 1).toString();

      if (q.type === 'multiple') {
        content[number] = q.question;
        content[`${number}_a`] = q.choices.A;
        content[`${number}_b`] = q.choices.B;
        content[`${number}_c`] = q.choices.C;
        content[`${number}_d`] = q.choices.D;

        if (q.image?.base64) {
          content[`${number}_pict`] = q.image.base64;
        }

        const correctLetter = ['a', 'b', 'c', 'd'][parseInt(q.correctAnswer)];
        content[`${number}_answer`] = correctLetter;
      } else if (q.type === 'essay') {
        content[`${number}_essay`] = q.question;

        if (q.image?.base64) {
          content[`${number}_pict`] = q.image.base64;
        }
      }
    });

    const newExam = {
      title,
      total_marks: 100,
      class_id: classID,
      teacher_id: teacherID,
      start_time: formattedStart,
      end_time: formattedEnd,
      content,
    };

    try {
      await postData(endPointParams, newExam);
      alert("Successfully created an exam");
      navigate(-1);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Failed to create exam: ");
    }
  };

  // kalo udah ada exam, maka munculin pesan
  if (alreadyExists) {
    return (
      <div className="ml-[22rem] mr-24 my-16">
        <h1 className="text-2xl font-bold mb-4">Exam already exists</h1>
        <p className="text-gray-600 mb-6">
          An exam for this class has already been created. You can't create another one.
        </p>
        <Button
          className="text-primary border border-primary hoverAnimation"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="ml-[22rem] mr-24 my-16">
      <h1 className="text-3xl font-bold mb-8">Create an Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="shadow-xl rounded-2xl p-6 border border-primary">
          <label className="block font-semibold mb-1">Exam Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g Exam for Math"
            required
          />
          {/* start time */}
          <label className="block font-semibold mt-4 mb-1">Start Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          {/* end time */}
          <label className="block font-semibold mt-4 mb-1">End Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        {/* Soal-soal */}
        {questions.map((q, index) => (
          <div
            key={index}
            className="shadow-xl rounded-2xl p-6 border border-primary"
          >
            <h2 className="font-semibold text-lg mb-2">Question {index + 1}</h2>
            {/* tipe pertanyaan */}
            <label className="block mb-1">Question Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, 'type', e.target.value)
              }
            >
              <option value="multiple">Multiple Choice</option>
              <option value="essay">Essay</option>
            </select>

            {/* Pertanyaan */}
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, 'question', e.target.value)
              }
              placeholder="Write your question here"
              required
            />
            
            {/* input gambar */}
            <label className="block font-semibold mt-4 mb-1">Attach Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
            />
            {q.image && (
              <p className="text-xs text-gray-500 mt-1">Image selected: {q.image.name}</p>
            )}

            {/* Pilihan jawaban */}
            {q.type === 'multiple' ? (
              <>
                <label className="block font-semibold mb-1">Answer options</label>
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

                {/* jawaban yang bener */}
                <label className="block font-semibold mb-1">Correct answer</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, 'correctAnswer', e.target.value)
                  }
                  required
                >
                  <option value="" disabled>Choose the correct answer</option>
                  <option value="0">Option A</option>
                  <option value="1">Option B</option>
                  <option value="2">Option C</option>
                  <option value="3">Option D</option>
                </select>
              </>
            ) : (
              <p className="text-sm text-gray-500">This is an essay question. The answer will be evaluated automatically.</p>
            )}
          </div>
        ))}

        {/* Tombol Tambah Soal */}
        <div className="flex justify-between">
          <Button
            onClick={handleAddQuestion}
            className="text-primary border border-primary hoverAnimation"
          >
            Add another question
          </Button>
          {/* Submit */}
          <Button
            type="submit"
            className="text-success border border-success hoverAnimation3"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}