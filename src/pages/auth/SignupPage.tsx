import ConfirmModal from '@/common/ConfirmModal'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)
  return (
    <>
      <div className="text-2xl">회원가입페이지</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/auth/signup/terms"
      >
        약관동의 페이지 이동
      </Link>
      <div className="flex items-center gap-[10px] mt-[20px] p-[10px]">
        <button
          className="bg-amber-200 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          검토중
        </button>
        <button
          className="bg-amber-200 rounded-md"
          onClick={() => setIsOpen2(true)}
        >
          매칭 완료
        </button>
        <button
          className="bg-amber-200 rounded-md"
          onClick={() => setIsOpen3(true)}
        >
          멤버미승인
        </button>
        <button
          className="bg-amber-200 rounded-md"
          onClick={() => setIsOpen4(true)}
        >
          잠깐만요
        </button>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="underReview"
      ></ConfirmModal>
      <ConfirmModal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        type="matchingComplete"
      ></ConfirmModal>
      <ConfirmModal
        isOpen={isOpen3}
        onClose={() => setIsOpen3(false)}
        type="notApproved"
      ></ConfirmModal>
      <ConfirmModal
        isOpen={isOpen4}
        onClose={() => setIsOpen4(false)}
        type="wait"
      ></ConfirmModal>
    </>
  )
}
// type: 'underReview' | 'matchingComplete' | 'notApproved' | 'wait'
