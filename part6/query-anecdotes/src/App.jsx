import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAll, voteAnecdote } from './requests/requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import NotificationContext from './context/NotificationContext';
import { useContext } from 'react';

const App = () => {
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notification.setNotification('Voted successfully');
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
    console.log('vote');
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const anecdotes = result.data;

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isPending) {
    return <div>no anecdotes available</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
