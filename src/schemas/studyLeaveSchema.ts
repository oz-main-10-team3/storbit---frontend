import Joi from 'joi';

export const studyLeaveSchema = Joi.object({
  reason: Joi.string().required().messages({
    'string.empty': '탈퇴 사유를 선택해주세요.',
    'any.required': '탈퇴 사유를 선택해주세요.',
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.empty': '탈퇴 설명을 입력해주세요.',
    'string.min': '탈퇴 설명은 최소 10자 이상이어야 합니다.',
    'string.max': '탈퇴 설명은 최대 500자 이하이어야 합니다.',
    'any.required': '탈퇴 설명을 입력해주세요.',
  }),
});
