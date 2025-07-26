import { Link } from 'react-router-dom'

export default function StudyCreatePage() {
  return (
    <>
      <div className="text-2xl">스터디 만들기 페이지</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/study/create/success"
      >
        스터디 만들기 완료
      </Link>
    </>
  )
}
