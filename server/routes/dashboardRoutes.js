const express = require('express');
const { requestCounts, exceedingLogs } = require('../data/store');

const router = express.Router();

// GET /dashboard/get-exceedings
router.get('/get-exceedings', (req, res) => {
  res.json(exceedingLogs);
});

// GET /dashboard/get-count
router.get('/get-count', (req, res) => {
  const counts = {};
  for (const [userId, requests] of requestCounts) {
    counts[userId] = requests.length;
  }
  res.json(counts);
});

module.exports = router;
