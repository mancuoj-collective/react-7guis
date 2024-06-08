import { useState } from 'react'
import { Input } from '../ui/input'

export function TemperatureConverter() {
  const [c, setC] = useState(5)
  const [f, setF] = useState(41)

  function handleC(e: React.ChangeEvent<HTMLInputElement>) {
    const newC = Number(e.target.value)
    setC(newC)
    setF((newC * 9) / 5 + 32)
  }

  function handleF(e: React.ChangeEvent<HTMLInputElement>) {
    const newF = Number(e.target.value)
    setF(newF)
    setC(((newF - 32) * 5) / 9)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Input type="number" value={c} onChange={handleC} className="w-52 pr-10" />
        <div className="absolute inset-y-0 right-3 flex items-center border-l pl-2">
          <p className="text-sm text-foreground/70">℃</p>
        </div>
      </div>
      <div className="relative">
        <Input type="number" value={f} onChange={handleF} className="w-52 pr-10" />
        <div className="absolute inset-y-0 right-3 flex items-center border-l pl-2">
          <p className="text-sm text-foreground/70">℉</p>
        </div>
      </div>
    </div>
  )
}
