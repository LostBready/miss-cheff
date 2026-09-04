export const getData = async (url) => {
  const response = await fetch(url)
  //console.log(response)
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