import { createSlice } from '@reduxjs/toolkit';

// const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
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
      return state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, incrementVote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
