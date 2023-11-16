import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';
import { useContext, useRef } from 'react';
import Toggable from './Toggable';
import { Box, Typography, TextField, Button } from '@mui/material';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const blogFormRef = useRef();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notification.setNotification(
        `a new blog ${blog.title} by ${blog.author} added`
      );
    },
    onError: (error) => {
      notification.setError('Title and url are mandatory');
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    const blog = event.target.value;
    event.target.value = '';
    newBlogMutation.mutate({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    });
  };

  return (
    <>
      <Box align='center' sx={{ mt: 4 }}>
        <Toggable buttonLabel='new blog' ref={blogFormRef}>
          <Typography component='h2' variant='h5'>
            Create new blog
          </Typography>
          <Box width='300px' sx={{ mt: 1 }}>
            <form onSubmit={addBlog}>
              <TextField
                label='title'
                margin='normal'
                size='small'
                id='title'
                name='title'
                placeholder='title'
              />
              <TextField
                label='author'
                margin='normal'
                size='small'
                id='author'
                name='author'
                placeholder='author'
              />
              <TextField
                label='url'
                margin='normal'
                size='small'
                id='url'
                name='url'
                placeholder='url'
              />
              <div>
                <Button
                  id='newblog-button'
                  variant='contained'
                  size='small'
                  type='submit'
                >
                  create
                </Button>
              </div>
            </form>
          </Box>
        </Toggable>
      </Box>
    </>
  );
};

export default BlogForm;
