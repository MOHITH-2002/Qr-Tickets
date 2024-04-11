"use server"
import { auth } from "@/auth";
import { connectToDb } from "../database/db";
import Order from "../database/model/order-schema";

export const getSpecificUserTickets = async () => {
    try {
        const sessions = await auth();

        await connectToDb();
        const userOrders = await Order.find({ email: sessions?.user.email, qrImage: { $ne: null }, paymentVerification: { $ne: null } }).sort({ createdAt: 'desc' });

        if (userOrders.length === 0) {
            return { error: 'No Tickets Found!' };
        }

        return userOrders.map(order => JSON.parse(JSON.stringify(order)));
    } catch (error) {
        console.log(error);
        return { error: "An error occurred while fetching tickets" };
    }
}
