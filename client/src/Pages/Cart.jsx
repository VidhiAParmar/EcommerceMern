import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Component/Layout';
import {toast} from "react-hot-toast"
import myContext from '../Context/myContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios"


function Cart() {

  const context = useContext(myContext)
  const { mode,user } = context;
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0)
  const shipping = parseInt(100);
  let cartItem = user.cart;
  let userId = user._id
  let count = cartItem ? cartItem.length : 0;

  useEffect(() => {
    const get = async () => {
        try {
            let items = [];
            for (let i = 0; i < count; i++) {
                let res = await axios.get("http://localhost:4000/product/getProduct/" + cartItem[i]);
                items.push(res.data.data);
            }
            setCartItems(items);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    if (count > 0) {
        get();
    }
}, [cartItem, count]);
  console.log(userId)

  console.log(cartItem+"count: "+count);
  useEffect(() => {
    // Initialize total when component mounts
    setTotal(5);
  }, []);

  useEffect(() => {
    // Update grand total whenever total changes
    setGrandTotal(total + shipping);
  }, [total]);
  const deleteCart = async (userId,productId) => {
    try {
        console.log("userid before delete from cart :",userId)
        await axios.delete(`http://localhost:4000/cart/deletefromcart/${userId}/${productId}`);
        toast.success("Cart deleted");
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        toast.error("Failed to delete item from cart");
    }
  }



  return (
    <Layout >
      <div className="h-screen bg-gray-100 pt-5 " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
             {count !== 0 ? cartItems.map((item, index) => {
              return (
                <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                      <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                    </div>
                    <button onClick={() => deleteCart(userId,item._id)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer">
                    <RiDeleteBin6Fill size={30}/>
                    </button>
                  </div>
                </div>
              )
            }): <div>no item in cart</div>}
           

          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>{grandTotal}</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart