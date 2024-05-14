// models/userModel.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: false // Assuming the photo is not required
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false // Assuming the bio is not required
    },
    phone: {
        type: String,
        required: false // Assuming the phone number is not required
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_premium_user: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically create `createdAt` and `updatedAt` fields
});

const User = mongoose.model('User', userSchema);

export default User;
