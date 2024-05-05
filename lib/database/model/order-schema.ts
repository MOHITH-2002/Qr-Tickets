import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bookingTime: {
        type: Date,
    },
    passengers: {
        type: Number,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    paymentVerification: { 
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        default: null,
    },
    qrImage:{

        type:String,
        default:null,
    },
    totalAmount: {
        type: Number,
    },
    count:{
        type:Number,
    }
});

// Define the Order model
const Order = models.Order || model('Order', OrderSchema);

export default Order;
