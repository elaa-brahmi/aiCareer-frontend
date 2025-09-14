"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { animate, stagger } from "motion";

const testimonials = [
  {
    text: `"AI Career helped me find my dream job in just 2 weeks. The job matching is incredibly accurate!"`,
    name: "Sarah Chen",
    title: "Software Engineer",
  },
  {
    text: `"The cover letter generator saved me hours of work. Each letter was perfectly tailored!"`,
    name: "Mike Rodriguez",
    title: "Marketing Manager",
  },
  {
    text: `"The career chatbot gave me amazing advice for my interviews. Highly recommended!"`,
    name: "Emma Thompson",
    title: "UX Designer",
  },
];

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView) {
      animate(".animated-card", { opacity: 1, y: [30, 0] }, { delay: stagger(0.1) });
    }
  }, [inView]);

  return (
    <div className="md:mx-10 flex flex-col justify-center items-center mt-10">
      <h2 className="font-bold md:text-3xl text-center">Loved by Marketers Worldwide</h2>

      <div
        ref={ref}
        className="md:mt-15 grid sm:grid-cols-1 md:grid-cols-3 md:gap-6 gap-3"
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="animated-card border-none p-6 mx-5 bg-white/70 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col items-start justify-center md:leading-6 sm:leading-4"
          >
            <span className="flex">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-[var(--light-amber)]"
                    fill="var(--dark-amber)"
                  />
                ))}
            </span>

            <p className="mb-2 text-gray-670 flex flex-col items-start justify-start">
              <span className="italic">{testimonial.text}</span>
            </p>

            <span className="leading-5">
              <h4 className="font-bold">{testimonial.name}</h4>
              <span>{testimonial.title}</span>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
