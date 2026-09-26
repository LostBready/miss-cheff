import { useRef } from "react"

export default function Option({ type, name, onInputChange }){ 
  const isOn = useRef(false)


  const changeSearchObj = () => {
    isOn.current = !isOn.current
    onInputChange({ isOn: isOn.current, name, type: type[0] })
  }

  return (
    <button className="border-2 rounded-md" onClick={changeSearchObj}>{name}</button>
  )
}