"use client"

import { generateCoverLetter } from "@/services/coverLetterService";
import { User } from "@/types/userType";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import Loader from "@/components/common/loader"; 
import { toast } from 'sonner';

interface UserProps {
  user: User
}

// 1. Define your suggestion list here
const SKILL_SUGGESTIONS = [
  "Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", 
  "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "GraphQL", 
  "Figma", "Redux", "Express.js", "Jest", "Cypress"
];

const CoverLetterGenerator: FC<UserProps> = ({ user }) => {
  const { data: session, update } = useSession(); 
  const [title, setTitle] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [fullName, setfullName] = useState('');
  const [tone, setTone] = useState('Professional');
  const [description, setdescription] = useState('');
  const [exp, setExp] = useState('');
  const [skills, setskills] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const CoverLetterGen = async (e: React.FormEvent) => { 
    e.preventDefault();
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('fullName', fullName);
    formdata.append('companyName', companyName);
    formdata.append('description', description);
    formdata.append('tone', tone);
    formdata.append('exp', exp);
    formdata.append('skills', skills);

    try {
      await generateCoverLetter(formdata);
      await update();
      
      // Reset form
      setTitle('');
      setTone('Professional');
      setExp('');
      setcompanyName('');
      setdescription('');
      setfullName('');
      setskills('');
      
      toast.success("Cover letter generated successfully!");
      
      // Refresh to show new data if necessary
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate cover letter. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="border border-white rounded-lg shadow-sm p-4 bg-white">
        <form className="space-y-4" onSubmit={CoverLetterGen}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name *</label>
            <input
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              required
              type="text"
              placeholder="e.g. John Doe"
              className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name *</label>
              <input
                value={companyName}
                onChange={(e) => setcompanyName(e.target.value)}
                required
                type="text"
                placeholder="e.g. TechCorp Inc."
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description *</label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
              placeholder="Paste the job description here..."
              className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Friendly">Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                required
                type="text"
                placeholder="e.g. 5 years"
                className="mt-1 bg-gray-100 w-full rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* AUTOCOMPLETE SKILLS INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Key Skills *</label>
            <input
              list="skills-options" // This ID must match the datalist ID below
              value={skills}
              onChange={(e) => setskills(e.target.value)}
              required
              placeholder="Start typing (e.g. Nextjs)..."
              className="mt-1 bg-gray-100 w-full rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <datalist id="skills-options">
              {SKILL_SUGGESTIONS.map((skill) => (
                <option key={skill} value={skill} />
              ))}
            </datalist>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverLetterGenerator;