import { useState } from 'react'
import Joi from 'joi'
import InputField from '@/common/InputField.tsx'

export default function MyStudyFavoritesPage() {
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Joi schema: 8-digit string matching date format
  const birthdateSchema = Joi.string()
    .pattern(/^\d{8}$/)
    .required()
    .messages({
      'string.pattern.base': '8자리 숫자 형식이 아닙니다.',
      'string.empty': '생년월일을 입력해주세요.',
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBirthdate(value)

    const { error: validationError } = birthdateSchema.validate(value)
    if (validationError) {
      setError(validationError.message)
      setSuccess('')
    } else {
      setError('')
      setSuccess('올바른 형식입니다.')
    }
  }

  return (
    <div className="p-6">
      <form className="space-y-6">
        <InputField
          className="w-[300px] h-12"
          label="생년월일"
          placeholder="8자리 입력해주세요 (ex.20001004)"
          value={birthdate}
          onChange={handleChange}
          error={error}
          success={success}
        />
      </form>
    </div>
  )
}
