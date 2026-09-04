import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Preloader from "../components/Preloader"
import ErrorMessage from "../components/ErrorMessage"
import { getData, convertPropsToArr } from "../util"
import Recipe from "../components/Recipe"

export default function RecipePage(){
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [recipeObj, setRecipeObj] = useState({})
  const [ingridientsNamesArr, setIngridientsArr] = useState([])
  const [measuresArr, setWeightsArr] = useState([])
  const { id } = useParams()
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

  useEffect(()=>{
    const getRecipe = async () => {
      try {
        const rawRecipeObj = await getData(url)
        setRecipeObj(rawRecipeObj.meals[0])
      } catch (e) {
        console.error('critical error!', e)
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    getRecipe()
  }, [])

  useEffect(()=>{
    setIngridientsArr(convertPropsToArr('strIngredient', 20, recipeObj))
    setWeightsArr(convertPropsToArr('strMeasure', 20, recipeObj))
  }, [recipeObj])

  if (isLoading) return <Preloader/>
  if (error) return <ErrorMessage/>
  return(
  <Recipe 
    strMeal={recipeObj.strMeal} 
    strInstructions={recipeObj.strInstructions} 
    strMealThumb={recipeObj.strMealThumb}
    ingridientsNamesArr={ingridientsNamesArr}
    measuresArr={measuresArr}
  />
)
}