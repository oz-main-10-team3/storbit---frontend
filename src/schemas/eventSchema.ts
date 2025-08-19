import Joi from 'joi'

export const eventSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': '이벤트 타이틀을 입력해주세요.',
    'string.min': '이벤트 타이틀은 최소 2자 이상이어야 합니다.',
    'string.max': '이벤트 타이틀은 최대 100자 이하이어야 합니다.',
    'any.required': '이벤트 타이틀을 입력해주세요.',
  }),
  type: Joi.string()
    .valid('리워드 이벤트', '이자카야 이벤트', '인기이자카야 이벤트', '시즌 한정판')
    .required()
    .messages({
      'any.only': '이벤트 유형을 선택해주세요.',
      'any.required': '이벤트 유형을 선택해주세요.',
    }),
  startDate: Joi.string().required().messages({
    'string.empty': '시작일을 입력해주세요.',
    'any.required': '시작일을 입력해주세요.',
  }),
  endDate: Joi.string().required().messages({
    'string.empty': '종료일을 입력해주세요.',
    'any.required': '종료일을 입력해주세요.',
  }),
  status: Joi.string().valid('예정', '진행중', '보류중', '종료').required().messages({
    'any.only': '진행 상태를 선택해주세요.',
    'any.required': '진행 상태를 선택해주세요.',
  }),
  thumbnailUrl: Joi.string().required().messages({
    'string.empty': '이벤트 썸네일을 등록해주세요.',
    'any.required': '이벤트 썸네일을 등록해주세요.',
  }),
  images: Joi.array().items(Joi.string().allow('')).min(1).required().messages({
    'array.min': '이미지를 1개 이상 등록해주세요.',
    'any.required': '이미지를 1개 이상 등록해주세요.',
  }),
})