import { cn } from '@/utils/cn'

interface ProgressBarProps {
  current: number
  goal: number
  className: string
}

export default function ProgressBar({
  current,
  goal,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100)

  return (
    <div
      className={cn(
        `w-full h-[8px] bg-disabled-fill rounded-full overflow-hidden ${className}`
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-300 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}
