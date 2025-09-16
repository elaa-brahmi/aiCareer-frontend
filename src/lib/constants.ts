export const pricingPlans = [
    {
        name: 'Basic',
        price: 'free',
        description: 'Perfect for getting started with job searching',
        items: [
        'Standard support',
        'Job matching algorithm',
        'Basic chatbot accest',
        '3 cover letter generations per month',
        '5 resume uploads per month'
        ],
        id: 'basic',
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