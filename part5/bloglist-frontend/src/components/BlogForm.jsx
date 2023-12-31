import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newTitle}
            id='title'
            placeholder='title'
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            id='author'
            placeholder='author'
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            id='url'
            placeholder='url'
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <button id='newblog-button' type='submit'>
            create
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
