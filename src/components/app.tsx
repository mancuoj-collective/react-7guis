import Counter from './counter'
import TemperatureConverter from './temperature-converter'

export default function App() {
  return (
    <div className="app">
      <h1 className="title">React 7GUIs</h1>
      <div className='guis'>
        <Counter />
        <TemperatureConverter />
      </div>
    </div>
  )
}
