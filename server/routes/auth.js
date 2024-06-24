const express = require('express');
const User = require('../models/User'); // Ensure the User model is properly required
const Response = require('../models/Response'); 
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

router.get('/check', async (req, res) => {
    if (!req.session.userId) {
        return res.json({ authenticated: false });
    }

    try {
        // Find response data for the authenticated user
        const response = await Response.findOne({ userId: req.session.userId });
        
        if (response) {
            res.json({ authenticated: true, userId: req.session.userId, responseData: response.responses });
        } else {
            res.json({ authenticated: true, userId: req.session.userId, responseData: null });
        }
    } catch (error) {
        console.error('Error fetching user response data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/users/me', async (req, res) => {
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
