"use client";

import { getSavedJobs, removeSavedJob } from "@/services/resumeService";
import { Clock, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SavedJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  score: number;
  postedAt: string;
}

export default function SavedJobs() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const data = await getSavedJobs();
        setJobs(data.matches || []);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        toast.error("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveSaved = async (jobId: string) => {
    try {
      setRemovingId(jobId);
      await removeSavedJob(jobId);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job removed from saved");
    } catch (error) {
      console.error("Error removing job:", error);
      toast.error("Failed to remove job. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading saved jobs...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Saved Jobs</h2>
        <p className="text-gray-500 text-sm mt-1">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} saved for later
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="border border-gray-200 rounded-xl p-8 text-center bg-white shadow-sm">
          <p className="text-gray-500 mb-4">No saved jobs yet</p>
          <Link href="/resume-upload" className="text-[var(--dark-amber)] font-semibold hover:underline">
            Upload resume to get job recommendations
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-[var(--dark-amber)] font-medium">{job.company}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded-md">
                    {Math.round(job.score)}% Match
                  </span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin size={16} className="mr-1" />
                <span>{job.location}</span>
                <span className="mx-3">•</span>
                <Clock size={16} className="mr-1" />
                <span>
                  Posted {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

              <div className="flex gap-3">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--dark-amber)] cursor-pointer hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Apply Now
                </a>
                <button className="text-black font-medium cursor-pointer hover:text-gray-600">
                  <Link href="/cover-letter">Generate Cover Letter</Link>
                </button>
                <button
                  onClick={() => handleRemoveSaved(job._id)}
                  disabled={removingId === job._id}
                  className="border border-red-300 text-red-700 hover:bg-red-50 font-medium py-2 px-4 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                  {removingId === job._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
