'use client';

import { useEffect } from 'react';
import { animate, stagger } from 'motion';
import { useInView } from 'react-intersection-observer';

import { MotionH2, MotionSpan } from '@/components/common/motion-wrapper';
import { containerVariants, itemVariants } from '@/utils/constants';
import { Card } from '@/components/ui/card';
import { Briefcase, FileText, MessageCircle, Target } from 'lucide-react';

const WhyChooseUsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce:false,
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView) {
      animate('.animated-card', { opacity: 1, y: [50, 0] }, { delay: stagger(0.1) });
    }
  }, [inView]);

  return (
    <div className="md:mx-10 my-5 p-7 md:p-0  sm:mt-7 md:mt-17 flex flex-col justify-center items-center ">
      <div>
        <MotionH2 variants={itemVariants} className="font-bold md:text-3xl">
          Everything You Need for Your Career
        </MotionH2>
      </div>

      <div className="mt-3 md:mt-7 sm:mt-3">
        <MotionSpan variants={containerVariants} className="text-gray-600 md:text-xl sm:text-lg text-center">
          <p className="flex flex-col justify-center items-center">
            <span>Our AI-powered platform provides all the tools you need to land your next job</span>
          </p>
        </MotionSpan>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-1 gap-6 mt-7 md:mt-10"
      >
        {[
          {
            icon: <Target className="h-8 w-8 text-[var(--dark-amber)]" />,
            title: 'Smart Job Matching',
            desc: 'Upload your resume and get personalized job recommendations based on your skills and experience',
          },
          {
            icon: <FileText className="h-8 w-8 text-[var(--dark-amber)] mb-4" />,
            title: 'Cover Letter Generator',
            desc: 'Generate tailored cover letters for any job application in seconds with AI assistance.',
          },
          {
            icon: <MessageCircle className="h-8 w-8 text-[var(--dark-amber)] mb-4" />,
            title: 'Career Chat Assistant',
            desc: 'Get instant answers to career questions and job search advice from our AI chatbot.',
          },
           {
            icon: <Briefcase className="h-8 w-8 text-[var(--dark-amber)] mb-4" />,
            title: 'Profile Management',
            desc: 'Manage your professional profiles and keep track of your job applications in one place.',
          },
        ].map((card, i) => (
          <Card
            key={i}
            className="animated-card border-none p-6 mx-5 bg-white/70 opacity-0 hover:shadow-xl hover:scale-105 transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center"
          >
            <span className=" rounded-xl bg-[var(--light-amber)] h-12 w-12 p-2 flex justify-center  mx-auto " >
              {card.icon}
            </span>
            <h3 className="mt-1 text-lg font-regular text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-center">{card.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default WhyChooseUsSection