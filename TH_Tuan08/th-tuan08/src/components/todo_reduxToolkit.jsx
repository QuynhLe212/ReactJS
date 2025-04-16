import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import '../App.css';

// Tạo todo slice với Redux Toolkit
export const todoToolkitSlice = createSlice({
  name: 'todoToolkit',
  initialState: {
    items: [],
    editingId: null
  },
  reducers: {
    // Thêm một todo mới với prepare callback để tạo ID
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false
        }
      })
    },
    // Chuyển đổi trạng thái hoàn thành
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Xóa một todo
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Đặt ID của todo đang được chỉnh sửa
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    // Cập nhật nội dung của todo
    updateTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
      state.editingId = null;
    },
    // Xóa tất cả todo đã hoàn thành
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed);
    }
  }
});

// Export các actions
export const { 
  addTodo, 
  toggleTodo, 
  removeTodo, 
  setEditingId, 
  updateTodo,
  clearCompleted 
} = todoToolkitSlice.actions;

// Selectors
export const selectTodos = state => state.todoToolkit.items;
export const selectEditingId = state => state.todoToolkit.editingId;
export const selectCompletedCount = state => 
  state.todoToolkit.items.filter(todo => todo.completed).length;

/**
 * Component danh sách công việc sử dụng Redux Toolkit
 */
function TodoListReduxToolkit() {
  // Lấy danh sách todo và ID đang chỉnh sửa từ Redux store sử dụng selectors
  const todos = useSelector(selectTodos);
  const editingId = useSelector(selectEditingId);
  const completedCount = useSelector(selectCompletedCount);
  
  // Lấy hàm dispatch
  const dispatch = useDispatch();
  
  // State cục bộ để quản lý input
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  /**
   * Xử lý sự kiện submit form thêm todo
   * @param {Event} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  /**
   * Bắt đầu chỉnh sửa một todo
   * @param {Object} todo - Todo cần chỉnh sửa
   */
  const startEditing = (todo) => {
    setEditText(todo.text);
    dispatch(setEditingId(todo.id));
  };

  /**
   * Lưu nội dung chỉnh sửa của todo
   * @param {number} id - ID của todo đang chỉnh sửa
   */
  const saveEdit = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }));
    }
  };

  /**
   * Xử lý sự kiện khi nhấn phím trong ô input chỉnh sửa
   * @param {Event} e - Event object
   * @param {number} id - ID của todo đang chỉnh sửa
   */
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    }
  };

  /**
   * Lọc danh sách todo theo trạng thái
   * @returns {Array} - Danh sách todo sau khi lọc
   */
  const filteredTodos = () => {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">To-do List (Redux Toolkit)</h2>
      
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Thêm công việc mới..."
          className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
        >
          Thêm
        </button>
      </form>
      
      <div className="flex mb-4 text-sm">
        <button 
          onClick={() => setFilter('all')}
          className={`mr-2 px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`mr-2 px-3 py-1 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Chưa hoàn thành
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`mr-2 px-3 py-1 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Đã hoàn thành
        </button>
        {completedCount > 0 && (
          <button 
            onClick={() => dispatch(clearCompleted())}
            className="ml-auto px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Xóa đã hoàn thành ({completedCount})
          </button>
        )}
      </div>
      
      <ul className="divide-y divide-gray-200">
        {filteredTodos().length === 0 ? (
          <li className="py-4 text-center text-gray-500">
            {filter === 'all' ? 'Chưa có công việc nào' : 
             filter === 'active' ? 'Không có công việc chưa hoàn thành' : 
             'Không có công việc đã hoàn thành'}
          </li>
        ) : (
          filteredTodos().map(todo => (
            <li key={todo.id} className="py-4 flex items-center justify-between">
              {editingId === todo.id ? (
                <div className="flex-1 flex">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                    className="flex-1 border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center flex-1">
                    <input 
                      type="checkbox" 
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                      className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span 
                      className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex">
                    <button 
                      onClick={() => startEditing(todo)}
                      className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-300"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-300"
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoListReduxToolkit;