import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getData } from "../util";
import Preloader from "../components/Preloader"
import ErrorMessage from "../components/ErrorMessage"
import RecipePreview from "../components/RecipePreview";

export default function recipes(){
  const { category } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recipesArr, setRecipesArr] = useState([])
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  

  useEffect(()=>{
    const getRecipes = async () => {
      try {
        const recipesObj = await getData(url)
        setRecipesArr(recipesObj.meals)
      } catch (e) {
        console.error('critical error!', e)
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
      
    }
    getRecipes()
  }, [])

  console.log(recipesArr)

  if (isLoading) return <Preloader/>
  if (error) return <ErrorMessage message={error}/>

  return <div>{recipesArr.map(recipe => <RecipePreview strMeal={recipe.strMeal} idMeal={recipe.idMeal}/>)}</div>
}