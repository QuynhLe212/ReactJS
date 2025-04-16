import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'
import TodoList from './components/todo'
import TodoListRedux from './components/todo_redux'
import TodoListReduxToolkit from './components/todo_reduxToolkit'
import ToggleTheme, { ThemeProvider } from './components/toggle_theme'
import ToggleRedux, { ReduxThemeProvider } from './components/toggle_redux'
import ToggleReduxToolkit, { ReduxToolkitThemeProvider } from './components/toggle_reduxToolkit'
import ShoppingCart from './components/cart'
import ShoppingCartRedux from './components/cart_redux'
import ShoppingCartReduxToolkit from './components/cart_reduxToolkit'

function App() {
  return (
    <ReduxToolkitThemeProvider>
      <div className="App">
        <ToggleReduxToolkit />
        <div style={{ margin: '2rem 0' }}></div>
        <ShoppingCartReduxToolkit />
        <div style={{ margin: '2rem 0' }}></div>
        <ShoppingCartRedux />
        <div style={{ margin: '2rem 0' }}></div>
        <ShoppingCart />
        <div style={{ margin: '2rem 0' }}></div>
        <TodoListReduxToolkit />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterRedux />
        <div style={{ margin: '2rem 0' }}></div>
        <CounterReduxToolkit />
      </div>
    </ReduxToolkitThemeProvider>
  )
}

export default App
