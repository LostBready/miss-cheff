import Option from "./Option"

export default function OptionType({ type, optionsNames, onInputChange}){
  return (
    <>
      <h6>{type}</h6>
      <div className="flex flex-row gap-1.5">
        {optionsNames.map(optionName => <Option type={type} name={optionName} onInputChange={onInputChange}/>)}
      </div>
    </>
  )
}