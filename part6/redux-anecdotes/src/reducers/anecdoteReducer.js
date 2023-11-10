import AnecdoteService from '../services/anecdotes';
import { createSlice } from '@reduxjs/toolkit';

// const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
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
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await AnecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await AnecdoteService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await AnecdoteService.voteAnecdote(id);
    dispatch(incrementVote(id));
  };
};

export default anecdoteSlice.reducer;
