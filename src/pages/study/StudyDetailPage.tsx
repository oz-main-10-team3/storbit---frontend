import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// mock 데이터 타입 정의
interface StudyMock {
  id: number | string
  title: string
  category: string
  subcategory: string
  summary: string
  organizer: { nickname: string }
  participants: { current: number; total: number }
  attendance: number
  goalCompletion: number
  tags?: string[]
}

// mock 데이터 배열 (일부만 예시로 축약 가능)
const mockStudies: StudyMock[] = [
  {
    id: '1',
    title: 'JavaScript 입문반',
    category: 'IT·프로그래밍',
    subcategory: '기초 문법',
    summary: '기초 문법부터 실전까지 배워요!',
    organizer: { nickname: '스터디장1' },
    participants: { current: 10, total: 12 },
    attendance: 95,
    goalCompletion: 80,
    tags: ['왕초보'],
  },
  {
    id: '2',
    title: 'React 실전 프로젝트',
    category: 'IT·프로그래밍',
    subcategory: '프론트엔드',
    summary: 'React로 실무 감각을 익히는 프로젝트 스터디',
    organizer: { nickname: '스터디장2' },
    participants: { current: 7, total: 10 },
    attendance: 88,
    goalCompletion: 70,
    tags: ['BEST'],
  },
  {
    id: '3',
    title: 'Node.js 백엔드 기초',
    category: 'IT·프로그래밍',
    subcategory: '백엔드',
    summary: '서버 개발의 기초부터 배우는 스터디',
    organizer: { nickname: '스터디장3' },
    participants: { current: 5, total: 8 },
    attendance: 76,
    goalCompletion: 60,
  },
  {
    id: '4',
    title: 'Python 데이터 분석',
    category: '데이터·AI',
    subcategory: '데이터 분석',
    summary: 'Pandas와 Matplotlib로 데이터 분석 입문',
    organizer: { nickname: '스터디장4' },
    participants: { current: 12, total: 15 },
    attendance: 92,
    goalCompletion: 85,
  },
  {
    id: '5',
    title: '머신러닝 입문',
    category: '데이터·AI',
    subcategory: '머신러닝',
    summary: 'Scikit-learn으로 머신러닝 기초를 배워요',
    organizer: { nickname: '스터디장5' },
    participants: { current: 9, total: 12 },
    attendance: 89,
    goalCompletion: 75,
    tags: ['왕초보'],
  },
  {
    id: '6',
    title: 'HTML/CSS 디자인',
    category: 'IT·프로그래밍',
    subcategory: '웹 퍼블리싱',
    summary: '기본 HTML/CSS로 웹페이지 만들기',
    organizer: { nickname: '스터디장6' },
    participants: { current: 6, total: 8 },
    attendance: 82,
    goalCompletion: 65,
  },
  {
    id: '7',
    title: 'TypeScript 완전 정복',
    category: 'IT·프로그래밍',
    subcategory: '프론트엔드',
    summary: 'TypeScript로 안정적인 코드 작성하기',
    organizer: { nickname: '스터디장7' },
    participants: { current: 8, total: 10 },
    attendance: 90,
    goalCompletion: 78,
  },
  {
    id: '8',
    title: 'Django 웹 개발',
    category: 'IT·프로그래밍',
    subcategory: '백엔드',
    summary: 'Django 프레임워크로 웹 서비스 만들기',
    organizer: { nickname: '스터디장8' },
    participants: { current: 11, total: 14 },
    attendance: 87,
    goalCompletion: 73,
  },
  {
    id: '9',
    title: 'Vue.js 실습',
    category: 'IT·프로그래밍',
    subcategory: '프론트엔드',
    summary: 'Vue.js로 SPA 개발하기',
    organizer: { nickname: '스터디장9' },
    participants: { current: 4, total: 6 },
    attendance: 75,
    goalCompletion: 55,
  },
  {
    id: '10',
    title: 'Java 알고리즘 스터디',
    category: 'IT·프로그래밍',
    subcategory: '알고리즘',
    summary: 'Java로 코딩테스트 대비하기',
    organizer: { nickname: '스터디장10' },
    participants: { current: 13, total: 15 },
    attendance: 96,
    goalCompletion: 88,
    tags: ['BEST'],
  },
  {
    id: '11',
    title: 'C++ 자료구조',
    category: 'IT·프로그래밍',
    subcategory: '알고리즘',
    summary: 'C++로 자료구조 깊게 배우기',
    organizer: { nickname: '스터디장11' },
    participants: { current: 7, total: 9 },
    attendance: 85,
    goalCompletion: 72,
  },
  {
    id: '12',
    title: 'Rust 언어 기초',
    category: 'IT·프로그래밍',
    subcategory: '시스템 프로그래밍',
    summary: '안전하고 빠른 Rust 배우기',
    organizer: { nickname: '스터디장12' },
    participants: { current: 3, total: 6 },
    attendance: 68,
    goalCompletion: 50,
  },
  {
    id: '13',
    title: 'Kotlin 안드로이드 개발',
    category: 'IT·프로그래밍',
    subcategory: '모바일',
    summary: 'Kotlin으로 Android 앱 만들기',
    organizer: { nickname: '스터디장13' },
    participants: { current: 6, total: 10 },
    attendance: 80,
    goalCompletion: 67,
  },
  {
    id: '14',
    title: 'Swift iOS 앱 개발',
    category: 'IT·프로그래밍',
    subcategory: '모바일',
    summary: 'Swift로 iOS 앱 만들기',
    organizer: { nickname: '스터디장14' },
    participants: { current: 9, total: 12 },
    attendance: 88,
    goalCompletion: 74,
  },
  {
    id: '15',
    title: 'Unity 게임 개발',
    category: 'IT·프로그래밍',
    subcategory: '게임 개발',
    summary: 'Unity 엔진으로 게임 제작하기',
    organizer: { nickname: '스터디장15' },
    participants: { current: 5, total: 7 },
    attendance: 77,
    goalCompletion: 63,
  },
  {
    id: '16',
    title: '블록체인 기초',
    category: 'IT·프로그래밍',
    subcategory: '블록체인',
    summary: '블록체인 개념과 Solidity 배우기',
    organizer: { nickname: '스터디장16' },
    participants: { current: 4, total: 6 },
    attendance: 70,
    goalCompletion: 58,
  },
  {
    id: '17',
    title: 'Go 언어 네트워크 프로그래밍',
    category: 'IT·프로그래밍',
    subcategory: '백엔드',
    summary: 'Go로 네트워크 서버 만들기',
    organizer: { nickname: '스터디장17' },
    participants: { current: 3, total: 5 },
    attendance: 65,
    goalCompletion: 52,
  },
  {
    id: '18',
    title: 'AWS 클라우드 기초',
    category: 'IT·프로그래밍',
    subcategory: '클라우드',
    summary: 'AWS로 인프라 구축 입문',
    organizer: { nickname: '스터디장18' },
    participants: { current: 8, total: 10 },
    attendance: 83,
    goalCompletion: 69,
  },
  {
    id: '19',
    title: 'DevOps CI/CD',
    category: 'IT·프로그래밍',
    subcategory: '인프라',
    summary: 'Jenkins와 GitHub Actions로 CI/CD 구축',
    organizer: { nickname: '스터디장19' },
    participants: { current: 5, total: 8 },
    attendance: 79,
    goalCompletion: 66,
  },
  {
    id: '20',
    title: '보안 기초',
    category: 'IT·프로그래밍',
    subcategory: '보안',
    summary: '네트워크 보안과 암호학 기본',
    organizer: { nickname: '스터디장20' },
    participants: { current: 6, total: 9 },
    attendance: 81,
    goalCompletion: 70,
  },
]

