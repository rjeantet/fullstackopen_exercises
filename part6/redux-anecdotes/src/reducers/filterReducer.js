import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

// const filterReducer = (state = initialState, action) => {
//   console.log('state now: ', state);
//   console.log('action', action);
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (content) => {
//   return {
//     type: 'SET_FILTER',
//     payload: content,
//   };
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterReducer(state, action) {
      return action.payload;
    },
    filterChange(state, action) {
      return action.payload;
    },
  },
});

export const { filterReducer, filterChange } = filterSlice.actions;
export default filterSlice.reducer;
