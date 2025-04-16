import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './components/counter_redux';
import { counterToolkitSlice } from './components/counter_reduxToolkit';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    counterToolkit: counterToolkitSlice.reducer,
  },
});