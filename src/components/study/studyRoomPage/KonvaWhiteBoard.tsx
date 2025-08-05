// Whiteboard.tsx
import StudyRoomToolbox from '@/components/study/studyRoomPage/StudyRoomToolbox'
import { useDrawingTool } from '@/hooks/useDrawingToolHook'
import type { Circle as CircleType } from '@/types/circle'
import React, { useEffect, useState } from 'react'
import { Stage, Layer, Line, Circle } from 'react-konva'

interface Point {
  x: number
  y: number
}

export default function Whiteboard({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [toolName, setToolName] = useState<'pen' | 'circle'>('pen')
  const [color, setColor] = useState('#000000')
  const [lines, setLines] = useState<Point[][]>([])
  const [circles, setCircles] = useState<CircleType[]>([])

  const tool = useDrawingTool(toolName, color, {
    setLines,
    setCircles,
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const updateSize = () => {
      setDimensions({
        width: containerRef.current!.offsetWidth,
        height: containerRef.current!.offsetHeight,
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [containerRef])

  return (
    <div>
      <StudyRoomToolbox
        setToolName={setToolName}
        setColor={setColor}
        color={color}
      />
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={(e) => {
          tool?.onMouseDown(e)
        }}
        onMouseMove={(e) => tool?.onMouseMove(e)}
        onMouseUp={(e) => tool?.onMouseUp(e)}
        style={{
          backgroundColor: 'transparent', // 배경을 투명하게 설정
        }}
      >
        {/* <Layer>{tool?.render()}</Layer> */}
        <Layer>
          {/* 펜 도구가 그린 선 */}
          {lines.map((line, idx) => (
            <Line
              key={idx}
              points={line.flatMap((p) => [p.x, p.y])}
              stroke={color}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
            />
          ))}

          {/* 원 도구가 그린 원 */}
          {circles.map((circle, idx) => (
            <Circle
              key={idx}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill={circle.color}
              stroke={circle.color}
              strokeWidth={2}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
