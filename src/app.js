const path = require('path');
const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json()); // parse JSON request bodies

// Serve the front-end (public/index.html) at http://localhost:3000
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/todos', todoRoutes);

// 404 for unknown routes
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use(errorHandler);

module.exports = app;