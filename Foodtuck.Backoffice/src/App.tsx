import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from "./pages/home/Home"
import CreatePage from "./pages/create-page/CreatePage"
import UpdatePage from "./pages/update-page/UpdatePage"
import { Suspense } from 'react'
import CreateProductPage from "./pages/create-product/CreateProductPage"
import UpdateProductPage from "./pages/update-product/UpdateProductPage"

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/api/ui/' element={<Home />} />
        <Route path='/api/ui/create/:pageId?' element={<CreatePage />} />
        <Route path='/api/ui/update/:pageId' element={<UpdatePage />} />
        <Route path='/api/ui/products/create/' element={<CreateProductPage />} />
        <Route path='/api/ui/products/update/:productId' element={<UpdateProductPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
