import React from 'react';

interface ModalWrapperProps {
  children: React.ReactNode; // 모달 내부 콘텐츠
  width?: string; // 모달 너비 (Tailwind 클래스로 전달)
  className?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, width = 'w-[396px]' }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
      <div
        className={`bg-white ${width} rounded-xl p-[24px] relative flex flex-col items-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;