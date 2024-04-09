import { Schema, model, models } from 'mongoose';

const QrSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    qrimage:{
        type:String,
        required: true,
    },
    passengers:{
        type: Number || String,
    },
    count:{
        type: Number || String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the Order model
const QrCodeDetail = models.QrCodeDetail || model('QrCodeDetail', QrSchema);

export default QrCodeDetail;
