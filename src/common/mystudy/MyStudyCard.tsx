import { useState } from 'react' // 추가
import { FiSettings } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import CommonButton from '@/common/CommonButton.tsx'
import type { Study } from '@/types/study.ts'

interface StudyCardProps {
  study: Study
  onLeftButtonClick?: () => void
  onRightButtonClick?: () => void
  leftButtonText?: string
  rightButtonText?: string
  leftButtonDisabled?: boolean
  rightButtonDisabled?: boolean
  showHeart?: boolean
  isFullWidthSingleButton?: boolean
}

export default function MyStudyCard({
  study,
  onLeftButtonClick,
  onRightButtonClick,
  leftButtonText = '왼쪽 버튼',
  rightButtonText = '오른쪽 버튼',
  leftButtonDisabled = false,
  rightButtonDisabled = false,
  showHeart = true,
  isFullWidthSingleButton = false,
}: StudyCardProps) {
  const [liked, setLiked] = useState(study.isLiked) // 하트 상태

  return (
    <div className="w-[360px] rounded-lg p-4 border-none shadow-none">
      <div className="relative">
        <img
          src={study.imageUrl}
          alt={study.title}
          className="w-[360px] h-[226px] object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {study.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-sm text-[10px] font-medium ${
                idx === 0
                  ? 'border border-purple-500 text-purple-500 bg-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 mb-2">
        <h3 className="text-sm font-semibold text-black">{study.title}</h3>
        {showHeart ? (
          <button
            onClick={() => setLiked((prev) => !prev)}
            className="focus:outline-none"
          >
            <AiFillHeart
              className={`h-5 w-5 ${liked ? 'text-purple-500' : 'text-gray-300'}`}
            />
          </button>
        ) : study.isLeader ? (
          <Link
            to={`/study/manage/${study.id}`}
            className="text-gray-700 hover:text-gray-900"
          >
            <FiSettings className="w-5 h-5" />
          </Link>
        ) : null}
      </div>
      <div className="text-xs text-gray-500 line-clamp-2 mb-4">
        {study.description}
      </div>
      <div className="mt-4">
        {isFullWidthSingleButton ? (
          <CommonButton
            className="text-sm w-full"
            variant="primary"
            onClick={onLeftButtonClick}
            disabled={leftButtonDisabled}
          >
            {leftButtonText}
          </CommonButton>
        ) : (
          <div className="flex gap-2">
            {leftButtonText && (
              <CommonButton
                className="text-sm"
                variant={leftButtonDisabled ? 'disabled' : 'secondary'}
                onClick={onLeftButtonClick}
                disabled={leftButtonDisabled}
              >
                {leftButtonText}
              </CommonButton>
            )}
            {rightButtonText && (
              <CommonButton
                className="text-sm"
                variant={rightButtonDisabled ? 'disabled' : 'primary'}
                onClick={onRightButtonClick}
                disabled={rightButtonDisabled}
              >
                {rightButtonText}
              </CommonButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
