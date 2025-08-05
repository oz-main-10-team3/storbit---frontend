import rawData from '@/mystudymockdata/mockStudyData.json' assert { type: 'json' }
import type { Study } from '@/types/study'

// 현재 로그인한 유저 ID (전역 상태 또는 context 등으로 대체 가능)
const currentUserId = 123

// Study 타입으로 변환 (상태 유효성 검사 포함)
const isValidStatus = (status: string): status is Study['status'] =>
  ['default', '매칭 완료', '미승인', '검토중', '대기'].includes(status)

export const studyData: Study[] = rawData
  .filter((item) => isValidStatus(item.status))
  .map((item) => {
    return {
      ...item,
      status: item.status as Study['status'],
      isSingleButton: item.isSingleButton ?? false,
      startStatus: item.startStatus ?? false,
      waitingMode: 'waitingMode' in item ? item.waitingMode : false,
      days: item.days ?? [],
      time: item.time ?? '',
      capacity: item.capacity ?? '',
      level: item.level ?? '',
    } as Study
  })

// 방장이 만든 스터디 목록
export const myCreatedStudies: Study[] = studyData.filter(
  (study) => study.userId === currentUserId
)

// 방장이 만든 스터디 ID 목록만 추출
export const createdStudyIdsByLeader: number[] = myCreatedStudies.map(
  (study) => study.id
)

// 스터디 ID로 단일 스터디 데이터 가져오기
export const getStudyById = (id: number): Study | undefined =>
  studyData.find((study) => study.id === id)
