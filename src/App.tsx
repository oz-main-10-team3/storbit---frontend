import './App.css'

function App() {
  return (
    <>
      <div className="text-primary hover:bg-primary-hover">
        메인 색상 및 호버 색상
      </div>
      <div className="text-text">기본 텍스트 색상</div>
      <div className="text-text2">보조 텍스트 색상</div>
      <div className="text-text3 bg-black">흰색 텍스트 색상</div>
      <div className="text-alertText">경고 텍스트 색상</div>
      <div className="text-text3 bg-bg">어두운 배경 색상</div>
      <div className="text-disabled-text bg-disabled-fill">
        비활성화된 텍스트 배경색상
      </div>
    </>
  )
}

export default App
