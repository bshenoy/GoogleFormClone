const express = require('express');
const User = require('../models/User'); // Ensure the User model is properly required
const router = express.Router();

router.post('/google', async (req, res) => {
    const { name, email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email });
            await user.save();
        }

        req.session.userId = user._id;
        res.json({ user });
    } catch (error) {
        console.error(error); // Logging the error
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const user = await User.findById(req.session.userId);
        res.json({ user });
    } catch (error) {
        console.error(error); // Logging the error
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
