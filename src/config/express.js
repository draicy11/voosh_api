import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from './passport.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Log requests to the console
app.use(cors()); // Enable CORS

// Express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a random string (can be generated using a tool like `uuid`)
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session()); 


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});


// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// user routes
import user_routes from '../routes/users.js';
app.use('/api/users', user_routes);

// auth routes
import auth_routes from '../routes/auth.js';
app.use('/api/auth', auth_routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong! - ' + err });
});

export default app;