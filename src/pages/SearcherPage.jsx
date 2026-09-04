import { useState, useEffect } from "react"
import { getData } from "../util"

export default function SearcherPage(){
  const changeSearchObj = (e, type, name) => {
    const isOn = e.currentTarget.checked
    if (isOn) setSearchObj(prevObj => ({ ...prevObj, [name]: type }) )
    else {
      const filteredObj = {}
      Object.keys(searchObj).map((key) => {
        if (key !== name) filteredObj[key] = searchObj[key]
      })
      setSearchObj(filteredObj)
    }
  }


  const [searchObj, setSearchObj] = useState({})
  const [mealsMatrix, setMealsMatrix] = useState([])
  const [crossingMealsArr, setCrossingMealsArr] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('-----------------------------')

    const getMeals = async (url) => {
      try {
        const mealsObj = await getData(url)
        const mealsArr = mealsObj.meals
        setMealsMatrix(prevMatrix => [...prevMatrix, mealsArr])
      } catch(err){
        console.error('an error incorrupted', err)
        setError(err)
      }
    }

    Object.keys(searchObj).map((key) => {
      let url = ''
      switch (searchObj[key]){
        case ('c' || 'i'):
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?${searchObj[key]}=${key}`
          break
        case ('f'):
          url = `https://www.themealdb.com/api/json/v1/1/search.php?${searchObj[key]}=${key}`
          break
      }

      console.log(url)
      getMeals(url)

    })

    setMealsMatrix([])
  }, [searchObj])

  console.log(mealsMatrix)
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