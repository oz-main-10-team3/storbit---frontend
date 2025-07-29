import { type ReactNode } from 'react';
import { IoIosClose } from "react-icons/io";
import ModalWrapper from './ModalWrapper';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function CommonModal({ isOpen, onClose, title, subtitle, children }: CommonModalProps) {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      {/* X 버튼 */}
      <button
        className="absolute top-4 right-4 text-[#BDBDBD] text-xl"
        onClick={onClose}
      >
        <IoIosClose />
      </button>

      {/* 타이틀 */}
      <h2 className="text-center text-xl font-bold text-[#8349FF]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-[#BDBDBD]">{subtitle}</p>
      )}

      {/* 콘텐츠 */}
      <div className="mt-6 w-full">{children}</div>
    </ModalWrapper>
  );
}