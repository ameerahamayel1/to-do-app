const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Todo CRUD', () => {
  test('creates a todo', async () => {
    const res = await request(app).post('/api/todos').send({ title: 'Learn Express' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Learn Express');
    expect(res.body.completed).toBe(false);
  });

  test('rejects a todo without a title', async () => {
    const res = await request(app).post('/api/todos').send({});
    expect(res.status).toBe(400);
  });

  test('lists todos and filters by completed', async () => {
    await request(app).post('/api/todos').send({ title: 'A' });
    await request(app).post('/api/todos').send({ title: 'B', completed: true });
    expect((await request(app).get('/api/todos')).body).toHaveLength(2);
    const done = await request(app).get('/api/todos?completed=true');
    expect(done.body).toHaveLength(1);
    expect(done.body[0].title).toBe('B');
  });

  test('gets, updates and deletes a todo', async () => {
    const { body: created } = await request(app).post('/api/todos').send({ title: 'Old' });

    const got = await request(app).get(`/api/todos/${created._id}`);
    expect(got.body.title).toBe('Old');

    const updated = await request(app)
      .put(`/api/todos/${created._id}`)
      .send({ completed: true });
    expect(updated.body.completed).toBe(true);
    expect(updated.body.title).toBe('Old'); // untouched fields stay the same

    const del = await request(app).delete(`/api/todos/${created._id}`);
    expect(del.status).toBe(200);

    const missing = await request(app).get(`/api/todos/${created._id}`);
    expect(missing.status).toBe(404);
  });

  test('returns 400 for an invalid id', async () => {
    const res = await request(app).get('/api/todos/not-an-id');
    expect(res.status).toBe(400);
  });
});
