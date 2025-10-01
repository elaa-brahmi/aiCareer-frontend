"use client"
import { deleteUserResume } from "@/services/resumeService";
import { Eye, Download, Trash2Icon } from "lucide-react";

interface CardProps {
  id?:number;
  title: string;
  url: string;
  company?: string;
  date: string;
  usage?:string;

}

const CoverLetterCard: React.FC<CardProps> = ({ id, title, url, company, date,usage }) => {
  const deleteResume = async(resumeId?:string) =>{
    if(!resumeId) return;
    try {
      const response = await deleteUserResume(resumeId);
      console.log("Delete success:", response);
      // Optionally, refresh the list of resumes after deletion
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
  //console.log('CoverLetterCard props:', { title, url, company, date });
  return (
    <div className="flex w-full items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{company || ''} • Created {date}</p>
      </div>
      <div className="flex items-center gap-3 text-gray-600">
        <button 
          className="hover:text-gray-900 cursor-pointer" 
          onClick={() => window.open(url, "_blank")}
        >
          <Eye size={18} />
        </button>

        <a
          href={url}
          download //forces download
          className="hover:text-gray-900 cursor-pointer"
        >
          <Download size={18} />
        </a>
        {usage==="resume" && <button 
          className="text-red-700 cursor-pointer" 
          onClick={() => deleteResume(id)}
        >
          <Trash2Icon size={18} />
        </button>}

      </div>
    </div>
  );
};

export default CoverLetterCard;
