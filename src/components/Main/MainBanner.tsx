import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import main01 from '@/assets/images/main01.png'

// ◼ 임시로 1장을 10개로 복제
const images = Array.from({ length: 10 }, () => main01)

const MainBanner = () => {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const duration = 5000 // 5s

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length)
        setProgress(0)
      }, duration)

      progressRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 2))
      }, duration / 50)
    }

    return () => {
      clearInterval(intervalRef.current!)
      clearInterval(progressRef.current!)
    }
  }, [isPlaying, index])

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
    setProgress(0)
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length)
    setProgress(0)
  }

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* 포인터: 프리뷰 문구 */}
      <img
        src={images[index]}
        alt={`배너 ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* 하단 열 정지/ubtn 정리 */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between py-4">
          {/* 진행바 */}
          <div className="relative flex-1 h-[2px] bg-white overflow-hidden mr-4">
            <div
              className="absolute top-0 left-0 h-full bg-[#121212] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 한 세트의 버튼 및 간격선 */}
          <div className="flex items-center gap-4 text-white text-lg">
            <button onClick={handlePrev} className="cursor-pointer">
              <FiChevronLeft />
            </button>
            <div className="w-[2px] h-[12px] bg-white rounded-sm" />
            <button onClick={handleNext} className="cursor-pointer">
              <FiChevronRight />
            </button>
            <div />
            <button onClick={() => setIsPlaying((prev) => !prev)} className="cursor-pointer">
              {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner