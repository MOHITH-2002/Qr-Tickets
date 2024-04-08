"use server";

import { connectToDb } from "../database/db";
import Stripe from "../database/model/stripe-mode";

export const createStripe = async(name:string)=>{
    try {
        await connectToDb();

        const newstripe = await Stripe.create(name);
        console.log("success in stripe create");
        
        
    } catch (error) {
        console.log("error in stripe action");
        
    }
}