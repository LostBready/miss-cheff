import { createContext, useState, useEffect } from "react"
import { useLocation } from "react-router"



const PageStateContext = createContext(null)

export default function PageStatusProvider({ children }){
  const location = useLocation()
  const [pageStatus, setPageStatus] = useState({pageState: 'loading', pageError: null})

  useEffect(()=>{
    setInitialPageStatus()
  }, [location])

  const setInitialPageStatus = () => {
    setPageStatus({pageState: 'loading', pageError: null})
  }

  const changePageStatus = (error=null) => {
    setPageStatus(prevVal=>prevVal.pageState==='loading' ? 
      {pageState: 'loaded', pageError: error} 
      : {pageState: 'loading', pageError: error})
  }

  return <PageStateContext value={{ changePageStatus, pageStatus }}>
    { children }
  </PageStateContext>
}