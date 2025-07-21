import { useState } from 'react'
import './App.css'

function App() {
  const [test, setTeste] = useState(10)
  return (
    <>
      <div>{test}123123123</div>
      <button onClick={() => setTeste((prev) => prev + 1)}>버튼</button>
    </>
  )
}

export default App
