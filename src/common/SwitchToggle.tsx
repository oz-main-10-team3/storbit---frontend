interface SwitchToggleProps
  extends React.ButtonHTMLAttributes<HTMLInputElement> {
  checked: boolean // 외부 상태 제어용
  onChange: () => void
}

export default function SwitchToggle({
  checked,
  onChange,
  ...props
}: SwitchToggleProps) {
  return (
    <label className="relative inline-block w-[54px] h-[24px] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="opacity-0 w-0 h-0"
        {...props}
      />
      <span
        className={`absolute inset-0 rounded-full transition duration-300 ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      />
      <span
        className={`absolute left-[2px] top-0.5 bg-white w-[20px] h-[20px] rounded-full transition-transform ${
          checked ? 'translate-x-[30px]' : 'translate-x-0'
        }`}
      />
    </label>
  )
}
