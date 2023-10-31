const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'http://test.com',
    likes: 1,
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'http://test.com',
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
