import { useReducer, useState } from 'react';
import '../App.css';

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER_INFO = 'SET_USER_INFO';

/**
 * Reducer function to handle authentication state changes
 * @param {Object} state - Current authentication state
 * @param {Object} action - Action dispatched to the reducer
 * @returns {Object} - New authentication state
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { 
        ...state, 
        isLoggedIn: true,
        user: action.payload
      };
    case LOGOUT:
      return { 
        ...state, 
        isLoggedIn: false,
        user: null
      };
    case SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

/**
 * Login component using useReducer for state management
 */
function Login() {
  // Initial state for authentication
  const initialState = {
    user: null,
    isLoggedIn: false
  };

  // Initialize useReducer with authReducer and initial state
  const [authState, dispatch] = useReducer(authReducer, initialState);
  
  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Handle login form submission
   * @param {Event} e - Form submit event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // In a real app, you would validate credentials against an API
    // For this demo, we'll just accept any non-empty username/password
    const userData = {
      username: username,
      displayName: username, // Use username as display name for simplicity
      loginTime: new Date().toLocaleString()
    };
    
    // Dispatch login action with user data
    dispatch({ type: LOGIN, payload: userData });
    
    // Clear form
    setUsername('');
    setPassword('');
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  /**
   * Update user profile information
   */
  const updateUserProfile = () => {
    dispatch({ 
      type: SET_USER_INFO, 
      payload: { 
        displayName: prompt('Nhập tên hiển thị mới:', authState.user?.displayName) || authState.user?.displayName
      } 
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Đăng Nhập (useReducer)</h2>
      
      {authState.isLoggedIn ? (
        <div className="welcome-container">
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Chào mừng, {authState.user.displayName}!
            </h3>
            <p className="text-green-700">
              Bạn đã đăng nhập lúc: {authState.user.loginTime}
            </p>
          </div>
          
          <div className="flex justify-between mt-4">
            <button
              onClick={updateUserProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Cập nhật thông tin
            </button>
            
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="mt-4">
          {error && (
            <div className="bg-red-100 p-3 rounded-lg mb-4 text-red-700">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;