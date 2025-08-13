import React, { forwardRef } from 'react'

interface ModalWrapperProps {
  children: React.ReactNode // 모달 내부 콘텐츠
  width?: string // 모달 너비 (Tailwind 클래스로 전달)
  className?: string // 외부에서 전달받은 커스텀 스타일
}

const ModalWrapper = forwardRef<HTMLDivElement, ModalWrapperProps>(
  ({ children, width = 'w-[396px]', className = '' }, ref) => {
    return (
      <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
        <div
          ref={ref}
          className={`bg-white ${width} rounded-xl p-[24px] relative flex flex-col items-center justify-center ${className}`}
        >
          {children}
        </div>
      </div>
    )
  }
)

ModalWrapper.displayName = 'ModalWrapper'

export default ModalWrapper
