// route --> /api/auth/

import { Router } from 'express';
import passport from 'passport';

const router = Router();


// Login a user
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
});

// Logout a user
router.post('/logout', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'No one is logged in right now' });
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api' }),
    (req, res) => {
        // Successful authentication, redirect home or send user info
        res.redirect('/api');
    }
);

// Get details of the logged-in user
router.get('/current-user', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ user: req.user });
});

export default router;
