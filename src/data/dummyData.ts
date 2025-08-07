import defaultThumbnail from '@/assets/images/default-thumbnail.png'

export type StudyCardData = {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time: string
}

export const dummyData: StudyCardData[] = [
  {
    imageUrl: defaultThumbnail,
    title: 'JavaScript 입문반',
    description: '기초 문법부터 실전까지 배워요!',
    memberCount: 10,
    time: '월, 수 오후 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '토익 고득점 목표 스터디',
    description: '파트별 문제풀이 집중 트레이닝!',
    memberCount: 8,
    time: '화, 목 오후 9시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'React Native 실전 앱 만들기',
    description: '실제 앱을 기획하고 배포까지!',
    memberCount: 12,
    time: '토요일 오후 3시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'ChatGPT 업무 자동화',
    description: '프롬프트 설계부터 자동화까지 실습',
    memberCount: 9,
    time: '일요일 오전 11시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'SNS 마케팅 전략',
    description: '브랜딩과 콘텐츠 운영법을 배워요',
    memberCount: 7,
    time: '수요일 오후 7시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'Flutter 앱 개발 입문',
    description: '앱 제작 실습 중심 스터디',
    memberCount: 6,
    time: '화, 목 오후 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '영어회화 매일 루틴',
    description: '하루 10문장 말하기 연습',
    memberCount: 11,
    time: '매일 오전 9시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '챕터북 독서 습관',
    description: '함께 읽고 이야기 나누기',
    memberCount: 10,
    time: '월, 금 오후 6시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'Python 기초반',
    description: '입문자를 위한 실습 중심 Python 스터디',
    memberCount: 10,
    time: '토요일 오전 10시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'Python 기초반',
    description: '입문자를 위한 실습 중심 Python 스터디',
    memberCount: 10,
    time: '토요일 오전 10시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '아침 기상 루틴 만들기',
    description: '꾸준한 기상 시간으로 하루를 여는 습관',
    memberCount: 6,
    time: '매일 오전 6시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '매일 독서 30분',
    description: '매일 짧게라도 책 읽는 습관 만들기',
    memberCount: 9,
    time: '매일 오후 10시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '매일 영어단어 10개 외우기',
    description: '단어장은 각자 준비, 매일 테스트!',
    memberCount: 7,
    time: '매일 오후 9시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '매일 블로그 글쓰기',
    description: '기술, 일상 등 매일 1포스팅 도전',
    memberCount: 8,
    time: '매일 오후 11시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '하루 10분 명상 루틴',
    description: '마음을 가다듬는 10분의 습관',
    memberCount: 5,
    time: '매일 오전 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '매일 1시간 코딩 연습',
    description: '꾸준히 실력을 키워보는 코딩 습관',
    memberCount: 10,
    time: '매일 오후 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '운동 루틴 만들기',
    description: '홈트, 헬스, 스트레칭 등 자유롭게 실천',
    memberCount: 12,
    time: '월~금 오전 7시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '매일 일기 쓰기',
    description: '자신을 돌아보는 5분의 시간',
    memberCount: 6,
    time: '매일 밤 10시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '영어 뉴스 매일 듣기',
    description: '하루 1개 뉴스 듣고 요약 공유',
    memberCount: 7,
    time: '매일 오전 7시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '오늘의 감사 3가지',
    description: '긍정적인 하루를 위한 감사 일기',
    memberCount: 4,
    time: '매일 밤 9시',
  },
]
