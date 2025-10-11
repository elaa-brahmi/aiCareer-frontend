import { getUserMatches } from "@/services/resumeService";
import JobCard from "../jobCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const JobsContainer = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;
  const jobsData = await getUserMatches(token);

  const jobs = jobsData?.matches || [];
  //console.log("jobs in job container ", jobs);

  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Recommended Jobs
      </h2>
      <p className="text-gray-600 mb-5">
        Jobs that match your profile and preferences
      </p>

      <div className="flex flex-col gap-5">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobsContainer;
