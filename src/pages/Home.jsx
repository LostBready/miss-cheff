import { useNavigate } from "react-router"

export default function Home(){
  const navigate = useNavigate()
  return (
    <> 
      <button onClick={()=>navigate('/categories')}>Categories</button>
      <button onClick={()=>navigate('/searcher')}>Searcher</button>
    </>
  )
}