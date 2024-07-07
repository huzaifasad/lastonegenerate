'use client'
import React, { useContext, useState } from "react";
import Link from "next/link";
import QuizForm from "./QuizForm";
import { GlobalInfo } from "./layout";

export default function Home() {
  const { data } = useContext(GlobalInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = () => {
    // Here you can validate email if needed before setting it
    // For simplicity, let's assume email validation is done
    setIsModalOpen(false);
  };

  const handleClickAbout = () => {
    openModal();
  };

  return (
    <div className="p-10">
      <QuizForm />
      {data && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClickAbout}
            className="border-2 bg-[#434343] text-[#FFFFFF] py-2 px-4 rounded flex items-center justify-center hover:bg-[#333333] transition-colors duration-200"
          >
            Go to View Full Quiz
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
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">Enter Email</h2>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <Link href={`/about?email=${encodeURIComponent(email)}`}>
                <button
                  onClick={handleSubmitEmail}
                  className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors duration-200"
                >
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
