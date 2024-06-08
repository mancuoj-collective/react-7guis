import { type MouseEvent, useRef, useState } from 'react'
import { cn } from '~/utils/cn'

type Circle = {
  cx: number
  cy: number
  r: number
}

export function CircleDrawer() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [circles, setCircles] = useState<Circle[]>([])
  const [selected, setSelected] = useState<Circle | null>(null)

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const selectedCircle = [...circles].reverse().find(({ cx, cy, r }) => {
      const dx = cx - x
      const dy = cy - y
      return dx * dx + dy * dy <= r * r
    })

    if (selectedCircle) {
      setSelected(selectedCircle)
    } else {
      const newCircle: Circle = { cx: x, cy: y, r: 30 }
      setCircles((prev) => [...prev, newCircle])
    }
  }

  return (
    <div className="h-80 w-96 rounded-md border">
      <svg ref={svgRef} width="100%" height="100%" onClick={handleClick}>
        {circles.map((circle, i) => (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="none"
            className={cn('fill-foreground/50 stroke-background stroke-2', { 'fill-foreground': selected === circle })}
            onClick={(e) => {
              e.stopPropagation()
              setSelected(circle)
            }}
            onContextMenu={(e) => {
              e.preventDefault()
            }}
          />
        ))}
      </svg>
    </div>
  )
}
