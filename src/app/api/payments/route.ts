import {NextRequest,NextResponse} from 'next/server'
import Stripe from 'stripe';
import {handleCheckoutSessionCompleted,handleSubscriptionDeleted} from '@/services/paymentService'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const GET = async () => {
    return NextResponse.json({
        status: 'Payments API is running',
        message: 'This endpoint handles Stripe webhook events via POST requests'
    });
}
export const POST = async (req: NextRequest) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({
            error: 'Stripe configuration is missing'
        }, { status: 500 });
    }
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');
    if (!sig) {
        return NextResponse.json({
            error: 'No stripe signature found in request'
        }, { status: 400 });
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    try {
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        
        const response = new NextResponse(JSON.stringify({ status: 'success' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        response.headers.set('Connection', 'close');
        
        //Non-blocking: ensures your server doesn’t make Stripe wait.
        setTimeout(() => {
            processEvent(event).catch(error => {
                console.error('Error processing webhook event:', error);
            });
        }, 0);

        return response;
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({
            error: 'Failed to process webhook',
            details: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 400 });
    }
}

async function processEvent(event: Stripe.Event) {
    try {
        switch(event.type) {
            case 'checkout.session.completed':
                const sessionId = event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items']
                });
                console.log('Stripe session:', session);
                
                await handleCheckoutSessionCompleted({ session });
                break;

            case 'customer.subscription.deleted':
                const subscriptionId = event.data.object.id;
                await handleSubscriptionDeleted({ subscriptionId });
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Error in processEvent:', error);
    }
}
