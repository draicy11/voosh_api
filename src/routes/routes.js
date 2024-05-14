// routes/exampleRoutes.js

import { Router } from 'express';
const router = Router();

// Example route
router.get('/', (req, res) => {
    res.json({ message: 'Example GET route' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Example POST route', data: req.body });
});

export default router;
