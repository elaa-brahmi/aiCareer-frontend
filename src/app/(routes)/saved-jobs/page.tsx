import SavedJobs from "@/components/landingPage/helpers/SavedJobs";

export default function SavedJobsPage() {
  return (
    <div className="md:flex pt-12 md:flex-row mx-auto items-center md:items-start justify-center md:bg-gray-100 w-full p-5">
      <div className="md:flex-2 md:flex md:flex-row md:items-center md:justify-center w-full">
        <div className="w-full md:ps-4 md:w-5/6">
          <SavedJobs />
        </div>
      </div>
    </div>
  );
}
