import { Link, useNavigate } from 'react-router-dom'
import React,{ useEffect, useState, useContext} from 'react';
import myContext from '../../Context/myContext';
import { Toaster, toast } from "react-hot-toast";
import axios from "axios"

function Login() { 
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('user');
     // Function to handle changes in the selected login type
     const handleLoginTypeChange = (event) => {
        setLoginType(event.target.value);
      };
    const {admins,authToken,setuserId, setAuthToken, email,setEmail,setAdminAuthToken, password, setPassword,setUser, setAdmin,setAdminId,flag,setFlag} = useContext(myContext);
    let token = "";
    console.log(admins)
    useEffect(()=>{
        console.log(authToken)
        setEmail("");
        setPassword("");
    },[])
    
    const login = async () => {
    
        // Handle login based on the selected login type
        if (loginType === 'user') {
            // User login logic
            setFlag(false)
        } else if (loginType === 'admin') {
            // Admin login logic
            setFlag(true)
        }
        if(!email.length){
            return toast.error("Email is required")
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is not valid")
        }
        if(!password.length){
            return toast.error("Password is required")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter")
        }
        console.log(flag)
            if(flag){
                const fetchData = async () => {
                    try {
                        const response = await axios.post('http://localhost:4000/admin/login', {email,password});
                        const newAuthToken = response.data.data.adminAuthToken;
                        const adminId = response.data.data.admin._id;
                        console.log( response.data.data.admin._id)
                        setAdmin(response.data.data.admin)
                        // Update authToken state
                        setAdminAuthToken(newAuthToken);
                        setAdminId(adminId)
                        console.log(response)
                        // Log authToken after setting it
                        console.log('New authToken:', newAuthToken);
                        toast.success("Login successfully")
                        navigate('/')
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };
        
                // Fetch data when component mounts
                fetchData();
            }else{
                const fetchData = async () => {
                    try {
                        const response = await axios.post('http://localhost:4000/auth/login', {email,password});
                        const newAuthToken = response.data.data.authToken;
                        const userId = response.data.data.user._id;
                        console.log( response.data.data.user._id)
                        setUser(response.data.data.user)
                        // Update authToken state
                        setAuthToken(newAuthToken);
                        setuserId(userId)
                        console.log(response)
                        // Log authToken after setting it
                        console.log('New authToken:', newAuthToken);
                        toast.success("Login successfully")
                        navigate('/')
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };
                fetchData();
            }
    }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <Toaster/>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div className='flex gap-10 mb-2'>
                    <div className='flex '>
                        <input
                            type="radio"
                            id="user"
                            name="loginType"
                            
                            value="user"
                            checked={loginType === 'user'}
                            onChange={handleLoginTypeChange}
                        />
                        <label className='text-white text-sm' htmlFor="user">User</label>
                    </div>
                    <div className='flex'>
                        <input
                            type="radio"
                            id="admin"
                            name="loginType"
                            
                            value="admin"
                            checked={loginType === 'admin'}
                            onChange={handleLoginTypeChange}
                        />
                        <label className='text-white text-sm'htmlFor="admin">Admin</label>
                    </div>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-[#f6715c] w-full text-black font-bold  px-2 py-2 rounded-lg'
                        onClick={login}>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-[#f6715c] font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login