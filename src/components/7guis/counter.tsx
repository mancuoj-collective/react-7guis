import { Button } from '../ui/button'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button variant="outline" onClick={() => setCount(count + 1)}>
      {count}
    </Button>
  )
}
