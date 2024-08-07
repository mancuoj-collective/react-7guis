import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Slider } from '../ui/slider'

export function Timer() {
  const [duration, setDuration] = useState(10 * 100)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 10)
    }
  }

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (elapsedTime >= duration) {
      clearTimer()
    } else {
      startTimer()
    }

    return clearTimer
  }, [elapsedTime, duration])

  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0] * 100
    setDuration(newDuration)
    if (elapsedTime >= newDuration) {
      setElapsedTime(newDuration)
      clearTimer()
    }
  }

  const handleReset = () => {
    setElapsedTime(0)
    clearTimer()
    startTimer()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Progress
          className="h-10 rounded-md border border-input bg-background"
          value={(elapsedTime / duration) * 100}
        />
        <p className="w-14 text-right">{(elapsedTime / 100).toFixed(2)}s</p>
      </div>
      <div className="flex items-center gap-3">
        <Slider
          value={[duration / 100]}
          onValueChange={handleDurationChange}
          className="my-3"
          min={1}
          max={30}
          step={0.01}
        />
        <p className="w-14 text-right">{(duration / 100).toFixed(2)}s</p>
      </div>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
