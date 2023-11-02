const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  // Use lodash's groupBy to group the blogs by author
  const blogGroups = _.groupBy(blogs, 'author');

  // Use lodash's mapValues to count the number of blogs for each author
  const blogCounts = _.mapValues(blogGroups, (blogList) => blogList.length);

  // Find the author with the maximum number of blogs
  const authorWithMostBlogs = _.maxBy(_.toPairs(blogCounts), (count) => count);

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
