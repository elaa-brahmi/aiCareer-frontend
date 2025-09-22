import CoverLetterCard from "@/components/coverLetter/helpers/coverLetterCard";
import { CoverLetter } from "@/types/coverLetter";

interface CopiesProps{
    covers:CoverLetter[]
}
const SavedCovers : React.FC<CopiesProps>= ({covers}) => {
    console.log('covers in saved covers', covers)

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Saved Cover Letters</h2>
      <p className="text-gray-500 text-sm mb-2">Your previously generated cover letters</p>

      <div className="space-y-3">
        {Array.isArray(covers) && covers.map((cover, idx) => (
          <CoverLetterCard
            key={idx}
            title={cover.title}
            url={cover.generatedUrl}
            company={cover.companyName}
            date={new Date(cover.createdAt).toLocaleDateString("en-CA")}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedCovers;
