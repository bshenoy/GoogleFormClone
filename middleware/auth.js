const User = require('../models/User'); // Ensure the User model is properly required

module.exports.ensureAuth = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        // console.log('User ID found in session:', req.session.userId);
        return next();
      } else {
        console.log('User not found in database');
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log('User ID not found in session');
    res.status(401).json({ error: 'Unauthorized' });
  }
};
