import Counter from './counter'
import TemperatureConverter from './temperature-converter'
import FlightBooker from './flight-booker'
import Timer from './timer'
import CRUD from './crud'
import CircleDrawer from './circle-drawer'
import Cells from './cells'

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
