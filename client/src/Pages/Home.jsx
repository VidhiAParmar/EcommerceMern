import React,{useContext, useEffect} from 'react'
import Layout from '../Component/Layout';
import Herosection from '../Component/Herosection';
import ProductCard from '../Component/ProductCard';
import Testimonial from '../Component/Testimonial';
import axios from "axios";
import myContext from '../Context/myContext';

function Home() {
  const {admins, userLoggedIn, setUserLoggedIn, setuserId, authToken,user, userId,flag, adminId,admin,setAdminId, setAdminLoggedIn, adminLoggedIn, adminAuthToken, setAdminAuthToken} = useContext(myContext);
  console.log(admin+ "admin authToken will be"+ adminAuthToken)
  const checkAdminLoginStatus = async () => {
    try {
        // Assuming adminAuthToken and adminId are defined in the component state
        const response = await axios.get('http://localhost:4000/admin/checklogin', {
            headers: {
                Authorization: `Bearer ${adminAuthToken}` // Use adminAuthToken from state
            }
        });
        console.log("Response is ", response.data);
        console.log("admin id is "+adminId)
        console.log(response.data.ok + "id is "+ adminId)
        if (response.data.ok && adminId) {
            setAdminLoggedIn(true);
            console.log(adminLoggedIn) // This might still log false if it's not updated immediately
            setAdminId(adminId);
        } else {
            setAdminLoggedIn(false);
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        setAdminLoggedIn(false);
    }
};


const checkUserLoginStatus = async () => {
  try {
      const response = await axios.get('http://localhost:4000/auth/checklogin', {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      });
      console.log("Response is ", response.data);
      console.log("userid is "+userId)
      if (response.data.ok && userId) {
          setUserLoggedIn(true);
          setuserId(response.data.userId);
          console.log("user flag:"+userLoggedIn)
      } else {
          setUserLoggedIn(false);
      }
  } catch (error) {
      console.error('Error checking login status:', error);
      setUserLoggedIn(false);
  }
};

  useEffect(() => {
    if(flag){
      checkAdminLoginStatus();
    }else{
      checkUserLoginStatus();
    }
  }, []); 
  return (
    <Layout>
      <Herosection/>
      <ProductCard/>
      <Testimonial/>
    </Layout>
  )
}

export default Home
