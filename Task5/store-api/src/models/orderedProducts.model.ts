import { Schema } from 'mongoose';

export const orderedProductSchema: Schema = new Schema({
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
