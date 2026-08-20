import { useEffect, useState } from "react"
import Category from "../components/Category"
import { getData } from "../util"

export default function Categories() {
  const [categoriesArr, setCategoriesArr] = useState([])

  useEffect(()=>{
    const getCategories = async () => {
      try {
        const categoriesObj = await getData('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        setCategoriesArr(categoriesObj.meals)
      } catch (e) {
        console.log('critical error!', e)
      }
      
      
    }
    getCategories()
  }, [])

  return (
    <>
    {categoriesArr.map(categorie=><Category name={categorie.strCategory}/>)}
    </>
  )
}