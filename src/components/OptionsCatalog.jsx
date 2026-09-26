import { useState, useEffect } from "react"
import { getData } from "../util"
import OptionType from "./OptionType"


export default function OptionsCatalog({ onInputChange }){

  const [optionsCatalog, setOptionsCatalog] = useState({ categories: [], areas: [], ingridients: [] })

  useEffect(() => {
      const optionsCatalogTypes = ['categories', 'areas', 'ingridients']
  
      optionsCatalogTypes.forEach(async (optionType) => {
        const url = `https://www.themealdb.com/api/json/v1/1/list.php?${optionType[0]}=list`
  
        try {
          const optionsCatalog = await getData(url)
          let processedOptionsCatalog = []
  
          switch (optionType){
            case 'categories':
              processedOptionsCatalog = optionsCatalog.meals.map(category => category.strCategory)
              break
            case 'areas':
              processedOptionsCatalog = optionsCatalog.meals.map(category => category.strArea)
              break
            case 'ingridients':
              processedOptionsCatalog = optionsCatalog.meals.map(category => category.strIngredient)
              break
          }
  
          setOptionsCatalog(prevOptionsCatalog => ({...prevOptionsCatalog, [optionType]: processedOptionsCatalog}))
          
        } catch(err) {
          console.error(err)
        }
      })
    }, [])

  return (
    <div className='flex flex-row'>{Object.keys(optionsCatalog).map(optionType => <OptionType type={optionType} optionsNames={optionsCatalog[optionType]} onInputChange={onInputChange}/>)}</div>
  )
}