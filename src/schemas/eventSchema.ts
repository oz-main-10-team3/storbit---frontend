import Joi from 'joi'

export const eventSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': '이벤트 타이틀을 입력해주세요.',
    'string.min': '이벤트 타이틀은 최소 2자 이상이어야 합니다.',
    'string.max': '이벤트 타이틀은 최대 100자 이하이어야 합니다.',
    'any.required': '이벤트 타이틀을 입력해주세요.',
  }),
  type: Joi.string().required().messages({
    'string.empty': '이벤트 유형을 선택해주세요.',
    'any.required': '이벤트 유형을 선택해주세요.',
  }),
  startDate: Joi.date().iso().required().messages({
    'date.base': '유효한 시작일을 입력해주세요.',
    'date.iso': '시작일은 YYYY-MM-DD 형식이어야 합니다.',
    'any.required': '시작일을 입력해주세요.',
  }),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required().messages({
    'date.base': '유효한 종료일을 입력해주세요.',
    'date.iso': '종료일은 YYYY-MM-DD 형식이어야 합니다.',
    'date.min': '종료일은 시작일 이후여야 합니다.',
    'any.required': '종료일을 입력해주세요.',
  }),
  status: Joi.string().required().messages({
    'string.empty': '진행 상태를 선택해주세요.',
    'any.required': '진행 상태를 선택해주세요.',
  }),
  thumbnailUrl: Joi.string().required().messages({
    'string.empty': '이벤트 썸네일을 등록해주세요.',
    'any.required': '이벤트 썸네일을 등록해주세요.',
  }),
  images: Joi.array().items(Joi.string().required()).max(10).messages({
    'array.max': '이미지는 최대 10개까지 등록 가능합니다.',
    'string.empty': '이미지 경로를 입력해주세요.',
  }),
})
