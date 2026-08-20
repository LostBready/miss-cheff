import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router'
import './index.css'
import Categories from './pages/Categories.jsx'
import Recipes from './pages/Recipes.jsx'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/recipes/:category' element={<Recipes/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