// 화면에서 사용할 데이터 타입
interface StudyData {
  id: number
  tags: string[]
  categoryPath: string
  title: string
  description: string
  attendanceRate: number
  goalRate: number
  meetingTime: string
  currentMembers: number
  totalMembers: number
  remainingSlots: number
}

export default function StudyDetail() {
  // URL 파라미터에서 id를 받아옴
  const { id } = useParams()
  const [study, setStudy] = useState<StudyData | null>(null)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!id) return

    // mock 데이터에서 id와 일치하는 스터디 찾기
    const mock = mockStudies.find((s) => s.id === id)
    if (!mock) return

    // StudyData 형태로 변환
    const transformed: StudyData = {
      id: Number(mock.id),
      tags: mock.tags || [],
      categoryPath: `${mock.category} > ${mock.subcategory}`,
      title: mock.title,
      description: mock.summary,
      attendanceRate: mock.attendance,
      goalRate: mock.goalCompletion,
      meetingTime: '금요일 오후 12:00', // 임의 지정 (필요 시 mock에 추가 가능)
      currentMembers: mock.participants.current,
      totalMembers: mock.participants.total,
      remainingSlots: mock.participants.total - mock.participants.current,
    }
    setStudy(transformed)
  }, [id])

  const handleSendMessage = () => {
    if (!message.trim()) return alert('쪽지 내용을 입력해주세요.')
    alert('쪽지가 전송되었습니다!')
    setMessage('')
    setIsMessageOpen(false)
  }

  if (!study) return <div>로딩 중...</div>

  return (
    <div className="bg-white min-h-screen py-10 px-6 max-w-5xl mx-auto">
      {/* 상단 태그 및 경로 */}
      <div className="flex items-center gap-3 mb-4">
        {study.tags.map((tag, idx) => (
          <button
            key={idx}
            className={
              tag === 'BEST'
                ? 'bg-red-400 text-white rounded-md px-4 py-1 text-sm font-medium'
                : 'text-purple-700 border border-purple-700 rounded-md px-4 py-1 text-sm font-medium hover:bg-purple-50 transition'
            }
          >
            {tag}
          </button>
        ))}
        <span className="text-gray-700 text-sm">{study.categoryPath}</span>
      </div>

      {/* 타이틀 */}
      <h1 className="text-3xl font-extrabold mb-4">{study.title}</h1>

      {/* 설명 텍스트 */}
      <p className="text-gray-700 mb-8 leading-relaxed text-base">
        {study.description}
      </p>

      {/* 버튼 그룹 */}
      <div className="flex gap-4 mb-8">
        <button className="flex-1 border border-purple-500 text-purple-600 rounded-md py-3 text-sm font-medium hover:bg-purple-50 transition">
          대기자 신청
        </button>
        <button
          className="flex-1 bg-purple-600 text-white rounded-md py-3 text-sm font-medium hover:bg-purple-700 transition"
          onClick={() => setIsMessageOpen(true)}
        >
          쪽지 보내기
        </button>
      </div>

      {/* 하단 상태 박스 그룹 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 스터디 현황 */}
        <div className="bg-white border rounded-md p-6 shadow-sm">
          <h3 className="font-semibold mb-3">스터디 현황</h3>
          <div className="flex justify-between mb-1 text-sm font-medium text-gray-800">
            <span>평균 출석률</span>
            <span>{study.attendanceRate}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-300 mb-4">
            <div
              className="h-2 rounded-full bg-purple-600"
              style={{ width: `${study.attendanceRate}%` }}
            ></div>
          </div>

          <div className="flex justify-between mb-1 text-sm font-medium text-gray-800">
            <span>목표 달성률</span>
            <span>{study.goalRate}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-300">
            <div
              className="h-2 rounded-full bg-purple-600"
              style={{ width: `${study.goalRate}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
              />
            </svg>
            {study.meetingTime}
          </div>
        </div>

        {/* 모집 인원 */}
        <div className="bg-white border rounded-md p-6 shadow-sm">
          <h3 className="font-semibold mb-3">모집 인원</h3>

          <div className="flex justify-between mb-1 text-sm font-medium text-gray-800">
            <span>현재 참여 인원</span>
            <span>{study.currentMembers}명</span>
          </div>
          <div className="flex justify-between mb-1 text-sm font-medium text-purple-600">
            <span>총 모집 인원</span>
            <span>{study.totalMembers}명</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-300 mb-4">
            <div
              className="h-2 rounded-full bg-purple-600"
              style={{
                width: `${(study.currentMembers / study.totalMembers) * 100}%`,
              }}
            ></div>
          </div>

          <p className="text-xs text-gray-700">
            모집 마감까지{' '}
            <span className="text-purple-600 font-semibold">
              {study.remainingSlots}자리
            </span>{' '}
            남았습니다
          </p>
        </div>
      </div>

      {/* 쪽지 모달 */}
      {isMessageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">쪽지 보내기</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md p-2 text-sm mb-4"
              rows={4}
              placeholder="메시지를 입력하세요"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsMessageOpen(false)}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
