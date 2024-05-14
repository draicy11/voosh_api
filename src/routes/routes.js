// routes/userRoutes.js

import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = Router();

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    const { photo, name, bio, phone, email, password, is_admin, is_premium_user } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        photo,
        name,
        bio,
        phone,
        email,
        password: hashedPassword,
        is_admin,
        is_premium_user
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
