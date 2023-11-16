import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField, Divider, Box, Button } from '@mui/material';

import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';

const CommentForm = ({ blog, onAddComment }) => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const createCommentMutation = useMutation({
    mutationFn: (comment) => blogService.createComment(blog.id, comment),
    onSuccess: (data) => {
      const newComment = data.comments[data.comments.length - 1];
      onAddComment(newComment);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      notification.setNotification(`Comment ${comment} added successfully!`);
    },
    onError: (error) => {
      notification.setError('Failed to add comment');
    },
  });

  const addComment = async (event) => {
    event.preventDefault();
    createCommentMutation.mutate({ comment });
  };

  return (
    <>
      <Box component='form' onSubmit={addComment} noValidate sx={{ mt: 1 }}>
        <TextField
          id='comment'
          label='comment'
          name='comment'
          size='small'
          placeholder='add comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button id='newcomment-button' variant='outlined' type='submit'>
          add comment
        </Button>
      </Box>
    </>
  );
};

export default CommentForm;
