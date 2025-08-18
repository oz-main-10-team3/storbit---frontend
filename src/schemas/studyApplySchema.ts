import Joi from 'joi';

export const studyApplySchema = Joi.object({
  level: Joi.string().required().messages({
    'string.empty': '실력을 선택해주세요.',
    'any.required': '실력을 선택해주세요.',
  }),
  introduction: Joi.string().min(10).max(500).required().messages({
    'string.empty': '자기소개를 입력해주세요.',
    'string.min': '자기소개는 최소 10자 이상이어야 합니다.',
    'string.max': '자기소개는 최대 500자 이하이어야 합니다.',
    'any.required': '자기소개를 입력해주세요.',
  }),
});
