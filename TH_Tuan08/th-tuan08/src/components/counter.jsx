import { useReducer } from 'react';
import '../App.css';

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Reducer function to handle state changes
const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function Counter() {
  // Initialize useReducer with our reducer function and initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // Action creators
  const increment = () => {
    dispatch({ type: INCREMENT });
  };

  const decrement = () => {
    dispatch({ type: DECREMENT });
  };

  return (
    <div className="counter-container">
      <h2>Counter App</h2>
      <p className="count">Count: {state.count}</p>
      <div className="button-container">
        <button onClick={increment} className="increment-btn">Tăng</button>
        <button onClick={decrement} className="decrement-btn">Giảm</button>
      </div>
    </div>
  );
}

export default Counter;