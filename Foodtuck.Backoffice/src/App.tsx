import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from "./pages/home/Home"
import CreatePage from "./pages/create-page/CreatePage"
import UpdatePage from "./pages/update-page/UpdatePage"
import { Suspense } from 'react'

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/api/ui/' element={<Home />} />
        <Route path='/api/ui/create/:pageId?' element={<CreatePage />} />
        <Route path='/api/ui/update/:pageId' element={<UpdatePage />} />
      </Routes>
    </Suspense>
  )
}

export default App
