"use client"

import { generateCoverLetter } from "@/services/coverLetterService";
import { User } from "@/types/userType";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import Loader from "@/components/common/loader"; 

interface UserProps{
  user:User
}
const CoverLetterGenerator: FC<UserProps>= ({user}) => {
    const { data: session, update } = useSession(); 
    const [title, setTitle] = useState('')
    const [companyName, setcompanyName] = useState('')
    const [fullName, setfullName] = useState('')
    const [tone, setTone] = useState('')
    const [description, setdescription] = useState('')
    const [exp, setExp] = useState('')
    const [skills, setskills] = useState('')
    const [isLoading, setIsLoading] = useState(false); 

    const CoverLetterGen = async(e:any) =>{ 
        setIsLoading(true);
        e.preventDefault();
        const formdata= new FormData()
        formdata.append('title',title)
        formdata.append('fullName',fullName)
        formdata.append('companyName',companyName)
        formdata.append('description',description)
        formdata.append('tone',tone)
        formdata.append('exp',exp)
        formdata.append('skills',skills)
        console.log(fullName,title,companyName,description,tone,exp,skills)
        try{
        const response = await generateCoverLetter(formdata);
        //console.log(response)
        await update();
        setTitle('')
        setTone('')
        setExp('')
        setcompanyName('')
        setdescription('')
        setfullName('')
        setskills('')
        }
        catch(error){
            //console.log(error)
        }
        finally {
              setIsLoading(false); 
             window.location.reload();
            }

    }
   
  return (
    <div className="w-full mx-auto p-4">
      <div className="border border-white rounded-lg shadow-sm p-4 bg-white">
              {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <Loader />
        </div>
      )}

        <form className="space-y-4" onSubmit={CoverLetterGen}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Full name *</label>
              <input
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                required
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="mt-1 w-full rounded-md  bg-gray-100  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                className="mt-1 w-full rounded-md  bg-gray-100  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                className="mt-1 w-full rounded-md  bg-gray-100  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description *</label>
            <textarea
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              required
              placeholder="Paste the job description here for a more tailored cover letter..."
              className="mt-1 w-full rounded-md  bg-gray-100  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none h-20"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <select
                onChange={(e) => setTone(e.target.value)}
                value={tone}
               className="mt-1 w-full rounded-md  bg-gray-100  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                <option>Professional</option>
                <option>Casual</option>
                <option>Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
              <input
                onChange={(e) => setExp(e.target.value)}
                value={exp}
                required
                type="text"
                placeholder="e.g. 5 years"
                className="mt-1 bg-gray-100 w-full rounded-md  p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Key Skills*</label>
            <textarea
              onChange={(e) => setskills(e.target.value)}
              value={skills}
              required
              placeholder="List your key skills relevant to this position..."
              className="mt-1 bg-gray-100 w-full rounded-md   p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none h-20"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={user?.plan === "free" || user?.status === "inactive"}
              className="w-full bg-[var(--dark-amber)] text-white cursor-pointer font-medium py-2 px-4 rounded-md transition"
            >
              Generate Cover Letter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CoverLetterGenerator;
