import { BadgeCheck, Check } from "lucide-react";

const WritingTipsResume = () => {
    const tips = [
    "Keep file size under 5MB",
    "Use PDF format for best results",
    "Include relevant keywords for your field",
    "Update regularly for better matches",
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Writing Tips</h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WritingTipsResume