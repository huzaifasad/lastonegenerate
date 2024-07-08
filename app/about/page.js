// Import necessary libraries
'use client'
import React, { useContext, useState } from 'react';
import { GlobalInfo } from '../layout';
import { FaCopy, FaPrint } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom toast styles
const customToastStyle = {
  backgroundColor: '#434343',
  color: '#FFFFFF',
  borderRadius: '8px',
};

// About component
export default function About() {
  const { data } = useContext(GlobalInfo);
  const [email, setEmail] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle email submit
  const handleEmailSubmit = () => {
    if (email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsEmailEntered(true);
      }, 1000); // Simulating a loading time of 1 second
    }
  };

  // Copy content to clipboard
  const copyToClipboard = () => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = data;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    // Show toast notification
    toast.success('Content copied to clipboard!', {
      style: customToastStyle,
    });
  };

  // Print content
  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Content</title>
        </head>
        <body style="font-family: Arial, sans-serif;">${data}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close(); // Close the new window after printing
  };

  // Render content based on email status
  const renderContent = () => {
    if (isEmailEntered) {
      return (
        <div className="text-[#434343] transition-opacity duration-500 ease-in-out opacity-100 relative" style={{ textAlign: 'left' }}>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={copyToClipboard}
              className="bg-[#434343] text-[#FFFFFF] py-1 px-3 rounded flex items-center justify-center hover:bg-[#333333] transition-colors duration-200"
            >
              <FaCopy className="h-5 w-5" />
              <span className="ml-2">Copy Content</span>
            </button>
            <button
              onClick={printContent}
              className="bg-[#434343] text-[#FFFFFF] py-1 px-3 rounded flex items-center justify-center hover:bg-[#333333] transition-colors duration-200"
            >
              <FaPrint className="h-5 w-5" />
              <span className="ml-2">Print Content</span>
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.replace(/\n/g, '<br>') }} className="mt-4" />
        </div>
      );
    } else {
      // Extract the first 10 words
      const words = data.split(' ');
      const firstTenWords = words.slice(0, 10).join(' ');
      const restOfTheData = words.slice(10).join(' ');

      return (
        <div className="text-[#434343]">
          <div dangerouslySetInnerHTML={{ __html: firstTenWords.replace(/\n/g, '<br>') }} />
          <div
            dangerouslySetInnerHTML={{ __html: restOfTheData.replace(/\n/g, '<br>') }}
            className="blur-lg select-none"
            style={{ filter: 'blur(5px)', pointerEvents: 'none' }}
          />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-space-grotesk">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#434343]">Full Quiz</h1>
        <p className="text-lg text-[#434343] mb-4 text-center">This Quiz displays Here</p>
        {!isEmailEntered && (
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-[#434343]"
              placeholder="Enter your email"
            />
            <button
              onClick={handleEmailSubmit}
              className="w-full bg-[#434343] text-[#FFFFFF] py-2 px-4 rounded flex items-center justify-center hover:bg-[#333333] transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        )}
        <div className="bg-[#F3F3F3] p-4 rounded-lg text-center relative">
          <span className="text-xl font-semibold text-[#434343]">Data: </span>
          {isLoading ? (
            <div className="flex justify-center items-center mt-4">
              <svg
                className="animate-spin h-8 w-8 text-[#434343]"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
      <ToastContainer 
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </div>
  );
}
