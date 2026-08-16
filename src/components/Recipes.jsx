import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getData } from "../logic";

export default function Recipies(){
  const { category } = useParams()
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  const [recipiesArr, setRecipiesArr] = useState([])
  

  useEffect(()=>{
    const getRecipies = async () => {
      const recipiesObj = await getData(url)
      console.log(recipiesObj)
      setRecipiesArr(recipiesObj.meals)
    }
    getRecipies()
  }, [])

  return <div>Hellooo</div>
}