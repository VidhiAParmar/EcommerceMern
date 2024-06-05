import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import {toast} from "react-hot-toast"
import axios from "axios"

function myState(props) {
    const [mode, setMode] = useState('light');
    const [products,setProducts] = useState([]);
    const [users,setUsers] = useState([]);
    const [admins,setAdmins] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [total, setTotal] = useState(0);
    const [userId, setuserId] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const api = "http://localhost:4000";

    useEffect(()=>{
        axios.get(`${api}/admin/admins`)
        .then(result => setAdmins(result.data.data))
        .catch(err => console.log(err))

        axios.get(`${api}/auth/users`)
        .then(result => setUsers(result.data.data))
        .catch(err => console.log(err))

        axios.get(`${api}/product/products`)
        .then(result => setProducts(result.data.data))
        .catch(err => console.log(err))

    },[])

    useEffect(()=>{
        const getCartItem = (id) => { 
        let res = axios.get( `${api}/cart/getcartitem/${id}`)
        console.log(res);
        }
        getCartItem(userId)
    },[isUserLoggedIn])

    useEffect(()=>{
        const storedIsUserLoggedIn = localStorage.getItem("isUserLoggedIn");
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(storedIsUserLoggedIn === true);
        if(storedIsUserLoggedIn){
            setuserId(user.userId);
        }
    
        const storedIsAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        setIsAdminLoggedIn(storedIsAdminLoggedIn === true);
      },[])

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    return (
        <myContext.Provider value={{
            mode, toggleMode, users, setUsers, admins,setAdmins, products,setProducts, 
            email,setEmail, password, setPassword,isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn,
            userId,setuserId, cartItems, setCartItems, cartCount, setCartCount, total, setTotal,
        }}>
            {props.children}
        </myContext.Provider>
    )
}

export default myState
