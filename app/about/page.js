"use client";
import React, { useContext } from "react";
import { GlobalInfo } from "../layout";

export default function About() {
  const { data } = useContext(GlobalInfo);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#434343]">
          Full Quiz
        </h1>
        <p className="text-lg text-[#434343] mb-4 text-center">
          This Quiz displays Here
        </p>
        <div className="bg-[#f3f3f3] p-4 rounded-lg text-center">
          <span className="text-xl font-semibold text-[#434343]">Data: </span>
          <div dangerouslySetInnerHTML={{ __html: data }} className="text-[#434343]" />
        </div>
      </div>
    </div>
  );
}
