"use client"
import { Eye, Edit, Download } from "lucide-react";

interface CardProps {
  title: string;
  url: string;
  company: string;
  date: string;
}

const CoverLetterCard: React.FC<CardProps> = ({ title, url, company, date }) => {
  console.log('CoverLetterCard props:', { title, url, company, date });
  return (
    <div className="flex w-full items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{company} • Created {date}</p>
      </div>
      <div className="flex items-center gap-3 text-gray-600">
        <button 
          className="hover:text-gray-900" 
          onClick={() => window.open(url, "_blank")}
        >
          <Eye size={18} />
        </button>

        <a
          href={url}
          download //forces download
          className="hover:text-gray-900"
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
};

export default CoverLetterCard;
