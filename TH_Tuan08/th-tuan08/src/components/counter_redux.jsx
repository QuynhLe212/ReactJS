import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import '../App.css';

// Create a counter slice with Redux Toolkit
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
});

// Export the actions
export const { increment, decrement } = counterSlice.actions;

// Counter component using Redux
function CounterRedux() {
  // Get count value from Redux store
  const count = useSelector((state) => state.counter.count);
  // Get the dispatch function
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h2>Counter App (Redux)</h2>
      <p className="count">Count: {count}</p>
      <div className="button-container">
        <button onClick={() => dispatch(increment())} className="increment-btn">Tăng</button>
        <button onClick={() => dispatch(decrement())} className="decrement-btn">Giảm</button>
      </div>
    </div>
  );
}

export default CounterRedux;