import Stripe from "stripe"
import { redirect } from "next/navigation"
import { connectToDb } from "../database/db";
import Order from "../database/model/order-schema";


interface CheckoutOrderParams {
    passengers:number;
    bookingTime:Date;
    price:number;
    destination:string;
    source:string;
    email:string | undefined;
    username:string | undefined;


}
interface createOrderParams {
    passengers:number;
    bookingTime:Date;
    price:number;
    destination:string;
    source:string;
    email:string | undefined;
    username:string | undefined;
    stripeId:string;


}
export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'INR',
            unit_amount: price,
            product_data: {
            name: order.username!,
          }
            
          },
          quantity: 1
        },
      ],
      metadata: {
      buyerEmail: order.email!,
    },
      
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}
export const createOrder = async (order: createOrderParams) => {
  try {
    await connectToDb();
    
    const newOrder = await Order.create({
      email:order.email,
      name: order.username,
      bookingTime: order.bookingTime,
      passengers: order.passengers,
      source:order.source,
      destination:order.destination,
      totalAmount:order.price,
      stripeId:order.stripeId,


    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("error in creating order");
    
  }
}
