import { useRef, useState, MouseEvent } from 'react'

type Circle = {
  x: number
  y: number
  radius: number
}

export function CircleDrawer() {
  const [circles, setCircles] = useState<Circle[]>([])
  const svgRef = useRef<SVGSVGElement | null>(null)

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCircles((prev) => [...prev, { x, y, radius: 50 }])
  }

  return (
    <div className="h-80 w-96 rounded-md border">
      <svg ref={svgRef} width="100%" height="100%" onClick={handleClick}>
        {circles.map((circle) => (
          <circle
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            fill="none"
            className="fill-foreground/60 stroke-background"
          />
        ))}
      </svg>
    </div>
  )
}
