"use client"
import CoverLetterGenerator from "@/components/coverLetter/helpers/generator";
import SavedCovers from "@/components/coverLetter/helpers/savedCovers";
import { UsageStatistics } from "@/components/coverLetter/helpers/UsageStatistics";
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
        setcovers(covers.urls || [])
        console.log(covers)
        }
        getCovers()

    },[session,status])
    

  return (
    <div className="md:flex md:flex-row mx-auto items-center md:items-start justify-center md:bg-gray-100 w-full p-5">
      <div className="md:flex-2 md:flex md:flex-row md:items-center md:justify-center">

        <div className="w-full md:ps-4  md:w-5/6">
          <div className="mb-4 md:ps-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Generate New Cover Letter
            </h2>
            <p className="text-sm text-gray-500">
              2 generations remaining this month
            </p>
          </div>
          <CoverLetterGenerator user={session?.user}/>
          <div className="p-4 w-full">
            <SavedCovers covers={covers}/>
          </div>
        </div>

      </div>
      <div className="md:flex-1 mt-18">
        <div className="flex flex-col gap-6">
          <WritingTips />
          { session?.user?.plan ==="free" && (<UsageStatistics user={session?.user} />)}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGen;
// app/cover-letter/page.tsx (Server Component)
/* import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getCoverLetters } from "@/services/coverLetterService";
import CoverLetterGenerator from "@/components/coverLetter/helpers/generator";
import SavedCovers from "@/components/coverLetter/helpers/savedCovers";
import WritingTips from "@/components/coverLetter/helpers/writingTips";

export default async function CoverLetterGen() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="p-5 text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  const covers = await getCoverLetters();

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 w-full p-5">
      <div className="md:flex-2 flex flex-col items-center justify-center">
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
            <SavedCovers covers={covers.urls || []} />
          </div>
        </div>
      </div>

      <div className="md:flex-1 mt-18">
        <div className="flex flex-col">
          <WritingTips />
        </div>
      </div>
    </div>
  );
} */
