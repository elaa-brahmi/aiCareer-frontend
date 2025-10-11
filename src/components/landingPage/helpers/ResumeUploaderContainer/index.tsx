import CoverLetterProgress from "@/components/coverLetter/helpers/coverLetterProgress";
import { User } from "@/types/userType"
import { UploadIcon } from "lucide-react";

interface PlanContainer{
    user:User
}
const ResumeUploaderContainer:React.FC<PlanContainer> = async({user}) =>{
    const progress= (user.uploads_this_month || 0 / 5) * 100;
    return (
    <div className="w-[280px] h-[189px] rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="text-gray-600 font-semibold">Resume Uploads</span>
        <UploadIcon className="w-4 h-4 text-orange-500" />
      </div>
      <div>
        { user.plan === "free" && (
            <div>
             <div className="max-w-[240px] bg-gray-300 rounded-full h-3">
                <div
                className="bg-[#090718] h-3  rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                />
              </div>
                <span className="text-black font-medium">
                    {user.uploads_this_month}/5
                </span>
            </div>
        )

        }
         {user.plan === "pro" && (
            <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-gray-900">{user.uploads_this_month}</span>
                <span >Unlimited</span>
            </div>
        )}
      </div>
    </div>
  );
}
export default ResumeUploaderContainer