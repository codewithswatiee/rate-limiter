// In-memory store for rate limits and request tracking


// map isliye use kr rhe hai because of the key-value pair and it's effecient and easy to retrieve value.
const rateLimits = new Map();  
const requestCounts = new Map();

// used array because it maintains the order.
const exceedingLogs = [];

// Default rate limit settings
const DEFAULT_RATE_LIMIT = 10;
const WINDOW_SIZE_MS = 60000; // 1 minute

module.exports = {
  rateLimits,
  requestCounts,
  exceedingLogs,
  DEFAULT_RATE_LIMIT,
  WINDOW_SIZE_MS
};
