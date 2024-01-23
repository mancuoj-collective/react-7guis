import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter">
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>Count</button>
    </div>
  )
}
