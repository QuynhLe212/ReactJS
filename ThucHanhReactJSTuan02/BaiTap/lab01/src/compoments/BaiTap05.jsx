import { useState } from "react";

export default function BaiTap05() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== "") {
            setTasks([...tasks, { text: inputValue, completed: false }]);
            setInputValue("");
        }
    };

    const handleToggleTask = (index) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleRemoveTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Thêm công việc mới" 
            />
            <button onClick={handleAddTask}>Thêm</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.text}
                        <button onClick={() => handleToggleTask(index)}>
                            {task.completed ? "Hoàn tác" : "Hoàn thành"}
                        </button>
                        <button onClick={() => handleRemoveTask(index)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </>
    );
}