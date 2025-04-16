import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './components/counter_redux';
import { counterToolkitSlice } from './components/counter_reduxToolkit';
import { todoSlice } from './components/todo_redux';
import { todoToolkitSlice } from './components/todo_reduxToolkit';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    counterToolkit: counterToolkitSlice.reducer,
    todos: todoSlice.reducer,
    todoToolkit: todoToolkitSlice.reducer,
  },
});