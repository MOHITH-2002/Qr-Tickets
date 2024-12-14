"use server"
import Stripe from "stripe"
import { redirect } from "next/navigation"
import { connectToDb } from "../database/db";
import Order from "../database/model/order-schema";
import QRCode from 'qrcode'


interface CreateUserParams {
    passengers:number;
    bookingTime:Date;
    price:number;
    destination:string;
    source:string;
    email:string | undefined;
    username:string | undefined;
    sourceDistance:number;
    destDistance:number;


}
interface CheckoutOrderParams {
    
    price:number;
    userId:string;
    email:string | undefined;
    passengers:number;


}
interface createOrderParams {

    stripeId:string;
    userId:string;
    totalAmount?:string | number;
    passengers?:any;
	
    


}


export const createUser = async (order: CreateUserParams) => {
  try {
    
    await connectToDb();
    
    
    const newuser = await Order.create({
      email:order.email,
      name:order.username,
      bookingTime:order.bookingTime,
      passengers:order.passengers,
      source:order.source,
      destination:order.destination,
      totalAmount:order.price,
      count:order.passengers*2,
      sourceDistance:order.sourceDistance,
      destDistance:order.destDistance,

    })

    
    // console.log("success create order from newuser");
    
    
    
    return JSON.parse(JSON.stringify(newuser.id));

  } catch (error) {
    console.log("error in creating user");
    console.log(error);
    
    
    
  }
}

export const createOrder = async ({userId,orderId}:any) => {
  try {
    // console.log("From serverside");
    

    await connectToDb();
	const qrcode = await QRCode.toDataURL(userId);
    const newOrder = await Order.findByIdAndUpdate(userId,{
      paymentVerification:new Date(),     
      stripeId:orderId,
	  qrImage:qrcode,
    });
    // redirect("/mytickets");
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("error in creating order");
    
  }
}
