"use client"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {ArrowRight, CheckIcon} from 'lucide-react'
import { MotionDiv } from '@/components/common/motion-wrapper';
import PopularBadge from '@/components/uiElements/mostPopular';
import { handleSubscriptionDeleted } from '@/services/paymentService';
import { Session } from "next-auth";
type PriceType = {
    name: string;
    price: number | string;
    description: string;
    items: string[];
    id: string;
    paymentLink?: string;
    priceId?: string;
    session?:Session | null
}
const listVariants={
    hidden:{opacity:0,x:-20},
    visible:{opacity:1,x:0},
    transition:{
        type:'spring',
        damping:20,
        stiffness:100
    },

};

const PricingCard=({name,price,description,items,id,paymentLink,session}:PriceType)=>{

    return(
        <MotionDiv
        variants={listVariants}
        whileHover={{ scale:1.02 }}
      
        key={id} className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
             {id === 'pro' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <PopularBadge />
                </div>
            )}
            <div className={cn(
             'relative flex flex-col h-full gap-5 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl',
             id === 'pro' && 'border-[var(--dark-amber)] gap-5 border-2'
            )}
            >
                <MotionDiv
                variants={listVariants} className="flex flex-col justify-between items-center gap-4">
                    <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                    <p className="text-gray-600 mt-2">{description}</p>
                </MotionDiv>
                <MotionDiv
                variants={listVariants} className='flex gap-2'>
                    <p className="text-5xl tracking-tight font-extrabold">{price}</p>
                    {id=='pro' &&(<div className="flex flex-col justify-end mb-[4px]">
                        <p className='text-xs capitalize font-semibold'>USD</p>
                        <p className="text-sx">/month</p>
                    </div>)}
                </MotionDiv>
                <MotionDiv
                variants={listVariants}
                className="space-y-2.5 leading-relaxed text-base flex-1">
                    <ul>
                    {items.map((item,idx)=>(
                    <li className="flex items-center gap-2 " key={idx}>
                        <CheckIcon size={18} className="text-[var(--dark-amber)]"/>
                        <span>{item}</span>
                    </li>
                    ))}
                    </ul>
                </MotionDiv>
              {!session?.user && id==='pro' ? (
                //user is not logged in
                <div className="space-y-2 flex justify-center font-bold w-full">
                    <Link
                    href="/auth"
                    className={cn(
                        "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--dark-amber)] to-[var(--light-amber)] hover:from-[var(--light-amber)] hover:to-[var(--dark-amber)] text-white border-2 py-2 border-[var(--dark-amber)]"
                    )}
                    >
                    Buy now <ArrowRight size={18} />
                    </Link>
                </div>
                ) : session?.user?.status === "active" && id==='pro' ? (
                // user is logged in and subscription is active
                <div className="space-y-2 flex justify-center font-bold w-full">
                    <button
                    onClick={() => handleSubscriptionDeleted({subscriptionId:session?.user.stripe_subscription_id})}
                    className={cn(
                        "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--dark-amber)] to-[var(--light-amber)] hover:from-[var(--light-amber)] hover:to-[var(--dark-amber)] text-white border-2 py-2 border-[var(--dark-amber)]"
                    )}
                    >
                    Cancel subscription <ArrowRight size={18} />
                    </button>
                </div>
                ) : paymentLink && id=== 'pro'  ? (
                // user is logged in but no active subscription
                <div className="space-y-2 flex justify-center font-bold w-full">
                    <Link
                    href={paymentLink}
                    className={cn(
                        "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--dark-amber)] to-[var(--light-amber)] hover:from-[var(--light-amber)] hover:to-[var(--dark-amber)] text-white border-2 py-2 border-[var(--dark-amber)]"
                    )}
                    >
                    Buy now <ArrowRight size={18} />
                    </Link>
                </div>
                ) : null}
            </div>

        </MotionDiv>

    )
}
export default PricingCard