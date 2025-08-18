// Countdown 타이머 Hook
// 인증번호 제한 시간, 타이머 알림 등 일정 시간 감소 UI에 사용
// 지정된 duration(초 단위) 동안 1초 간격으로 감소
// start() 호출 시 타이머 시작 (기존 타이머는 정리됨)
// onExpire(): 시간이 0초가 되면 실행되는 콜백 함수 (선택)

// 사용 시 주의사항
// start() 호출 전에는 countdown이 동작하지 않습니다.
// duration 단위는 초(seconds)입니다.
// 컴포넌트가 언마운트되면 자동으로 타이머가 정리됩니다.
// 동시에 여러 타이머를 사용할 경우 인스턴스 간 충돌이 없도록 각 훅 인스턴스를 독립적으로 사용해야 합니다.

import { useEffect, useRef, useState } from 'react'

interface UseCountdownOptions {
  duration: number
  onExpire?: () => void
}

const useCountdown = ({ duration, onExpire }: UseCountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState(0) // 남은 시간 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null) // setInterval 저장용 ref

  // 현재 진행 중인 타이머를 정리하는 함수
  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // countdown 시작 함수 (start 호출 시 타이머 시작됨)
  const start = () => {
    clear() // 기존 타이머 제거
    setTimeLeft(duration) // 남은 시간 초기화

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clear() // 마지막 1초 이후 타이머 종료
          if (onExpire) onExpire() // onExpire 콜백 실행
          return 0
        }
        return prevTime - 1 // 1초씩 감소
      })
    }, 1000)
  }

  // countdown 수동 종료 함수
  const stop = () => {
    clear()
    setTimeLeft(0)
  }

  // 컴포넌트 unmount 시 타이머 정리
  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  return { timeLeft, start, stop } // 남은 시간과 타이머 시작 함수 반환
}

export default useCountdown
