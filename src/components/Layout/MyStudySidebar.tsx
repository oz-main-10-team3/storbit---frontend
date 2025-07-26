import { Link } from 'react-router-dom'

export default function MyStudySidebar() {
  return (
    <div className="flex flex-col text-white gap-[10px]">
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mystudy/applied"
      >
        신청한 스터디
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mystudy/joined"
      >
        참여한 스터디
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mystudy/created"
      >
        내가만든 스터디
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mystudy/favorites"
      >
        찜한 스터디
      </Link>
    </div>
  )
}
