import { configureStore } from '@reduxjs/toolkit';

import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filterContent: filterReducer,
  },
});

console.log(store.getState());

export default store;
