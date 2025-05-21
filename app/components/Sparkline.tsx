'use client'
import { useState } from 'react'

export default function Sparkline({ data }: { data: number[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const min = Math.min(...data), max = Math.max(...data)
  const points = data.map((y,i) => {
    const x = (i/(data.length-1))*100
    const yPos = 100 - ((y-min)/(max-min))*100
    return { coords: `${x},${yPos}`, x, yPos, value: ((y-1)*100).toFixed(1) }
  })

  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-full h-6 mt-2">
        <polyline
          fill="none"
          stroke="#6366F1"
          strokeWidth={2}
          points={points.map(p=>p.coords).join(' ')}
        />
        {hoverIdx !== null && (
          <circle
            cx={points[hoverIdx].x}
            cy={points[hoverIdx].yPos}
            r={2}
            fill="#6366F1"
          />
        )}
      </svg>
      {points.map((p,i) => (
        <div
          key={i}
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.yPos}%` }}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)}
        >
          {hoverIdx === i && (
            <div className="absolute -top-6 -left-4 bg-white px-1 text-xs rounded shadow">
              {p.value}%
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
