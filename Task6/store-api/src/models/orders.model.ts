import { model, Schema, Document } from 'mongoose';

import { Order } from '../interfaces/orders.interface';

const orderedProductSchema: Schema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    }
});

const orderSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    products: {
        type: [orderedProductSchema],
        required: true
    }
});

const orderModel = model<Order & Document>('Order', orderSchema);

export default orderModel;
