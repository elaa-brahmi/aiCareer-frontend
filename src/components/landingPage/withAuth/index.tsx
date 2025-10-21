
import { User } from "@/types/userType";
import React from "react";
import JobsContainer from "../helpers/jobContainer";
import PlanContainer from "../helpers/PlanContainer";
import ResumeUploaderContainer from "../helpers/ResumeUploaderContainer";
import CoverLetterContainer from "../helpers/CoverLetterContainer";
import JobMatchesContainer from "../helpers/JobMatchesContainer";
import QuickActions from "../helpers/QuickActions";

interface LandingPageWithAuthProps{
    user:User
}
const WithoutAuth : React.FC<LandingPageWithAuthProps> = ({user}) =>{
    console.log("user in with auth ",user)
    return(
        <div className="flex flex-col md:bg-gray-100 gap-6 pt-12 w-full md:px-20">
            <div className="flex flex-col md:justify-start md:items-start gap-5">
                <div className=" gap-3">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome back, {user.firstName} {' '} {user?.lastName}!</h1>
                    <p className="text-md text-gray-500 text-center">Here are your personalized job recommendations</p>
                </div>
                <div className=" w-full mx-auto flex items-center justify-center gap-4 md:flex-row flex-col">
                    <PlanContainer user={user} />
                    <ResumeUploaderContainer user={user} />
                    <CoverLetterContainer user={user} />
                    <JobMatchesContainer user={user} />
                </div>
                <QuickActions />
                <JobsContainer />
            </div>
        </div>
    )
}
export default WithoutAuth