import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import '../App.css';

// Create a counter slice with Redux Toolkit
export const counterToolkitSlice = createSlice({
  name: 'counterToolkit',
  initialState: {
    count: 0,
    status: 'idle'
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    reset: (state) => {
      state.count = 0;
    }
  }
});

// Export the actions
export const { increment, decrement, incrementByAmount, reset } = counterToolkitSlice.actions;

// Counter component using Redux Toolkit
function CounterReduxToolkit() {
  // Get count value from Redux store
  const count = useSelector((state) => state.counterToolkit.count);
  // Get the dispatch function
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h2>Counter App (Redux Toolkit)</h2>
      <p className="count">Count: {count}</p>
      <div className="button-container">
        <button onClick={() => dispatch(increment())} className="increment-btn">Tăng</button>
        <button onClick={() => dispatch(decrement())} className="decrement-btn">Giảm</button>
        <button onClick={() => dispatch(incrementByAmount(5))} className="increment-btn">Tăng 5</button>
        <button onClick={() => dispatch(reset())} className="decrement-btn">Reset</button>
      </div>
    </div>
  );
}

export default CounterReduxToolkit;