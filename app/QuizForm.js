'use client'
import React, { useState } from 'react';
import './QuizForm.css';
import { FaCopy, FaPrint } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomDropdown from './CustomDropdown'; // Import the custom dropdown component
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import ReCAPTCHA from 'react-google-recaptcha';

//import Image from 'next/image';
// Import flag images
import FlagUS from './usimage.png'; // Replace with your actual path
import FlagGB from './usimage.png'; // Replace with your actual path

export default function QuizForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    country: 'US',
    quizTopic: '',
    targetAudience: '',
    numQuestions: 1,
    questionType: 'true_false',
    difficulty: 'easy',
    includeAnswers: 'yes',
    additionalInstructions: '',
    recaptchaToken: '',

  });

  const [isLoading, setLoading] = useState(false);
  const [isLoadingx, setLoadingx] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [email, setEmail] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // New state for tabs
  const [isOpen, setIsOpen] = useState(false);
  const toggleArrow = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
  };
  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleRecaptchaChange = (token) => {
    setFormData({ ...formData, recaptchaToken: token });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (value) => {
    setFormData({ ...formData, country: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingx(true);
    setIsEmailEntered(false);
    setQuiz('');
    try {
      const response = await fetch('/pages/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setQuiz(result.quiz);
      setLoadingx(false);
      setActiveTab('quiz'); // Switch to quiz tab on form submission
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (email) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsEmailEntered(true);
      } catch (error) {
        console.error('Error submitting email:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const copyToClipboard = () => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = quiz;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    toast.success('Content copied to clipboard!');
  };

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(
      <html>
        <head>
          <title>Print Content</title>
        </head>
        <body style="font-family: Arial, sans-serif;">${quiz}</body>
      </html>
    );
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const renderQuizContent = () => {
    const formattedQuiz = quiz.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    return (
      <div className="mt-4  rounded-lg max-h-80 overflow-y-auto">
        <div className="flex justify-between mb-2">
          <button
           onClick={() => {
            setActiveTab('form');
            setFormData({
              country: 'US',
              quizTopic: '',
              targetAudience: '',
              numQuestions: 1,
              questionType: 'true_false',
              difficulty: 'easy',
              includeAnswers: 'yes',
              additionalInstructions: '',
              recaptchaToken: '',
            });
          }}
          
            className="bg-[#434343] text-[#FFFFFF] p-2 rounded hover:bg-[#333333] transition-colors duration-200 flex items-center"
          >
            <IoArrowBack className="text-white" size={18} />
          </button>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="bg-[#434343] text-[#FFFFFF] p-2 rounded hover:bg-[#333333] transition-colors duration-200 flex items-center"
              aria-label="Copy to Clipboard"
            >
              <FaCopy className="h-5 w-5" />
            </button>
            <button
              onClick={printContent}
              className="bg-[#434343] text-[#FFFFFF] p-2 rounded hover:bg-[#333333] transition-colors duration-200 flex items-center"
              aria-label="Print Content"
            >
              <FaPrint className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-[#d9d9d9] p-5 rounded" // Change this to your desired text color
        dangerouslySetInnerHTML={{ __html: formattedQuiz.replace(/\n/g, '<br>') }}
      />
    </div>
    );
  };
  
  
  

  return (
    <div className="max-w-2xl mx-auto bg-[#f3f3f3] p-2 px-5  pb-5 rounded-lg font-space-grotesk text-[#434343]">
       {/* <div className="flex  mb-4 justify-center">
        <button
          onClick={() => setActiveTab('form')}
          className={`px-4 py-2  ${activeTab === 'form' ? 'bg-[#434343] text-[#FFFFFF]' : 'bg-[#E0E0E0] text-[#434343]'} transition-colors duration-200`}
        >
          Form
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2  ${activeTab === 'quiz' ? 'bg-[#434343] text-[#FFFFFF]' : 'bg-[#E0E0E0] text-[#434343]'} transition-colors duration-200`}
          disabled={!quiz}
        >
          Quiz
        </button>
      </div> */}
      {/* back arrow code commment */}
    
{/* 
      <h2 className="text-2xl font-semibold mb-2 flex"> {activeTab ==='quiz' && (<div>

        <div className="mr-2 mb-2">
      <button
        onClick={() => setActiveTab('form')}
        className="bg-[#434343] text-[#FFFFFF] p-2 rounded hover:bg-[#333333] transition-colors duration-200 flex items-center"
      >
        <IoArrowBack className="text-white" size={15} />
      </button>
    </div>

</div>)}</h2> */}
      {/* <p className="text-[#434343] mb-4">
        More info regarding the quiz generator should go here. 
      </p> */}

     

      {activeTab === 'form' && (
   <form onSubmit={handleSubmit} className="space-y-2">
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
     <div className="col-span-1 md:col-span-1">
       <label className="block mb-1 font-medium">Difficulty</label>
       <div className="relative">
         <select
           name="difficulty"
           value={formData.difficulty}
           onChange={handleChange}
           onClick={toggleArrow} // Toggle isOpen when clicked

           className="w-full p-2 bg-[#FFFFFF] border-none rounded appearance-none"
           required
         >
           <option value="easy">Easy</option>
           <option value="medium">Medium</option>
           <option value="hard">Hard</option>
         </select>
         <svg
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700 pointer-events-none ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M19 9l-7 7-7-7"
           />
         </svg>
       </div>
     </div>
     <div className="col-span-1 md:col-span-1">
       <label className="block mb-1 font-medium">Question Type</label>
       <div className="relative">
         <select
           name="questionType"
           value={formData.questionType}
           onChange={handleChange}
           onClick={toggleArrow}
           className="w-full p-2 bg-[#FFFFFF] border-none rounded appearance-none"
           required
         >
           <option value="true_false">True/False</option>
           <option value="multiple_choice">Multiple Choice</option>
           <option value="short_answer">Short Answer</option>
         </select>
         <svg
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700 pointer-events-none ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M19 9l-7 7-7-7"
           />
         </svg>
       </div>
     </div>
   </div>
   <div className="grid grid-cols-2 gap-4">
     <div className="col-span-1 md:col-span-1">
       <label className="block mb-1 font-medium">Country</label>
       <CustomDropdown
         selectedValue={formData.country}
         onChange={handleCountryChange}
       />
     </div>
     <div className="col-span-1 md:col-span-1">
       <label className="block mb-1 font-medium">No of Questions</label>
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
   </div>
   <div className="grid grid-cols-3 gap-2">
     <div className="col-span-2 md:col-span-1">
       <label className="block mb-1 font-medium">Include Answers</label>
       <div className="flex space-x-4">
         <label className="flex items-center">
           <input
             type="radio"
             name="includeAnswers"
             value="yes"
             checked={formData.includeAnswers === "yes"}
             onChange={handleChange}
             className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-gray-700 checked:border-transparent focus:outline-none"

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
    className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-gray-700 checked:border-transparent focus:outline-none"
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
   <div className="w-full recaptcha-container">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleRecaptchaChange}
              className="g-recaptcha"
              // size="invisible"

            />
          </div>
          <button
          type="submit"
          className="w-26 p-2 mb-5 bg-[#434343] text-[#FFFFFF] p-2 tracking-wide rounded flex items-center justify-center ml-auto"
 
              disabled={isLoadingx || !formData.recaptchaToken} // Disable button if loading or CAPTCHA not verified

            >
          {isLoadingx ? (
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

  
   
      
      )}

{activeTab === 'quiz' && (
  <div>
  






    {renderQuizContent()}
  
 




  </div>
)}


      <ToastContainer />
    </div>
  );
}
