export const getData = async (url, signal=null) => {
  const response = await fetch(url, {signal: signal})
  const data = await response.json()
  return data 
}

export const convertPropsToArr = (propName, propsCount=20, obj) => {
  const propsArr = []
  for (let i = 1; i <= propsCount; i++){
    const prop = obj[propName+String(i)]
    if (prop === '' || prop === undefined) break
    propsArr.push(prop)
  }
  return propsArr
}

export const generateOptionUrl = (type, name) => {
  let url = ''
  switch (type){
    case ('c'):
    case ('i'):
    case ('a'):
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${name}`
      break
    case ('f'):
      url = `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${name}`
      break
  }
  return url
}

export const excludeKey = (excludingKey, obj) => {
  const newObj = {}
  for (const key in obj){
    if (key !== excludingKey) newObj[key] = obj[key]
  }
  return newObj
}

export const crossObjects = (mainObj) => {
  let matchChecking = null
  for (const key in mainObj){
    matchChecking = mainObj[key]
    break
  }

  if (! matchChecking){  //Не проверяется первый рендер
    return []
  }
  
  const crossingIds = Object.keys(matchChecking).filter((idMeal) => {
    return ! Object.values(mainObj).some(obj => {
      return ! (idMeal in obj)
    })
  })

  const crossingArr = crossingIds.map((idMeal) => matchChecking[idMeal])
  return crossingArr
}