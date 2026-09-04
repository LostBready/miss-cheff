import { useNavigate } from "react-router"
export default function RecipePreview({ idMeal, strMeal }){
  const navigate = useNavigate()

  return <button onClick={()=>navigate(`/recipe/${idMeal}`)}>{strMeal}</button>
}