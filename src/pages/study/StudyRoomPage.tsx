import { useParams } from 'react-router-dom'

export default function StudyRoomPage() {
  const params = useParams()

  return <div className="text-2xl">{params.roomid}번 스터디룸</div>
}
