const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// GET /protected
router.get('/', rateLimiter, (req, res) => {
    // protected route with limited requests as per the user
  res.json({ message: 'Access granted to protected resource' });
});

module.exports = router;
