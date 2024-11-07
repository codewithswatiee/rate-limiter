const express = require('express');
const { rateLimits, DEFAULT_RATE_LIMIT } = require('../data/store');

const router = express.Router();

// GET /rate-limit/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  const rateLimit = rateLimits.get(userId) || DEFAULT_RATE_LIMIT;
  res.json({ userId, rateLimit });
});

// POST /rate-limit/:userId
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { rateLimit } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (typeof rateLimit !== 'number' || rateLimit < 1) {
    return res.status(400).json({ error: 'Invalid rate limit' });
  }

  rateLimits.set(userId, rateLimit);
  res.json({ userId, rateLimit });
});

module.exports = router;
