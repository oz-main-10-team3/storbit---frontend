import Joi from 'joi'

export const studyManageFormSchema = Joi.object({
  studyName: Joi.string().min(2).max(20).required().messages({
    'string.min': '스터디 이름은 2자 이상이어야 합니다.',
    'string.max': '스터디 이름은 20자 이하이어야 합니다.',
    'string.empty': '스터디 이름을 입력해주세요.',
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.min': '스터디 소개는 10자 이상이어야 합니다.',
    'string.max': '스터디 소개는 500자 이하이어야 합니다.',
    'string.empty': '스터디 소개를 입력해주세요.',
  }),
  selectedDays: Joi.array().min(1).required().messages({
    'array.min': '스터디 일정을 선택해주세요.',
  }),
  selectedTime: Joi.string().required().messages({
    'string.empty': '스터디 시간을 선택해주세요.',
  }),
  capacity: Joi.string().required().messages({
    'string.empty': '스터디 인원을 선택해주세요.',
  }),
  level: Joi.string().required().messages({
    'string.empty': '스터디 레벨을 선택해주세요.',
  }),
})
