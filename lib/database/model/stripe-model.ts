import { Schema, model, models } from 'mongoose';

const StripeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    stripeId: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number || String,
        
    },
    passengers:{
        type: Number || String,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the Order model
const Stripe = models.Stripe || model('Stripe', StripeSchema);

export default Stripe;
