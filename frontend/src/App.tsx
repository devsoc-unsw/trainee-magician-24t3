import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Catalogue } from './pages/Catalogue'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
