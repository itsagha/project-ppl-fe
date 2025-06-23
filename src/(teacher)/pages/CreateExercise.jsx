import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { getData, postData } from '@/api/axios';

export default function CreateExercise({ endPointParams }) {
  const { post, classID } = useLocation().state || {};
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [questions, setQuestions] = useState([
    { type: 'multiple',question: '', image: null, choices: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
  ]);

  // ngecek udah ada latsol apa belom
  useEffect(() => {
    const checkExistingExercise = async () => {
      try {
        const res = await getData(`${endPointParams}?material_id=${post.id}&number=0`);
        if (res && res.length > 0) {
          setAlreadyExists(true);
        }
      } catch (error) {
        console.error("Error checking existing exercise:", error);
      }
    };
  
    checkExistingExercise();
  }, [endPointParams, post.id]);

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

    const newExercise = {
      title,
      total_marks: 100,
      material_id: post.id,
      teacher_id: post.teacher_id,
      content,
    };

    try {
      await postData(endPointParams, newExercise);
      alert("Successfully created exercise");
      navigate(-1);
    } catch (error) {
      console.error("Error creating exercise:", error);
      alert("Failed to create exercise");
    }
  };

  if (alreadyExists) {
    return (
      <div className="ml-[22rem] mr-24 my-16">
        <h1 className="text-2xl font-bold mb-4">Exercise already exists</h1>
        <p className="text-gray-600 mb-6">
          An exercise for this subject has already been created. You can't create another one.
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
      <h1 className="text-3xl font-bold mb-8">Create an Exercise for {post.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="shadow-xl rounded-2xl p-6 border border-primary">
          <label className="block font-semibold mb-1">Exercise Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g Exercise for Math"
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
  );
}