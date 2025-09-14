
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartSection =() => {
    return(
        <div className="px-5 leading-10 py-10 md:leading-15 flex flex-col justify-center items-center mt-14 w-full 
        bg-gradient-to-r from-[var(--light-amber)] via-[var(--dark-amber)] to-[var(--light-amber)] transition-all duration-500">
            <div>
                <h1 className="md:text-3xl font-bold text-white">Ready to Find Your Dream Job?</h1>
            </div>
            <div className="text-white">
                Join thousands of job seekers who have found success with AI Career
            </div>
            <div>
                <div className="sm:mt-5 ">
                    <Button
                    className="flex items-center p-3  bg-white  font-semibold 
                    rounded-md hover:shadow-lg ">
                        <span className="ms-2 text-[var(--dark-amber)] md:text-sm"><Link href="/auth">Start Your Journey Today</Link></span>
                    </Button>
                </div>
            </div>

        </div>
    )
}
export default StartSection