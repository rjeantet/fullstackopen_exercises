import { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, Divider, Box, Button } from '@mui/material';

import Header from './Header';
import Notification from './Notification';
import Comments from './Comments';
import blogService from '../services/blogs';
import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext';

const Blog = () => {
  const id = useParams().id;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const likeBlogMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { likes: blog.likes + 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
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
      navigate('/');
    },
    onError: () => {
      notification.setError('Unauthorized to delete this blog');
    },
  });
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const result = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  });

  const blog = result.data;

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>;
  }
  if (result.isPending) {
    return <div>Blog not available</div>;
  }

  return (
    <>
      <Header />
      <Notification />
      <Typography variant='h4' sx={{ mt: 4 }} gutterBottom>
        {blog.title}, {blog.author}
      </Typography>
      <Divider />

      <Box sx={{ mt: 4 }}>
        <a href={blog.url}>{blog.url}</a>
        <Box>
          Added by{' '}
          <Link to={`../users/${blog.user.id}`}>
            {' '}
            {blog.user ? `${blog.user.name}` : ''}
          </Link>
        </Box>
        <Box sx={{ mt: 2 }}>
          {blog.likes} likes
          <Button
            id='like-button'
            size='small'
            variant='contained'
            disableElevation
            onClick={() => handleLikes(blog)}
          >
            like
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          {blog.user && user.username === `${blog.user.username}` ? (
            <Button
              id='remove-button'
              variant='outlined'
              size='small'
              onClick={() => handleDelete(blog.id)}
            >
              remove
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Box>
      <Comments blog={blog} />
    </>
  );
};

export default Blog;
