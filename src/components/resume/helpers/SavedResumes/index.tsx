import CoverLetterCard from "@/components/coverLetter/helpers/coverLetterCard";
import { Resume } from "@/types/resumes";

interface CopiesProps{
    resumes:Resume[]
}
const SavedResumes : React.FC<CopiesProps>= ({resumes}) => {
    //console.log('covers in saved covers', covers)

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Your Resumes</h2>
      <p className="text-gray-500 text-sm mb-2">Manage your uploaded resumes</p>

      <div className="space-y-3">
        {Array.isArray(resumes) && resumes.map((resume, idx) => (
          <CoverLetterCard
            key={idx}
            id={resume.id}
            title={resume.fileName}
            url={resume.generatedUrl}
            date={new Date(resume.createdAt).toLocaleDateString("en-CA")}
            usage="resume"
            
          />
        ))}
      </div>
    </div>
  );
};

export default SavedResumes;
