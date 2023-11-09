import { configureStore } from '@reduxjs/toolkit';

import anecdoteService from './services/anecdotes';

import anecdotesReducer, { setAnecdotes } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filterContent: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes));
});

export default store;
