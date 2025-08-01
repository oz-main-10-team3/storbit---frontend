import CommonButton from '@/common/CommonButton'
import ProgressBar from '@/components/mypage/studyPlannerPage/ProgressBar'
import Todo from '@/components/mypage/studyPlannerPage/todo'
import WriteTodo from '@/components/mypage/studyPlannerPage/WriteTodo'
import { useTodoStore } from '@/store/useTodoStore'
import { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'

const goalInProgresses = [
  { goal: '2025년 12월 토익 900점 목표', dDay: 365, progressDay: 256 },
  { goal: '정보 처리기사 취득', dDay: 365, progressDay: 123 },
  { goal: 'React로 웹사이트 구현하기', dDay: 365, progressDay: 80 },
]

export default function StudyPlannerPage() {
  const [isActive, setIsActive] = useState(false)
  const todos = useTodoStore((state) => state.todos)
  const removeCompletedTodos = useTodoStore(
    (state) => state.removeCompletedTodos
  )

  return (
    <div className="w-[768px] mt-[88px] ml-[160px] pb-[20px]">
      <div className="text-[#121212] text-[24px]">
        뭉치면주먹밥님의 스터디플랜
      </div>
      <div className="flex flex-col gap-[16px] mt-[16px]">
        <div className="flex p-[20px] items-center justify-between w-full h-[64px] border-[1px] rounded-[8px] border-[#bdbdbd] font-light">
          <div className=" text-text2">
            최종 목표가 뭐냐며는 로또 1등되서 그만둡니다 하고 말하는 것!
          </div>
          <BsPencil size={24} className="text-[#bdbdbd] cursor-pointer" />
        </div>
        <div className="flex gap-[16px]">
          <div className="flex flex-col gap-[16px] w-[440px]">
            <div className="flex flex-col gap-[25px] w-[440px] h-[248px] border-[1px] rounded-[8px] border-[#bdbdbd] p-[20px]">
              <div className="flex items-center justify-between">
                <div className="text-text1 text-[20px]">도전 중인 목표</div>
                <GoPlus
                  size={25}
                  className="text-disabled-text cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                {goalInProgresses.map(({ goal, dDay, progressDay }, index) => {
                  const daysLeft = dDay - progressDay

                  return (
                    <div key={index} className="flex flex-col gap-[1px]">
                      <div className="text-[16px]">{goal}</div>
                      <div className="flex items-center gap-[5px]">
                        <ProgressBar
                          current={progressDay}
                          goal={dDay}
                          className="w-[336px]"
                        />
                        <div className="text-[16px]">d-{daysLeft}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="w-[440px] h-[472px] border-[1px] rounded-[8px] border-[#bdbdbd] p-[20px] flex flex-col">
              {/* 스크롤 영역 */}
              <div className="flex-1 overflow-y-scroll scrollbar-hide">
                {/* 상단 고정 헤더 */}
                <div className="sticky top-0 bg-white z-10 pb-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="text-text1 text-[20px]">오늘의 할 일</div>
                    <GoPlus
                      size={25}
                      className="text-disabled-text cursor-pointer"
                      onClick={() => setIsActive(true)}
                    />
                  </div>
                </div>

                {/* 동적 입력창 */}
                {isActive && <WriteTodo setIsActive={setIsActive} />}

                {/* 할 일 목록 */}
                {todos.map((todo) => (
                  <Todo key={todo.id} {...todo} />
                ))}
              </div>

              {/* 하단 고정 버튼 */}
              <CommonButton
                className="mt-[8px]"
                onClick={() => removeCompletedTodos()}
              >
                완료된 목록 삭제하기
              </CommonButton>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="w-full h-[408px] border-[1px] rounded-[8px] border-[#bdbdbd] p-[20px]"></div>
            <div className="w-full h-[312px] border-[1px] rounded-[8px] border-[#bdbdbd] p-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
