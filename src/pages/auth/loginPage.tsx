import TransientModal from '@/common/TransientModal'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="text-2xl">로그인 페이지</div>
      <div className="flex flex-col gap-2">
        <Link
          className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
          to="/auth/find-email"
        >
          이메일 찾기
        </Link>
        <Link
          className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
          to="/auth/find-password"
        >
          비밀번호 찾기
        </Link>
        <button onClick={() => setIsOpen(true)}>모달열기</button>
        <TransientModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="start"
        ></TransientModal>
      </div>
    </>
  )
}
