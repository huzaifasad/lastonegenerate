'use client'
import React, { useContext } from "react";
import Link from "next/link";
import QuizForm from "./QuizForm";
import { GlobalInfo } from "./layout";
// import { First } from "@/components/component/first";
import { Second } from "@/components/component/second";

export default function Home() {
  const { data } = useContext(GlobalInfo);

  return (
    <>
    
    {/* <First/> */}
    <Second/>
    </>
     
  );
}
