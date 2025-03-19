import { useState, useRef, useEffect } from 'react';
import './style.css'

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  // Hàm định dạng ngày giờ
  const formatDateTime = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date} ${time}`;
  };

  // Thời gian hiện tại chạy theo thời gian thực
  const [currentDateTime, setCurrentDateTime] = useState(formatDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  // Thêm todo mới
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: inputRef.current.value,
      createdAt: formatDateTime(),
    };
    setTodos([...todos, newTodo]);
    inputRef.current.value = '';
  };

  // Xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Sửa todo
  const editTodo = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    const newText = prompt('Edit todo:', todoToEdit.text);
    if (newText) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  return (
    <div>
      <h1>Ứng dụng TodoList</h1>
      <p className="current-time">Thời gian hiện tại: {currentDateTime}</p>

      <div className="todo-form">
        <input
          ref={inputRef}
          className="todo-input"
          placeholder="Thêm việc làm mới"
        />
        <button className="todo-button" onClick={addTodo}>
          Thêm
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className="todo-text">{todo.text}</span>
            <span className="todo-time">(Đã thêm lúc: {todo.createdAt})</span>
            <button onClick={() => editTodo(todo.id)}>Sửa</button>
            <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;