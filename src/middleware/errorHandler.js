// Catches any error passed to next(err) and returns a clean JSON response.
module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};
