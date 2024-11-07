const express = require('express');
const cors = require('cors');

const rateLimitRoutes = require('./routes/rateLimitRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/rate-limit', rateLimitRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/protected', protectedRoutes);

app.listen(port, () => {
  console.log(`Rate limiter server running on port ${port}`);
});
