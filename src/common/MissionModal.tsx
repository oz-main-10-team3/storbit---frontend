import { type ReactNode, useState, useEffect } from 'react'
import { FaPen } from 'react-icons/fa'
import InputField from '@/common/InputField'
import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'
import TransientModal from '@/common/TransientModal.tsx'
import { missionSchema } from '@/schemas/missionSchema'

interface MissionModalProps {
  isOpen: boolean
  onClose: () => void
  onStart?: () => void
  title: string
  subtitle: ReactNode | string
}

export default function MissionModal({
  isOpen,
  onClose,
  onStart,
  title,
  subtitle,
}: MissionModalProps) {
  const [missions, setMissions] = useState<string[]>([
    '오늘은 목숨부터 정복할겁니다',
  ])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  const [newMission, setNewMission] = useState('')
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState<{ [key: string]: string }>({})

  const validate = (field: string, value: string) => {
    const { error } = missionSchema.validate({ mission: value })
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error.details[0].message }))
      setSuccess((prev) => {
        const newSuccess = { ...prev }
        delete newSuccess[field]
        return newSuccess
      })
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      setSuccess((prev) => ({ ...prev, [field]: '성공적으로 입력되었습니다.' }))
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setErrors({})
    }
  }, [isOpen])

  const handleSave = () => {
    validate('edit', editingText)
    if (errors.edit) return

    if (editIndex !== null) {
      const updated = [...missions]
      updated[editIndex] = editingText
      setMissions(updated)
      setEditIndex(null)
      setEditingText('')
    }
  }

  const handleAdd = () => {
    validate('new', newMission)
    if (errors.new) return

    if (newMission.trim() && missions.length < 5) {
      setMissions((prev) => [...prev, newMission.trim()])
      setNewMission('')
    }
  }

  return (
    <div>
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        subtitle={<span className="whitespace-pre-line">{subtitle}</span>}
        className="w-[480px] max-h-[90vh] p-4"
      >
        <div className="space-y-4 ml-[30px] mr-[30px]">
          <div>
            <h3 className="text-sm font-semibold text-text mb-1">현재 미션</h3>
            {missions.map((m, index) => (
              <div key={index} className="mb-2">
                {editIndex === index ? (
                  <div className="relative w-[368px] h-[48px]">
                    <InputField
                      value={editingText}
                      onChange={(e) => {
                        setEditingText(e.target.value)
                        validate('edit', e.target.value)
                      }}
                      className="w-full text-sm pr-[124px] outline-none h-[48px]"
                      placeholder="미션을 입력하세요"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 items-center h-[48px]">
                      <CommonButton
                        className="w-[52px] h-[32px] text-xs px-0"
                        onClick={handleSave}
                        variant={errors.edit ? 'disabled' : 'primary'}
                        disabled={!!errors.edit}
                      >
                        저장
                      </CommonButton>
                      <CommonButton
                        className="w-[52px] h-[32px] text-xs px-0"
                        onClick={() => {
                          setEditIndex(null)
                          setEditingText('')
                          setErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.edit
                            return newErrors
                          })
                        }}
                        variant="secondary"
                      >
                        취소
                      </CommonButton>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-[368px]">
                    <InputField
                      value={m}
                      readOnly
                      className="w-full text-sm  text-text4 pr-10 cursor-default"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditIndex(index)
                        setEditingText(m)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    >
                      <FaPen size={12} />
                    </button>
                  </div>
                )}
                {errors.edit && editIndex === index && (
                  <p className="text-red-500 text-xs mt-1">{errors.edit}</p>
                )}
                {success.edit && editIndex === index && (
                  <p className="text-green-500 text-xs mt-1">{success.edit}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text mb-1">
              새 미션 추가
            </h3>
            <div className="flex gap-2">
              <InputField
                value={newMission}
                onChange={(e) => {
                  setNewMission(e.target.value)
                  validate('new', e.target.value)
                }}
                placeholder="새로운 미션을 입력하세요"
                className="w-[256px] h-[48px] text-sm"
              />
              <CommonButton
                className="px-4 w-[112px] h-[48px] text-sm"
                onClick={handleAdd}
                variant={
                  missions.length >= 5 || !!errors.new || !newMission.trim()
                    ? 'disabled'
                    : 'primary'
                }
                disabled={
                  missions.length >= 5 || !!errors.new || !newMission.trim()
                }
              >
                + 추가
              </CommonButton>
            </div>
            {errors.new && (
              <p className="text-red-500 text-xs mt-1">{errors.new}</p>
            )}
            {success.new && (
              <p className="text-green-500 text-xs mt-1">{success.new}</p>
            )}
          </div>

          <div className="pt-8">
            <CommonButton
              className="h-[48px] text-base"
              variant="primary"
              onClick={() => {
                if (onStart) {
                  onStart()
                }
                onClose()
                setMissions(['오늘은 목숨부터 정복할겁니다'])
                setEditIndex(null)
                setEditingText('')
                setNewMission('')
                setIsTransitionModalOpen(true)
              }}
            >
              완료
            </CommonButton>
          </div>
        </div>
      </CommonModal>
      {isTransitionModalOpen && (
        <TransientModal
          isOpen={isTransitionModalOpen}
          onClose={() => setIsTransitionModalOpen(false)}
          type="start"
        />
      )}
    </div>
  )
}
