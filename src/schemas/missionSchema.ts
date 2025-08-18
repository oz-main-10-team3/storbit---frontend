import Joi from 'joi'

export const missionSchema = Joi.object({
  mission: Joi.string().min(1).max(100).required().messages({
    'string.empty': '미션 내용을 입력해주세요.',
    'string.min': '미션은 최소 1자 이상이어야 합니다.',
    'string.max': '미션은 최대 100자 이하이어야 합니다.',
    'any.required': '미션 내용을 입력해주세요.',
  }),
})
