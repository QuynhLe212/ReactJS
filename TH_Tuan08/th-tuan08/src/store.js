import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './components/counter_redux';
import { counterToolkitSlice } from './components/counter_reduxToolkit';
import { todoSlice } from './components/todo_redux';
import { todoToolkitSlice } from './components/todo_reduxToolkit';
import { themeSlice } from './components/toggle_redux';
import { themeToolkitSlice } from './components/toggle_reduxToolkit';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    counterToolkit: counterToolkitSlice.reducer,
    todos: todoSlice.reducer,
    todoToolkit: todoToolkitSlice.reducer,
    theme: themeSlice.reducer,
    themeToolkit: themeToolkitSlice.reducer,
  },
});