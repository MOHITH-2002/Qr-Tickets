import { Schema, model, models } from 'mongoose';

const StripeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
});

// Define the Order model
const Stripe = models.Stripe || model('Stripe', StripeSchema);

export default Stripe;
