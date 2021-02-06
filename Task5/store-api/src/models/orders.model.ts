import { model, Schema, Document } from 'mongoose';

import { Order } from '../interfaces/orders.interface';
import { orderedProductSchema } from './orderedProducts.model';

const orderSchema: Schema = new Schema({
    products: {
        type: [orderedProductSchema],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    }
});

const orderModel = model<Order & Document>('Order', orderSchema);

export default orderModel;
