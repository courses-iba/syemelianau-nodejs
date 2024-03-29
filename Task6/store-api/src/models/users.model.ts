import { model, Schema, Document } from 'mongoose';

import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
