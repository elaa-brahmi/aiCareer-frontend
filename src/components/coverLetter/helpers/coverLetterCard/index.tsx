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
  onDelete?: (id: number) => void;

}

const CoverLetterCard: React.FC<CardProps> = ({ id, title, url, company, date,usage,onDelete }) => {
  const deleteResume = async(resumeId?:number) =>{
    if(!resumeId) return;
    try {
      await deleteUserResume(resumeId);
      onDelete?.(resumeId);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
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
          download 
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
