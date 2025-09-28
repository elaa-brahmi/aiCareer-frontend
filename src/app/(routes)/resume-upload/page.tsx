import SavedCovers from "@/components/coverLetter/helpers/savedCovers"
import { UsageStatistics } from "@/components/coverLetter/helpers/UsageStatistics"
import WritingTips from "@/components/coverLetter/helpers/writingTips"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ResumeUploader from "@/components/resume/ResumeUploader";
import WritingTipsResume from "@/components/resume/helpers/writingTips";
const ResumeUpload = async ()=>{
    const session = await getServerSession(authOptions);
      const token =session?.user?.accessToken
    return(
        <div className="md:flex pt-12 md:flex-row mx-auto items-center md:items-start justify-center md:bg-gray-100 w-full p-5">
      <div className="md:flex-2 md:flex md:flex-row md:items-center md:justify-center">

        <div className="w-full md:ps-4  md:w-5/6">
          <div className="mb-4 md:ps-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Resume Upload
            </h2>
            <p className="text-md text-gray-500">
              Upload your resume to get personalized job recommendations
            </p>
          </div>
          <ResumeUploader user={session?.user}/>
          <div className="p-4 w-full">
            {/* <SavedCovers covers={covers.urls}/> */}
          </div>
        </div>

      </div>
      <div className="md:flex-1 mt-18">
        <div className="flex flex-col gap-6">
          <WritingTipsResume />
          { session?.user?.plan ==="free" && (<UsageStatistics user={session?.user} usage="resume" />)}
        </div>
      </div>
    </div>
    )
}
export default ResumeUpload