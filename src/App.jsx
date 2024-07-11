import {useDispatch} from "react-redux"
import React, { useState, useEffect } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL); //for VITE
  //we will make a loading state  - When we will fetch data from Appwrite application and this might take some time  - for this making loading state is good so that on basis of loading we can do conditional rendering using if else.
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
      <Header/>
      <main>
       TODO: {/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div>
  ) : (null)
}

export default App
