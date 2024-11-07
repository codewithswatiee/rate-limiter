const { rateLimits, requestCounts, exceedingLogs, DEFAULT_RATE_LIMIT, WINDOW_SIZE_MS } = require('../data/store');

const rateLimiter = (req, res, next) => {
  const userId = req.query.userId || req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const now = Date.now();
  const userLimit = rateLimits.get(userId) || DEFAULT_RATE_LIMIT;

  let userRequests = requestCounts.get(userId) || [];
  userRequests = userRequests.filter(timestamp => now - timestamp < WINDOW_SIZE_MS);

  if (userRequests.length >= userLimit) {
    exceedingLogs.push({ userId, timestamp: now });
    return res.status(429).json({ error: 'Rate limit exceeded', retryAfter: WINDOW_SIZE_MS / 1000 });
  }

  userRequests.push(now);
  requestCounts.set(userId, userRequests);

  next();
};

module.exports = rateLimiter;
