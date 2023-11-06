import { useState, useEffect } from 'react';

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const [details, setDetails] = useState(false);
  const [likes, setLikes] = useState();
  const [deleted, setDeleted] = useState();

  const handleShowDetails = () => {
    setDetails(!details);
  };

  useEffect(() => {
    setLikes(blog.likes);
  }, []);

  useEffect(() => {
    setDeleted(blog.deleted);
  }, []);

  const blogStyle = {
    padding: 10,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogHeader'>
        <span>
          {blog.title}, {blog.author}
        </span>
        <button onClick={handleShowDetails}>{details ? 'hide' : 'show'}</button>
      </div>
      <div className='blogDetails'>
        {details && (
          <>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              likes {blog.likes}
              <button id='like-button' onClick={handleLikes}>
                like
              </button>
            </div>
            <div>{blog.user ? `${blog.user.name}` : ''}</div>
            <div>
              {blog.user && user.username === `${blog.user.username}` ? (
                <button
                  id='remove-button'
                  onClick={() => handleDelete(blog.id)}
                >
                  remove
                </button>
              ) : (
                ''
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
