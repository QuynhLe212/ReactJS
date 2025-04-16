import { useReducer, createContext, useContext, useEffect } from 'react';
import '../App.css';

// Action type
const TOGGLE_THEME = 'TOGGLE_THEME';

// Create theme context
export const ThemeContext = createContext();

// Theme reducer function
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return state;
  }
};

// Theme provider component
export function ThemeProvider({ children }) {
  // Initialize useReducer with themeReducer function and initial state
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });

  // Create toggleTheme action
  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  // Apply theme class to document body
  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ state, toggleTheme }}>
      <div className={`theme-container ${state.theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// Toggle Theme Button Component
function ToggleTheme() {
  const { state, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggle-container">
      <h2>Theme Toggle (useReducer)</h2>
      <div className="current-theme">
        Current Theme: <span className="theme-value">{state.theme}</span>
      </div>
      <button 
        onClick={toggleTheme} 
        className={`theme-toggle-btn ${state.theme === 'dark' ? 'dark-btn' : 'light-btn'}`}
      >
        {state.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
}

export default ToggleTheme;