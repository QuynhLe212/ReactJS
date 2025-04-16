import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import '../App.css';

// Create a theme slice with Redux Toolkit
export const themeToolkitSlice = createSlice({
  name: 'themeToolkit',
  initialState: {
    current: 'light'
  },
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.current = action.payload;
    }
  }
});

// Export the actions
export const { toggleTheme, setTheme } = themeToolkitSlice.actions;

// Create selectors for better performance
export const selectTheme = (state) => state.themeToolkit.current;

// Theme wrapper component
export function ReduxToolkitThemeProvider({ children }) {
  // Get theme value from Redux store using selector
  const theme = useSelector(selectTheme);
  
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
function ToggleReduxToolkit() {
  // Get theme value from Redux store using selector
  const theme = useSelector(selectTheme);
  // Get the dispatch function
  const dispatch = useDispatch();
  
  // Toggle theme handler
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  
  // Set specific theme handler
  const handleSetTheme = (themeValue) => {
    dispatch(setTheme(themeValue));
  };
  
  return (
    <div className="theme-toggle-container">
      <h2>Theme Toggle (Redux Toolkit)</h2>
      <div className="current-theme">
        Current Theme: <span className="theme-value">{theme}</span>
      </div>
      <button 
        onClick={handleToggleTheme} 
        className={`theme-toggle-btn ${theme === 'dark' ? 'dark-btn' : 'light-btn'}`}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <div className="mt-3 flex justify-center gap-4">
        <button 
          onClick={() => handleSetTheme('light')} 
          className="px-3 py-1 bg-blue-500 text-white rounded-md"
          disabled={theme === 'light'}
        >
          Light
        </button>
        <button 
          onClick={() => handleSetTheme('dark')} 
          className="px-3 py-1 bg-gray-700 text-white rounded-md"
          disabled={theme === 'dark'}
        >
          Dark
        </button>
      </div>
    </div>
  );
}

export default ToggleReduxToolkit;