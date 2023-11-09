import { configureStore } from '@reduxjs/toolkit';

import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filterContent: filterReducer,
    notification: notificationReducer,
  },
});

console.log(store.getState());

export default store;
