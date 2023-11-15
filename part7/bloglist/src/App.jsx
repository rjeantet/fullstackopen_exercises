import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const likeBlogMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { likes: blog.likes + 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      notification.setError(error.response.data.error);
    },
  });
  const handleLikes = (blog) => {
    likeBlogMutation.mutate(blog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (id, blog) => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
      notification.setNotification(
        `Blog ${blog.title} by ${blog.author} deleted`
      );
    },
    onError: () => {
      notification.setError('Unauthorized to delete this blog');
    },
  });
  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
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

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  const blogs = result.data;

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>;
  }
  if (result.isPending) {
    return <div>no blogs available</div>;
  }

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
        <BlogForm />
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
