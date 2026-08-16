import { useEffect, useState } from "react"
import Category from "./Category"
import { getData } from "../logic"

export default function Categories() {
  const [categoriesArr, setCategoriesArr] = useState([])

  useEffect(()=>{
    const getCategories = async () => {
      const categoriesObj = await getData('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      setCategoriesArr(categoriesObj.meals)
    }
    getCategories()
  }, [])

  return (
    <>
    {categoriesArr.map(categorie=><Category name={categorie.strCategory}/>)}
    </>
  )
}