// Whiteboard.tsx
import StudyRoomToolbox from '@/components/study/studyRoomPage/StudyRoomToolbox'
import { useDrawingTool } from '@/hooks/useDrawingToolHook'
import type { Circle as CircleType } from '@/types/circle'
import type { ColoredLine } from '@/types/point'
import React, { useEffect, useState } from 'react'
import { Stage, Layer, Line, Circle } from 'react-konva'

export default function Whiteboard({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [toolName, setToolName] = useState<'pen' | 'circle' | 'fillCircle'>(
    'pen'
  )
  const [color, setColor] = useState('#000000')
  const [lines, setLines] = useState<ColoredLine[]>([])
  const [circles, setCircles] = useState<CircleType[]>([])
  const [shouldFillCircle, setShouldFillCircle] = useState(false)

  const tool = useDrawingTool(toolName, color, shouldFillCircle, {
    setLines,
    setCircles,
    circles,
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  //화이트보드 사이즈 부모 사이즈 기준으로 적용
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
        setShouldFillCircle={setShouldFillCircle}
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
          {lines.map((line, idx) => (
            <Line
              key={idx}
              points={line.points.flatMap((p) => [p.x, p.y])}
              stroke={line.color}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}

          {circles.map((circle, idx) => (
            <Circle
              key={idx}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill={circle.isFilled ? circle.color : 'transparent'}
              stroke={circle.color}
              strokeWidth={2}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
