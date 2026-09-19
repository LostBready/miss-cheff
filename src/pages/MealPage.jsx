import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Preloader from "../components/Preloader"
import ErrorMessage from "../components/ErrorMessage"
import { getData, convertPropsToArr } from "../util"
import Meal from "../components/Meal"

export default function MealPage(){
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [MealObj, setMealObj] = useState({})
  const [ingridientsNamesArr, setIngridientsArr] = useState([])
  const [measuresArr, setWeightsArr] = useState([])
  const { id } = useParams()
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

  useEffect(()=>{
    const getMeal = async () => {
      try {
        const rawMealObj = await getData(url)
        setMealObj(rawMealObj.meals[0])
      } catch (e) {
        console.error('critical error!', e)
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    getMeal()
  }, [])

  useEffect(()=>{
    setIngridientsArr(convertPropsToArr('strIngredient', 20, MealObj))
    setWeightsArr(convertPropsToArr('strMeasure', 20, MealObj))
  }, [MealObj])

  if (isLoading) return <Preloader/>
  if (error) return <ErrorMessage/>
  return(
  <Meal 
    strMeal={MealObj.strMeal} 
    strInstructions={MealObj.strInstructions} 
    strMealThumb={MealObj.strMealThumb}
    ingridientsNamesArr={ingridientsNamesArr}
    measuresArr={measuresArr}
  />
)
}