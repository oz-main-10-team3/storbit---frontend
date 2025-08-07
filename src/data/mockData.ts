import rawData from '@/mystudymockdata/mockStudyData.json' assert { type: 'json' }
import type { Study } from '@/types/study'

// 현재 로그인된 사용자 ID (하드코딩 상태)
const currentUserId = 123

// 스터디 status 값이 유효한지 체크하는 타입 가드 함수
const isValidStatus = (status: string): status is Study['status'] =>
  ['default', '매칭 완료', '미승인', '검토중', '대기'].includes(status)

// rawData를 가공하여 유효한 스터디 데이터만 필터링 후 정리
export const studyData: Study[] = rawData
  .filter((item) => isValidStatus(item.status)) // status가 유효한 것만 추림
  .map(
    (item) =>
      ({
        ...item,
        status: item.status as Study['status'],
        isSingleButton: item.isSingleButton ?? false,
        startStatus: item.startStatus ?? false,
        waitingMode: 'waitingMode' in item ? item.waitingMode : false,
        days: item.days ?? [],
        time: item.time ?? '',
        capacity: item.capacity ?? '',
        level: item.level ?? '',
        isLiked: item.isLiked ?? false,
        isApplied: item.isApplied ?? false,
      }) as Study
  )

//  내가 만든 스터디 목록 (방장 스터디)
export const myCreatedStudies: Study[] = studyData.filter(
  (study) => study.userId === currentUserId
)

//내가 신청한 스터디만 필터링
export const myAppliedStudies: Study[] = studyData.filter(
  (study) => study.isApplied && study.userId !== currentUserId
)

// 내가 참여한 스터디 목록 (내가 만든 스터디 + 내가 신청한 스터디)
export const myJoinedStudies: Study[] = studyData.filter(
  (study) => study.isApplied || study.userId === currentUserId
)

// 내가 방장으로 만든 스터디들의 ID 목록
export const createdStudyIdsByLeader: number[] = myCreatedStudies.map(
  (study) => study.id
)

//  찜한 스터디 목록 (내가 만든 스터디와 내가 신청한 스터디는 제외)
export const myLikedStudies: Study[] = studyData.filter(
  (study) =>
    study.isLiked && // 찜한 것 중에서
    study.userId !== currentUserId && // 내가 만든 게 아니고
    !study.isApplied // 내가 신청한 것도 아닌 것
)

// 특정 ID로 스터디 찾는 유틸 함수
export const getStudyById = (id: number): Study | undefined =>
  studyData.find((study) => study.id === id)
