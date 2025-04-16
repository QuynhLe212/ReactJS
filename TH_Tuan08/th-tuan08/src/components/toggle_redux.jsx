import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import '../App.css';

// Create a theme slice with Redux Toolkit
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    current: 'light'
  },
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    }
  }
});

// Export the action
export const { toggleTheme } = themeSlice.actions;

// Theme wrapper component
export function ReduxThemeProvider({ children }) {
  // Get theme value from Redux store
  const theme = useSelector((state) => state.theme.current);
  
  // Apply theme class to document body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`theme-container ${theme}`}>
      {children}
    </div>
  );
}

// Toggle Theme Button Component
function ToggleRedux() {
  // Get theme value from Redux store
  const theme = useSelector((state) => state.theme.current);
  // Get the dispatch function
  const dispatch = useDispatch();
  
  return (
    <div className="theme-toggle-container">
      <h2>Theme Toggle (Redux)</h2>
      <div className="current-theme">
        Current Theme: <span className="theme-value">{theme}</span>
      </div>
      <button 
        onClick={() => dispatch(toggleTheme())} 
        className={`theme-toggle-btn ${theme === 'dark' ? 'dark-btn' : 'light-btn'}`}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
}

export default ToggleRedux;