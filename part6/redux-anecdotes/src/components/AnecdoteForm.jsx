import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    console.log('addAnecdote', event.target.anecdote.value);
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={(event) => addAnecdote(event)}>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;
