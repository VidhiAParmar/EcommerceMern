import { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import myContext from '../Context/myContext'
import { BsCart3 } from "react-icons/bs";
import axios from "axios"


export default function Navbar() {

  const context = useContext(myContext)
  const { toggleMode, mode,user,userId ,authToken,userLoggedIn,adminLoggedIn,adminAuthToken} = context
  let cartItem = user.cart;
  let count = cartItem ? cartItem.length : 0;
  console.log("user mate: "+userLoggedIn+" admin : "+ adminLoggedIn)
  const getCartItem = async () => {
    let cartItem = await axios.get("http://localhost/cart/getcartitem",{userId})
    console.log(cartItem);
  }
  const checkUser = () => {
    if(userLoggedIn){
      cartItem = user.cart
    }
  }
  const adminLogout = async () => {
    await axios.get('http://localhost:4000/admin/logout',{
      headers: {
          Authorization: `Bearer ${adminAuthToken}`
      }
  })
  }
  const userLogout = async () => {
    await axios.get('http://localhost:4000/auth/logout',{
      headers: {
          Authorization: `Bearer ${authToken}`
      }
  })
  }
  
  useEffect(()=>{
    checkUser();
  },[])

  const logout = () => {
    if(adminLoggedIn){
      adminLogout();
    }else{
      userLogout();
    }
    window.location.href = "/"
  }


  return (
    <div className="bg-white sticky top-0 z-50">
      {/* desktop  */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-[#f6715c] px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 
                  <Link to={'/'} className="text-sm font-medium text-gray-700 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>Home</Link>
                  {adminLoggedIn ? <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>Dashboard</Link> : " "}
                 

                  {userLoggedIn || adminLoggedIn ? <p onClick={() => logout()} className="text-sm font-medium text-gray-700 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </p> : <Link to={'/login'} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Login
                  </Link>}

                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
               
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                {!adminLoggedIn ? <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                  <BsCart3 size={20}/>
                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{count}</span>
                  </Link>
                </div> : ""}
                
              </div>
            </div>
        </nav>
      </header>
    </div>
  )
}