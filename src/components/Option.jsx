export default function Option({ type, name, onInputChange }){ 

  const changeSearchObj = (e, type, name) => {
    const isOn = e.currentTarget.checked
    onInputChange({ isOn, name, type })
  }

  return (
    <div className="flex flex-row gap-1.5">
        <input type="checkbox" onChange={(e)=>changeSearchObj(e, type[0], name)}/>
        <p>{name}</p>
    </div>
  )
}