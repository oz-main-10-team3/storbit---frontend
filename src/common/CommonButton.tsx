import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const ButtonVariants = cva(
  `rounded-[4px] px-4 py-2 text-sm font-light transition-colors cursor-pointer h-[48px] w-full`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-text3 hover:bg-primary-hover',
        secondary:
          'bg-secondary text-primary hover:bg-secondary-hover hover:text-secondary-textHover',
        grayStyle:
          'bg-disabled-fill text-[#4d4d4d] border-disabled-text border-[1px] hover:bg-[#dedede]',
        disabled:
          'bg-disabled-fill text-disabled-text cursor-not-allowed border-disabled-text border-[1px]',
      },
      visualScale: {
        default: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  visualScale?: 'default' | 'md' | 'lg' | 'xl'
  onClick?: () => void
}

export default function CommonButton({
  variant = 'primary',
  visualScale = 'default',
  children,
  className,
  disabled = false,
  ...Props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(ButtonVariants({ variant, visualScale }), className)}
      {...Props}
    >
      {children && children}
    </button>
  )
}
