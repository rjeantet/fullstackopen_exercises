const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  test('the unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
});

describe('when adding a new blog', () => {
  test('succeed with valid data', async () => {
    const newBlog = {
      title: 'Test Blog new',
      author: 'Test Author new',
      url: 'http://testnew.com',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Test Blog new');
  });

  test('missing URL or title returns 400', async () => {
    const newBlog = {
      author: 'Test Author',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('if no likes, default to 0', async () => {
    const newBlog = {
      title: 'Test Blog no likes',
      author: 'Test Author',
      url: 'http://test.com',
    };

    await api.post('/api/blogs').send(newBlog);
    expect(201);

    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body[updatedBlogs.body.length - 1].likes).toBe(0);
  }, 100000);
});

describe('when deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('when updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = {
      author: 'updated Author',
      title: 'updated Blog',
      url: 'http://updatedtest.com',
      likes: 4,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
