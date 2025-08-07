import { http, HttpResponse } from 'msw'
import { mockUsers } from '@/api/mswMock/MockData'

const MOCK_ACCESS_TOKEN = 'abcdefg1234' //테스트용 토큰
const MOCK_REFRESH_TOKEN = 'aabbcddwecqw123'

export const handlers = [
  //////////////////////////////////////////////////////////////////////////////////////////////////////////// 로그인
  http.post(`/api/v1/auth/login/`, async ({ request }) => {
    // const data = await request.clone().json();
    // console.log(data);
    const { email, password } = await request.clone().json()

    const matchedUserEmail = mockUsers.find((user) => user.email === email)

    if (!matchedUserEmail) {
      return HttpResponse.json(
        {
          detail: '해당 이메일로 가입된 사용자가 존재하지 않습니다.',
        },
        { status: 404 }
      )
    } else if (matchedUserEmail.password !== password) {
      return HttpResponse.json(
        {
          detail: '비밀번호가 일치하지 않습니다.',
        },
        { status: 401 }
      )
    }

    const { password: _password, ...userInfo } = matchedUserEmail

    const response = {
      message: '로그인 성공',
      access_token: MOCK_ACCESS_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: userInfo,
    }
    return HttpResponse.json(response)
  }),
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 로그아웃
  http.post('/api/v1/auth/logout', async () => {
    // const data = request
    // console.log(data);
    return HttpResponse.json({ status: 200 })
  }),
]
