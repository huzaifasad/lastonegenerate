'use client'
import React, { useContext } from "react";
import Link from "next/link";
import QuizForm from "./QuizForm";
import { GlobalInfo } from "./layout";

export default function Home() {
  const { data } = useContext(GlobalInfo);

  return (
    <div className="p-10">
      <QuizForm />
      {data && (
        <div className="flex justify-center mt-4">
          <Link href="/about">
            <button
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
          </Link>
        </div>
      )}
    </div>
  );
}
