import { useMemo } from 'react'
import { PenTool } from '@/components/study/studyRoomPage/PenTool'
import type { Point } from '@/types/point'
import { CircleTool } from '@/components/study/studyRoomPage/CircleTool'
import type { Circle } from '@/types/circle'

export function useDrawingTool(
  toolName: 'pen' | 'circle' | 'rect' | 'triangle' | 'text',
  color: string,
  sharedState: {
    setLines?: React.Dispatch<React.SetStateAction<Point[][]>>
    setCircles?: React.Dispatch<React.SetStateAction<Circle[]>>
    // 필요한 setState들을 모두 포함
  }
) {
  return useMemo(() => {
    switch (toolName) {
      case 'pen': {
        if (!sharedState.setLines) return
        const pen = new PenTool(sharedState.setLines)
        pen.setColor?.(color)
        return pen
      }
      case 'circle': {
        if (!sharedState.setCircles) return
        const circle = new CircleTool(sharedState.setCircles)
        circle.setColor?.(color)
        return circle
      }
      // case 'rect': ...
      // case 'text': ...
      default:
        return null
    }
  }, [toolName, color])
}
