import { Upload, FileText, Cloud, MessageCircle } from "lucide-react";
import Link from "next/link";

const QuickActions = async() => {
  return (
    <div className="w-full border border-gray-200 rounded-xl bg-white shadow-sm p-6">
      <div>
        <h2 className="text-gray-800 font-semibold text-lg">Quick Actions</h2>
        <p className="text-gray-500 text-sm mt-1">
          Get started with these common tasks
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button className="flex items-center justify-center gap-2 bg-[var(--dark-amber)]  text-white font-semibold px-6 py-3 rounded-md transition-all duration-200 w-full sm:w-1/3">
          <Upload className="w-4 h-4" />
          
          <Link href="/resume-upload">Upload Resume</Link>
        </button>

        <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold px-6 py-3 rounded-md transition-all duration-200 w-full sm:w-1/3">
          <FileText className="w-4 h-4" />
          <Link href="/cover-letter">Generate Cover Letter</Link>
        </button>
         <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold px-6 py-3 rounded-md transition-all duration-200 w-full sm:w-1/3">
          <MessageCircle className="w-4 h-4" />
          <Link href="/chat">chat with ai</Link>
        </button>
       
      </div>
    </div>
  );
}
export default QuickActions;