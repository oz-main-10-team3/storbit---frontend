import { http, HttpResponse } from 'msw'
import {
  getStudyById,
  myAppliedStudies,
  myCreatedStudies,
  myJoinedStudies,
  myLikedStudies,
  studyData,
} from '@/data/mockData'
import { recruitApplicantsByStudy } from '@/data/recruitStatusData'
import { appliedStudies } from '../MockData'

interface StudyUpdateData {
  title: string
  description: string
  waitingMode: boolean
  days: string[]
  time: string
  capacity: string
  level: string
}

export const myStudiesHandlers = [
  http.delete('/api/v1/my/studies/applied/:studyId', ({ params }) => {
    const { studyId } = params
    const id = Number(studyId)

    const study = studyData.find((s) => s.id === id)

    if (study) {
      study.isApplied = false
      return HttpResponse.json({ message: 'Application canceled' })
    } else {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 })
    }
  }),
  http.get('/api/v1/my/studies/joined', () => {
    return HttpResponse.json(myJoinedStudies)
  }),
  http.get('/api/v1/my/studies/liked', () => {
    return HttpResponse.json(myLikedStudies)
  }),
  http.patch('/api/v1/studies/:studyId/like', async ({ request, params }) => {
    const { studyId } = params
    const { isLiked } = (await request.json()) as { isLiked: boolean }

    const study = studyData.find((s) => s.id === Number(studyId))

    if (study) {
      study.isLiked = isLiked
      return HttpResponse.json(study)
    } else {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 })
    }
  }),
  http.get('/api/v1/my/studies/applied', () => {
    return HttpResponse.json(myAppliedStudies)
  }),
  http.get('/api/v1/my/studies/created', () => {
    return HttpResponse.json(myCreatedStudies)
  }),
  http.get('/api/v1/studies/:studyId', ({ params }) => {
    const { studyId } = params
    const study = getStudyById(Number(studyId))
    if (study) {
      return HttpResponse.json(study)
    } else {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 })
    }
  }),
  http.get('/api/v1/studies/:studyId/members', () => {
    const members = [
      { id: 1, nickname: '흐어진면볶음밥', attendanceRate: 100 },
      { id: 2, nickname: '볶음밥러버', attendanceRate: 92 },
      { id: 3, nickname: '스파게티매니아', attendanceRate: 87 },
    ]
    return HttpResponse.json(members)
  }),

  http.get('/api/v1/studies/:studyId/applicants', ({ params }) => {
    const { studyId } = params
    const applicants = recruitApplicantsByStudy[studyId as string] || []
    return HttpResponse.json(applicants)
  }),

  // 스터디 탈퇴
  http.post('/api/v1/my/studies/:studyId/leave', async ({ params }) => {
    const { studyId } = params
    const id = Number(studyId)

    const study = studyData.find((s) => s.id === id)
    if (!study) {
      return HttpResponse.json({ detail: 'Study not found' }, { status: 404 })
    }

    // 탈퇴 처리
    study.isLeft = true

    return HttpResponse.json({ detail: '탈퇴 완료' }, { status: 200 })
  }),

  http.delete('/api/v1/studies/:studyId', async ({ params }) => {
    const { studyId } = params
    const id = Number(studyId)

    const studyIndex = studyData.findIndex((s) => s.id === id)
    if (studyIndex === -1) {
      return HttpResponse.json({ detail: 'Study not found' }, { status: 404 })
    }

    studyData.splice(studyIndex, 1)

    return HttpResponse.json(
      { detail: '스터디가 해체되었습니다.' },
      { status: 200 }
    )
  }),

  http.put<{ studyId: string }, StudyUpdateData>(
    '/api/v1/studies/:studyId',
    async ({ params, request }) => {
      const { studyId } = params
      const id = Number(studyId)
      const updatedData = await request.json()

      const studyIndex = studyData.findIndex((s) => s.id === id)
      if (studyIndex === -1) {
        return HttpResponse.json({ detail: 'Study not found' }, { status: 404 })
      }

      studyData[studyIndex] = { ...studyData[studyIndex], ...updatedData }

      return HttpResponse.json(studyData[studyIndex])
    }
  ),

  http.post<
    { studyId: string },
    { memberId: number; reason: string; description: string }
  >('/api/v1/studies/:studyId/kick', async () => {
    // Here you would typically update the backend data.
    // For this mock, we'll just return a success response.
    return HttpResponse.json({ detail: 'Member kicked successfully' })
  }),

  http.post<{ studyId: string }, { memberId: number }>(
    '/api/v1/studies/:studyId/delegate',
    async () => {
      // Here you would typically update the backend data.
      // For this mock, we'll just return a success response.
      return HttpResponse.json({ detail: 'Leader delegated successfully' })
    }
  ),

  http.post('/api/v1/studies/:studyId/apply', ({ params }) => {
    const { studyId } = params
    const id = Number(studyId)

    const study = studyData.find((s) => s.id === id)

    if (study) {
      appliedStudies.push(study)
      return HttpResponse.json({ message: 'Study application successful' })
    } else {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 })
    }
  }),
]
