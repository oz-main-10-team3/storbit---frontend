import rawData from '@/mystudymockdata/mockStudyData.json' assert { type: 'json' }
import type { Study } from '@/types/study'

const isValidStatus = (status: string): status is Study['status'] =>
  ['default', '매칭 완료', '미승인', '검토중', '대기'].includes(status)

export const studyData: Study[] = rawData.filter((item): item is Study =>
  isValidStatus(item.status)
)
