import type { KonvaEventObject } from 'konva/lib/Node'

export interface DrawingTool {
  onMouseDown(e: KonvaEventObject<MouseEvent>): void
  onMouseMove(e: KonvaEventObject<MouseEvent>): void
  onMouseUp(e: KonvaEventObject<MouseEvent>): void
  render(): React.ReactNode
  setColor?: (color: string) => void
}
