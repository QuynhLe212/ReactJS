import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import '../App.css';

// Tạo todo slice với Redux Toolkit
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    editingId: null
  },
  reducers: {
    // Thêm một todo mới
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
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
    }
  }
});

// Export các actions
export const { addTodo, toggleTodo, removeTodo, setEditingId, updateTodo } = todoSlice.actions;

/**
 * Component danh sách công việc sử dụng Redux
 */
function TodoListRedux() {
  // Lấy danh sách todo và ID đang chỉnh sửa từ Redux store
  const todos = useSelector((state) => state.todos.items);
  const editingId = useSelector((state) => state.todos.editingId);
  
  // Lấy hàm dispatch
  const dispatch = useDispatch();
  
  // State cục bộ để quản lý input
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState('');

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

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">To-do List (Redux)</h2>
      
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
      
      <ul className="divide-y divide-gray-200">
        {todos.length === 0 ? (
          <li className="py-4 text-center text-gray-500">Chưa có công việc nào</li>
        ) : (
          todos.map(todo => (
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
                  <div 
                    className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    {todo.text}
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

export default TodoListRedux;