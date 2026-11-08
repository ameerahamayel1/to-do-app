const mongoose = require('mongoose');

// A Schema describes the shape of each document in the "todos" collection.
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('Todo', todoSchema);
