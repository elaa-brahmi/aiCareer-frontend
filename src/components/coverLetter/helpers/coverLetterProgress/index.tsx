import React from "react";

interface ProgressBarProps {
  current: number;
  max: number;
  usage : string;
}

const CoverLetterProgress: React.FC<ProgressBarProps> = ({ current, max,usage }) => {
  const progress = (current / max) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-lg">
          {usage == "cover-letter" ? ("Cover Letters Generated") : ("Resume Uploads")}
        </span>
        <span className="text-black font-medium">
          {current}/{max}
        </span>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-3">
        <div
          className="bg-[#090718] h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default CoverLetterProgress;
