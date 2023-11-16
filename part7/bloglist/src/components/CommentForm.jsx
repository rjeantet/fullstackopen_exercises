import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
      <form onSubmit={addComment}>
        <div>
          <input
            id='comment'
            name='comment'
            placeholder='add comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button id='newcomment-button' type='submit'>
            add comment
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
