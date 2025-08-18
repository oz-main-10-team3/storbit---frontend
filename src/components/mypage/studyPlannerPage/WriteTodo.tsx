import CommonButton from '@/common/CommonButton'
import InputField from '@/common/InputField'
import { useEnterKey } from '@/hooks/useEnterKey'
import { useTodoStore } from '@/store/useTodoStore'
import { useState } from 'react'

export default function WriteTodo({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [todoInput, setTodoInput] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = () => {
    addTodo(todoInput)
    setTodoInput('')
  }
  const { handleKeyDown, handleCompositionStart, handleCompositionEnd } =
    useEnterKey(() => {
      handleSubmit()
    })

  return (
    <div className="flex flex-col gap-[8px] w-[392px] h-[152px] bg-[#f5f5f5] px-[16px] py-[10px] rounded-[8px] mt-[8px]">
      <div>
        <span className="text-[14px] font-light text-text1">오늘의 할일</span>
        <span className="text-alertText">*</span>
      </div>
      <InputField
        className="w-[361px] bg-white placeholder:text-text4"
        placeholder="50자 이내로 작성해주세요"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <div className="flex self-end w-[108px] h-[32px] gap-[4px] mt-[8px]">
        <CommonButton
          variant="primary"
          className="h-[32px]"
          onClick={() => setIsActive(false)}
        >
          취소
        </CommonButton>
        <CommonButton
          variant="secondary"
          className="border-primary border-[1px] h-[32px]"
          onClick={handleSubmit}
        >
          수정
        </CommonButton>
      </div>
    </div>
  )
}
