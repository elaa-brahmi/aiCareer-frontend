'use client';
import { useEffect, useState } from 'react';
import { getUserMatches } from "@/services/resumeService";
import JobCard from "../jobCard";


const JobsContainer =  () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;
   const fetchJobs = async (currentPage: number) => {
    try {
      const data = await getUserMatches( currentPage, limit);
      const newJobs = data?.matches || [];
      console.log("Fetched jobs:", newJobs);

      if (newJobs.length < limit) setHasMore(false);
      setJobs((prev) => [...prev, ...newJobs]);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);



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
       {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white font-semibold transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsContainer;
