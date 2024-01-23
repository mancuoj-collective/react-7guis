import { useState } from 'react'

export default function TemperatureConverter() {
  const [cel, setCel] = useState(0)
  const [fah, setFah] = useState(32)

  function handleCelChange(val: number) {
    setCel(val)
    setFah(val * (9 / 5) + 32)
  }

  function handleFahChange(val: number) {
    setFah(val)
    setCel((val - 32) * (5 / 9))
  }

  return (
    <div className="converter">
      <input type="number" value={cel} onChange={e => handleCelChange(+e.target.value)} />
      <span>Celsius = </span>
      <input type="number" value={fah} onChange={e => handleFahChange(+e.target.value)} />
      <span>Fahrenheit</span>
    </div>
  )
}
