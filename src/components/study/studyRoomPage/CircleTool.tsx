import React from 'react'
import type { DrawingTool } from '@/types/drawingTool'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Circle } from '@/types/circle'
import { getSocket } from '@/api/soket'

export class CircleTool implements DrawingTool {
  private isDrawing = false
  private startX = 0
  private startY = 0
  private color = '#000'
  private shouldFillCircle = false
  private circles: Circle[] = []
  private setCircles: React.Dispatch<React.SetStateAction<Circle[]>>

  constructor(
    circles: Circle[],
    setCircles: React.Dispatch<React.SetStateAction<Circle[]>>,
    shouldFill: boolean
  ) {
    this.circles = circles
    this.setCircles = setCircles
    this.shouldFillCircle = shouldFill
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    this.isDrawing = true
    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (point) {
      this.startX = point.x
      this.startY = point.y
    }
  }

  onMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!this.isDrawing) return

    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (!point) return

    const dx = point.x - this.startX
    const dy = point.y - this.startY
    const radius = Math.sqrt(dx * dx + dy * dy)

    const previewCircle: Circle = {
      x: this.startX,
      y: this.startY,
      radius,
      color: this.color,
      isFilled: this.shouldFillCircle,
    }

    this.setCircles([...this.circles, previewCircle])
  }

  onMouseUp(e: KonvaEventObject<MouseEvent>) {
    this.isDrawing = false

    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (!point) return

    const dx = point.x - this.startX
    const dy = point.y - this.startY
    const radius = Math.sqrt(dx * dx + dy * dy)

    const finalCircle: Circle = {
      x: this.startX,
      y: this.startY,
      radius,
      color: this.color,
      isFilled: this.shouldFillCircle,
    }

    this.circles.push(finalCircle)
    this.setCircles([...this.circles])
    const socket = getSocket()
    const message = {
      type: 'draw:circle', // 서버에서 구분할 타입
      data: finalCircle,
    }
    socket.send(JSON.stringify(message))
  }

  setColor(color: string) {
    this.color = color
  }

  setFillState(isFilled: boolean) {
    this.shouldFillCircle = isFilled
  }

  // render(): React.ReactNode {
  //   return this.circles.map((circle, idx) => (
  //     <KonvaCircle
  //       key={idx}
  //       x={circle.x}
  //       y={circle.y}
  //       radius={circle.radius}
  //       fill={circle.color}
  //       stroke={circle.color}
  //       strokeWidth={2}
  //     />
  //   ))
  // }
}
