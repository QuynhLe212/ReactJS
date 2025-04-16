import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import '../App.css';

// Create an async thunk for simulated login (for demonstration purposes)
export const loginAsync = createAsyncThunk(
  'authToolkit/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call with 500ms delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation - in a real app, this would be an API call
      if (!credentials.username || !credentials.password) {
        return rejectWithValue('Username and password are required');
      }
      
      // Return user data on successful login
      return {
        username: credentials.username,
        displayName: credentials.username,
        loginTime: new Date().toLocaleString(),
        role: 'user'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Create an auth slice with Redux Toolkit
export const authToolkitSlice = createSlice({
  name: 'authToolkit',
  initialState: {
    isLoggedIn: false,
    user: null,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loginAttempts: 0,
    lastLoginAttempt: null
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
    updateUserInfo: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.loginAttempts += 1;
        state.lastLoginAttempt = new Date().toISOString();
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  }
});

// Export the actions
export const { logout, updateUserInfo, clearErrors } = authToolkitSlice.actions;

// Selectors using memoization pattern
export const selectAuthState = state => state.authToolkit;
export const selectIsLoggedIn = state => state.authToolkit.isLoggedIn;
export const selectUser = state => state.authToolkit.user;
export const selectAuthStatus = state => state.authToolkit.status;
export const selectAuthError = state => state.authToolkit.error;

/**
 * Login component using Redux Toolkit
 */
function AuthToolkit() {
  // Get auth state from Redux store using selectors
  const { isLoggedIn, user, error, status } = useSelector(selectAuthState);
  
  // Get the dispatch function
  const dispatch = useDispatch();
  
  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Handle login form submission
   * @param {Event} e - Form submit event
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Dispatch the async login action
    dispatch(loginAsync({ username, password, rememberMe }));
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

  /**
   * Clear error messages
   */
  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  // Determine if the login button should be disabled
  const isLoginDisabled = status === 'loading' || !username.trim() || !password.trim();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Đăng Nhập (Redux Toolkit)</h2>
      
      {isLoggedIn ? (
        <div className="welcome-container">
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Chào mừng, {user.displayName}!
            </h3>
            <p className="text-green-700">
              Bạn đã đăng nhập lúc: {user.loginTime}
            </p>
            {user.role && (
              <p className="text-green-700 mt-1">
                Vai trò: {user.role}
              </p>
            )}
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
            <div className="bg-red-100 p-3 rounded-lg mb-4 text-red-700 flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={handleClearErrors}
                className="text-red-500 hover:text-red-700 text-sm"
                type="button"
              >
                ✕
              </button>
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
              disabled={status === 'loading'}
            />
          </div>
          
          <div className="mb-4">
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
              disabled={status === 'loading'}
            />
          </div>
          
          <div className="mb-6 flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={status === 'loading'}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ${
              isLoginDisabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600'
            }`}
            disabled={isLoginDisabled}
          >
            {status === 'loading' ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      )}
    </div>
  );
}

export default AuthToolkit;