import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Collection from './pages/Collection'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ChatRooms from './pages/ChatRooms'
import ChatRoom from './pages/ChatRoom'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'

const App = () =>  {
  return ( 
    
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Collection' element={<Collection/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Place-Order' element={<PlaceOrder/>}/>
      <Route path='/Orders' element={<Orders/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/chat' element={<ChatRooms/>}/>
      <Route path='/chatroom' element={<ChatRoom/>}/>
      
      </Routes>
      <Footer/>
    </div>
  )
}


export default App;
