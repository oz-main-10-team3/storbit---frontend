// src/pages/StudyCreatePage.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudyCreatePage() {
  const navigate = useNavigate()

  const [studyName, setStudyName] = useState('')
  const [studyIntro, setStudyIntro] = useState('')
  const [studyType, setStudyType] = useState('')
  const [capacity, setCapacity] = useState('')
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [days, setDays] = useState<string[]>([])
  const [studyTime, setStudyTime] = useState('')
  const [studyLevel, setStudyLevel] = useState('')
  const [gender, setGender] = useState('')

  const [error, setError] = useState('')

  const timeOptions = [
    '오전 12:00',
    '오전 1:00',
    '오전 2:00',
    '오전 3:00',
    '오전 4:00',
  ]
  const levelOptions = ['활동중', '휴강', '종료', '고정', '마스터', '무관']
  const studyTypeOptions = [
    'IT · 프로그래밍 > 개발 교육과정',
    'IT · 프로그래밍 > 커리어 개발',
    'IT · 프로그래밍 > 개발 프로젝트',
  ]
  const daysOptions = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ]

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const validate = () => {
    if (!studyName.trim()) {
      setError('스터디 이름을 입력해주세요.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = () => {
    if (validate()) {
      navigate('/study/create/success')
    }
  }

  return (
    <div className="bg-white py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          나만의 스터디를 만들어 보세요!
        </h1>

        {/* 스터디 이름 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 이름<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mt-1">
            <input
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
              disabled={!studyName}
              className={`px-4 py-2 rounded text-sm font-medium
        ${
          studyName
            ? 'bg-purple-500 text-white hover:bg-purple-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
      `}
            >
              중복확인
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">* {error}</p>}
        </div>

        {/* 소개 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 소개
          </label>
          <textarea
            value={studyIntro}
            onChange={(e) => setStudyIntro(e.target.value)}
            placeholder="스터디 소개를 적어주세요"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* 대표 이미지 업로드 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 대표 이미지
          </label>
          <button className="block w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm text-left text-gray-500">
            이미지 넣기
          </button>
        </div>

        {/* 스터디 종류 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 종류<span className="text-red-500">*</span>
          </label>
          <select
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
          >
            <option value="">선택해 주세요</option>
            {studyTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* 스터디 인원 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 인원<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            disabled={isUnlimited}
            placeholder="최대 10명까지 등록 가능해요"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 disabled:bg-gray-100"
          />
        </div>

        {/* 무제한 설정 */}
        <div className="mb-4 p-4 bg-purple-50 rounded border border-purple-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isUnlimited}
              onChange={() => setIsUnlimited(!isUnlimited)}
              className="accent-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              인원수 모두 허용
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            정원이 가득 찬 경우 대기자 등록을 허용해요
          </p>
        </div>

        {/* 요일 설정 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 정기모임 요일
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {daysOptions.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  days.includes(day)
                    ? 'bg-purple-500 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 스터디 시간 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            스터디 시간<span className="text-red-500">*</span>
          </label>
          <select
            value={studyTime}
            onChange={(e) => setStudyTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
          >
            <option value="">선택해 주세요</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* 스터디 레벨 */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            스터디 레벨<span className="text-red-500">*</span>
          </label>
          <select
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
          >
            <option value="">선택해 주세요</option>
            {levelOptions.map((lv) => (
              <option key={lv} value={lv}>
                {lv}
              </option>
            ))}
          </select>
        </div>

        {/* 성별 선택 */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            성별 설정<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mt-2">
            {['남자', '여자', '무관'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 border rounded-md py-2 text-sm font-semibold transition ${
                  gender === g
                    ? 'bg-purple-500 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!studyName.trim()}
          className={`w-full py-3 rounded-md font-semibold text-sm transition ${
            studyName.trim()
              ? 'bg-purple-500 text-white hover:opacity-90'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          스터디 만들기
        </button>
      </div>
    </div>
  )
}
