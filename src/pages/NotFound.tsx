export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg">
        죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        홈으로 돌아가기
      </a>
    </div>
  )
}
