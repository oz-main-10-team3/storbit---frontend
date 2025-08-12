export interface StudyCreateType {
  studyName: string
  studyIntroduction: string
  image: object
  studyType: string
  studyCategory: string
  capacity: string
  isUnlimited: string
  dayOfWeek: string[]
  studyTime: string
  gender: '남' | '여' | '무관'
}
