import CommonButton from '@/common/CommonButton'
import InputField from '@/common/InputField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupTermsPage() {
  //체크박스 상태관리
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  })
  const navigate = useNavigate()

  //모두 동의하기 클릭 시
  const handleAllCheck = () => {
    const newValue = !agreements.all
    setAgreements({
      all: newValue,
      age: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    })
  }

  //모두 클릭하기 외 체크박스 클릭
  const handleIndividualCheck = (key: keyof typeof agreements) => {
    const updated = {
      ...agreements,
      [key]: !agreements[key],
    }

    const { age, terms, privacy, marketing } = updated
    updated.all = age && terms && privacy && marketing

    setAgreements(updated)
  }

  const isRequiredChecked =
    agreements.age && agreements.terms && agreements.privacy

  const handleClick = () => {
    if (isRequiredChecked) navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[32px] w-[344px]">
        <div className="flex flex-col items-center justify-center gap-[56px] w-full">
          <div className="text-[32px] font-semibold">회원가입</div>
          <div className="flex flex-col items-start justify-center gap-[16px] w-full">
            <div className="self-start w-full">서비스 약관 동의</div>
            <div className="flex flex-col gap-[16px] text-text1 text-[14px] p-[16px] bg-[#f5f5f5] rounded-[8px]">
              <div className="flex flex-col items-center gap-[8px] w-full]">
                <div className="self-start flex gap-[16px]">
                  <InputField
                    type="checkbox"
                    className="h-[16px] w-[16px]"
                    checked={agreements.all}
                    onChange={handleAllCheck}
                  />
                  <div>모두 동의하기</div>
                </div>
                <div className="w-[312px] h-[1px] bg-text4"></div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex gap-[16px]">
                  <InputField
                    type="checkbox"
                    className="h-[16px] w-[16px]"
                    checked={agreements.age}
                    onChange={() => handleIndividualCheck('age')}
                  />
                  <div>만 14세 이상 (필수)</div>
                </div>
                <div className="flex gap-[16px]">
                  <InputField
                    type="checkbox"
                    className="h-[16px] w-[16px]"
                    checked={agreements.terms}
                    onChange={() => handleIndividualCheck('terms')}
                  />
                  <div>서비스 이용 약관 동의 (필수)</div>
                </div>
                <div className="flex gap-[16px]">
                  <InputField
                    type="checkbox"
                    className="h-[16px] w-[16px]"
                    checked={agreements.privacy}
                    onChange={() => handleIndividualCheck('privacy')}
                  />
                  <div>개인정보 수집 및 이용 동의 (필수)</div>
                </div>
                <div className="flex gap-[16px]">
                  <InputField
                    type="checkbox"
                    className="h-[16px] w-[16px]"
                    checked={agreements.marketing}
                    onChange={() => handleIndividualCheck('marketing')}
                  />
                  <div>마케팅/이벤트 알림 수신에 동의 (선택)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[40px] w-full">
          <CommonButton
            variant="secondary"
            className="text-[15px] w-full border-[1px] border-primary"
            onClick={handleClick}
          >
            동의하고 가입하기
          </CommonButton>
        </div>
      </div>
    </div>
  )
}
