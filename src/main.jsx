import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router'
import './index.css'
import Categories from './pages/Categories.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipePage from './pages/RecipePage.jsx'
import Home from './pages/Home.jsx'
import SearcherPage from './pages/SearcherPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/searcher' element={<SearcherPage/>}/>
        <Route path='/recipes/:category' element={<Recipes/>}/>
        <Route path='/recipe/:id' element={<RecipePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
