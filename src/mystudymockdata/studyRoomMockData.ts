export interface StudyCardData {
  id: number
  userProfile: string
  nickname: string
  dailyMissions: string[]
  isMe: boolean
  isLeader: boolean
}

export const studyRoomUserCardMockData: StudyCardData[] = [
  {
    id: 1,
    userProfile: '/images/user1.jpg',
    nickname: '흩어지면뽂음밥',
    dailyMissions: ['오늘은 목성부터 정복 할겁니다.', '리팩토링 완료하기'],
    isMe: true,
    isLeader: false,
  },
  {
    id: 2,
    userProfile: '/images/user2.jpg',
    nickname: '코드맛집',
    dailyMissions: ['TypeScript 복습하기'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 3,
    userProfile: '/images/user3.jpg',
    nickname: '깃허브농장주인',
    dailyMissions: [],
    isMe: false,
    isLeader: true,
  },
  {
    id: 4,
    userProfile: '/images/user4.jpg',
    nickname: '야근요정',
    dailyMissions: ['컴포넌트 쪼개기'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 5,
    userProfile: '/images/user5.jpg',
    nickname: '버그헌터',
    dailyMissions: ['리뷰 피드백 반영하기'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 6,
    userProfile: '/images/user6.jpg',
    nickname: '디버그마스터',
    dailyMissions: ['스토리북 작성', 'UI 테스트 코드 짜기'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 7,
    userProfile: '/images/user7.jpg',
    nickname: '컴파일러냥이',
    dailyMissions: [],
    isMe: false,
    isLeader: false,
  },
  {
    id: 8,
    userProfile: '/images/user8.jpg',
    nickname: '커밋요정',
    dailyMissions: ['Jest 테스트 통과시키기'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 9,
    userProfile: '/images/user9.jpg',
    nickname: '배포요정',
    dailyMissions: ['vercel 연동 확인'],
    isMe: false,
    isLeader: false,
  },
  {
    id: 10,
    userProfile: '/images/user10.jpg',
    nickname: '토이프로젝트러',
    dailyMissions: ['토이 기획 정리', '노션에 정리'],
    isMe: false,
    isLeader: false,
  },
]
