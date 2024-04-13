import React,{useEffect, useState} from 'react'
import {useNavigate, useParams,Link} from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios"
function UpdateProduct() {
    const {id} = useParams();
    const [title,setTitle] = useState();
    const [price,setPrice] = useState();
    const [description,setDescription] = useState();
    const [imageUrl,setImageUrl] = useState();
    const [category,setCategory] = useState();
    const navigate = useNavigate();
   

    useEffect(()=>{
        axios.get('http://localhost:4000/product/getProduct/'+id)
        .then(result => {
            console.log(result)
            setTitle(result.data.data.title)
            setCategory(result.data.data.category)
            setPrice(result.data.data.price)
            setDescription(result.data.data.description)
            setImageUrl(result.data.data.imageUrl)
        })
    },[])

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/product/updateproduct/${id}`,{title,price,category,description,imageUrl})
        .then(result => {
            setTimeout(() => {
                console.log(result)
                toast.success("Product Updated successfully")
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
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='title'
                            value={title}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                            onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            value={price}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                            onChange={(e)=> setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='imageurl'
                            value={imageUrl}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                            onChange={(e)=> setImageUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={update}
                            className=' bg-[#f6715c] w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct