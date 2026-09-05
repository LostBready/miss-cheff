import { useState, useEffect } from "react"
import { getData } from "../util"

const crossMeals = (mealsObj, ) => {
  const newCrossingArr = []
}


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
    //console.log('-----------------------------')

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
        const newMealsObj = {}
        for (const name in prevMealsObj){
          if (name !== currentOption.name) newMealsObj[name] = prevMealsObj[name]
        }
        return newMealsObj
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
      //console.log(url)
      getMeals(url)
      }
    }, [currentOption])


  useEffect(() => {
    if (! currentOption.name || ! currentOption.isOn) return
    console.log(currentOption.name, mealsObj[currentOption.name])
    const matchChecking = mealsObj[currentOption.name]
    const newCrossing = Object.keys(matchChecking).filter((idMeal) => {
      return ! Object.values(mealsObj).some(obj => ! idMeal in obj)
    })
    console.log(newCrossing)

  }, [mealsObj])

  // console.log(mealsObj)
  return(
    <>
      <div className="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'c', 'Seafood')}/>
        <p>Seafood category</p>
      </div>
      <div className="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'i', 'garlic')}/>
        <p>Garlic ingridient</p>
      </div>
      <div className="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, 'f', 'a')}/>
        <p>a first letter</p>
      </div>
    </>
  )
}