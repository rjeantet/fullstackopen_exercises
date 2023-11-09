import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';

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
