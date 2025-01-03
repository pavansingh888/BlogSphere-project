import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn({isSidebarOpen}) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className={(isSidebarOpen ? "w-full text-left text-cyan-800 font-medium bg-cyan-100 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-full transition-all duration-200" : "inline-block font-semibold  px-6 py-2 rounded-full duration-200 hover:bg-cyan-400 text-white" )}
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn