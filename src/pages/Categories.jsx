import { useEffect, useState } from "react"
import Category from "../components/Category"
import { getData } from "../util"
import Preloader from "../components/Preloader"
import ErrorMessage from "../components/ErrorMessage"

export default function Categories() {

  const [categoriesArr, setCategoriesArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const getCategories = async () => {
      try {
        const categoriesObj = await getData('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        setCategoriesArr(categoriesObj.meals)
      } catch (e) {
        console.error('critical error!', e);
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
      
      
    }
    getCategories()
  }, [])

  if (isLoading) return <Preloader/>
  if (error) return <ErrorMessage message={error}/>

  return (
    <>
    {categoriesArr.map(categorie=><Category name={categorie.strCategory}/>)}
    </>
  )
}