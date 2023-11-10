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
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notification.setNotification('New anecdote created');
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
