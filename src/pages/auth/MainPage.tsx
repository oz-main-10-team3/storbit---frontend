import TestModal from '@/common/TestModal'
import { useState } from 'react'

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="text-center mt-20">
      <div className="text-2xl mb-4">메인 페이지</div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        모달 열기
      </button>

      <TestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
