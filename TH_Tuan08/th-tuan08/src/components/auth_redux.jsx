import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import '../App.css';

// Create an auth slice with Redux Toolkit
export const authReduxSlice = createSlice({
  name: 'authRedux',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUserInfo: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  }
});

// Export the actions
export const { login, logout, updateUserInfo } = authReduxSlice.actions;

// Selectors
export const selectIsLoggedIn = state => state.authRedux.isLoggedIn;
export const selectUser = state => state.authRedux.user;

/**
 * Login component using Redux
 */
function AuthRedux() {
  // Get auth state from Redux store using selectors
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  
  // Get the dispatch function
  const dispatch = useDispatch();
  
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
    dispatch(login(userData));
    
    // Clear form
    setUsername('');
    setPassword('');
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * Update user profile information
   */
  const updateUserProfile = () => {
    const newDisplayName = prompt('Nhập tên hiển thị mới:', user?.displayName) || user?.displayName;
    dispatch(updateUserInfo({ displayName: newDisplayName }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Đăng Nhập (Redux)</h2>
      
      {isLoggedIn ? (
        <div className="welcome-container">
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Chào mừng, {user.displayName}!
            </h3>
            <p className="text-green-700">
              Bạn đã đăng nhập lúc: {user.loginTime}
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

export default AuthRedux;