import { MotionDiv, MotionSection } from '@/components/common/motion-wrapper';
import { containerVariants, itemVariants } from '@/utils/constants';

import {pricingPlans} from '@/lib/constants';
import PricingCard from '@/components/uiElements/PricingCard';



export default function Pricing(){
    return(
        <MotionSection
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once:true,margin:'-100px' }} className="relative overflow-hidden" id="pricing">
             <div className="py-12 lg:py-24 max-w-5xl mx-auto sm:px-6
        lg:px-8 lg:pt-12">
            <MotionDiv
            variants={itemVariants}
            className="flex flex-col items-center justify-center w-full pb-12">
                <h2 className="font-bold text-3xl mb-8 text-black">Choose your plan</h2>
                <p className="text-gray-500 text-md">Unlock your career potential with our AI-powered job search platform</p>
            </MotionDiv>
            <div className=" mt-5 relative flex justify-center flex-col
            lg:flex-row items-center lg:items-stretch gap-8">
                {pricingPlans.map((plan: any)=>(
                <PricingCard key={plan.id} {...plan}/>
                ))}
                
            </div>
        </div>
        </MotionSection>
    )
}