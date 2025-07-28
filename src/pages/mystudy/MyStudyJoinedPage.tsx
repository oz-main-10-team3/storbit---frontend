import { Link } from 'react-router-dom'

export default function MyStudyJoinedPage() {
  return (
    <>
      <div className="text-2xl">참여한 스터디 페이지</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/study/1"
      >
        스터디 참여하기
      </Link>
    </>
  )
}
