import { useState } from 'react'
import { Button } from '../ui/button'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button variant="outline" onClick={() => setCount(count + 1)}>
      {count}
    </Button>
  )
}
