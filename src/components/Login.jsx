import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' // because after login we need to navigate to somewhere.
import { login as authLogin } from '../store/authSlice' // to update login state in auth store.
import {Button, Input, Logo} from "./index" // needed custom components
import {useDispatch} from "react-redux" // to dispatch login reducer to update auth status in store 
import authService from "../appwrite/auth" // to check authentication in appwrite
import {useForm} from "react-hook-form" //

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    //creating login method as handleSubmit is already used in useForm()
    const login = async(data) => {
        setError("") // the moment we click on login, errors should be cleaned, so always use this.
        try {
            const session = await authService.login(data) //creating email password session in appwrite
            if (session) {
                const userData = await authService.getCurrentUser() //getting current user data from appwrite
                if(userData) dispatch(authLogin(userData)); //if userData recieved, dispatching login() reducer to update auth status and userData in the auth store
                navigate("/") //since user is logged in navigate them to root route.
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 py-8">
    <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg">
      <div className="mb-4 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-gray-700">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-emerald-500 hover:text-emerald-600 transition-all duration-200"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-6">
        <div className="space-y-5">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-full hover:bg-emerald-600 duration-200">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default Login