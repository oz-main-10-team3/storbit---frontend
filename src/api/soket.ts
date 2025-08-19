let socket: WebSocket | null = null

// study_id 기반으로 소켓 초기화
export const initSocket = (studyId: string) => {
  // WebSocket 객체를 생성합니다.
  socket = new WebSocket(`wss://storbit.o-r.kr/ws/study/${studyId}/`)

  socket.onopen = () => {
    // console.log('WebSocket 연결 성공')
  }

  socket.onclose = () => {
    // console.log('WebSocket 연결 해제')
  }

  socket.onerror = (_error) => {
    // console.error('WebSocket 오류 발생:', error)
  }

  // 메시지 수신 핸들러 추가
  socket.onmessage = (_event) => {
    // const data = JSON.parse(event.data)
    // TODO: 서버에서 받은 데이터(다른 유저의 그리기 정보)를 처리하는 로직 추가
    // 예: 다른 유저가 그린 선이나 원을 화면에 렌더링
  }

  return socket
}

// 소켓 가져오기
export const getSocket = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    throw new Error('Socket not initialized or not connected')
  }
  return socket
}

// 소켓 연결 해제
export const disconnectSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close()
    socket = null
  }
}
