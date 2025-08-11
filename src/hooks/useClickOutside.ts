//외부 클릭 시 모달닫힘 커스텀 훅
// 사용법
// useClickOutside(dropdownRef, () => {
//   if (isOpen) {
//     setIsOpen(false);
//   }
// });

import { useEffect, type RefObject } from 'react'

export default function useClickOutside<T extends HTMLElement>(
  dropdownRef: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!(event.target instanceof Node)) return
      if (!dropdownRef?.current || dropdownRef?.current.contains(event.target))
        return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [dropdownRef, handler])
}
