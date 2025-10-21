import { Lightbulb } from "lucide-react";

type Props = {
  onSelect?: (question: string) => void
}

const QuickQuestions = ({ onSelect }: Props) => {
  const questions = [
    "How do I prepare for a technical interview?",
    "What should I include in my resume?",
    "How to negotiate salary effectively?",
    "Best practices for remote job interviews",
    "How to transition to a new career field?",
  ]

  return (
    <div className="flex flex-col gap-4 bg-white p-3 justify-center rounded-lg shadow-md w-[300px]">
      <h3>
        <Lightbulb className="inline mr-3 text-[var(--dark-amber)]" />Quick Questions
      </h3>
      {questions.map((q) => (
        <span
          key={q}
          className="border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-100 text-xs font-semibold"
          onClick={() => onSelect?.(q)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect?.(q)}
        >
          {q}
        </span>
      ))}
    </div>
  )
}
export default QuickQuestions;