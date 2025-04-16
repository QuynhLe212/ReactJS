import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'
import TodoList from './components/todo'
import TodoListRedux from './components/todo_redux'
import TodoListReduxToolkit from './components/todo_reduxToolkit'
import ToggleTheme, { ThemeProvider } from './components/toggle_theme'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ToggleTheme />
        <div style={{ margin: '2rem 0' }}></div>
        <TodoListReduxToolkit />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterRedux />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterReduxToolkit />
      </div>
    </ThemeProvider>
  )
}

export default App
