import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(c => c + 1)
  }

  return (
    <div className="counter">
      <span>{count}</span>
      <button onClick={handleClick}>Count</button>
    </div>
  )
}
