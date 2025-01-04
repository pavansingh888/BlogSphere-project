import {useDispatch, useSelector} from "react-redux"
import React, { useState, useEffect } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL); //for VITE
  //we will make a loading state  - When we will fetch data from Appwrite application and this might take some time  - for this making loading state is good so that on basis of loading we can do conditional rendering using if else.
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector((store)=>store?.auth?.userData)

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
        
    })
    .finally(() => {
      setLoading(false)
    })
  },[])

  //conditional rendering:
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-cyan-50">
    <div className="flex-1 w-full">
      {/* Header */}
      <Header userName={userData?.name}/>
  
      {/* Main Content */}
      <main className="flex-1 w-full pb-8 pt-20 md:pt-[100px] ">
        <Outlet />
      </main>
    </div>
  
    {/* Footer */}
    <Footer />
  </div>
  
  ) : (null)
}

export default App
