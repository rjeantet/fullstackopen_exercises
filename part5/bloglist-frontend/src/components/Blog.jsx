import { useState, useEffect } from 'react';

const Blog = ({ blog, handleLikes }) => {
  const [details, setDetails] = useState(false);
  const [likes, setLikes] = useState();

  const handleShowDetails = () => {
    setDetails(!details);
  };

  useEffect(() => {
    setLikes(blog.likes);
  }, []);

  const blogStyle = {
    padding: 10,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={blogStyle}>
      {blog.title}, {blog.author}
      <button onClick={handleShowDetails}>{details ? 'hide' : 'show'}</button>
      <div>
        {details && (
          <>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              likes {blog.likes}
              <button onClick={handleLikes}>like</button>
            </div>
            <div>{blog.user ? `${blog.user.name}` : ''}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
