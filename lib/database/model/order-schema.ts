import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({

    email:{
        type:String,
        unique: true,
    },
    name:{
        type:String,
        required: true,
    },
    bookingTime:{
        type: Date,
    // default: Date.now,
    },
    passengers:{
        type:Number,
        required: true,
    },
    source:{
        type:String,
        required: true,
    },
    destination:{
        type:String,
        required: true,
    },


    createdAt: {
    type: Date,
    default: Date.now,
    },
    stripeId: {
    type: String,
    required: true,
    unique: true,
    },
    totalAmount: {
    type: Number,
    },

})

const Order = models.Order || model('Order', OrderSchema)

export default Order