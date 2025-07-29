import { useParams } from 'react-router-dom'

export default function SearchResultPage() {
  const { query } = useParams()
  return (
    <>
      <div className="text-2xl text-alertText">{query} </div>
      <div className="text-2xl">검색 결과 페이지</div>
    </>
  )
}
