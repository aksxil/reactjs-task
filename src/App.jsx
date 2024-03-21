import React from 'react'
import Login from './Components/Login'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Components/Home'
import "./index.css"

const App = () => {
  
  return (
    <div>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </div>
  )
}

export default App