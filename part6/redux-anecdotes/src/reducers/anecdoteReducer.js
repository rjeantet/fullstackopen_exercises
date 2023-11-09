import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: anecdotesAtStart.map((content) => ({
    content,
    id: getId(),
    votes: 0,
  })),
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };
      state.push(newAnecdote);
    },
    incrementVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? votedAnecdote : anecdote
      );
    },
    appendAnecdotes(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, incrementVote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
