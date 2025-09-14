import Link from "next/link";

const Opening = () => {
  return (
    <div className="bg-[var(--darker-amber)] flex md:flex-row flex-col gap-4 h-auto p-7 md:p-14">
      <div className="flex flex-col gap-3 w-full md:pt-7">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Find Your Dream Job with AI
        </h1>

        <p className="text-white mt-3">
          Upload your resume and get tailored job matches, generate perfect cover letters, and get career advice from our AI assistant.
        </p>

        <div className="flex gap-2 mt-4">
          <Link
            href="/auth"
            className="text-[var(--darker-amber)] font-bold rounded-md bg-white p-3 text-xs text-center"
          >
            Get Started Free
          </Link>

          <Link
            href="/auth"
            className="text-[var(--darker-amber)] font-bold rounded-md bg-white p-3 text-xs text-center"
          >
            Sign in
          </Link>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <img
          src="/Corporate-job.png"
          className="rounded-md"
          width="500"
          height="500"
          alt="Corporate Job"
        />
      </div>
    </div>
  );
};

export default Opening;
