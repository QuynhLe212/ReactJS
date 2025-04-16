import { useReducer, useState } from 'react';
import '../App.css';

// Định nghĩa các loại hành động (action types)
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_EDITING = 'SET_EDITING';

/**
 * Reducer function để xử lý thay đổi trạng thái
 * @param {Array} state - Mảng hiện tại của các công việc
 * @param {Object} action - Hành động được gửi đến reducer
 * @returns {Array} - Trạng thái mới sau khi xử lý
 */
const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      // Thêm một công việc mới vào danh sách
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
          editing: false,
        }
      ];
    case TOGGLE_TODO:
      // Đánh dấu hoàn thành/chưa hoàn thành công việc
      return state.map(todo => 
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed } 
          : todo
      );
    case REMOVE_TODO:
      // Xóa một công việc khỏi danh sách
      return state.filter(todo => todo.id !== action.payload);
    case EDIT_TODO:
      // Cập nhật nội dung của một công việc
      return state.map(todo => 
        todo.id === action.payload.id 
          ? { ...todo, text: action.payload.text, editing: false } 
          : todo
      );
    case SET_EDITING:
      // Thiết lập trạng thái chỉnh sửa cho một công việc
      return state.map(todo => 
        todo.id === action.payload 
          ? { ...todo, editing: true } 
          : { ...todo, editing: false }
      );
    default:
      return state;
  }
};

/**
 * Component danh sách công việc sử dụng useReducer
 */
function TodoList() {
  // Khởi tạo useReducer với reducer function và trạng thái ban đầu (mảng rỗng)
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState('');

  /**
   * Thêm một công việc mới vào danh sách
   * @param {string} text - Nội dung công việc cần thêm
   */
  const addTodo = (text) => {
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: text });
      setNewTodo('');
    }
  };

  /**
   * Chuyển đổi trạng thái hoàn thành của công việc
   * @param {number} id - ID của công việc cần chuyển đổi
   */
  const toggleTodo = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  /**
   * Xóa một công việc khỏi danh sách
   * @param {number} id - ID của công việc cần xóa
   */
  const removeTodo = (id) => {
    dispatch({ type: REMOVE_TODO, payload: id });
  };

  /**
   * Bắt đầu chỉnh sửa một công việc
   * @param {Object} todo - Công việc cần chỉnh sửa
   */
  const startEditing = (todo) => {
    setEditText(todo.text);
    dispatch({ type: SET_EDITING, payload: todo.id });
  };

  /**
   * Lưu nội dung chỉnh sửa của công việc
   * @param {number} id - ID của công việc đang chỉnh sửa
   */
  const saveEdit = (id) => {
    if (editText.trim()) {
      dispatch({ 
        type: EDIT_TODO, 
        payload: { id, text: editText }
      });
    }
  };

  /**
   * Xử lý sự kiện submit form
   * @param {Event} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
  };

  /**
   * Xử lý sự kiện khi nhấn phím trong ô input chỉnh sửa
   * @param {Event} e - Event object
   * @param {number} id - ID của công việc đang chỉnh sửa
   */
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">To-do List (useReducer)</h2>
      
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
              {todo.editing ? (
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
                    onClick={() => toggleTodo(todo.id)}
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
                      onClick={() => removeTodo(todo.id)}
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

export default TodoList;