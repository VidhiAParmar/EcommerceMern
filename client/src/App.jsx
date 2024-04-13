import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from './Pages/Admin/Dashboard';
import Login from './Pages/Registration/Login';
import Signup from './Pages/Registration/Signup';
import AddProduct from './Pages/Admin/AddProduct';
 import MyState from "./Context/myState";
 import Home from './Pages/Home';
 import Cart from './Pages/Cart';
 import UpdateProduct from './Pages/Admin/Updateproduct';

function App() {

  return (
    <MyState>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
              
                <Dashboard />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={
              
                <AddProduct />
            } />
            <Route path="/updateproduct/:id" element={
              
                <UpdateProduct />
            } />
           
        </Routes>
      </Router>
    </MyState>
    
  )
}

export default App

//user

