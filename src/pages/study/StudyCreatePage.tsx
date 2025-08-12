import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import InputField from '@/common/InputField'
import SwitchToggle from '@/common/SwitchToggle'
import type { StudyCreateType } from '@/types/studyCreateType'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  studyTypeOptions,
  timeOptions,
  studyCategoryOptions,
  daysOfWeek,
} from '@/mystudymockdata/studyCreateOptionsData'

export default function StudyCreatePage() {
  const [isUnlimited, setIsUnlimited] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid, errors },
  } = useForm<StudyCreateType>({ mode: 'onChange' })

  const onSubmit = (_data: StudyCreateType) => {
    // 스터디 만들기 제출하기
  }

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      // 미 입력 시 숫자 0 입력되고 추가 입력 시 ex) 03 으로 입력 되는 오류 제거
      setValue('capacity', '', { shouldValidate: true })
      return
    }
    const numValue = Math.floor(Number(rawValue))

    if (isNaN(numValue)) {
      // 마이너스 입력 시 input 에 NaN 입력 오류 제거
      setValue('capacity', '', { shouldValidate: true })
      return
    }

    let value = numValue
    if (value > 10) value = 10
    if (value < 0) value = 0
    setValue('capacity', value.toString(), { shouldValidate: true })
  }

  const validateArrayLength = (value: string[]) => {
    return (
      (Array.isArray(value) && value.length > 0) ||
      '스터디 요일을 하나 이상 선택해주세요.'
    )
  }

  return (
    <div className="flex justify-center w-full h-full px-6 py-[104px] bg-white text-text">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[480px] gap-[40px]"
      >
        <h1 className="text-[32px] font-semibold text-center">
          나만의 스터디를 만들어 보세요!
        </h1>

        {/* 스터디 이름 */}
        <div className="flex flex-col gap-[16px] mt-[40px] w-full">
          <label className="text-[16px]">
            스터디 이름<span className="text-alertText">*</span>
          </label>
          <div className="flex gap-[8px] w-full">
            <InputField
              className="w-[362px] h-[48px] placeholder:text-text4"
              error={errors.studyName?.message}
              placeholder="이름을 입력해주세요"
              {...register('studyName', {
                required: '스터디 이름을 입력해주세요',
              })}
            />
            <CommonButton
              type="button"
              variant="grayStyle"
              className="text-[16px]"
            >
              중복확인
            </CommonButton>
          </div>
        </div>

        {/* 스터디 소개 */}
        <div className="flex flex-col gap-[6px] w-full">
          <label className="text-[16px]">
            스터디 소개<span className="text-alertText">*</span>
          </label>
          <textarea
            placeholder="스터디 소개를 작성해주세요"
            className="w-full mt-[10px] border border-[#bdbdbd] rounded-[4px] px-[16px] py-[10px] h-[160px] resize-none text-sm"
            {...register('studyIntroduction', {
              required: '스터디 소개를 입력해주세요',
            })}
          />
          {errors.studyIntroduction && (
            <p className="text-xs text-alertText font-medium mt-1">
              * {errors.studyIntroduction?.message}
            </p>
          )}
        </div>

        {/* 대표 이미지 */}
        <div className="flex flex-col gap-[6px]">
          <div className="text-[16px]">
            스터디 대표 이미지 <span className="text-alertText">*</span>
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            {...register('image', {
              required: '스터디 대표 이미지를 첨부해주세요',
            })}
          />
          <label
            htmlFor="image"
            className="flex items-center mt-[10px] text-[16px] w-[112px] rounded-[4px] px-4 py-2 text-sm font-light transition-colors cursor-pointer h-[48px] bg-disabled-fill text-[#4d4d4d] border-disabled-text border-[1px] hover:bg-[#dedede]"
          >
            이미지 찾기
          </label>
          {errors.image && (
            <p className="text-xs text-alertText font-medium mt-1">
              * {errors.image?.message}
            </p>
          )}
        </div>

        {/* 스터디 종류 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block text-sm font-semibold">
            스터디 종류<span className="text-red-500">*</span>
          </label>
          <Controller
            name="studyType"
            control={control}
            rules={{ required: '스터디 종류를 선택해 주세요' }}
            render={({ field }) => (
              <Dropdown
                options={studyTypeOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.studyType?.message}
                className="w-full"
              />
            )}
          />
        </div>

        {/* 스터디 유형 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block mb-1 text-sm font-semibold ">
            스터디 유형<span className="text-red-500">*</span>
          </label>
          <Controller
            name="studyCategory"
            control={control}
            rules={{ required: '스터디 유형를 선택해 주세요' }}
            render={({ field }) => (
              <Dropdown
                options={studyCategoryOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.studyCategory?.message}
                className="w-full"
              />
            )}
          />
        </div>

        {/* 인원 설정 */}
        <div className="flex flex-col gap-[6px]">
          <label className="block mb-1 text-sm font-semibold">
            스터디 인원<span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            className="h-[48px] placeholder:text-text4 w-full mt-[10px]"
            disabled={isUnlimited}
            placeholder="최대 10명까지 등록 가능해요"
            min={0}
            max={10}
            step={1}
            {...register('capacity', {
              onChange: handleCapacityChange,
              required: '스터디 인원을 선택해주세요',
            })}
            error={errors.capacity?.message}
          />
        </div>

        {/* 인원 무제한 (토글 왼쪽, 텍스트 오른쪽) */}
        <div className="flex flex-col gap-[16px] justify-center px-[16px] py-3 border border-primary bg-secondary rounded-[16px] h-[112px] text-[16px]">
          <div className="flex items-center gap-3">
            {/* 토글 스위치 */}
            <SwitchToggle
              checked={isUnlimited}
              onChange={() => setIsUnlimited((prev) => !prev)}
            />
            <input
              type="hidden"
              value={isUnlimited ? 'true' : 'false'}
              {...register('isUnlimited')}
            />
            {/* 라벨 텍스트 */}
            <label htmlFor="unlimitedToggle" className="text-text">
              대기자 모드 활성화
            </label>
          </div>
          <p className="text-text2">
            정원이 가득 찬 경우 대기자 등록을 허용해요
          </p>
        </div>

        {/* 스터디 요일 */}
        <div className="mt-[2px] flex flex-col gap-[6px]">
          <label className="block mb-1 text-sm font-semibold">
            스터디 일정<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3 text-sm mt-[10px]">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={day}
                  className="border-gray-300"
                  {...register('dayOfWeek', {
                    validate: validateArrayLength,
                  })}
                />
                {day}
              </label>
            ))}
          </div>
          {errors.dayOfWeek && (
            <p className="text-xs text-alertText font-medium mt-1">
              * {errors.dayOfWeek?.message}
            </p>
          )}
        </div>

        {/* 스터디 시간 */}
        <div className="flex flex-col gap-[16px] mt-[2px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            스터디 시간<span className="text-red-500">*</span>
          </label>
          <Controller
            name="studyTime"
            control={control}
            rules={{ required: '스터티 시간을 선택해주세요' }}
            render={({ field }) => (
              <Dropdown
                options={timeOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.studyTime?.message}
                className="w-full"
              />
            )}
          />
        </div>

        {/* 성별 선택 */}
        <div className="flex flex-col gap-[6px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            성별 설정<span className="text-red-500">*</span>
          </label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: '성별을 선택해 주세요' }}
            render={({ field }) => (
              <div className="flex gap-[8px] mt-[10px]">
                {['남', '여', '무관'].map((genderOption) => (
                  <CommonButton
                    type="button"
                    key={genderOption}
                    variant={
                      field.value === genderOption ? 'primary' : 'secondary'
                    }
                    className="text-[16px] font-light border-primary border-[1px]"
                    onClick={() => field.onChange(genderOption)}
                  >
                    {genderOption}
                  </CommonButton>
                ))}
              </div>
            )}
          />
          {errors.gender && (
            <p className="text-xs text-alertText font-medium mt-1">
              * {errors.gender?.message}
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          // disabled={!isValid}
          className={`w-full py-3 rounded-md font-semibold text-sm transition mt-[8px] cursor-pointer ${
            isValid
              ? 'bg-purple-500 text-white hover:opacity-90'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          스터디 만들기
        </button>
      </form>
    </div>
  )
}
