'use client';
import { useState } from 'react';

export default function QuizForm() {
  const [formData, setFormData] = useState({
    quizTopic: '',
    targetAudience: '',
    numQuestions: 1,
    questionType: 'true_false',
    difficulty: 'easy',
    includeAnswers: 'yes',
    additionalInstructions: '',
  });

  const [quiz, setQuiz] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/pages/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setQuiz(result.quiz);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Quiz Generator</h2>
      <p className="text-gray-600 mb-4">
        More info regarding the quiz generator should go here. More info
        regarding the quiz generator should go here.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Quiz Topic</label>
            <input
              type="text"
              name="quizTopic"
              value={formData.quizTopic}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Target Audience</label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Number of Questions</label>
            <input
              type="number"
              name="numQuestions"
              value={formData.numQuestions}
              onChange={handleChange}
              min="1"
              max="50"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Question Type</label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="true_false">True/False</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_answer">Short Answer</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Include Answers?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="includeAnswers"
                  value="yes"
                  checked={formData.includeAnswers === 'yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="includeAnswers"
                  value="no"
                  checked={formData.includeAnswers === 'no'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Other Info</label>
          <textarea
            name="additionalInstructions"
            value={formData.additionalInstructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button type="submit" className="w-full p-2 bg-gray-800 text-white rounded">
          Generate
        </button>
      </form>

      {quiz && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Generated Quiz:</h3>
          <div dangerouslySetInnerHTML={{ __html: quiz }} />
        </div>
      )}
    </div>
  );
}
