import { model, Schema, Document } from 'mongoose';

import { Product } from '../interfaces/products.interface';

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0.01,
        max: 9.99
    },
    img: {
        type: String,
        required: false
    }
});

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
