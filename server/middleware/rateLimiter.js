const { rateLimits, requestCounts, exceedingLogs, DEFAULT_RATE_LIMIT, WINDOW_SIZE_MS } = require('../data/store');

const rateLimiter = (req, res, next) => {
    // userid lekr aao
  const userId = req.query.userId || req.params.userId;
//   nhi hai toh error do
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

//   current time
  const now = Date.now();

//   user ki limit kya hai?
  const userLimit = rateLimits.get(userId) || DEFAULT_RATE_LIMIT;

//   fetch krta hai previous timestamps of the requests
  let userRequests = requestCounts.get(userId) || [];

//   jo bhi request 1 min ke baad ho rhi hai usko filter out krta hai
  userRequests = userRequests.filter(timestamp => now - timestamp < WINDOW_SIZE_MS);

  //   ab hume 1 min ke andar ki sabhi request ko count krna hai aur agar exceed krti hai toh usko exceedingLogs mein push karo
  if (userRequests.length >= userLimit) {
    exceedingLogs.push({ userId, timestamp: now });
    return res.status(429).json({ error: 'Rate limit exceeded', retryAfter: WINDOW_SIZE_MS / 1000 });
  }

//   current timestamp ko push krta hai userReq mein
  userRequests.push(now);
  requestCounts.set(userId, userRequests); //to update with modified userReq arrays

  next();
};

module.exports = rateLimiter;
