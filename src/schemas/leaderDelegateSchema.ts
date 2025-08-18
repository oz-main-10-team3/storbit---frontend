import Joi from 'joi';

export const leaderDelegateSchema = Joi.object({
  reason: Joi.string().required().messages({
    'string.empty': '위임 사유를 선택해주세요.',
    'any.required': '위임 사유를 선택해주세요.',
  }),
});
