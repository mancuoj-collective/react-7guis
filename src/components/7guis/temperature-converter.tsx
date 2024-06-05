import { useAtom } from 'jotai'
import { celAtom, fahAtom } from '~/utils/atoms'
import { Input } from '../ui/input'

function Cel() {
  const [value, setValue] = useAtom(celAtom)
  return (
    <div className="flex items-center gap-2">
      <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <p>Celsius</p>
    </div>
  )
}

function Fah() {
  const [value, setValue] = useAtom(fahAtom)
  return (
    <div className="flex items-center gap-2">
      <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <p>Fahrenheit</p>
    </div>
  )
}

export function TemperatureConverter() {
  return (
    <div className="flex items-center gap-2">
      <Cel />
      <p>=</p>
      <Fah />
    </div>
  )
}
