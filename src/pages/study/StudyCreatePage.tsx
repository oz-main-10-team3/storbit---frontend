import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudyCreatePage() {
  const navigate = useNavigate()

  const [studyName, setStudyName] = useState('')
  const [studyType, setStudyType] = useState('')
  const [studyIntro, setStudyIntro] = useState('')
  const [studyCategory, setStudyCategory] = useState('')
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [capacity, setCapacity] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [error, setError] = useState('')

  const studyTypeOptions = [
    'IT · 프로그래밍 > 개발 교육과정',
    'IT · 프로그래밍 > 커리어 개발',
    'IT · 프로그래밍 > 개발 프로젝트',
  ]

  const timeOptions = [
    '오전 12:00',
    '오전 1:00',
    '오전 2:00',
    '오전 3:00',
    '오전 4:00',
  ]

  const studyCategoryOptions = ['온라인', '오프라인', '혼합']

  const daysOfWeek = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
    '요일별 조율',
  ]

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
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
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
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
              type="button"
              disabled={!studyName}
              className={`px-4 py-2 rounded text-sm font-medium ${
                studyName
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              중복확인
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">* {error}</p>}
        </div>

        {/* 스터디 소개 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 소개<span className="text-red-500">*</span>
          </label>
          <textarea
            value={studyIntro}
            onChange={(e) => setStudyIntro(e.target.value)}
            placeholder="스터디 소개를 작성해주세요"
            className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none text-sm"
          />
        </div>

        {/* 대표 이미지 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 대표 이미지
          </label>
          <button
            type="button"
            className="border border-gray-300 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            이미지 넣기
          </button>
        </div>

        {/* 스터디 종류 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 종류<span className="text-red-500">*</span>
          </label>
          <select
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="">선택해 주세요</option>
            {studyTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 스터디 유형 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 유형<span className="text-red-500">*</span>
          </label>
          <select
            value={studyCategory}
            onChange={(e) => setStudyCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="">선택해 주세요</option>
            {studyCategoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 인원 설정 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 인원<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            disabled={isUnlimited}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="최대 10명까지 등록 가능해요"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm disabled:bg-gray-100"
          />
        </div>

        {/* 인원 무제한 (토글 왼쪽, 텍스트 오른쪽) */}
        <div className="mb-6 border border-gray-300 rounded px-4 py-3 bg-purple-50">
          <div className="flex items-center gap-3">
            {/* 토글 스위치 */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="unlimitedToggle"
                className="sr-only peer"
                checked={isUnlimited}
                onChange={(e) => setIsUnlimited(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
            </label>

            {/* 라벨 텍스트 */}
            <label
              htmlFor="unlimitedToggle"
              className="text-sm font-medium text-gray-700"
            >
              대기자 모드 활성화
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            정원이 가득 찬 경우 대기자 등록을 허용해요
          </p>
        </div>

        {/* 스터디 요일 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 일정<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3 text-sm">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="border-gray-300"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* 스터디 시간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스터디 시간<span className="text-red-500">*</span>
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="">선택해 주세요</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* 성별 선택 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            성별 설정<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {['남자', '여자', '무관'].map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => setSelectedGender(gender)}
                className={`flex-1 border rounded-md py-2 text-sm font-semibold transition ${
                  selectedGender === gender
                    ? 'bg-purple-500 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                }`}
              >
                {gender}
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
