"use client"
import CoverLetterGenerator from "@/components/coverLetter/helpers/generator";
import SavedCovers from "@/components/coverLetter/helpers/savedCovers";
import WritingTips from "@/components/coverLetter/helpers/writingTips";
import { getCoverLetters } from "@/services/coverLetterService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CoverLetterGen = () => {
    const { data: session, status } = useSession();
    const [covers, setcovers]= useState<[]>([])
    useEffect(() =>{
        const getCovers = async() =>{
        const covers = await getCoverLetters()
        setcovers(covers.urls)
        console.log(covers)
        }
        getCovers()

    },[session,status])
    

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 w-full p-5">
      <div className="md:flex-2  flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-start justify-start md:w-5/6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Generate New Cover Letter
            </h2>
            <p className="text-sm text-gray-500">
              2 generations remaining this month
            </p>
          </div>
          <CoverLetterGenerator />
          <div className="p-4 w-full">
          <SavedCovers covers={covers}/></div>
        </div>
      </div>
      <div className="md:flex-1 mt-18">
        <div className="flex flex-col">
          <WritingTips />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGen;