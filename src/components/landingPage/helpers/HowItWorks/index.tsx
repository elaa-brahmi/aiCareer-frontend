import { MotionH2, MotionSpan } from "@/components/common/motion-wrapper";
import { STEPS } from "@/utils/constants";
import { containerVariants, itemVariants } from '@/utils/constants';

const HowItWorks = () => {
    const steps= STEPS
    return (
        <div className="md:mx-10 p-7  mt-10 py-14 bg-gray-50 flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-3">
                <MotionH2 variants={itemVariants} className="font-bold md:text-3xl">
                    How It Works
                </MotionH2>
                <MotionSpan variants={containerVariants} className="text-gray-600 md:text-xl sm:text-lg text-center">
                    <p className="flex flex-col justify-center items-center">
                        <span>Get started in just 3 simple steps</span>
                    </p>
                </MotionSpan>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {steps.map((step,index) => (
                    <div key={index} className="flex px-6 flex-col items-center justify-between gap-3">
                        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--dark-amber)] text-white font-bold">
                            {step.index}
                        </span>
                        <h4 className="font-semibold">
                            {step.title}
                        </h4>
                        <p className="text-gray-600">
                            {step.description}
                        </p>
                         
                    </div>
                ))
                }
            </div>
        </div>
        
    );
}
export default HowItWorks