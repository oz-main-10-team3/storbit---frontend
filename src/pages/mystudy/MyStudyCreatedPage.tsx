import { Link } from 'react-router-dom'

export default function MyStudyCreatedPage() {
  return (
    <>
      <div className="text-2xl">내가만든 스터디 페이지</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/study/2"
      >
        스터디 시작하기
      </Link>
    </>
  )
}
