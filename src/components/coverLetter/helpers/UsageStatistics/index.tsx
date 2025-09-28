import { User } from "@/types/userType"
import { FC } from "react"
import CoverLetterProgress from "../coverLetterProgress"
import Link from "next/link"

interface Userprops{
    user:User
    usage:string
}
export const UsageStatistics : FC<Userprops>= ({user,usage}) => {
    return(
        <div className="bg-white p-3 flex flex-col gap-3 rounded-lg max-w-sm">
            <div>
                {usage == 'cover-letter' ? (<CoverLetterProgress current={user.cover_letters_this_week || 0} max={3} usage={usage}/>)
                : (<CoverLetterProgress current={user.uploads_this_month || 0} max={5} usage={usage}/>)}
            </div>
            <div className="bg-gray-200 px-3 h-0.5 w-full"></div>
            <p className="text-gray-500">
                {usage == 'cover-letter' ? ("Want unlimited cover letter generation? Upgrade to premium!") : ("Want unlimited resume uploads? Upgrade to premium!")}
            </p>
            <button className="bg-[var(--dark-amber)] p-3 rounded-lg text-white font-semibold cursor-pointer">
               <Link href="/pricing">upgrade now</Link> 
            </button>

            
        </div>
    )

}