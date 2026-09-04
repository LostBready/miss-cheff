export default function Recipe( {
   strMeal, 
   strMealThumb, 
   strInstructions, 
   measuresArr,
   ingridientsNamesArr
  } ){
  return(
  <>
    <h3>{strMeal}</h3>
    <div class="flex flex-row">
      <div>{ingridientsNamesArr.map(name=><p>{name}</p>)}</div>
      <div>{measuresArr.map(measure=><p>{measure}</p>)}</div>
    </div>
    <img src={strMealThumb} alt="kek" />
    <p>{strInstructions}</p>
  </>
  )
}