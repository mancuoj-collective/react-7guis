import { useState } from 'react'
import { Button } from '../ui/button'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button variant="outline" className="flex-1" onClick={() => setCount(count + 1)}>
      {count}
    </Button>
  )
}
