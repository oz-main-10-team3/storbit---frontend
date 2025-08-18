import React, { useEffect, useState } from 'react'
import type { EventItem } from '@/types/event'
import Dropdown from '@/common/DropDown.tsx'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import InputField from '@/common/InputField.tsx'
import CommonButton from '@/common/CommonButton.tsx'
import { eventSchema } from '@/schemas/eventSchema'

interface Props {
  onSubmit: (event: EventItem) => void
  onChange: (event: Omit<EventItem, 'id'>) => void
  initialData: Omit<EventItem, 'id'>
  isUpdate?: boolean
  onDelete?: () => void
}

const eventTags = [
  { label: '이벤트 유형', value: '' },
  { label: '리워드 이벤트', value: '리워드 이벤트' },
  { label: '이자카야 이벤트', value: '이자카야 이벤트' },
  { label: '인기이자카야 이벤트', value: '인기이자카야 이벤트' },
  { label: '시즌 한정판', value: '시즌 한정판' },
]
const eventProgress = [
  { label: '진행 상태', value: '' },
  { label: '예정', value: '예정' },
  { label: '진행중', value: '진행중' },
  { label: '보류중', value: '보류중' },
  { label: '종료', value: '종료' },
]

export function EventForm({
  onSubmit,
  onChange,
  initialData,
  isUpdate = false,
  onDelete,
}: Props) {
  const [form, setForm] = useState<Omit<EventItem, 'id'>>(initialData)
  const [startIndex, setStartIndex] = useState(0)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const { error } = eventSchema.validate(form, { abortEarly: false })
    if (error) {
      const newErrors: { [key: string]: string } = {}
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message
      })
      setErrors(newErrors)
      setSuccess({})
    } else {
      setErrors({})
      const newSuccess: { [key: string]: string } = {}
      Object.keys(form).forEach((key) => {
        if (key !== 'images') {
          newSuccess[key] = '성공적으로 입력되었습니다.'
        }
      })
      if (form.images.length > 0) {
        newSuccess.images = '성공적으로 입력되었습니다.'
      }
      setSuccess(newSuccess)
    }
  }, [form])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    onChange({ ...form, [name]: value })
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setForm((prev) => ({
        ...prev,
        thumbnailUrl: imageUrl,
      }))
      onChange({ ...form, thumbnailUrl: imageUrl })
    }
  }

  const handleAddImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setForm((prev) => {
        const newImages = [...prev.images]
        newImages[index] = url
        const updated = { ...prev, images: newImages }
        onChange(updated)
        return updated
      })
    }
  }

  const addImageInput = () => {
    if (form.images.length < 10) {
      setForm((prev) => {
        const updated = { ...prev, images: [...prev.images, ''] }
        onChange(updated)
        // Reset startIndex to show last 5 images if more than 5
        setStartIndex(updated.images.length > 5 ? updated.images.length - 5 : 0)
        return updated
      })
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto pt-[40px] pb-[120px]">
      <h1 className="text-[24px] font-bold mb-[32px]">
        {isUpdate ? '이벤트 수정' : '새 이벤트 작성'}
      </h1>

      {/* 타이틀 */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          이벤트 타이틀<span className="text-red-500 ml-1">*</span>
        </label>
        <InputField
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="이벤트 제목을 작성해주세요"
          className="w-[800px] h-[48px] text-base border rounded-md px-4"
        />
        <p
          className={`text-red-500 text-xs mt-1 ${!errors.title ? 'invisible' : ''}`}
        >
          {errors.title}
        </p>
        <p
          className={`text-green-500 text-xs mt-1 ${!success.title ? 'invisible' : ''}`}
        >
          {success.title}
        </p>
      </div>

      {/* 유형 + 날짜 + 상태 */}
      <div className="flex gap-[16px] mb-8">
        <Dropdown
          options={eventTags}
          selected={form.type}
          placeholder="이벤트 유형"
          onChange={(value) => {
            setForm((prev) => {
              const updated = { ...prev, type: value as EventItem['type'] }
              onChange(updated)
              return updated
            })
          }}
          className="w-[184px] h-[48px] text-text4"
        />
        <div className="flex gap-[8px] items-center">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            placeholder="시작일"
            className="w-[200px] h-[48px] text-text4  border px-3"
          />
          <span className="w-[8px] h-[16px] text-text4 items-center justify-center ">
            ~
          </span>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            placeholder="종료일"
            className="w-[200px] h-[48px] text-text4  border px-3"
          />
        </div>
        <div>
          <Dropdown
            options={eventProgress}
            selected={form.status}
            placeholder="진행 상태"
            onChange={(value) => {
              setForm((prev) => {
                const updated = {
                  ...prev,
                  status: value as EventItem['status'],
                }
                onChange(updated)
                return updated
              })
            }}
            className="w-[160px] h-[48px] text-text4"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-8">
        <p
          className={`text-red-500 text-xs ${!errors.type ? 'invisible' : ''}`}
        >
          {errors.type}
        </p>
        <p
          className={`text-green-500 text-xs ${!success.type ? 'invisible' : ''}`}
        >
          {success.type}
        </p>
        <p
          className={`text-red-500 text-xs ${!errors.startDate ? 'invisible' : ''}`}
        >
          {errors.startDate}
        </p>
        <p
          className={`text-green-500 text-xs ${!success.startDate ? 'invisible' : ''}`}
        >
          {success.startDate}
        </p>
        <p
          className={`text-red-500 text-xs ${!errors.endDate ? 'invisible' : ''}`}
        >
          {errors.endDate}
        </p>
        <p
          className={`text-green-500 text-xs ${!success.endDate ? 'invisible' : ''}`}
        >
          {success.endDate}
        </p>
        <p
          className={`text-red-500 text-xs ${!errors.status ? 'invisible' : ''}`}
        >
          {errors.status}
        </p>
        <p
          className={`text-green-500 text-xs ${!success.status ? 'invisible' : ''}`}
        >
          {success.status}
        </p>
      </div>

      {/* 썸네일 */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-1">
          이벤트 썸네일<span className="text-red-500 ml-1">*</span>
        </label>
        <div className="w-[400px] h-[218px] bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {form.thumbnailUrl ? (
            <img
              src={form.thumbnailUrl}
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          ) : (
            <p className="text-gray-400 text-sm">
              등록된 이미지가 여기에 표시 됩니다.
            </p>
          )}
        </div>
        <div className="flex gap-[8px] mt-2">
          <input
            type="text"
            value={form.thumbnailUrl}
            readOnly
            className="w-[620px] h-[48px] border text-sm rounded-md px-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
            id="thumbnailUpload"
          />
          <label
            htmlFor="thumbnailUpload"
            className="w-[174px] h-[48px] bg-gray-200 text-sm rounded-md flex items-center justify-center cursor-pointer"
          >
            이미지 찾기
          </label>
        </div>
        <p
          className={`text-red-500 text-xs mt-1 ${!errors.thumbnailUrl ? 'invisible' : ''}`}
        >
          {errors.thumbnailUrl}
        </p>
        <p
          className={`text-green-500 text-xs mt-1 ${!success.thumbnailUrl ? 'invisible' : ''}`}
        >
          {success.thumbnailUrl}
        </p>
      </div>

      {/* 이미지 추가 */}
      <div className="mb-8 items-center">
        <label className=" text-sm font-semibold mb-1">
          이미지 추가<span className="text-red-500 ml-1">*</span>
        </label>
        <span className="ml-[20px] text-sm text-gray-400 mb-2">
          등록된 이미지가 표시 됩니다.
        </span>
        {form.images.map((img, index) => (
          <div key={index} className="flex items-center gap-[8px] mb-[8px]">
            <input
              type="text"
              value={img}
              readOnly
              className="w-[620px] h-[48px] border text-sm rounded-md px-3"
              placeholder="이미지경로"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleAddImages(e, index)}
              className="hidden"
              id={`imageUpload-${index}`}
            />
            <label
              htmlFor={`imageUpload-${index}`}
              className="w-[174px] h-[48px] bg-gray-200 text-sm rounded-md flex items-center justify-center cursor-pointer"
            >
              이미지 찾기
            </label>
          </div>
        ))}
        <p
          className={`text-red-500 text-xs mt-1 ${!errors.images ? 'invisible' : ''}`}
        >
          {errors.images}
        </p>
        <p
          className={`text-green-500 text-xs mt-1 ${!success.images ? 'invisible' : ''}`}
        >
          {success.images}
        </p>
        {form.images.length < 10 && (
          <div className="w-full flex justify-center mt-6">
            <button
              type="button"
              onClick={addImageInput}
              className="w-[32px] h-[32px] border border-gray-400 text-lg rounded-full flex items-center justify-center text-gray-500"
            >
              +
            </button>
          </div>
        )}
        <div className="flex justify-center items-center gap-[8px] mt-4">
          <button
            onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
            disabled={startIndex === 0}
            className="disabled:opacity-30"
            type="button"
          >
            <AiOutlineLeft size={24} className="text-gray-400" />
          </button>

          {form.images.slice(startIndex, startIndex + 5).map((img, idx) => (
            <div
              key={startIndex + idx}
              className="w-[112px] h-[120px] bg-gray-100 flex items-center justify-center text-sm text-gray-300 rounded-md"
            >
              {img ? (
                <img
                  src={img}
                  alt={`preview-${startIndex + idx}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                'storbit'
              )}
            </div>
          ))}

          <button
            onClick={() =>
              setStartIndex((prev) =>
                Math.min(prev + 1, Math.max(0, form.images.length - 5))
              )
            }
            disabled={startIndex + 5 >= form.images.length}
            className="disabled:opacity-30"
            type="button"
          >
            <AiOutlineRight size={24} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* 발행/수정/삭제 버튼 */}
      {isUpdate ? (
        <div className="flex justify-end items-end gap-[12px] mt-[32px] ">
          <CommonButton
            className="w-[100px] h-[40px] border"
            variant="secondary"
            onClick={onDelete}
          >
            삭제하기
          </CommonButton>
          <CommonButton
            className="w-[100px] h-[40px] "
            variant={Object.keys(errors).length > 0 ? 'disabled' : 'primary'}
            disabled={Object.keys(errors).length > 0}
            onClick={() =>
              onSubmit({
                ...form,
                id: isUpdate
                  ? (initialData as EventItem & { id: number }).id
                  : Date.now(),
              })
            }
          >
            수정하기
          </CommonButton>
        </div>
      ) : (
        <div className="flex justify-center">
          <CommonButton
            className="w-[400px] h-[48px] text-white text-base font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              onSubmit({
                ...form,
                id: Date.now(),
              })
            }
            disabled={Object.keys(errors).length > 0}
            variant={Object.keys(errors).length > 0 ? 'disabled' : 'primary'}
          >
            발행하기
          </CommonButton>
        </div>
      )}
    </div>
  )
}
