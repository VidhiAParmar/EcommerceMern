import React,{useContext, useEffect} from 'react'
import Layout from '../Component/Layout';
import Herosection from '../Component/Herosection';
import ProductCard from '../Component/ProductCard';
import Testimonial from '../Component/Testimonial';
import axios from "axios";
import myContext from '../Context/myContext';

function Home() {
  const {admins, userLoggedIn, setUserLoggedIn, setuserId,userId, setAdminLoggedIn, adminLoggedIn, setAdminAuthToken} = useContext(myContext);
  
  console.log(userId)

  return (
    <Layout>
      <Herosection/>
      <ProductCard/>
      <Testimonial/>
    </Layout>
  )
}

export default Home
