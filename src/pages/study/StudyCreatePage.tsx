import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import InputField from '@/common/InputField'
import SwitchToggle from '@/common/SwitchToggle'
import { cn } from '@/utils/cn'
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
    { label: 'IT · 프로그래밍 > 개발 교육과정', value: '1' },
    { label: 'IT · 프로그래밍 > 커리어 개발', value: '2' },
    { label: 'IT · 프로그래밍 > 개발 프로젝트', value: '3' },
  ]

  const timeOptions = [
    { label: '오전 12:00', value: '1' },
    { label: '오전 1:00', value: '2' },
    { label: '오전 2:00', value: '3' },
    { label: '오전 3:00', value: '4' },
    { label: '오전 4:00', value: '5' },
  ]

  const studyCategoryOptions = [
    { label: '온라인', value: '1' },
    { label: '오프라인', value: '2' },
    { label: '혼합', value: '3' },
  ]

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

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      // 미 입력 시 숫자 0 입력되고 추가 입력 시 ex) 03 으로 입력 되는 오류 제거
      setCapacity('')
      return
    }
    const numValue = Math.floor(Number(rawValue))

    if (isNaN(numValue)) {
      // 마이너스 입력 시 input 에 NaN 입력 오류 제거
      setCapacity('')
      return
    }

    let value = numValue
    if (value > 10) value = 10
    if (value < 0) value = 0
    setCapacity(value.toString())
  }

  return (
    <div className="flex justify-center w-full h-full px-6 py-[104px] bg-white text-text">
      <div className="flex flex-col w-[480px] gap-[40px]">
        <h1 className="text-[32px] font-semibold text-center">
          나만의 스터디를 만들어 보세요!
        </h1>

        {/* 스터디 이름 */}
        <div className="flex flex-col gap-[16px] mt-[40px] w-full">
          <label className="text-[16px]">
            스터디 이름<span className="text-alertText">*</span>
          </label>
          <div className="flex gap-[8px] w-full">
            <InputField
              className="w-[362px] h-[48px] placeholder:text-text4"
              onChange={(e) => setStudyName(e.target.value)}
              error={error}
              placeholder="이름을 입력해주세요"
            />
            <CommonButton variant="grayStyle" className="text-[16px]">
              중복확인
            </CommonButton>
          </div>
        </div>

        {/* 스터디 소개 */}
        <div className="flex flex-col gap-[16px] w-full">
          <label className="text-[16px]">
            스터디 소개<span className="text-alertText">*</span>
          </label>
          <textarea
            value={studyIntro}
            onChange={(e) => setStudyIntro(e.target.value)}
            placeholder="스터디 소개를 작성해주세요"
            className="w-full border border-[#bdbdbd] rounded-[4px] px-[16px] py-[10px] h-[160px] resize-none text-sm"
          />
        </div>

        {/* 대표 이미지 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-[16px]">
            스터디 대표 이미지 <span className="text-alertText">*</span>
          </label>
          <CommonButton variant="grayStyle" className="text-[16px] w-[112px]">
            이미지 찾기
          </CommonButton>
        </div>

        {/* 스터디 종류 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block text-sm font-semibold">
            스터디 종류<span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={studyTypeOptions}
            placeholder="선택해 주세요"
            selected={studyType}
            onChange={setStudyType}
            className="w-full"
          />
        </div>

        {/* 스터디 유형 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block mb-1 text-sm font-semibold ">
            스터디 유형<span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={studyCategoryOptions}
            placeholder="선택해 주세요"
            selected={studyCategory}
            onChange={setStudyCategory}
            className="w-full"
          />
        </div>

        {/* 인원 설정 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block mb-1 text-sm font-semibold">
            스터디 인원<span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            className="h-[48px] placeholder:text-text4 w-full"
            value={capacity}
            disabled={isUnlimited}
            onChange={handleCapacityChange}
            error={error}
            placeholder="최대 10명까지 등록 가능해요"
            min={0}
            max={10}
            step={1}
          />
        </div>

        {/* 인원 무제한 (토글 왼쪽, 텍스트 오른쪽) */}
        <div className="flex flex-col gap-[16px] justify-center px-[16px] py-3 border border-primary bg-secondary rounded-[16px] h-[112px] text-[16px]">
          <div className="flex items-center gap-3">
            {/* 토글 스위치 */}
            <SwitchToggle
              checked={isUnlimited}
              onChange={() => setIsUnlimited((prev) => !prev)}
            />

            {/* 라벨 텍스트 */}
            <label htmlFor="unlimitedToggle" className="text-text">
              대기자 모드 활성화
            </label>
          </div>
          <p className="text-text2">
            정원이 가득 찬 경우 대기자 등록을 허용해요
          </p>
        </div>

        {/* 스터디 요일 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 text-sm">
            {daysOfWeek.map((day) => {
              const isChecked = selectedDays.includes(day)
              return (
                <label
                  key={day}
                  className="relative flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDay(day)}
                    className="w-4 h-4 appearance-none"
                  />
                  <span
                    className={cn(
                      'block rounded-full w-4 h-4 bg-[#bdbdbd] box-border',
                      {
                        'border-2 border-[#0068FB]': isChecked,
                        'border-none': !isChecked,
                      }
                    )}
                  >
                    {isChecked && (
                      <span className="absolute rounded-full w-[10px] h-[10px] bg-[#0068FB] top-[5px] left-[27px]" />
                    )}
                  </span>
                  <span>{day}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* 스터디 시간 */}
        <div className="flex flex-col gap-[16px] mt-[2px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            스터디 시간<span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        {/* 성별 선택 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            성별 설정<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-[4px]">
            {['남', '여', '무관'].map((genderOption) => (
              <CommonButton
                type="button"
                key={genderOption}
                variant={
                  selectedGender === genderOption ? 'primary' : 'secondary'
                }
                className="text-[16px] font-light border-primary border-[1px]"
                onClick={() => setSelectedGender(genderOption)}
              >
                {genderOption}
              </CommonButton>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!studyName.trim()}
          className={`w-full py-3 rounded-md font-semibold text-sm transition mt-[8px] ${
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
