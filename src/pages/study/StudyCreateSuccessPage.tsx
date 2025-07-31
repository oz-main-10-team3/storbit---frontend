// src/pages/StudyCreateSuccess.tsx
import { Link } from 'react-router-dom'

export default function StudyCreateSuccess() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-center text-gray-900">
        당신의 스터디가 시작됩니다!
      </h1>
      <p className="text-gray-500 mt-2 text-center">
        같은 목표를 가진 멤버들이 곧 합류할 예정이에요
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          to="/study/list"
          className="px-6 py-2 border border-purple-500 text-purple-500 rounded-[5px] hover:bg-purple-50 transition"
        >
          다른 스터디 둘러보기
        </Link>
        <Link
          to="/study/members"
          className="px-6 py-2 bg-purple-500 text-white rounded-[5px] hover:bg-purple-600 transition"
        >
          멤버 현황 보기
        </Link>
      </div>
    </div>
  )
}
