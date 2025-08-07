import { http, HttpResponse } from 'msw'
import { mockUsers } from '@/api/mswMock/MockData'
import type { SignupForm } from '@/types/signupForm'

const MOCK_ACCESS_TOKEN = 'abcdefg1234' //테스트용 토큰
const MOCK_REFRESH_TOKEN = 'aabbcddwecqw123'

const verificationCodes = new Map<string, string>() // 휴대폰 6자리 인증번호 저장용

export const handlers = [
  //////////////////////////////////////////////////////////////////////////////////////////////////////////// 로그인
  http.post(`/api/v1/auth/login/`, async ({ request }) => {
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
    return HttpResponse.json({ status: 200 })
  }),

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 회원가입
  http.post('/api/v1/users/signup/', async ({ request }) => {
    const {
      fullname,
      email,
      nickname,
      phone_number,
      password,
      gender,
    }: SignupForm = await request.clone().json()

    if (
      !fullname ||
      !email ||
      !nickname ||
      !phone_number ||
      !password ||
      !gender
    ) {
      return HttpResponse.json(
        { detail: '모든 필수 항목을 입력해야 합니다.' },
        { status: 400 }
      )
    }
    const nicknameExists = mockUsers.some((user) => user.nickname === nickname)
    if (nicknameExists) {
      return HttpResponse.json(
        { detail: '이미 사용 중인 닉네임입니다.' },
        { status: 400 }
      )
    }

    const emailExists = mockUsers.some((user) => user.email === email)

    const phoneExists = mockUsers.some((user) => user.phone === phone_number)

    if (emailExists) {
      return HttpResponse.json(
        { detail: '이미 등록된 이메일 입니다.' },
        { status: 409 }
      )
    }

    if (phoneExists) {
      return HttpResponse.json(
        { detail: '이미 등록된 전화번호입니다.' },
        { status: 409 }
      )
    }

    const phoneRegex = /^\d+$/
    if (!phoneRegex.test(phone_number)) {
      return HttpResponse.json(
        { detail: '휴대폰 번호 형식이 올바르지 않습니다.' },
        { status: 422 }
      )
    }

    const newUser = {
      user_id: mockUsers.length + 1,
      email,
      password,
      nickname,
      name: fullname,
      phone: phone_number,
      birthday: '1990-01-01',
      profile_image_url: null,
    }

    mockUsers.push(newUser)

    return HttpResponse.json(
      { message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    )
  }),
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 닉네임 중복확인

  http.post('/api/v1/users/nickname/duplication', async ({ request }) => {
    const { nickname } = await request.clone().json()

    const nicknameExists = mockUsers.some((user) => user.nickname === nickname)

    if (nicknameExists) {
      return HttpResponse.json(
        { detail: '이미 사용 중인 닉네임입니다' },
        { status: 409 }
      )
    }

    return HttpResponse.json(
      { detail: '사용 가능한 닉네임입니다' },
      { status: 200 }
    )
  }),
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 휴대폰 인증번호 전송

  http.post('/api/v1/auth/send-code', async ({ request }) => {
    const { phoneNumber } = await request.clone().json()

    if (!phoneNumber) {
      return HttpResponse.json(
        { detail: '휴대폰 번호는 필수입니다.' },
        { status: 400 }
      )
    }
    const generateCode = () =>
      Math.floor(100000 + Math.random() * 900000).toString()
    const code = generateCode()
    verificationCodes.set(phoneNumber, code)

    return HttpResponse.json(
      { detail: `휴대폰 인증번호는 [${code}] 입니다.` },
      { status: 200 }
    )
  }),
  http.post('/api/v1/auth/verify-code', async ({ request }) => {
    const { phoneNumber, code }: { phoneNumber: string; code: string } =
      await request.clone().json()

    if (!phoneNumber || !code) {
      return HttpResponse.json(
        { detail: '휴대폰 번호와 인증번호는 필수입니다.' },
        { status: 400 }
      )
    }

    const storedCode = verificationCodes.get(phoneNumber)

    if (storedCode === code) {
      verificationCodes.delete(phoneNumber) // 일회용
      return HttpResponse.json({ detail: '인증 성공' }, { status: 200 })
    } else {
      return HttpResponse.json(
        { detail: '인증번호가 일치하지 않습니다.' },
        { status: 400 }
      )
    }
  }),
]
