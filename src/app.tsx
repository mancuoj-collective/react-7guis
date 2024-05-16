import Counter from './components/7guis/counter'
import TemperatureConverter from './components/7guis/temperature-converter'
import FlightBooker from './components/7guis/flight-booker'
import Timer from './components/7guis/timer'
import CRUD from './components/7guis/crud'
import CircleDrawer from './components/7guis/circle-drawer'
import Cells from './components/7guis/cells'

export default function App() {
  return (
    <div className="app">
      <h1 className="title">React 7GUIs</h1>
      <div className="guis">
        <Counter />
        <TemperatureConverter />
        <FlightBooker />
        <Timer />
        <CRUD />
        <CircleDrawer />
        <Cells />
      </div>
    </div>
  )
}
