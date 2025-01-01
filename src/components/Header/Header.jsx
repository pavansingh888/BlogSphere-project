import React from 'react'
import {Logo, LogoutBtn, Container} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  //When Navigation bar is made, actually it made thru array. and we loop thru array.
  //Advantage - if we have each separate value for Nav items, if there's a new button, so we will have to manaully apply that button each time. but in production grade its better to directly add another object is NavItems array and it will be added to our Nav Bar.

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]




  return (
    <header className='py-3 bg-blue-600 shadow'>
    <Container>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/'>
            <Logo width='70px' />
          </Link>
        </div>
        <ul className='flex space-x-4'>
          {/* Navigating thru Nav Items */}
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='font-semibold px-6 py-2 rounded-full duration-200 hover:bg-cyan-400 text-white'
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {/* Conditional rendering of logout button based on auth Status */}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
  
  )
}

export default Header