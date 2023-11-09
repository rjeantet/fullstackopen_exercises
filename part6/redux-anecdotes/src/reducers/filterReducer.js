import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

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
