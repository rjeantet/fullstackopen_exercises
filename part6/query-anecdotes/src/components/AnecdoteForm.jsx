import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNew } from '../requests/requests';
import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notification.setNotification('New anecdote created');
    },
    onError: (error) => {
      notification.setNotification(error.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
