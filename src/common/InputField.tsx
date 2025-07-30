import { cn } from '@/utils/cn.ts'
import { type InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  type?: 'text' | 'checkbox' | 'email' | 'password'
}

export default function InputField({
  label,
  error,
  success,
  className,
  type = 'text',
  id,
  ...props
}: InputFieldProps) {
  const isCheckbox = type === 'checkbox'

  const inputClass = cn(
    !isCheckbox &&
      'w-full px-4 py-2.5 rounded-md border text-sm placeholder:text-gray-400 transition-colors duration-100 focus:outline-none',
    {
      'border-alertText text-text': !!error,
      'text-text border-gray-300': !error && !!success,
      'focus:border-black focus:text-text': !error && !success,
      'text-text4 border-gray-300': !props.value && !error && !success,
    },
    className
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        isCheckbox && 'flex-row items-center'
      )}
    >
      {label && !isCheckbox && (
        <label htmlFor={id} className="text-sm font-medium text-black">
          {label}
        </label>
      )}
      <input type={type} className={inputClass} id={id} {...props} />
      {label && isCheckbox && (
        <label htmlFor={id} className="ml-2 text-sm text-text">
          {label}
        </label>
      )}
      {error && (
        <p className="text-xs text-alertText font-medium mt-1">* {error}</p>
      )}
      {!error && success && (
        <p className="text-xs text-alertText font-medium mt-1">* {success}</p>
      )}
    </div>
  )
}
