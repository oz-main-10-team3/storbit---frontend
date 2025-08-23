import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import InputField from '@/common/InputField'
import SwitchToggle from '@/common/SwitchToggle'
import type { StudyCreateType } from '@/types/studyCreateType'
import { useState } from 'react'
import {
  useForm,
  Controller,
  type ControllerRenderProps,
} from 'react-hook-form'
import {
  studyTypeOptions,
  timeOptions,
  studyCategoryOptions,
  daysOfWeek,
  studyLevel,
  genderOptions,
  genderMap,
} from '@/mystudymockdata/studyCreateOptionsData'
// import { api } from '@/api/mainApi'
import { useNavigate } from 'react-router-dom'
// import type { AxiosError } from 'axios'
import type { ErrorMessage } from '@/types/errorMessage'
import { cn } from '@/utils/cn'
import { useUserInfo } from '@/store/userInfoStore'
import { mainApi } from '@/api/mainApi'
import type { AxiosError } from 'axios'
import { koreanTimeToISO } from '@/utils/timeConvert'
import type { ErrorResponseType } from '@/types/errorResponseType'

export default function StudyCreatePage() {
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [submitErrorMessage, setSubmitErrorMessage] =
    useState<ErrorMessage | null>(null)
  const navigate = useNavigate()
  const [fileName, setFileName] = useState('')
  const userEmail = useUserInfo((state) => state.userInfo?.email)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<StudyCreateType>({ mode: 'onChange' })

  const onSubmit = async (data: StudyCreateType) => {
    const convertTime = koreanTimeToISO(data.startTime)
    if (!userEmail || !convertTime) return
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('type', data.type)
    formData.append('max_wait_member', String(data.maxWaitMember))
    formData.append('level', data.level)
    formData.append('gender', data.gender)
    formData.append('category', String(data.category))
    formData.append('schedule', data.schedule.join(','))
    formData.append('start_time', convertTime)
    formData.append('member', String(data.member))
    formData.append('leader_email', userEmail)

    if (data.thumbnailUrl) {
      formData.append('thumbnail_url', data.thumbnailUrl)
    }
    try {
      const res = await mainApi.post('/api/study-rooms/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.status === 201) {
        navigate('/study/create/success')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>
      if (!axiosError.status) return
      const data = axiosError.response?.data

      let errorMessage = '알 수 없는 오류가 발생했습니다.'

      if (data) {
        const firstKey = Object.keys(data)[0]
        const firstValue = data[firstKey] // string | string[] | undefined

        if (typeof firstValue === 'string') {
          errorMessage = firstValue
        } else if (Array.isArray(firstValue) && firstValue.length > 0) {
          errorMessage = firstValue[0]
        }
      }

      setSubmitErrorMessage({
        status: axiosError.status,
        message: errorMessage,
      })
    }
  }

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      // 미 입력 시 숫자 0 입력되고 추가 입력 시 ex) 03 으로 입력 되는 오류 제거
      setValue('member', 0, { shouldValidate: true })
      return
    }
    const numValue = Math.floor(Number(rawValue))

    if (isNaN(numValue)) {
      // 마이너스 입력 시 input 에 NaN 입력 오류 제거
      setValue('member', 0, { shouldValidate: true })
      return
    }

    let value = numValue
    if (value > 10) value = 10
    if (value < 0) value = 0
    setValue('member', value, { shouldValidate: true })
  }

  const validateArrayLength = (value: string[]) => {
    return (
      (Array.isArray(value) && value.length > 0) ||
      '스터디 요일을 하나 이상 선택해주세요.'
    )
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<StudyCreateType, 'thumbnailUrl'>
  ) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      field.onChange(file)
      setFileName(file.name)
      trigger('thumbnailUrl')
    } else {
      field.onChange('')
      setFileName('')
    }
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
        <div className="flex flex-col gap-[16px] mt-[40px]">
          <label className="text-[16px]">
            스터디 이름<span className="text-alertText">*</span>
          </label>
          <InputField
            className={cn(
              'w-full h-[48px] placeholder:text-text4',
              !errors.title &&
                watch('title')?.trim() !== '' &&
                'border-text text-text'
            )}
            error={errors.title?.message}
            placeholder="이름을 입력해주세요"
            {...register('title', {
              required: '스터디 이름을 입력해주세요',
            })}
          />
        </div>

        {/* 스터디 소개 */}
        <div className="flex flex-col gap-[6px] w-full">
          <label className="text-[16px]">
            스터디 소개<span className="text-alertText">*</span>
          </label>
          <textarea
            placeholder="스터디 소개를 작성해주세요"
            className={cn(
              'w-full mt-[10px] border border-[#bdbdbd] rounded-[4px] px-[16px] py-[10px] h-[160px] resize-none text-sm',
              !errors.description &&
                watch('description')?.trim() !== '' &&
                'border-text',
              errors.description && 'border-alertText'
            )}
            {...register('description', {
              required: '스터디 소개를 입력해주세요',
            })}
          />
          {errors.description && (
            <p className="mt-1 text-xs font-medium text-alertText">
              * {errors.description?.message}
            </p>
          )}
        </div>

        {/* 대표 이미지 */}
        <div className="flex flex-col gap-[6px]">
          <div className="text-[16px]">
            스터디 대표 이미지 <span className="text-alertText">*</span>
          </div>
          <Controller
            name="thumbnailUrl"
            control={control}
            rules={{ required: '스터디 대표 이미지를 첨부해주세요' }}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  id="thumbnailUrl"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, field)}
                />
                <label
                  htmlFor="thumbnailUrl"
                  className="flex items-center mt-[10px] text-[16px] w-[112px] rounded-[4px] px-4 py-2 text-sm font-light transition-colors cursor-pointer h-[48px] bg-disabled-fill text-[#4d4d4d] border-disabled-text border-[1px] hover:bg-[#dedede]"
                >
                  이미지 찾기
                </label>
              </>
            )}
          />
          {fileName && (
            <p className="mt-1 text-sm text-gray-600">
              첨부된 이미지: {fileName}
            </p>
          )}
          {errors.thumbnailUrl && (
            <p className="mt-1 text-xs font-medium text-alertText">
              * {errors.thumbnailUrl?.message}
            </p>
          )}
        </div>

        {/* 스터디 종류 */}
        <div className="flex flex-col gap-[16px]">
          <label className="block text-sm font-semibold">
            스터디 종류<span className="text-red-500">*</span>
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: '스터디 종류를 선택해 주세요' }}
            render={({ field }) => (
              <Dropdown
                options={studyTypeOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
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
            name="type"
            control={control}
            rules={{ required: '스터디 유형를 선택해 주세요' }}
            render={({ field }) => (
              <Dropdown
                options={studyCategoryOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
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
            className={cn(
              'w-full h-[48px] placeholder:text-text4',
              !errors.member && watch('member') > 0 && 'border-text text-text'
            )}
            disabled={isUnlimited}
            placeholder="최대 10명까지 등록 가능해요"
            min={0}
            max={10}
            step={1}
            {...register('member', {
              onChange: handleCapacityChange,
              required: '스터디 인원을 선택해주세요',
            })}
            error={errors.member?.message}
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
              value={isUnlimited ? 0 : 100}
              {...register('maxWaitMember')}
            />
            {/* 라벨 텍스트 */}
            <label htmlFor="maxWaitMember" className="text-text">
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
              <label
                key={day}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={day}
                  className="border-gray-300 cursor-pointer"
                  {...register('schedule', {
                    validate: validateArrayLength,
                  })}
                />
                {day}
              </label>
            ))}
          </div>
          {errors.schedule && (
            <p className="mt-1 text-xs font-medium text-alertText">
              * {errors.schedule?.message}
            </p>
          )}
        </div>

        {/* 스터디 시간 */}
        <div className="flex flex-col gap-[16px] mt-[2px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            스터디 시간<span className="text-red-500">*</span>
          </label>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: '스터티 시간을 선택해주세요' }}
            render={({ field }) => (
              <Dropdown
                options={timeOptions}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.startTime?.message}
                className="w-[184px]"
              />
            )}
          />
        </div>

        {/* 스터디 레벨 */}
        <div className="flex flex-col gap-[16px] mt-[2px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            스터디 레벨<span className="text-red-500">*</span>
          </label>
          <Controller
            name="level"
            control={control}
            rules={{ required: '스터티 레벨을 선택해주세요' }}
            render={({ field }) => (
              <Dropdown
                options={studyLevel}
                placeholder="선택해 주세요"
                selected={field.value}
                onChange={field.onChange}
                error={errors.level?.message}
                className="w-[184px]"
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
                {genderOptions.map((genderOption) => {
                  if (genderOption in genderMap) {
                    return (
                      <CommonButton
                        type="button"
                        key={genderOption}
                        variant={
                          field.value === genderMap[genderOption]
                            ? 'primary'
                            : 'secondary'
                        }
                        className="text-[16px] font-light border-primary border-[1px]"
                        onClick={() => field.onChange(genderMap[genderOption])}
                      >
                        {genderOption}
                      </CommonButton>
                    )
                  }
                  return null
                })}
              </div>
            )}
          />
          {errors.gender && (
            <p className="mt-1 text-xs font-medium text-alertText">
              * {errors.gender?.message}
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-md font-semibold text-sm transition mt-[8px] cursor-pointer ${
              isValid
                ? 'bg-purple-500 text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            스터디 만들기
          </button>
          {submitErrorMessage && (
            <div className="mt-[10px] text-center text-alertText font-bold">
              {submitErrorMessage.message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
