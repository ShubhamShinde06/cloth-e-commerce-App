import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Login from "./pages/Login"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Collection from "./pages/Collection"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import Footer from "./components/Footer"
import SearchBox from "./components/SearchBox"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./pages/Orders"
import Verify from "./pages/Verify"


function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer/>
        <NavBar/>
        <SearchBox/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/collection' element={<Collection/>} />
          <Route path='/product/:productId' element={<Product/>} />
          <Route path='/placeorder' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
