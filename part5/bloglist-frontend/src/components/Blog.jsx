import { useState, useEffect } from 'react';

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);

  const handleShowDetails = () => {
    setDetails(!details);
  };

  const blogStyle = {
    padding: 10,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleShowDetails}>{details ? 'hide' : 'show'}</button>
      <div>
        {details && (
          <>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              likes {blog.likes}
              <button>like</button>
            </div>
            <div>{blog.author}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
