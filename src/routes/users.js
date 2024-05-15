// route --> /api/users/
import { ensureAuthenticated } from '../middleware/middleware.js';
import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = Router();

// register a user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// List all users
router.get('/all',ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Edit user profile
router.put('/edit/', ensureAuthenticated, async (req, res) => {
    try {
        const id = req.user._id;
        const { photo, name, bio, phone, email, password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (photo) user.photo = photo;
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get current user
router.get('/',ensureAuthenticated, async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;