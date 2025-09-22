import { Star } from "lucide-react";

const WritingTips = () => {
    const tips = [
    "Customize each letter for the specific job",
    "Highlight relevant skills and experience",
    "Research the company culture",
    "Keep it concise and engaging",
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Writing Tips</h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WritingTips