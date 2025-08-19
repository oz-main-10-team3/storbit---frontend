// import { TbTextResize } from 'react-icons/tb'
import { SlPencil } from 'react-icons/sl'
import { LuCircle } from 'react-icons/lu'
import { FaCircle } from 'react-icons/fa'

interface StudyRoomToolboxProps {
  setToolName: React.Dispatch<
    React.SetStateAction<'pen' | 'circle' | 'fillCircle'>
  >
  setColor: React.Dispatch<React.SetStateAction<string>>
  color: string
  setShouldFillCircle: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StudyRoomToolbox({
  setToolName,
  setColor,
  color,
  setShouldFillCircle,
}: StudyRoomToolboxProps) {
  return (
    <div className="flex items-center justify-center gap-[10px] px-[22px] py-[12px] ml-[10px] absolute bottom-[40px] left-1/2 -translate-x-1/2 h-[48px] w-[200px] z-20 bg-white shadow-[1px_1px_8px_rgba(0,0,0,0.25)] rounded-[8px]">
      {/* <TbTextResize size={30} /> */}
      <SlPencil
        size={25}
        className="cursor-pointer"
        onClick={() => setToolName('pen')}
      />
      <LuCircle
        size={25}
        className="cursor-pointer"
        onClick={() => {
          setToolName('circle')
          setShouldFillCircle(false)
        }}
      />
      <FaCircle
        size={25}
        className="cursor-pointer"
        onClick={() => {
          setToolName('fillCircle')
          setShouldFillCircle(true)
        }}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-[30px]"
      />
    </div>
  )
}
