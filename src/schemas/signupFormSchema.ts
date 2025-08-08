import Joi from 'joi'

const signupFormSchema = Joi.object({
  fullname: Joi.string().required().messages({
    'string.empty': '이름을 입력해주세요.',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': '이메일을 입력해주세요.',
      'string.email': '올바른 이메일 형식이 아닙니다.',
    }),

  nickname: Joi.string()
    .pattern(/^[a-zA-Z0-9가-힣]+$/)
    .required()
    .messages({
      'string.empty': '닉네임을 입력해주세요.',
      'string.pattern.base': '닉네임은 특수문자를 포함할 수 없습니다.',
    }),

  phone_number: Joi.string().pattern(/^\d+$/).required().messages({
    'string.empty': '휴대전화를 입력해주세요.',
    'string.pattern.base': '휴대전화는 숫자만 입력 가능합니다.',
  }),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,20}$/
    )
    .required()
    .messages({
      'string.empty': '비밀번호를 입력해주세요.',
      'string.pattern.base':
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자여야 하며 공백이 없어야 합니다.',
    }),

  gender: Joi.string().valid('남', '여').required().messages({
    'any.only': '성별은 남 또는 여만 선택 가능합니다.',
    'string.empty': '성별을 선택해주세요.',
  }),
})

export default signupFormSchema
