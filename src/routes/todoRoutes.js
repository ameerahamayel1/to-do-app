const express = require('express');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').get(getTodoById).put(updateTodo).delete(deleteTodo);

module.exports = router;
