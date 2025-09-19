export const pricingPlans = [
    {
        id: 'basic',
        name: 'Basic Plan',
        price: 'free',
        description: 'Perfect for getting started with job searching',
        items: [
        'Standard support',
        'Job matching algorithm',
        'Basic chatbot accest',
        '3 cover letter generations per month',
        '5 resume uploads per month'
        ],
        },

    {
        id:'pro',
        name:'Premium Plan',
        price:15,
        description: 'Unlimited access to all features and priority support',
        items: [
        'Unlimited resume uploads',
        'Unlimited cover letter generation',
        'Priority chatbot with advanced AI',
        'Enhanced job matching with preferences',
        'Career progress tracking',
        'Premium templates and formats',
        'Early access to new features'
        ],
        paymentLink:process.env.PRO_PLAN_URL,
        priceId: process.env.PRICE_ID_PRO,

    },
];
export interface PlanType{
    name: string,
    price: string | number,
    description: string,
    items: string[],
    id: string,
    paymentLink?:string,
    priceId?: string,


}
export const STEPS=[
        {
            index:"1",
            title:"Upload Your Resume",
            description:"Simply upload your resume and let our AI analyze your skills and experience."
        },
        {
            index:"2",
            title:"Get Matched",
            description:"Receive personalized job recommendations that match your profile perfectly."
        },
        {
            index:"3",
            title:"Apply & Succeed",
            description:"Generate cover letters and apply to jobs with confidence using our tools."
        }
    ]
export const TESTIMONIALS = [
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
export const containerVariants={
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.2,
            delayChildren:0.1,
            
        },

    },
};
export const itemVariants={
    hidden:{opacity:0,y:10},
    visible:{
        opacity:1,
        transition:{
            type:'spring' as const,
            damping:15,
            stiffness:50,
            duration:0.9

        },

    },
}
export const variants = {
     transition:{
            type:'linear' as const},
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
