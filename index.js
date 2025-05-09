const express = require('express');
const path = require('path');
const uploadRoutes = require('./api/upload'); // assuming /api/upload.js exists

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing (optional, useful for future APIs)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', uploadRoutes);

// Static frontend (optional, if you have one)
app.use(express.static(path.join(__dirname, 'public')));

// Health check (optional)
app.get('/', (req, res) => {
  res.send('✅ GitHub layout uploader is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
