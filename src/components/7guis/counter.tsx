import { useAtom } from 'jotai'
import { countAtom } from '~/utils/atoms'
import { Button } from '../ui/button'

export function Counter() {
  const [count, inc] = useAtom(countAtom)

  return (
    <div className="flex items-center">
      <Button onClick={inc} size="icon" variant="outline">
        {count}
      </Button>
    </div>
  )
}
