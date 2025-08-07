interface MockData {
  email: string
  password: string
  user_id: number
  nickname: string
  name: string
  phone: string
  birthday: string
  profile_image_url: string | null
}

export const mockUsers: MockData[] = [
  {
    email: 'yongar@example.com',
    password: '1234',
    user_id: 1,
    nickname: 'ozuser1',
    name: '김오즈',
    phone: '01012345678',
    birthday: '1990-01-25',
    profile_image_url: 'https://randomuser.me/api/portraits/women/40.jpg',
  },
  {
    email: 'alice@example.com',
    password: 'alice123',
    user_id: 2,
    nickname: 'alice99',
    name: '이앨리스',
    phone: '01023456789',
    birthday: '1992-05-14',
    profile_image_url: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    email: 'bob@example.com',
    password: 'bobpass',
    user_id: 3,
    nickname: 'bobby',
    name: '박밥',
    phone: '01034567890',
    birthday: '1988-11-30',
    profile_image_url: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    email: 'charlie@example.com',
    password: 'charlie1!',
    user_id: 4,
    nickname: 'charlieC',
    name: '차찰리',
    phone: '01045678901',
    birthday: '1995-07-21',
    profile_image_url: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    email: 'dana@example.com',
    password: 'dana4321',
    user_id: 5,
    nickname: 'dana_oz',
    name: '문다나',
    phone: '01056789012',
    birthday: '1993-03-08',
    profile_image_url: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
  {
    email: 'eric@example.com',
    password: 'eric_pw',
    user_id: 6,
    nickname: 'eric_dev',
    name: '김에릭',
    phone: '01067890123',
    birthday: '1991-08-19',
    profile_image_url: 'https://randomuser.me/api/portraits/men/63.jpg',
  },
  {
    email: 'fiona@example.com',
    password: 'fiona321',
    user_id: 7,
    nickname: 'fiona',
    name: '장피오나',
    phone: '01078901234',
    birthday: '1994-02-28',
    profile_image_url: 'https://randomuser.me/api/portraits/women/77.jpg',
  },
  {
    email: 'george@example.com',
    password: 'geo2024',
    user_id: 8,
    nickname: 'george',
    name: '조지훈',
    phone: '01089012345',
    birthday: '1989-12-05',
    profile_image_url: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    email: 'hannah@example.com',
    password: 'hanhan',
    user_id: 9,
    nickname: 'hannahh',
    name: '한한나',
    phone: '01090123456',
    birthday: '1996-09-09',
    profile_image_url: 'https://randomuser.me/api/portraits/women/91.jpg',
  },
  {
    email: 'ian@example.com',
    password: 'ian_pwd',
    user_id: 10,
    nickname: 'iandev',
    name: '이안',
    phone: '01091234567',
    birthday: '1990-04-17',
    profile_image_url: 'https://randomuser.me/api/portraits/men/99.jpg',
  },
]
