import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createStripeorder } from '@/lib/actions/stripe'
import { createOrder } from '@/lib/actions/payment-checkout'



export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const order = {
      stripeId: id,
      userId: metadata?.userId || '',
      passengers: metadata?.passengers,

      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      
    }
    
    
  
    const newOrder = await createStripeorder(order);
    await createOrder(order);

    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}