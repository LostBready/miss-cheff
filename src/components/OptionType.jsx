import Option from "./Option"
import { useState } from "react"
import { findByName } from "../util"

export default function OptionType({ type, optionsNames, onInputChange}){
  const [searchingText, setSearchingText] = useState('')
  
  return (
    <>
      <h6>{type}</h6>
      <input type="text" onChange={(e) => {setSearchingText(e.currentTarget.value)}}/>
      {searchingText && 
      <div className="flex flex-row flex-wrap gap-1.5">
        {findByName(optionsNames, searchingText).map(optionName => <Option type={type} name={optionName} onInputChange={onInputChange}/>)}
      </div>
      }
    </>
  )
}