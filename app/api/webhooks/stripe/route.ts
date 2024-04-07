"use server"
import { createOrder } from "@/lib/actions/payment-checkout";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
        stripeId: id,
      
        userId: metadata?.userId || "",
    
    };
    console.log(order);
    
    const newTransaction = await createOrder(order);
    
    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}