import React, { useState, useContext } from "react";
import { GlobalInfo } from "./layout";
import { useRouter } from 'next/navigation';
import './QuizForm.css';
import ReactCountryFlag from "react-country-flag";

// Import flag images
import FlagUS from './usimage.png'; // Replace with your actual path
import FlagGB from './usimage.png'; // Replace with your actual path

export default function QuizForm() {
  const { data, setData } = useContext(GlobalInfo);
  const [formData, setFormData] = useState({
    country: "US",
    quizTopic: "",
    targetAudience: "",
    numQuestions: 1,
    questionType: "true_false",
    difficulty: "easy",
    includeAnswers: "yes",
    additionalInstructions: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    setFormData({ ...formData, country: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/pages/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setQuiz(result.quiz);
      setData(result.quiz);
      console.log("context data:", result.quiz);

      setTimeout(() => {
        router.push('/about');
      }, 5000);  // Navigate to the About page after 5 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#f3f3f3] p-8 rounded-lg shadow-md font-space-grotesk text-[#434343]">
      <h2 className="text-2xl font-semibold mb-2">Quiz Generator</h2>
      <p className="text-[#434343] mb-4">
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
              className="w-full p-2 bg-[#FFFFFF] border-none rounded"
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
              className="w-full p-2 bg-[#FFFFFF] border-none rounded"
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
              className="w-full p-2 bg-[#FFFFFF] border-none rounded"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Question Type</label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full p-2 bg-[#FFFFFF] border-none rounded"
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
              className="w-full p-2 bg-[#FFFFFF] border-none rounded"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Country</label>
            <select
  name="country"
  value={formData.country}
  onChange={handleCountryChange}
  className="w-full p-2 bg-[#FFFFFF] border-none rounded"
  required
>
  <option value="US" style={{ backgroundImage: `url('/usimage.png')` }}>
    United States
  </option>
  <option value="GB" style={{ backgroundImage: `url('/gbimage.png')` }}>
    United Kingdom
  </option>
</select>


          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-medium">Include Answers?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="includeAnswers"
                  value="yes"
                  checked={formData.includeAnswers === "yes"}
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
                  checked={formData.includeAnswers === "no"}
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
            className="w-full p-2 bg-[#FFFFFF] border-none rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-36 p-2 bg-[#434343] text-[#FFFFFF] rounded flex items-center justify-center ml-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            <>
              Generate
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      {quiz && (
        <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Quiz Generated Successfully</h3>
        <p className="text-sm text-gray-700">
          Redirecting to the quiz page shortly...
        </p>
      </div>
      
      )}
    </div>
  );
}
