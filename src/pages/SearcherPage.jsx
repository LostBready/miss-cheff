import { useState } from "react"
import OptionsCatalog from "../components/OptionsCatalog"
import MealsPreviews from "../components/MealsPreviews"


export default function SearcherPage(){

  const [currentOption, setCurrentOption] = useState({ isOn: null, name: null, type: null })
  
  return(
    <>
      <OptionsCatalog onInputChange={setCurrentOption}></OptionsCatalog>
      <MealsPreviews currentOption={currentOption}></MealsPreviews>
    </>
  )
}