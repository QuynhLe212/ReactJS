import './App.css'
import CounterRedux from './components/counter_redux'
import CounterReduxToolkit from './components/counter_reduxToolkit'

function App() {
  return (
    <div className="App">
      <CounterRedux />
      <div style={{ margin: '2rem 0' }}></div>
      <CounterReduxToolkit />
    </div>
  )
}

export default App
