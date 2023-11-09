import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filterContent, anecdotes }) => {
    if (filterContent !== '') {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filterContent.toLowerCase())
      );
    } else {
      return anecdotes;
    }
  });
  console.log('anecdotes', anecdotes);

  const vote = (id) => {
    console.log('vote', id);
    dispatch(incrementVote(id));
    dispatch(setNotification('Voted for anecdote!'));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
