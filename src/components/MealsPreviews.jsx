import { useState, useEffect } from "react"
import { getData, generateOptionUrl, excludeKey, crossObjects } from "../util"
import MealPreview from "./MealPreview"


export default function MealsPreviews({ currentOption }){
  const [mealsObj, setMealsObj] = useState({})
  const [crossingMealsArr, setCrossingMealsArr] = useState([])
  const [requestsControllers, setRequestsControllers] = useState({})

  let currentRequestsControllers = {}


  useEffect(() => {
    async function getMeals(url, optionName){
      try {
        const controller = new AbortController()
        currentRequestsControllers = {...requestsControllers, [optionName]: controller}
        setRequestsControllers(currentRequestsControllers)
        const mealsObj = await getData(url, controller.signal)

        if (!mealsObj.meals) mealsObj.meals = []

        const mealsNewObj = {}
        mealsObj.meals.forEach((meal) => {
          mealsNewObj[meal.idMeal] = meal
        })

        setMealsObj(prevMealsObj => ({ ...prevMealsObj, [optionName]: mealsNewObj }))
        
        } catch(err){
        console.error('an error incorrupted', err)
      }
    }

    if (! currentOption.isOn){
      console.log(currentOption.name)
      console.log(Object.keys(currentRequestsControllers))
      if (currentOption.name in Object.keys(currentRequestsControllers)){
        currentRequestsControllers[currentOption.name].abort()
        setRequestsControllers(prevRequestsControllers => excludeKey(currentOption.name, prevRequestsControllers))
      }
      setMealsObj(prevMealsObj => excludeKey(currentOption.name, prevMealsObj))

    } else {
      const url = generateOptionUrl(currentOption.type, currentOption.name)
      getMeals(url, currentOption.name)
    }

    return () => {
      setRequestsControllers(prevRequestsControllers => excludeKey(currentOption.name, prevRequestsControllers))
    }

    }, [currentOption])


  useEffect(() => {
    const newCrossingMeals = crossObjects(mealsObj)
    setCrossingMealsArr(newCrossingMeals)
  }, [mealsObj])

  //console.log(crossingMealsArr)
  return <div>{crossingMealsArr.map(meal => <MealPreview idMeal={meal.idMeal} strMeal={meal.strMeal}/>)}</div>
}