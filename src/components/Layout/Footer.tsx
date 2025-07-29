import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#45484C] h-[320px] py-[64px] px-[260px]">
      <div className="flex w-[400px] h-[20px] items-center justify-center text-text3 text-[16px] gap-[8px]">
        <Link className="cursor-pointer" to="/terms">
          이용약관
        </Link>
        <div>|</div>
        <Link className="cursor-pointer" to="/privacy">
          개인정보처리방침
        </Link>
        <div>|</div>
        <Link className="cursor-pointer" to="contact">
          문의하기
        </Link>
        <div>|</div>
        <div>© 2025 storbit</div>
      </div>
    </footer>
  )
}
