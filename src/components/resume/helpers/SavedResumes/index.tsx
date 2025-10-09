"use client";

import { useState, useEffect } from "react";
import CoverLetterCard from "@/components/coverLetter/helpers/coverLetterCard";
import { Resume } from "@/types/resumes";

interface CopiesProps {
  resumes: Resume[];
}

const SavedResumes: React.FC<CopiesProps> = ({ resumes }) => {
  const [resumeList, setResumeList] = useState<Resume[]>(resumes);

  useEffect(() => {
    setResumeList(resumes);
  }, [resumes]);

  const handleDelete = (id: number) => {
    setResumeList((prev) => prev.filter((resume) => resume.id !== id));
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Your Resumes</h2>
      <p className="text-gray-500 text-sm mb-2">Manage your uploaded resumes</p>

      <div className="space-y-3">
        {resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <CoverLetterCard
              key={resume.id}
              id={resume.id}
              title={resume.fileName}
              url={resume.generatedUrl}
              date={new Date(resume.createdAt).toLocaleDateString("en-CA")}
              usage="resume"
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No resumes found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedResumes;
