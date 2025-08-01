import { cn } from '@/utils/cn'

interface StudyTagProps {
  variant: 'level' | 'category'
  text: string
}

const StudyTag = ({ variant, text }: StudyTagProps) => {
  const baseStyle =
    'text-[12px] p-[4px] h-[24px] rounded-[4px] flex items-center justify-center'

  const styleMap = {
    level: 'text-[#8349FF] border border-[#8349FF] bg-white',
    category: 'text-[#121212] bg-[#bdbdbd]',
  }

  return <span className={cn(baseStyle, styleMap[variant])}>{text}</span>
}

export default StudyTag
