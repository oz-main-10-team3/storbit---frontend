import { mockStudies } from '@/api/mswMock/MockData'
import type { StudyCreateType } from '@/types/studyCreateType'
import { http, HttpResponse } from 'msw'

export const studyMakeHandlers = [
  http.post('/api/v1/studies', async ({ request }) => {
    // console.log(await request.clone().json())
    // const authHeader = request.headers.get('authorization')
    // console.log('MSW received Authorization:', authHeader)
    function validateStudyPayload(payload: Partial<StudyCreateType>): string[] {
      const errors: string[] = []

      const requiredStrings: (keyof StudyCreateType)[] = [
        'studyName',
        'studyIntroduction',
        'studyType',
        'studyCategory',
        'capacity',
        'isUnlimited',
        'studyTime',
        'gender',
      ]

      requiredStrings.forEach((key) => {
        if (!payload[key] || String(payload[key]).trim() === '') {
          errors.push(`${key} 는 필수 값입니다..`)
        }
      })

      if (typeof payload.image !== 'object' || payload.image === null) {
        errors.push('스터디 대표 이미지를 첨부해주세요')
      }

      if (!Array.isArray(payload.dayOfWeek) || payload.dayOfWeek.length === 0) {
        errors.push('스터디 요일을 하나 이상 선택해주세요.')
      }

      const genderValues: StudyCreateType['gender'][] = ['남', '여', '무관']
      if (payload.gender && !genderValues.includes(payload.gender)) {
        errors.push(` ${genderValues.join(', ')}중 하나의 성별을 선택해주세요`)
      }

      if (payload.capacity && isNaN(Number(payload.capacity))) {
        errors.push('스터디 인원은 숫자로 작성해주세요')
      }

      return errors
    }

    const payload: StudyCreateType = await request.clone().json()
    const errors = validateStudyPayload(payload)
    if (errors.length) {
      return HttpResponse.json({ errors }, { status: 400 })
    }

    const newStudy = {
      ...payload,
      id: mockStudies.length
        ? Math.max(...mockStudies.map((s) => s.id)) + 1
        : 1,
      createdAt: new Date().toISOString(),
    }

    mockStudies.push(newStudy)

    return HttpResponse.json(newStudy, { status: 201 })
  }),
]
