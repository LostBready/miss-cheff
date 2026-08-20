import { createContext, useState } from "react"

const pageStateContext = createContext(null)

const PageStatusProvider = ({ children }) => {
  const [pageStatus, setPageStatus] = useState({pageState: 'loading', pageError: null})

  const changePageState = (error=null) => {
    setPageState(prevVal=>prevVal.pageState==='loading' ? 
      {pageState: 'loaded', pageError: error} 
      : {pageState: 'loading', pageError: error})
  }
}