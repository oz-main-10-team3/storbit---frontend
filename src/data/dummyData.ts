
import defaultThumbnail from '@/assets/images/default-thumbnail.png'

export interface StudyCardData {
    imageUrl: string
    title: string
    description: string
    memberCount?: number
    time?: string
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
      }
  ]