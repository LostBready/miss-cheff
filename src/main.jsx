import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router'
import './index.css'
import MealPage from './pages/MealPage.jsx'
import SearcherPage from './pages/SearcherPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<SearcherPage/>}/>

        <Route path='/recipe/:id' element={<MealPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
