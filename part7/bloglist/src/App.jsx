import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/loginService';
import Notification from './components/Notification';
import NotificationContext from './context/NotificationContext';
import { useContext } from 'react';
import Toggable from './components/Toggable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const notification = useContext(NotificationContext);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Add new blog and store in server
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        blogFormRef.current.toggleVisibility();
        notification.setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
      })
      .catch((error) => {
        notification.setError('Title and url are mandatory');
      });
  };

  const handleLikes = (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    blogService.update(blog.id, changedBlog).then((changedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== changedBlog.id ? blog : changedBlog))
      );
    });
  };

  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id));
          notification.setNotification(
            `Blog ${blog.title} by ${blog.author} deleted`
          );
        })
        .catch((error) => {
          notification.setError('Unauthorized to delete this blog');
        });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      console.log(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notification.setError('Wrong username or password');
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return user ? (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>
      <div>
        <br></br>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={() => handleLikes(blog)}
              handleDelete={() => handleDelete(blog.id)}
            />
          ))}
      </div>
    </>
  ) : (
    <>
      <h1>Log in to the application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </>
  );
};

export default App;
