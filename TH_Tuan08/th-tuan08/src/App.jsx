import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'
import TodoList from './components/todo'
import TodoListRedux from './components/todo_redux'
import TodoListReduxToolkit from './components/todo_reduxToolkit'

function App() {
  return (
    <div className="App">
      {/* <CounterRedux />
      <div style={{ margin: '2rem 0' }}></div>
      <CounterReduxToolkit />
      <div style={{ margin: '2rem 0' }}></div> */}
      {/* <TodoList />
      <div style={{ margin: '2rem 0' }}></div> */}
      {/* <TodoListRedux />
      <div style={{ margin: '2rem 0' }}></div> */}
      <TodoListReduxToolkit />
    </div>
  )
}

export default App
