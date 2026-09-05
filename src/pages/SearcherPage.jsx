import { useState, useEffect } from "react"
import { getData } from "../util"

export default function SearcherPage(){

  const changeSearchObj = (e, type, name) => {
    const isOn = e.currentTarget.checked
    setCurrentOption({ isOn, name, type })
  }


  const [currentOption, setCurrentOption] = useState({isOn: false, name: null, type: null})
  const [mealsObj, setMealsObj] = useState({})
  const [crossingMealsArr, setCrossingMealsArr] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('-----------------------------')

    const getMeals = async (url) => {
      try {
        const mealsObj = await getData(url)
        const mealsNewObj = {}
        mealsObj.meals.forEach((meal) => {
          mealsNewObj[meal.idMeal] = meal
        })
        setMealsObj(prevMealsObj => ({ ...prevMealsObj, [currentOption.name]: mealsNewObj }))
        
        } catch(err){
        console.error('an error incorrupted', err)
        setError(err)
      }
    }

    if (! currentOption.isOn){
      setMealsObj((prevMealsObj) => {
        delete prevMealsObj[currentOption.name]
        return prevMealsObj
      })
    } else {
      let url = ''
      switch (currentOption.type){
        case ('c'):
        case ('i'):
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?${currentOption.type}=${currentOption.name}`
          break
        case ('f'):
          url = `https://www.themealdb.com/api/json/v1/1/search.php?${currentOption.type}=${currentOption.name}`
          break
      }

      console.log(url)
      getMeals(url)
      }
    }, [currentOption])

  console.log(mealsObj)
  return(
    <>
      <div class="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'c', 'Seafood')}/>
        <p>Seafood category</p>
      </div>
      <div class="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'i', 'garlic')}/>
        <p>Garlic ingridient</p>
      </div>
      <div class="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'f', 'a')}/>
        <p>a first letter</p>
      </div>
    </>
  )
}