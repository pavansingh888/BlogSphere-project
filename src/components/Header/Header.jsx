import React, { useState } from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({userName}) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  //When Navigation bar is made, actually it made thru array. and we loop thru array.
  //Advantage - if we have each separate value for Nav items, if there's a new button, so we will have to manaully apply that button each time. but in production grade its better to directly add another object is NavItems array and it will be added to our Nav Bar.

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: true,
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
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="md:py-4 bg-blue-600 shadow-md w-full top-0 sticky z-50 py-2">
        <Container>
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="w-[50px]">
                <Logo />
              </Link>
              {userName && <p className="font-bold px-6 py-2 text-white italic">Hello! &nbsp;{userName}</p>}
            </div>

            <button
              className="md:hidden block text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <ul className="hidden md:flex space-x-4">
              {/* Navigating thru Nav Items */}
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="font-semibold px-6 py-2 rounded-full duration-200 hover:bg-cyan-400 text-white"
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

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:z-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        >
          <div
            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-cyan-50 shadow-xl p-5 transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
          >
            {/* Close Button */}
            <button
              className="text-cyan-600 mb-6 font-semibold bg-cyan-100 hover:bg-red-100 hover:text-red-600 transition-all duration-200 w-full px-6 py-2 rounded-full"
              onClick={toggleSidebar}
            >
              Close
            </button>

            {/* Navigation Items */}
            <ul className="space-y-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className="w-full text-left text-cyan-800 font-medium bg-cyan-100 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-full transition-all duration-200"
                        onClick={() => {
                          navigate(item.slug);
                          toggleSidebar(); // Close sidebar after navigation
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {/* Logout Button */}
              {authStatus && (
                <li>
                  <LogoutBtn isSidebarOpen={isSidebarOpen} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
