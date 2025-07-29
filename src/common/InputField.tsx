import { cn } from '@/utils/cn.ts'
import { forwardRef, type InputHTMLAttributes, useState } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, success, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const isFilled = !!props.value && String(props.value).length > 0

    const inputClass = cn(
      'w-full px-4 py-2.5 rounded-md border text-sm placeholder:text-gray-400 transition-colors duration-100 focus:outline-none',
      className,
      {
        // 최우선: 오류 스타일
        'border-alertText text-text': !!error,

        // 성공 스타일 (오류 없을 때만)
        'text-text': !error && !!success,

        // 포커스 상태 (에러, 성공 없을 때만)
        'border-black text-text': isFocused && !error && !success,

        // 입력만 된 상태 (포커스 아님, 에러/성공 없음)
        'border-gray-300 text-text':
          isFilled && !isFocused && !error && !success,

        // 기본 상태
        'border-gray-300 text-text4':
          !isFocused && !isFilled && !error && !success,
      }
    )

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-black">{label}</label>
        )}
        <input
          ref={ref}
          className={inputClass}
          onFocus={(e) => {
            setIsFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur?.(e)
          }}
          {...props}
        />
        {error && (
          <p className="text-xs text-alertText font-medium mt-1">* {error}</p>
        )}
        {!error && success && (
          <p className="text-xs text-alertText font-medium mt-1">* {success}</p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
export default InputField
