# To-Do App API (Node.js + Express + MongoDB)

A simple REST API for managing to-dos, with full CRUD.

## Project structure

```
src/
  server.js                 # connects to MongoDB and starts the server
  app.js                    # Express app: middleware + routes
  models/Todo.js            # Mongoose schema/model
  controllers/todoController.js  # CRUD logic
  routes/todoRoutes.js      # URL -> controller mapping
  middleware/errorHandler.js
tests/todos.test.js         # API tests (in-memory MongoDB)
```

## Getting started

1. Install [Node.js](https://nodejs.org) (v18+) and run MongoDB locally, or create a free cluster on MongoDB Atlas.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set `MONGO_URI` if needed.
4. Run:
   ```bash
   npm run dev   # auto-restarts on changes (nodemon)
   npm start     # plain node
   npm test      # run the tests
   ```

## Endpoints

| Method | URL               | Description                                 |
|--------|-------------------|---------------------------------------------|
| POST   | /api/todos        | Create a todo (`title` required)            |
| GET    | /api/todos        | List todos (optional `?completed=true/false`) |
| GET    | /api/todos/:id    | Get one todo                                |
| PUT    | /api/todos/:id    | Update a todo (send only the fields to change) |
| DELETE | /api/todos/:id    | Delete a todo                               |

### Todo shape

```json
{
  "_id": "665f...",
  "title": "Learn Express",
  "description": "Routes, middleware, controllers",
  "completed": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Try it with curl

```bash
# Create
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"Learn MongoDB"}'

# Read all
curl http://localhost:3000/api/todos

# Read one
curl http://localhost:3000/api/todos/<id>

# Update
curl -X PUT http://localhost:3000/api/todos/<id> -H "Content-Type: application/json" -d '{"completed":true}'

# Delete
curl -X DELETE http://localhost:3000/api/todos/<id>
```

## Status codes used

- `200` OK, `201` Created
- `400` Bad request (missing title, invalid id)
- `404` Not found
- `500` Server error
