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
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'> 
            {/* using react hook form, whenever form is submitted handleSubmit() function is used which we get from react-hook-form(this function is actually an event). and we provide reference of our own handler function inside it.
            This event is important because whatever the input field we will use, there we will give the 'register' and we won't need to manage the state of those input vvalues. react hook form will take care of that. register will automatically pick the value and during handleSubmit() it will provide those value automatically. */}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address", //use of regexr to validate email.
                    }
                }) /* because we are using react hook form ...register("name", {options mentioned in documentation }) is neccessay for each Input element with different name. */}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login