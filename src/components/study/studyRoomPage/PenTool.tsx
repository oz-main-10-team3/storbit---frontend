import React from 'react'
import type { DrawingTool } from '@/types/drawingTool'
import type { Point } from '@/types/point'
import { Line } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

// 색상 정보를 포함한 선 타입
interface ColoredLine {
  points: Point[]
  color: string
}

export class PenTool implements DrawingTool {
  private isDrawing = false
  private color = '#000'
  private lines: ColoredLine[] = [] // 색상 정보 포함
  private setLines: React.Dispatch<React.SetStateAction<Point[][]>>

  constructor(setLines: React.Dispatch<React.SetStateAction<Point[][]>>) {
    this.setLines = setLines
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    this.isDrawing = true
    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (point) {
      // 새로운 선 시작 - 현재 색상으로 저장
      this.lines.push({
        points: [point],
        color: this.color,
      })
      // 상위 컴포넌트 상태도 업데이트 (호환성 유지)
      this.setLines((prev) => [...prev, [point]])
    }
  }

  onMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!this.isDrawing) return

    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (!point) return

    // 현재 그리고 있는 선에 점 추가
    const lastLine = this.lines[this.lines.length - 1]
    lastLine.points.push(point)

    // 단순 상태 업데이트용 상위 컴포넌트 상태 업데이트 (호환성 유지)
    // this.setLines((prev) => [...prev, [point]])
    this.setLines((current) => {
      const newLines = [...current]
      const lastIndex = newLines.length - 1
      if (lastIndex >= 0) {
        newLines[lastIndex] = [...newLines[lastIndex], point]
      }
      return newLines
    })
  }

  onMouseUp() {
    this.isDrawing = false
  }

  setColor(color: string) {
    this.color = color
  }

  render(): React.ReactNode {
    return this.lines.map((line, idx) => (
      <Line
        key={idx}
        points={line.points.flatMap((p) => [p.x, p.y])}
        stroke={line.color} // 각 선마다 저장된 색상 사용
        strokeWidth={2}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
      />
    ))
  }
}
