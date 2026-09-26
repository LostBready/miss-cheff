import { useState, useEffect, useRef } from "react"
import { getData, generateOptionUrl, excludeKey, crossObjects } from "../util"
import MealPreview from "./MealPreview"


export default function MealsPreviews({ currentOption }){
  const [mealsObj, setMealsObj] = useState({})
  const [crossingMealsArr, setCrossingMealsArr] = useState([])
  const requestsControllers = useRef({})


  useEffect(() => {
    async function getMeals(url, optionName){
      try {
        const controller = new AbortController()
        requestsControllers.current = {...requestsControllers, [optionName]: controller}
        const mealsObj = await getData(url, controller.signal)
        requestsControllers.current = excludeKey(currentOption.name, requestsControllers.current)

        if (!mealsObj.meals) mealsObj.meals = []

        const mealsNewObj = {}
        mealsObj.meals.forEach((meal) => {
          mealsNewObj[meal.idMeal] = meal
        })

        setMealsObj(prevMealsObj => ({ ...prevMealsObj, [optionName]: mealsNewObj }))
        
        } catch(err){
          console.log(url)
        console.error('an error incorrupted', err)
      }
    }

    if (! currentOption.isOn){
      console.log(currentOption.name)
      console.log(Object.keys(requestsControllers.current))
      if (currentOption.name in requestsControllers.current){
        requestsControllers.current[currentOption.name].abort()
        requestsControllers.current = excludeKey(currentOption.name, requestsControllers.current)
      }
      setMealsObj(prevMealsObj => excludeKey(currentOption.name, prevMealsObj))

    } else {
      const url = generateOptionUrl(currentOption.type, currentOption.name)
      getMeals(url, currentOption.name)
    }

    }, [currentOption])


  useEffect(() => {
    const newCrossingMeals = crossObjects(mealsObj)
    setCrossingMealsArr(newCrossingMeals)
  }, [mealsObj])

  //console.log(crossingMealsArr)
  return <div>{crossingMealsArr.map(meal => <MealPreview idMeal={meal.idMeal} strMeal={meal.strMeal}/>)}</div>
}