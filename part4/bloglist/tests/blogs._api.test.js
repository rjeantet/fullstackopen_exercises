const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are eleven blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(11);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('create a blogpost', async () => {
  const initialBlogs = await api.get('/api/blogs');
  expect(initialBlogs.body).toHaveLength(11);

  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    like: 0,
  };

  await api.post('/api/blogs').send(newBlog);
  expect(201);

  const updatedBlogs = await api.get('/api/blogs');
  expect(updatedBlogs.body).toHaveLength(initialBlogs.body.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
