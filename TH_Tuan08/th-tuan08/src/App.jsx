import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'
import TodoList from './components/todo'
import TodoListRedux from './components/todo_redux'

function App() {
  return (
    <div className="App">
      {/* <CounterRedux />
      <div style={{ margin: '2rem 0' }}></div>
      <CounterReduxToolkit />
      <div style={{ margin: '2rem 0' }}></div> */}
      {/* <TodoList />
      <div style={{ margin: '2rem 0' }}></div> */}
      <TodoListRedux />
    </div>
  )
}

export default App
