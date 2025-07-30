import { cn } from '@/utils/cn'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'gray' | 'danger'
  rounded?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color = 'primary', rounded = false, ...props }, ref) => {
    const baseStyle =
      'text-white font-semibold shadow-sm transition-colors duration-200'
    const roundedStyle = rounded ? 'rounded-full' : 'rounded-xl'

    const colorVariants = {
      primary: 'bg-[#FF9A62] hover:bg-[#ff8b4b]',
      secondary: 'bg-[#FFCF96] hover:bg-[#ffc580] text-black',
      gray: 'bg-[#D9D9D9] hover:bg-[#c0c0c0] text-black',
      danger: 'bg-[#FF6666] hover:bg-[#ff4c4c]',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyle, roundedStyle, colorVariants[color], className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
