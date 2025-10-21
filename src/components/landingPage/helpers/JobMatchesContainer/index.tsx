import { User } from "@/types/userType"
import { PcCaseIcon } from "lucide-react";

interface PlanContainer{
    user:User
}
const Matches:React.FC<PlanContainer> = async({user}) =>{
    return (
    <div className="w-[280px] h-[189px] rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="text-gray-600 font-semibold">Job Matches</span>
        <PcCaseIcon className="w-4 h-4 text-orange-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">4</h2>
        <p className="text-sm text-gray-500 mt-1">New recommendations</p>
      </div>
    </div>
  );
}
export default Matches