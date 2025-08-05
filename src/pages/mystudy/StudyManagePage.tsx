import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommonButton from '@/common/CommonButton'
import InputField from '@/common/InputField'
import Dropdown from '@/common/DropDown'
import {
  daysOfWeek,
  levelOptions,
  studyCapacityOptions,
  studyTimeOptions,
} from '@/constants/studyOptions'
import { FaChevronLeft } from 'react-icons/fa'
import { getStudyById } from '@/data/mockData'
import LeaderDelegateModal from '@/common/LeaderDelegateModal.tsx'
import MemberKickModal from '@/common/MemberKickModal.tsx'
import StudyDismantle from '@/common/StudyDismantle.tsx'
import TransientModal from '@/common/TransientModal.tsx'

// Ensure members have id, nickname, and attendanceRate fields
const members = [
  { id: 1, nickname: '흐어진면볶음밥', attendanceRate: 100 },
  { id: 2, nickname: '볶음밥러버', attendanceRate: 92 },
  { id: 3, nickname: '스파게티매니아', attendanceRate: 87 },
]
export default function StudyManagePage() {
  const [openedMoreId, setOpenedMoreId] = useState<number | null>(null)
  const navigate = useNavigate()
  const { studyId } = useParams()
  const study = studyId ? getStudyById(Number(studyId)) : null

  const [studyName, setStudyName] = useState('')
  const [description, setDescription] = useState('')
  const [waitingMode, setWaitingMode] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  const [capacity, setCapacity] = useState('')
  const [level, setLevel] = useState('')
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false)
  const [isKickModalOpen, setIsKickModalOpen] = useState(false)
  const [isDismantleModalOpen, setIsDismantleModalOpen] = useState(false)
  const [isTransitionLeaveModalOpen, setIsTransitionLeaveModalOpen] =
    useState(false)
  useEffect(() => {
    if (!study) return
    setStudyName(study.title)
    setDescription(study.description)
    setWaitingMode(study.waitingMode ?? false)
    setSelectedDays(study.days || [])
    setSelectedTime(study.time || '')
    setCapacity(String(study.capacity || ''))
    setLevel(study.level || '')
  }, [study])

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  return (
    <div className="w-full flex justify-center mt-[72px]">
      <div className="w-full max-w-[480px] px-6">
        {/* Title */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8"
        >
          <FaChevronLeft className="text-base" />
          <span className="text-black text-xl font-bold">스터디 관리</span>
        </button>

        <div className="flex flex-col gap-[12px]">
          {/* 스터디 이름 */}
          <div className="flex gap-2 items-end">
            <InputField
              label={
                <p className="text-sm font-medium text-text mb-2">
                  스터디 이름<span className="text-alertText ml-1">*</span>
                </p>
              }
              placeholder="이름을 입력해주세요"
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              className="w-[362px] h-[48px] text-[14px]"
            />
            <CommonButton
              variant="secondary"
              className="w-[110px] h-[48px] bg-[#CECECE] text-text text-[10px]"
            >
              중복확인
            </CommonButton>
          </div>

          {/* 스터디 소개 */}
          <div>
            <p className="text-sm font-medium text-text mb-2">
              스터디 소개<span className="text-alertText ml-1">*</span>
            </p>
            <textarea
              placeholder="스터디를 소개해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[120px] border border-gray-300 rounded-md px-4 py-2 text-[14px] resize-none placeholder:text-gray-400 bg-white text-black"
            />
          </div>

          {/* 대표 이미지 */}
          <div>
            <p className="text-sm font-medium text-text mb-2">
              스터디 대표 이미지
            </p>
            <CommonButton
              variant="secondary"
              className="w-[112px] h-[48px] bg-[#ECECEC] text-text font-medium text-[14px]"
            >
              이미지 찾기
            </CommonButton>
          </div>

          {/* 대기자 모드 */}
          <div className="flex items-center ">
            <label className="text-sm font-medium text-text">
              대기자 모드 활성화
            </label>
            <button
              type="button"
              className={`ml-[50px] w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                waitingMode ? 'bg-purple-500' : 'bg-gray-300'
              }`}
              onClick={() => setWaitingMode(!waitingMode)}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  waitingMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 요일 선택 */}
          <div>
            <span className="text-sm font-medium text-text mb-1">
              스터디 일정<span className="text-alertText ml-1">*</span>
            </span>
            <span className="ml-[10px] text-[12px] text-gray-400 mb-2">
              중복선택이 가능하며 선택 시 매주 진행됩니다.
            </span>

            {/* Weekdays (월~금) */}
            <div className="flex flex-row gap-3 mb-2">
              {daysOfWeek
                .filter((day) =>
                  ['월요일', '화요일', '수요일', '목요일', '금요일'].includes(
                    day.label
                  )
                )
                .map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-1 text-sm text-black"
                  >
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-purple-500  checked:border-purple-500 transition-all"
                      checked={selectedDays.includes(day.value)}
                      onChange={() => handleDayToggle(day.value)}
                    />
                    {day.label}
                  </label>
                ))}
            </div>

            {/* Weekends (토, 일, 공휴일) */}
            <div className="flex flex-row gap-3">
              {daysOfWeek
                .filter((day) =>
                  ['토요일', '일요일', '공휴일'].includes(day.label)
                )
                .map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-1 text-sm text-black"
                  >
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-purple-500  checked:border-purple-500 transition-all"
                      checked={selectedDays.includes(day.value)}
                      onChange={() => handleDayToggle(day.value)}
                    />
                    {day.label}
                  </label>
                ))}
            </div>
          </div>

          {/* 시간 / 인원 / 색상 */}
          <Dropdown
            label={
              <p className="text-sm font-medium text-text mb-2">
                스터디 시간<span className="text-alertText ml-1">*</span>
              </p>
            }
            placeholder="선택해 주세요"
            options={studyTimeOptions}
            selected={selectedTime}
            onChange={setSelectedTime}
            className="text-[14px]"
          />
          <Dropdown
            label={
              <p className="text-sm font-medium text-text mb-2">
                스터디 인원<span className="text-alertText ml-1">*</span>
              </p>
            }
            placeholder="선택해 주세요"
            options={studyCapacityOptions}
            selected={capacity}
            onChange={setCapacity}
            className="text-[14px]"
          />
          <Dropdown
            label={
              <p className="text-sm font-medium text-text mb-2">
                스터디 레벨<span className="text-alertText ml-1">*</span>
              </p>
            }
            placeholder="선택해 주세요"
            options={levelOptions}
            selected={level}
            onChange={setLevel}
            className="text-[14px]"
          />

          {/* 제목 */}
          <h3 className="text-black text-base font-semibold mb-4 mt-10">
            참여 멤버 관리
          </h3>

          {/* 멤버 리스트 */}
          <div className="w-[480px] rounded-[32px] border border-[#E3E6EC] bg-white py-[48px] px-[8px]">
            {members.map((member) => {
              return (
                <div
                  key={member.id}
                  className="flex items-center  mb-[16px] last:mb-0"
                >
                  {/* 프로필 */}
                  <div className="w-[40px] h-[40px] rounded-full bg-[#EAEBEE] flex-shrink-0" />
                  {/* 닉네임 */}
                  <span className="ml-[8px] text-[16px] font-medium text-[#222] w-[104px] h-[24px]  flex items-center">
                    {member.nickname}
                  </span>
                  {/* 게이지 */}
                  <div className="flex items-center mx-[4px] w-[248px]">
                    <div className="w-[248px] h-[4px] rounded-[4px] bg-[#EAEBEE] relative">
                      <div
                        className="h-[4px] rounded-[4px] bg-[#B266FF] absolute left-0 top-0"
                        style={{ width: `${member.attendanceRate}%` }}
                      />
                      {/* 출석률 텍스트 (게이지 위에) */}
                      <span
                        className="absolute right-0 top-[-15px] text-[8px] font-medium text-[#CECECE] tracking-tight"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        출석률 {member.attendanceRate}%
                      </span>
                    </div>
                  </div>
                  {/* 출석률 */}

                  {/* 더보기 + 버튼 */}
                  <div className="relative flex items-center">
                    <button
                      onClick={() =>
                        setOpenedMoreId(
                          openedMoreId === member.id ? null : member.id
                        )
                      }
                      className={`text-[10px] font-medium w-[32px] h-[16px]  text-right ${'text-[#CECECE] hover:opacity-60'}`}
                    >
                      더보기
                    </button>
                    {/* 더보기 메뉴  */}
                    {openedMoreId === member.id && (
                      <div className="absolute right-0 top-[110%] flex gap-2 z-10">
                        <CommonButton
                          variant="secondary"
                          className="w-[51px] h-[24px] text-[8px] px-0"
                          onClick={() => {
                            setIsLeaderModalOpen(true)
                          }}
                        >
                          방장위임
                        </CommonButton>
                        <CommonButton
                          variant="primary"
                          className="w-[51px] h-[24px] text-[8px] px-0"
                          onClick={() => {
                            setIsKickModalOpen(true)
                          }}
                        >
                          퇴출
                        </CommonButton>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 저장 버튼 */}
          <CommonButton variant="primary" className="mt-8 w-full text-[14px]">
            저장하기
          </CommonButton>
          <button
            className="text-[14px] text-black underline mt-2 mx-auto block"
            onClick={() => setIsDismantleModalOpen(true)}
          >
            스터디 해체하기
          </button>
        </div>
      </div>
      {/* 최하단에 모달 배치 */}
      <LeaderDelegateModal
        isOpen={isLeaderModalOpen}
        onClose={() => setIsLeaderModalOpen(false)}
        onSubmit={() => {
          setIsLeaderModalOpen(false)
          setOpenedMoreId(null)
        }}
      />

      <MemberKickModal
        isOpen={isKickModalOpen}
        onClose={() => {
          setIsKickModalOpen(false)
        }}
        onSubmit={() => {
          setIsKickModalOpen(false)
        }}
      />

      <StudyDismantle
        isOpen={isDismantleModalOpen}
        onClose={() => setIsDismantleModalOpen(false)}
        onSubmit={() => {
          setIsTransitionLeaveModalOpen(true)
        }}
        onLeave={() => {
          setIsDismantleModalOpen(false)
        }}
      />

      {isTransitionLeaveModalOpen && (
        <TransientModal
          isOpen={isTransitionLeaveModalOpen}
          onClose={() => setIsTransitionLeaveModalOpen(false)}
          type="dissolution"
        />
      )}
    </div>
  )
}
