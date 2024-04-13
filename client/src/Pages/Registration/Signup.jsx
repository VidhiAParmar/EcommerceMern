import { Link, useNavigate } from 'react-router-dom'
import React,{useContext, useState} from 'react';
import { Toaster, toast } from "react-hot-toast";
import myContext from '../../Context/myContext';
import axios from "axios"
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    const navigate = useNavigate();
    const {admins,setFlag} = useContext(myContext);
    const [loginType, setLoginType] = useState('user');

    // Function to handle changes in the selected login type
    const handleLoginTypeChange = (event) => {
      setLoginType(event.target.value);
    };
  
    // Function to handle form submission
    
    console.log(admins)
    let flag = 0;
    const signup =async () =>{
       
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
        if(!name.length){
            return toast.error("Name is required")
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is not valid")
        }
        if(!password.length){
            return toast.error("Password is required")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter")
        }else{
            if(flag){
                try {
                    toast.success("Signup successfully")
                    setTimeout(()=>{
                        axios.post("http://localhost:4000/admin/register",{name,email,password})
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                        navigate('/login');
                        setEmail("");
                        setPassword("");
                    },1000)
                    
                } catch (error) {
                    console.log(error)
                    
                }
            }else{
                try {
                    toast.success("Signup successfully")
                    setTimeout(()=>{
                        axios.post("http://localhost:4000/auth/register",{name,email,password})
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                        navigate('/login');
                        setEmail("");
                        setPassword("");
                    },1000)
                    
                } catch (error) {
                    console.log(error)
                    
                }
            }
    }
    }

   
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <Toaster/>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
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
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={() => signup()}
                        className=' bg-[#f6715c] w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-[#f6715c] font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup