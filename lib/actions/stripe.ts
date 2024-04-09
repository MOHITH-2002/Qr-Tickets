"use server";

import { connectToDb } from "../database/db";
import Stripe from "../database/model/stripe-mode";


interface orderprops {
    userId?:string;
    stripeId:string;
    totalAmount?:string | number;

}
export const createStripeorder = async(order:orderprops)=>{
    
    try {
        await connectToDb();

        const newstripe = await Stripe.create(order);
        console.log("success in stripe create");
        
        
    } catch (error) {
        console.log("error in stripe action");
        
    }
}