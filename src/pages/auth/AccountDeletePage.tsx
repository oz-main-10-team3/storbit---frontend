import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import InputField from '@/common/InputField'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const reason = [
  { label: '더 이상 사용하지 않음', value: '선택1' },
  { label: '다른 스터디 플랫폼 이용', value: '선택2' },
  { label: '스터디 매칭이 잘 안됨', value: '선택3' },
  { label: '기능/서비스 불만족', value: '선택4' },
  { label: '개인정보 보호 우려', value: '선택5' },
  { label: '앱/웹사이트 사용이 불편함', value: '선택6' },
  { label: '기타 (직접 작성)', value: '선택7' },
]

export default function AccountDeletePage() {
  const [selectedReason, setSelectedReason] = useState('')
  return (
    <div className="flex justify-center w-full mt-[105px] text-text">
      <div className="flex flex-col w-[700px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[80px]">
              <div className="text-[32px] text-left pl-[210px]">회원 탈퇴</div>
              <div className="text-[24px]">
                탈퇴 전 아래 내용을 꼭 확인해 주세요
              </div>
            </div>
            <div className="flex flex-col gap-[72px]">
              <div>
                <span>회원 탈퇴 시 회원님의 </span>
                <span className="text-[#F45D75]">
                  모든 스터디 기록과 활동 내역이 삭제
                </span>
                <span>돼요.</span>
                <div>
                  삭제된 정보는 복구할 수 없으니 신중하게 결정해 주세요.
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div>탈퇴하는 계정</div>
                <div>storbit@example.com</div>
              </div>
            </div>
          </div>
          <ul className="list-disc pl-5">
            <li>사용자의 닉네임은 &apos;탈퇴한 이용자&apos;로 표시돼요.</li>
            <li>
              스터디 그룹에서 작성한 미션이나 게시물은 삭제되지 않고
              스터디장에게 소유권이 이전돼요.
            </li>
            <li>
              참여 중인 스터디가 있다면 자동으로 탈퇴 처리되며, 스터디
              멤버들에게 알림이 전송돼요.
            </li>
            <li>
              스터디장으로 운영 중인 그룹이 있다면 탈퇴 전 다른 멤버에게 권한을
              이양하거나 스터디를 종료해야 해요.
            </li>
            <li>
              스터디 출석 기록, 미션 달성률, 학습 통계 등 모든 활동 데이터를 더
              이상 확인할 수 없어요.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[40px] mt-[56px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <div>
                <span className="text-sm font-medium text-black">
                  탈퇴 사유
                </span>
                <span className="text-alertText">*</span>
              </div>
              <Dropdown
                options={reason}
                selected={selectedReason}
                onChange={setSelectedReason}
                placeholder="선택해 주세요"
                className="w-[480px]"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <span className="text-sm font-medium text-black">상세 설명</span>
              <textarea className="w-[480px] resize-none overflow-hidden px-4 py-2.5 rounded-md border text-sm placeholder:text-gray-400 transition-colors duration-100 focus:outline-none text-text border-gray-300 focus:border-black focus:text-text" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div>
              <span className="text-sm font-medium text-black">
                현재 비밀번호
              </span>
              <span className="text-alertText">*</span>
            </div>
            <InputField className="w-[480px]" />
            <Link
              to="/auth/find-password"
              className="text-disabled-text underline"
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
        <div className="flex gap-[16px] mt-[45px]">
          <InputField type="checkbox" />
          <div>위의 모든 내용을 확인했으며, 탈퇴에 동의합니다.</div>
        </div>
        <div className="flex gap-[16px] mt-[8px]">
          <InputField type="checkbox" />
          <div>탈퇴 후 데이터 복구가 불가능함을 이해합니다.</div>
        </div>
        <CommonButton
          variant="disabled"
          className="w-[480px] ml-[50px] my-[56px]"
        >
          탈퇴하기
        </CommonButton>
      </div>
    </div>
  )
}
