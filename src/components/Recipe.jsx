import { useNavigate } from "react-router"
export default function Category({ name }){
  const navigate = useNavigate()
  return <button onClick={()=>navigate(`/recipe/${name}`)}>{name}</button>
}