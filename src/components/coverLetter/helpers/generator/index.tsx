"use client";

import { generateCoverLetter } from "@/services/coverLetterService";
import { User } from "@/types/userType";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import Loader from "@/components/common/loader";
import { toast } from "sonner";

interface UserProps {
  user: User;
}

// 🔹 Skills list (you can later move this to API/db)
const SKILLS = [
  "Next.js",
  "React",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Spring Boot",
  "Docker",
  "Kubernetes",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Azure",
  "GCP",
  "kubernetes",
  "Docker",
  "GraphQL",
  "REST APIs",
  "Microservices",
  "CI/CD",
  "Agile Methodologies",
  "Git",
  "Jenkins",
  "Terraform",
  "Ansible",
  "Prometheus",
  "Grafana",
];

const CoverLetterGenerator: FC<UserProps> = ({ user }) => {
  const { data: session, update } = useSession();

  const [title, setTitle] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [fullName, setfullName] = useState("");
  const [tone, setTone] = useState("");
  const [description, setdescription] = useState("");
  const [exp, setExp] = useState("");

  // 🔥 Skills state
  const [skills, setskills] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Handle typing
  const handleSkillsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setskills(value);

    const words = value.split(/[\s,]+/);
    const lastWord = words[words.length - 1].toLowerCase();

    if (!lastWord) {
      setShowSuggestions(false);
      return;
    }

    const filtered = SKILLS.filter((skill) =>
      skill.toLowerCase().startsWith(lastWord)
    );

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  // 🔹 Handle click on suggestion
  const handleSelectSkill = (skill: string) => {
    const words = skills.split(/[\s,]+/);
    words.pop(); // remove current word

    const newValue = [...words, skill].join(", ") + ", ";
    setskills(newValue);

    setShowSuggestions(false);
  };

  const CoverLetterGen = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("fullName", fullName);
    formdata.append("companyName", companyName);
    formdata.append("description", description);
    formdata.append("tone", tone);
    formdata.append("exp", exp);
    formdata.append("skills", skills);

    try {
      const response = await generateCoverLetter(formdata);
      await update();

      setTitle("");
      setTone("");
      setExp("");
      setcompanyName("");
      setdescription("");
      setfullName("");
      setskills("");

      toast.success("Cover letter generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to generate cover letter. Please try again or upgrade plan"
      );
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="border border-white rounded-lg shadow-sm p-4 bg-white">
        <form className="space-y-4" onSubmit={CoverLetterGen}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full name *
            </label>
            <input
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              required
              type="text"
              placeholder="e.g. John Doe"
              className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Title + Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                value={companyName}
                onChange={(e) => setcompanyName(e.target.value)}
                required
                type="text"
                placeholder="e.g. TechCorp Inc."
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
              placeholder="Paste the job description here..."
              className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none h-20"
            />
          </div>

          {/* Tone + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience *
              </label>
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                required
                type="text"
                placeholder="e.g. 5 years"
                className="mt-1 bg-gray-100 w-full rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 🔥 Skills with autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Key Skills *
            </label>

            <textarea
              value={skills}
              onChange={handleSkillsChange}
              required
              placeholder="Start typing (e.g. 'n' → Next.js)..."
              className="mt-1 bg-gray-100 w-full rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none h-20"
            />

            {showSuggestions && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-md max-h-40 overflow-y-auto">
                {suggestions.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSkill(skill)}
                    className="p-2 cursor-pointer hover:bg-orange-100"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-[var(--dark-amber)] text-white cursor-pointer font-medium py-2 px-4 rounded-md transition"
            >
              Generate Cover Letter
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;