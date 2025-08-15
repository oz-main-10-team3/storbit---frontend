// useEnterKey.ts
import { useState, useCallback } from 'react'

export function useEnterKey(onEnter: () => void) {
  const [isComposing, setIsComposing] = useState(false)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isComposing) {
        onEnter()
      }
    },
    [isComposing, onEnter]
  )

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false)
  }, [])

  return {
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
  }
}
