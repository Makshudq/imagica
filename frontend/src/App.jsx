import './App.css'
import Header from './components/Header'
import { Route, Routes } from "react-router";
import GenerateImage from './pages/GenerateImage';
import Login from './pages/Login';
import Home from './pages/Home';
import { createContext, useState } from 'react'

export const userContext = createContext()

function App() {
   const [isLogin, setIsLogin] = useState(true)
   const [isUserLogged, setIsUserLogged] = useState(false)
   const [userCoins, setUserCoins] = useState(null)
   const [user, setUser] = useState({})

  return (
    <>
    <userContext.Provider value={{isLogin, setIsLogin, userCoins, setUserCoins, user, setUser, isUserLogged, setIsUserLogged}}>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/generateImage' element={<GenerateImage />} />
        </Routes>
      </div>
      </userContext.Provider>
    </>
  )
}

export default App
