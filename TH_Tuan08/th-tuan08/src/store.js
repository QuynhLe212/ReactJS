import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './components/counter_redux';
import { counterToolkitSlice } from './components/counter_reduxToolkit';
import { todoSlice } from './components/todo_redux';
import { todoToolkitSlice } from './components/todo_reduxToolkit';
import { themeSlice } from './components/toggle_redux';
import { themeToolkitSlice } from './components/toggle_reduxToolkit';
import { cartSlice } from './components/cart_redux';
import { cartToolkitSlice } from './components/cart_reduxToolkit';
import { authReduxSlice } from './components/auth_redux';
import { authToolkitSlice } from './components/auth_toolkit';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    counterToolkit: counterToolkitSlice.reducer,
    todos: todoSlice.reducer,
    todoToolkit: todoToolkitSlice.reducer,
    theme: themeSlice.reducer,
    themeToolkit: themeToolkitSlice.reducer,
    cart: cartSlice.reducer,
    cartToolkit: cartToolkitSlice.reducer,
    authRedux: authReduxSlice.reducer,
    authToolkit: authToolkitSlice.reducer,
  },
});