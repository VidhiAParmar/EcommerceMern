import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import {toast} from "react-hot-toast"
import axios from "axios"

function myState(props) {
    const [mode, setMode] = useState('light');
    const [products,setProducts] = useState([]);
    const [users,setUsers] = useState([]);
    const [admins,setAdmins] = useState([]);
    const [userLoggedIn,setUserLoggedIn] = useState(false);
    const [adminLoggedIn,setAdminLoggedIn] = useState(false);
    const [userId,setuserId] = useState("");
    const [adminId,setAdminId] = useState("");
    const [authToken,setAuthToken] = useState("");
    const [user,setUser] = useState([])
    const [email, setEmail] = useState("");
    const [admin,setAdmin]= useState([]);
    const [adminAuthToken,setAdminAuthToken] = useState("");
    const [flag,setFlag] = useState(false);
    const [password, setPassword] = useState("");
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
            mode, toggleMode, users, setUsers, admins,setAdmins, products,setProducts, userLoggedIn, setUserLoggedIn, userId, setuserId, authToken, setAuthToken,
            email,setEmail, password, setPassword, user,setUser, admin, setAdmin, setAdminId, adminId, adminLoggedIn, setAdminLoggedIn, adminAuthToken, setAdminAuthToken,
            flag,setFlag
        }}>
            {props.children}
        </myContext.Provider>
    )
}

export default myState
