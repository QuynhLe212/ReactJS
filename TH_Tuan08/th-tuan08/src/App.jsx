import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'
import TodoList from './components/todo'
import TodoListRedux from './components/todo_redux'
import TodoListReduxToolkit from './components/todo_reduxToolkit'
import ToggleTheme, { ThemeProvider } from './components/toggle_theme'
import ToggleRedux, { ReduxThemeProvider } from './components/toggle_redux'

function App() {
  return (
    <ReduxThemeProvider>
      <div className="App">
        <ToggleRedux />
        <div style={{ margin: '2rem 0' }}></div>
        <TodoListReduxToolkit />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterRedux />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterReduxToolkit />
      </div>
    </ReduxThemeProvider>
  )
}

export default App
