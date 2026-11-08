const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE  -> POST /api/todos
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({ title, description, completed });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// READ ALL -> GET /api/todos   (optional filter: ?completed=true|false)
exports.getTodos = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === 'true';
    }
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// READ ONE -> GET /api/todos/:id
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// UPDATE -> PUT /api/todos/:id
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    // Only update the fields that were actually sent in the request
    const updates = {};
    ['title', 'description', 'completed'].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const todo = await Todo.findByIdAndUpdate(id, updates, {
      new: true, // return the updated document
      runValidators: true, // apply schema rules on update too
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// DELETE -> DELETE /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo deleted', id });
  } catch (err) {
    next(err);
  }
};
