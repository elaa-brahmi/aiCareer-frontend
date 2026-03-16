"use client";

import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { saveJobForLater } from "@/services/resumeService";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSaveJob = async () => {
    try {
      setIsSaving(true);
      await saveJobForLater(job._id);
      toast.success("Job saved! Redirecting to saved jobs...");
      setTimeout(() => {
        router.push("/saved-jobs");
      }, 1000);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
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
          className="bg-[var(--dark-amber)] cursor-pointer hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Apply Now
        </a>
        {!job.saved && (
          <button 
            className="border border-gray-300 cursor-pointer text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSaveJob}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save for Later"}
          </button>
        )}
        <button className="text-black font-medium cursor-pointer">
          <Link href="/cover-letter">Generate Cover Letter</Link>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
