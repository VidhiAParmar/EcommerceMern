import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast'


function AddProduct() {
    const [title,setTitle] = useState();
    const [price,setPrice] = useState();
    const [description,setDescription] = useState();
    const [imageUrl,setImageUrl] = useState();
    const [category,setCategory] = useState();
    const navigate = useNavigate();
   
    
    const submit =async (e) => {
        e.preventDefault(); 
        await axios.post('http://localhost:4000/product/createproduct', { title, price, category, description, imageUrl })
            .then(result => {
                setTimeout(() => {
                    console.log(result)
                    toast.success("Product added successfully")
                    navigate('/dashboard')
                }, 1000);
            })
            .catch(err => console.log(err))
    }
    
    
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <Toaster/>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            onChange={(e)=> setPrice(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='imageurl'
                            onChange={(e) => setImageUrl(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            onChange={(e) => setCategory(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" 
                            name='description'
                             onChange={(e) => setDescription(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'/>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        
                        <button
                            onClick={submit}
                            className=' bg-[#f6715c] w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}


export default AddProduct