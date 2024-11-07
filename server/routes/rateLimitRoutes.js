const express = require('express');
const { rateLimits, DEFAULT_RATE_LIMIT } = require('../data/store');

const router = express.Router();

// GET /rate-limit/:userId
router.get('/:userId', (req, res) => {
    // userId lekr aao
    // if not, throw error
    // then rateLimit lekr aoo
    // return response!
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  const rateLimit = rateLimits.get(userId) || DEFAULT_RATE_LIMIT;
  res.json({ userId, rateLimit });
});

// POST /rate-limit/:userId
router.post('/:userId', (req, res) => {
    // user id params se lao
    // nhi hai toh throw error
    // rateLimit req body se laao, if not present...throw error
    // validate rateLimit
    // update rateLimit in store
    // return res
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
